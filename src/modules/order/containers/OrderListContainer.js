import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-grid-system";
import {get, isEmpty, isEqual} from "lodash";
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
import {Edit, Eye, MinusCircle, PlusCircle, Trash} from "react-feather";
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

const OrderListContainer = ({
                                history,
                                orders,
                                entities,
                                isFetched,
                                totalItems,
                                getOrdersList,
                                getOrdersListByFilter,
                                getRegionList,
                                regions,
                                districts,
                                getDistrictsList
                            }) => {
        const [loading, setLoading] = useState(false);
        const [filter, setFilter] = useState({
            page: 0,
            seriya: null,
            regId: null,
            distId: null,
            from: moment().subtract(3, 'months').format("YYYY-MM-DD"),
            to: moment().format("YYYY-MM-DD")
        });
        useEffect(() => {
            getOrdersList({...filter});
            getRegionList({});
        }, []);

        useEffect(() => {
            if (get(filter,'regId') || get(filter,'seriya') || get(filter,'distId')) {
                getOrdersListByFilter(filter);
            }
        }, [filter]);


        orders = Normalizer.Denormalize(orders, [OrderScheme], entities);
        regions = Normalizer.Denormalize(regions, [RegionScheme], entities).map(({_id, name}) => ({
            value: _id,
            label: name
        }));
        districts = Normalizer.Denormalize(districts, [DistrictScheme], entities).map(({_id, name}) => ({
            value: _id,
            label: name
        }));
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
            getDistrictsList({regId:value});
        }
        const clearFilter = () => {
                    setFilter(filter => ({ page: 0,
                        seriya: null,
                        regId: null,
                        distId: null,
                        from: moment().subtract(3, 'months').format("YYYY-MM-DD"),
                        to: moment().format("YYYY-MM-DD")}));
                        getOrdersList({...filter});

        }
        return (
            <>{isFetched ? <>
                <Row className={'mb-24'}>
                    <Col xs={12}>
                        <hr/>
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
                                    <Select defaultValue={get(filter,'regId')} handleChange={(values) => {
                                        setRegion(get(values, 'value'));
                                        setFilter(filter => ({...filter, regId: get(values, 'value')}))
                                    }} options={regions} placeholder={'Вилоятни танланг'}
                                            className={'mr-8 mb-8'}/>
                                    <Select
                                        defaultValue={get(filter,'distId')}
                                        handleChange={({value}) => setFilter(filter => ({...filter, distId: value}))}
                                        options={districts} placeholder={'Туман'} className={'mr-8 mb-8'}/>
                                    <RangeCalendar handleCalendar={handleCalendar} lg/>

                                    <Button className={'mb-8'} danger back handleClick={clearFilter}>Тозалаш</Button>
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
                                    <Trash
                                        onClick={() => deleteOrder(get(order, '_id'))} className={'cursor-pointer'}
                                        color="#E3111A" size={24}/></td>
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
    }
}
const mapDispatchToProps = (dispatch) =>
{
    return {
        getOrdersList: ({page = 0, size = 20}) => {
            const storeName = 'order-list';
            const entityName = 'order';
            const scheme = {oreders: [OrderScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/orders',
                    config: {
                        params: {
                            page: page + 1,
                        },
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
