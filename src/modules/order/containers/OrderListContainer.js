import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-grid-system";
import {get, includes, isEmpty, isEqual} from "lodash";
import moment from "moment";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import ApiActions from "../../../services/api/Actions";
import OrderScheme from "../../../schema/OrderScheme";
import {confirmAlert} from "react-confirm-alert";
import ApiService from "../ApiService";
import {toast} from "react-toastify";
import ContentLoader from "../../../components/loader/ContentLoader";
import {Table} from "../../../components/table";
import {Edit, Eye, List, MinusCircle, PlusCircle, Trash} from "react-feather";
import Flex from "../../../components/flex/Flex";
import OrderSearch from "../components/order/OrderSearch";
import Select from "../../../components/elements/select/Select";
import Button from "../../../components/button";
import Title from "../../../components/title";
import Box from "../../../components/box";
import Normalizer from "../../../services/normalizer";
import RegionScheme from "../../../schema/RegionScheme";
import RangeCalendar from "../../../components/range-calendar";
import DistrictScheme from "../../../schema/DistrictScheme";
import classNames from "classnames";
import config from "../../../config";
import HasAccess from "../../../services/auth/HasAccess";
import Filter from "../../../components/filter";
import FormSelect from "../../../components/elements/form-select";
import {Controller} from "react-hook-form";
import NeighborhoodScheme from "../../../schema/NeighborhoodScheme";
import StatusOrderScheme from "../../../schema/StatusOrderScheme";
import BasisOrderScheme from "../../../schema/BasisOrderScheme";
import BasisTerminationScheme from "../../../schema/BasisTerminationScheme";
import ResultOrderScheme from "../../../schema/ResultOrderScheme";

const OrderListContainer = ({
                                history,
                                user,
                                orders,
                                entities,
                                isFetched,
                                totalItems,
                                getOrdersList,
                                getOrdersListByFilter,
                                getRegionList,
                                regions,
                                districts,
                                getDistrictsList,
                                getNeighborhoodsListByDistrict,
                                neighborhoods,
                                getOrderStatusList,
                                ordersStatusList,
                                basisOrderList,
                                getBasisOrderList,
                                getBasisTerminationList,
                                basisTerminationList,
                                getResultOrderList,
                                resultOrderList,
                                getOrdersListFromFilter,
                                ...rest
                            }) => {
        const [loading, setLoading] = useState(false);
        const [open,setOpen] = useState(false);
        const [filter, setFilter] = useState({
            page: 0,
            regId: '',
            distId: '',
            mfyId: '',
            from: moment().subtract(3, 'months').format("YYYY-MM-DD"),
            to: moment().format("YYYY-MM-DD")
        });
        const [advancedFilter,setAdvancedFilter] = useState({
            page : 0,
            size : 20,
            from : null,
            to : null,
            regiId : null,
            distId : null,
            mfyId : null,
            orderstatus : null,
            basisorder : null,
            basistermination : null,
            orederresults : null
        })
        useEffect(() => {
            if (isEqual(get(user, 'accountrole.name'), config.ROLES.REGION_ADMIN)) {
                getOrdersList({...filter,regId:get(user, 'regionId._id')})
            }else if(isEqual(get(user, 'accountrole.name'), config.ROLES.USER)){
                getOrdersList({...filter,regId:get(user, 'regionId._id'),distId: get(user, 'districtsId._id')})
            }
            else {
                getOrdersList({...filter});
            }
            getRegionList({});
            getOrderStatusList({});
            getBasisOrderList({});
            getBasisTerminationList({});
            getResultOrderList({});
            if (includes([config.ROLES.USER, config.ROLES.REGION_ADMIN], get(user, 'accountrole.name'))) {
                setFilter(filter => ({...filter, regId: get(user, 'regionId._id')}));
            }
            if (includes([config.ROLES.USER], get(user, 'accountrole.name'))) {
                setFilter(filter => ({...filter, distId: get(user, 'districtsId._id')}));
            }
        }, []);

        useEffect(() => {
            if (get(filter, 'regId') || get(filter, 'seriya') || get(filter, 'distId')) {
                getOrdersListByFilter(filter);
            }
        }, []);

        useEffect(() => {
            getDistrictsList({regId: get(filter, 'regId')});
            setAdvancedFilter(advancedFilter => ({...advancedFilter,regiId: get(filter, 'regId')}))
        }, [get(filter, 'regId')])

        useEffect(() => {
            getNeighborhoodsListByDistrict({districtId: get(filter, 'distId')});
            setAdvancedFilter(advancedFilter => ({...advancedFilter,distId: get(filter, 'distId')}))
        }, [get(filter, 'distId')])


        orders = Normalizer.Denormalize(orders, [OrderScheme], entities);
        regions = Normalizer.Denormalize(regions, [RegionScheme], entities).map(({_id, name}) => ({
            value: _id,
            label: name
        }));
        districts = Normalizer.Denormalize(districts, [DistrictScheme], entities).map(({_id, name}) => ({
            value: _id,
            label: name
        }));

        neighborhoods = Normalizer.Denormalize(neighborhoods, [NeighborhoodScheme], entities).map(({_id, name}) => ({
            value: _id,
            label: name
        }));
        ordersStatusList = Normalizer.Denormalize(ordersStatusList, [StatusOrderScheme], entities).map(({_id, name}) => ({
            value: _id,
            label: name
        }));
        basisOrderList = Normalizer.Denormalize(basisOrderList, [BasisOrderScheme], entities).map(({_id, name}) => ({
            value: _id,
            label: name
        }));

        basisTerminationList = Normalizer.Denormalize(basisTerminationList, [BasisTerminationScheme], entities).map(({
                                                                                                                         _id,
                                                                                                                         name
                                                                                                                     }) => ({
            value: _id,
            label: name
        }));

        resultOrderList = Normalizer.Denormalize(resultOrderList, [ResultOrderScheme], entities).map(({_id, name}) => ({
            value: _id,
            label: name
        }));

        if (isEqual(get(user, 'accountrole.name'), config.ROLES.REGION_ADMIN)) {
            regions = regions.filter(item => isEqual(get(item, 'value'), get(user, 'regionId._id')));

        }

        const deleteOrder = (id) => {
            confirmAlert({
                title: 'Ишончингиз комилми?',
                buttons: [
                    {
                        label: 'Ўчириш',
                        onClick: () => {
                            setLoading(true);
                            ApiService.DeleteOrder(id).then((res) => {
                                if (res && res.data) {
                                    setLoading(false);
                                    toast.success('SUCCESS');
                                    getOrdersList({...filter});
                                }
                            }).catch((error) => {
                                setLoading(false);
                                if (error.response && error.response.data) {
                                toast.error(`${error.response.data}`)
                                }
                            })
                        }
                    },
                    {
                        label: 'Бекор қилиш',
                    }
                ]
            });
        };

        const handleCalendar = (selection) => {
            setFilter(filter => ({
                ...filter,
                from: moment(get(selection, 'startDate')).format("YYYY-MM-DD"),
                to: moment(get(selection, 'endDate')).format("YYYY-MM-DD")
            }))
        }

        const setRegion = (value) => {
           setFilter(filter => ({...filter,regId: value}));
        }

        const clearFilter = () => {
            setFilter(filter => ({
                page: 0,
                regId: null,
                distId: null,
                from: moment().subtract(3, 'months').format("YYYY-MM-DD"),
                to: moment().format("YYYY-MM-DD")
            }));
            getOrdersList({...filter});

        };

        const onSubmit = (data) => {
            getOrdersListFromFilter({...filter,...data});
            setAdvancedFilter({...filter,...data});
            setOpen(false);
        }

        useEffect(() => {

        }, [])

        return (
            <>{isFetched ? <>
                <Row className={'mb-24'}>
                    <Col xs={12}>
                        <hr/>
                        <HasAccess>
                            {
                                ({userCan}) => <Filter open={open} setOpen={setOpen}>
                                    {({register, handleSubmit, setValue, getValues, control}) => (
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <Row className={'mb-16'}>
                                                <Col xs={12}>
                                                    <FormSelect isDisabled={userCan([config.ROLES.REGION_ADMIN,config.ROLES.USER])} defaultValue={get(advancedFilter, 'regiId')} options={regions}
                                                                setValue={setValue} Controller={Controller} control={control}
                                                                name={'regiId'} onChange={({value}) => setFilter(filter => ({
                                                        ...filter,
                                                        regId: value
                                                    }))} placeholder={'Вилоятни танланг'}/>

                                                </Col>
                                            </Row>
                                            <Row className={'mb-16'}>
                                                <Col xs={12}>
                                                    <FormSelect isDisabled={userCan([config.ROLES.USER])} defaultValue={get(advancedFilter, 'distId')} options={districts}
                                                                setValue={setValue} Controller={Controller} control={control}
                                                                name={'distId'} onChange={({value}) => setFilter(filter => ({
                                                        ...filter,
                                                        distId: value
                                                    }))} placeholder={'Туманни танланг'}/>

                                                </Col>
                                            </Row>
                                            <Row className={'mb-16'}>
                                                <Col xs={12}>
                                                    <FormSelect defaultValue={get(advancedFilter, 'mfyId')} options={neighborhoods}
                                                                setValue={setValue} Controller={Controller} control={control}
                                                                name={'mfyId'} placeholder={'Маҳаллани танланг'}/>

                                                </Col>
                                            </Row>
                                            <Row className={'mb-16'}>
                                                <Col xs={12}>
                                                    <FormSelect defaultValue={get(advancedFilter,'orderstatus')} options={ordersStatusList}
                                                                setValue={setValue} Controller={Controller} control={control}
                                                                name={'orderstatus'} placeholder={'Берилган ордернинг холати'}/>

                                                </Col>
                                            </Row>
                                            <Row className={'mb-16'}>
                                                <Col xs={12}>
                                                    <FormSelect defaultValue={get(advancedFilter,'basisorder')} options={basisOrderList}
                                                                setValue={setValue} Controller={Controller} control={control}
                                                                name={'basisorder'} placeholder={'Ҳимоя ордери бериш учун асос'}/>

                                                </Col>
                                            </Row>
                                            <Row className={'mb-16'}>
                                                <Col xs={12}>
                                                    <FormSelect defaultValue={get(advancedFilter,'basistermination')} options={basisTerminationList}
                                                                setValue={setValue} Controller={Controller} control={control}
                                                                name={'basistermination'}
                                                                placeholder={'Ҳимоя ордерини тугатиш асослари'}/>

                                                </Col>
                                            </Row>
                                            <Row className={'mb-16'}>
                                                <Col xs={12}>
                                                    <FormSelect defaultValue={get(advancedFilter,'orederresults')} options={resultOrderList}
                                                                setValue={setValue} Controller={Controller} control={control}
                                                                name={'orederresults'} placeholder={'Ҳимоя ордери бериш натижаси'}/>

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12} className={'text-center mt-16'}>
                                                    <Button type={'submit'} success>Саралаш</Button>
                                                </Col>
                                            </Row>
                                        </form>)}
                                </Filter>
                            }
                        </HasAccess>

                    </Col>
                </Row>
                <Row className={'mb-24'} align={'center'}>
                    <Col xs={6}>
                        <Title>Ордерларни рўйхатга олиш </Title>
                </Col>
                <Col xs={6} className={'text-right'}>
                    <Button success lg thin handleClick={() => history.push('/order/create')}>Янги яратиш</Button>
                    <Button className={'ml-16'} outlined lg
                            thin>Экспорт</Button>
                </Col>
            </Row>
            <Row className={'mb-16'}>
                <Col xs={12}>
                    <Box oval>
                        <Row>
                            <Col xs={12}>
                                <Flex wrap justify={'space-between'}>
                                    <OrderSearch defaultValue={get(filter, 'seriya')}
                                                 search={(val) => setFilter(filter => ({...filter, seriya: val}))}
                                                 className={'mr-8 mb-8'}/>
                                                 <HasAccess>
                                                     {
                                                         ({userCan}) => <Select isDisabled={userCan([config.ROLES.REGION_ADMIN,config.ROLES.USER])}  defaultValue={get(filter,'regId')} handleChange={(values) => {
                                                             setRegion(get(values, 'value'));
                                                             setFilter(filter => ({...filter, regId: get(values, 'value')}))
                                                         }} options={regions} placeholder={'Вилоятни танланг'}
                                                                                className={'mr-8 mb-8'}/>
                                                     }
                                                 </HasAccess>
                                    <HasAccess>
                                        {
                                            ({userCan}) =>  <Select isDisabled={userCan([config.ROLES.USER])}
                                                defaultValue={get(filter,'distId')}
                                                handleChange={({value}) => setFilter(filter => ({...filter, distId: value}))}
                                                options={districts} placeholder={'Туман'} className={'mr-8 mb-8'}/>
                                        }
                                    </HasAccess>


                                    <RangeCalendar handleCalendar={handleCalendar} lg/>
                                    <List size={32} color={'#21D59B'} className={'mr-8 cursor-pointer'} onClick={() => setOpen(true)} />
                                    <HasAccess>
                                        {({userCan}) =>userCan([config.ROLES.ADMIN]) && <Button className={'mb-8'} danger back handleClick={clearFilter}>Тозалаш</Button>}
                                    </HasAccess>
                                </Flex>
                            </Col>
                        </Row>
                    </Box>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {isFetched ? <Table current={get(filter, 'page', 0)}
                                        paginate={({selected}) => setFilter(filter => ({...filter, page: selected}))}
                                        totalItems={totalItems}
                                        columns={['ID', 'Ҳимоя ордер серияси', 'Вилоят/Туман/Маҳалла',   'Очилиш сабаби', 'Ёпилиш сабаби','Шахсни кўшиш','Ҳолати',  'Ордер берилган\n' +
                                        'вақти', 'Actions']}>
                        {
                            !isEmpty(orders) ? orders && orders.map((order, index) => <tr className={classNames({'bg-danger':isEqual(get(order, 'orderstatus.name'),'узайтирилган'),'bg-success':isEqual(get(order, 'orderstatus.name'),'тугатилган'),'bg-primary':isEqual(get(order, 'orderstatus.name'),'янги берилган')})} key={get(order, '_id')}>
                                <td>{index + 1}</td>
                                <td>{get(order, 'protectionorderseries', '-')}</td>
                                <td>{`${get(order, 'regiId.name', '-')}/${get(order, 'districtId.name', '-')}/${get(order, 'mfyId.name', '-')}`}</td>
                                <td>{get(order, 'basisorder.name', '-')}</td>
                                <td>{get(order, 'basistermination.name', '-')}</td>
                                <td><PlusCircle className={'mr-8 cursor-pointer'} color="#15BF22" size={36}
                                         onClick={() => history.push(`/order/attach/victim/${get(order, '_id')}`)}/><MinusCircle className={' cursor-pointer'} color="#E58B8B" size={36}
                                                                                                                                 onClick={() => history.push(`/order/attach/violent/${get(order, '_id')}`)}/></td>
                                <td className={'w-200'}>
                                    {isEqual(get(order, 'orderstatus.name'),'узайтирилган') && <Button danger status>{get(order, 'orderstatus.name', '-')}</Button>}
                                    {isEqual(get(order, 'orderstatus.name'),'тугатилган') && <Button success status>{get(order, 'orderstatus.name', '-')}</Button>}
                                    {isEqual(get(order, 'orderstatus.name'),'янги берилган') && <Button primary status>{get(order, 'orderstatus.name', '-')}</Button>}
                                </td>
                                <td>{moment(get(order, 'createdAt', '-')).format("DD-MM-YYYY")}</td>
                                <td>
                                    <Eye className={'mr-8 cursor-pointer'} color="#FFC700" size={24}
                                         onClick={() => history.push(`/order/view/${get(order, '_id')}`)}/>
                                    <Edit className={'mr-8 cursor-pointer'} color="#2BCC71" size={24}
                                          onClick={() => history.push(`/order/update/${get(order, '_id')}`)}/>
                                    <HasAccess>
                                        {
                                            ({userCan}) => userCan([config.ROLES.ADMIN]) && <Trash
                                                onClick={() => deleteOrder(get(order, '_id'))}
                                                className={'cursor-pointer'}
                                                color="#E3111A" size={24}/>
                                        }
                                    </HasAccess>
                                </td>
                            </tr>) : <tr>
                                <td colSpan={12}>Маълумот мавжуд эмас</td>
                            </tr>
                        }
                    </Table> : <ContentLoader/>}
                </Col>
            </Row>
        </>:<ContentLoader />
        }
        </>
    );
}
;

const mapStateToProps = (state) =>
{
    return {
        entities: get(state, 'normalizer.entities', {}),
        orders: get(state, 'normalizer.data.order-list.result.oreders', []),
        isFetched: get(state, 'normalizer.data.order-list.isFetched', false),
        regions: get(state, 'normalizer.data.region-list.result.region', []),
        districts: get(state, 'normalizer.data.district-list.result.districts', []),
        totalItems: get(state, 'normalizer.data.order-list.result.totalItems', 0),
        neighborhoods: get(state, 'normalizer.data.neighborhoods-list.result.mfy', []),
        user: get(state, 'auth.user', {}),
        ordersStatusList: get(state, 'normalizer.data.status-order-list.result.statusOrder', []),
        basisOrderList: get(state, 'normalizer.data.basis-order-list.result.basisorder', []),
        basisTerminationList: get(state, 'normalizer.data.basis-termination-list.result.basistermination', []),
        resultOrderList: get(state, 'normalizer.data.result-order-list.result.resultorder', []),
    }
}
const mapDispatchToProps = (dispatch) =>
{
    return {
        getOrdersList: ({page = 0, size = 20, from = null,
                            to = null,
                            regId = null,
                            distId = null,}) => {
            const storeName = 'order-list';
            const entityName = 'order';
            const scheme = {oreders: [OrderScheme]};
            dispatch({
                type: ApiActions.POST_ALL.REQUEST,
                payload: {
                    url: '/orders/filteradvansed',
                    config: {
                            page: page + 1,
                            from,
                            to,
                            regiId:regId,
                            distId,
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getOrdersListFromFilter: ({
                                      page = 0,
                                      size = 20,
                                      from = null,
                                      to = null,
                                      regiId = null,
                                      distId = null,
                                      mfyId = null,
                                      orderstatus = null,
                                      basisorder = null,
                                      basistermination = null,
                                      orederresults = null
                                  }) => {
            const storeName = 'order-list';
            const entityName = 'order';
            const scheme = {oreders: [OrderScheme]};
            dispatch({
                type: ApiActions.POST_ALL.REQUEST,
                payload: {
                    url: '/orders/filteradvansed',
                    config: {
                        page: page + 1,
                        from,
                        to,
                        regiId,
                        distId,
                        mfyId,
                        orderstatus,
                        basisorder,
                        basistermination,
                        orederresults
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getOrdersListByFilter: ({page = 1, ...params}) => {
            const storeName = 'order-list';
            const entityName = 'order';
            const scheme = {oreders: [OrderScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/orders/filter/filterorder',
                    config: {
                        params: {
                            ...params,
                            page: page + 1,
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getRegionList: ({page = 1}) => {
            const storeName = 'region-list';
            const entityName = 'region';
            const scheme = {region: [RegionScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/regions',
                    config: {
                        params: {
                            page
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getDistrictsList: ({regId, page = 1}) => {
            const storeName = 'district-list';
            const entityName = 'district';
            const scheme = {districts: [DistrictScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/districts/reg/${regId}`,
                    config: {
                        params: {},
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getNeighborhoodsListByDistrict: ({districtId, page = 0}) => {
            const storeName = 'neighborhoods-list';
            const entityName = 'neighborhood';
            const scheme = {mfy: [NeighborhoodScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/mfy/distId/${districtId}`,
                    config: {
                        params: {
                            page
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getOrderStatusList: ({page = 1}) => {
            const storeName = 'status-order-list';
            const entityName = 'status-order';
            const scheme = {statusOrder: [StatusOrderScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/statusorder`,
                    config: {
                        params: {
                            page
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getBasisOrderList: ({page = 1}) => {
            const storeName = 'basis-order-list';
            const entityName = 'basis-order';
            const scheme = {basisorder: [BasisOrderScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/basisorder`,
                    config: {
                        params: {
                            page
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getBasisTerminationList: ({page = 1}) => {
            const storeName = 'basis-termination-list';
            const entityName = 'basis-termination';
            const scheme = {basistermination: [BasisTerminationScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/basistermination`,
                    config: {
                        params: {
                            page
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getResultOrderList: ({page = 1}) => {
            const storeName = 'result-order-list';
            const entityName = 'result-order';
            const scheme = {resultorder: [ResultOrderScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/resultorder`,
                    config: {
                        params: {
                            page
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        setListTrigger: () => dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                scheme: {},
                storeName: 'order-list',
            },
        })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(OrderListContainer));
