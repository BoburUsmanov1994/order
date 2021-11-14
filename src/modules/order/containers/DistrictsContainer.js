import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-grid-system";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import moment from "moment";
import {confirmAlert} from 'react-confirm-alert';
import Title from "../../../components/title";
import Button from "../../../components/button";
import {Table} from "../../../components/table";
import RegionScheme from "../../../schema/RegionScheme";
import ApiActions from "../../../services/api/Actions";
import {get, isEmpty, isNil} from "lodash";
import Normalizer from "../../../services/normalizer";
import {Edit, Trash} from 'react-feather';
import ApiService from "../ApiService";
import Loader from "../../../components/loader";
import {toast} from "react-toastify";
import Modal from "../../../components/modal";
import ContentLoader from "../../../components/loader/ContentLoader";
import DistrictScheme from "../../../schema/DistrictScheme";
import DistrictCreateForm from "../components/district/DistrictCreateForm";
import DistrictUpdateForm from "../components/district/DistrictUpdateForm";
import Select from "../../../components/elements/select/Select";
import Flex from "../../../components/flex/Flex";


const DistrictsContainer = ({
                                history,
                                getRegionList,
                                districts,
                                entities,
                                regions,
                                getOneDistrict,
                                isFetched,
                                isFetchedDistrict,
                                district,
                                setTrigger,
                                totalItems,
                                setDistrictListTrigger,
                                getDistrictsList,
                                getDistrictsListByRegion
                            }) => {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [district_id, setDistrictId] = useState(null);
    const [filter, setFilter] = useState({page: 0});
    const [region, setRegion] = useState(null);

    useEffect(() => {
        getRegionList({});
    }, []);
    useEffect(() => {
        setDistrictListTrigger();
        getDistrictsList({...filter});
    }, [filter]);

    useEffect(() => {
        if (district_id) {
            setTrigger();
            getOneDistrict({district_id});
        }
    }, [district_id])

    useEffect(() => {
        if (region) {
            getDistrictsListByRegion({regId: region});
        }else{
            getDistrictsList({...filter});
        }
    }, [region])

    regions = Normalizer.Denormalize(regions, [RegionScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));
    districts = Normalizer.Denormalize(districts, [DistrictScheme], entities);
    district = Normalizer.Denormalize(district, DistrictScheme, entities);

    const createDistrict = (params) => {
        setLoading(true);
        ApiService.CreateDistrict(params).then((res) => {
            if (res && res.data) {
                setLoading(false);
                setShow(false);
                toast.success('SUCCESS');
                getDistrictsList({...filter});
            }
        }).catch((error) => {
            setLoading(false);
            setShow(false);
            if (error.response && error.response.data) {
                toast.error(`${error.response.data}`)
            }
        })
    }
    const updateDistrict = (params) => {
        setLoading(true);
        ApiService.UpdateDistrict(district_id, params).then((res) => {
            if (res && res.data) {
                setLoading(false);
                setShow(false);
                toast.success('SUCCESS');
                getDistrictsList({...filter});
            }
        }).catch((error) => {
            setLoading(false);
            setShow(false);
            if (error.response && error.response.data) {
                toast.error(`${error.response.data}`)
            }
        })
    }
    const deleteDistrict = (id) => {
        confirmAlert({
            title: 'Ишончингиз комилми?',

            buttons: [
                {
                    label: 'Ўчириш',
                    onClick: () => {
                        setLoading(true);
                        ApiService.DeleteDistrict(id).then((res) => {
                            if (res && res.data) {
                                setLoading(false);
                                toast.success('SUCCESS');
                                getDistrictsList({...filter});
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

    return (
        <>
            <Row className={'mb-24'}>
                <Col xs={12}>
                    <Modal show={show} setShow={setShow}>
                        {isNil(district_id) ? <DistrictCreateForm regions={regions} createDistrict={createDistrict}/> :
                            <DistrictUpdateForm isFetched={isFetchedDistrict} district={district} regions={regions}
                                                updateDistrict={updateDistrict}/>}
                    </Modal>
                </Col>
                <Col xs={12}>
                    <hr/>
                </Col>
                <Col xs={12}>
                    {loading && <Loader/>}
                </Col>
            </Row>
            <Row className={'mb-24'} align={'center'}>
                <Col xs={5}>
                    <Title>Туманлар рўйхати</Title>
                </Col>
                <Col xs={7}>
                    <Flex justify={'flex-end'}>
                        <Select defaultValue={{value:null,label:"Барчаси"}} options={[{value:null,label:"Барчаси"},...regions]} placeholder={'Вилоятни танланг'}
                                handleChange={({value}) => setRegion(value)} className={'mr-16'}/>
                        <Button success lg thin handleClick={() => {
                            setDistrictId(null);
                            setShow(true)
                        }}>Янги яратиш</Button>
                    </Flex>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {isFetched ? <Table current={get(filter, 'page', 0)}
                                        paginate={({selected}) => setFilter(filter => ({...filter, page: selected}))}
                                        totalItems={totalItems}
                                        columns={['ID', 'Вилоят ', 'Туман номи', 'Базага ёзилган сана', 'Actions']}
                                        rows={regions}>
                        {
                            !isEmpty(districts) ? districts.map((district, index) => <tr key={get(district, '_id')}>
                                <td>{(index+1)+get(filter, 'page', 0)*20}</td>
                                <td>{get(district, 'regiId.name', '-')}</td>
                                <td>{get(district, 'name', '-')}</td>
                                <td>{moment(get(district, 'createdAt', '-')).format("DD-MM-YYYY")}</td>
                                <td><Edit className={'mr-8 cursor-pointer'} color="#2BCC71" size={24} onClick={() => {
                                    setDistrictId(get(district, '_id'));
                                    setShow(true);
                                }
                                }/><Trash
                                    onClick={() => deleteDistrict(get(district, '_id'))} className={'cursor-pointer'}
                                    color="#E3111A" size={24}/></td>
                            </tr>) : <tr>
                                <td colSpan={5}>Маълумот мавжуд эмас</td>
                            </tr>
                        }
                    </Table> : <ContentLoader/>}
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        regions: get(state, 'normalizer.data.region-list.result.region', []),
        districts: get(state, 'normalizer.data.districts-list.result.districts', []),
        district: get(state, 'normalizer.data.get-one-district.result.districts', {}),
        isFetched: get(state, 'normalizer.data.districts-list.isFetched', false),
        isFetchedDistrict: get(state, 'normalizer.data.get-one-district.isFetched', false),
        totalItems: get(state, 'normalizer.data.districts-list.result.totalItems', 0),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getRegionList: ({page = 0, size = 20}) => {
            const storeName = 'region-list';
            const entityName = 'region';
            const scheme = {region: [RegionScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/regions',
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
        getDistrictsList: ({page = 0, size = 20}) => {
            const storeName = 'districts-list';
            const entityName = 'district';
            const scheme = {districts: [DistrictScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/districts',
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
        getDistrictsListByRegion: ({regId, page = 0}) => {
            const storeName = 'districts-list';
            const entityName = 'region';
            const scheme = {districts: [DistrictScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/districts/reg/${regId}`,
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
        getOneDistrict: ({district_id}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/districts/${district_id}`,
                config: {
                    params: {},
                },
                scheme: {districts: DistrictScheme},
                storeName: 'get-one-district',
                entityName: 'district',
            },
        }),
        setTrigger: () => dispatch({
            type: ApiActions.GET_ONE.TRIGGER,
            payload: {
                scheme: {},
                storeName: 'get-one-district',
            },
        }),
        setDistrictListTrigger: () => dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                scheme: {},
                storeName: 'districts-list',
            },
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DistrictsContainer));
