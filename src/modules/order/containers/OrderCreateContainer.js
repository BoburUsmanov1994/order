import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-grid-system";
import Title from "../../../components/title";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {get,isEqual} from "lodash";
import RegionScheme from "../../../schema/RegionScheme";
import ApiActions from "../../../services/api/Actions";
import DistrictScheme from "../../../schema/DistrictScheme";
import Normalizer from "../../../services/normalizer";
import NeighborhoodScheme from "../../../schema/NeighborhoodScheme";
import ApiService from "../ApiService";
import {toast} from "react-toastify";
import Loader from "../../../components/loader";
import OrderCreateForm from "../components/order/OrderCreateForm";
import StatusOrderScheme from "../../../schema/StatusOrderScheme";
import BasisOrderScheme from "../../../schema/BasisOrderScheme";
import BasisTerminationScheme from "../../../schema/BasisTerminationScheme";
import ResultOrderScheme from "../../../schema/ResultOrderScheme";
import config from "../../../config";


const OrderCreateContainer = ({
                                  history,
                                  user,
                                  entities,
                                  regions,
                                  districts,
                                  getRegionList,
                                  getDistrictsListByRegion,
                                  neighborhoods,
                                  getNeighborhoodsListByDistrict,
                                  getOrderStatusList,
                                  ordersStatus,
                                  getBasisOrderList,
                                  basisOrder,
                                  getBasisTerminationList,
                                  basisTermination,
                                  getResultOrderList,
                                  resultOrder
                              }) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getRegionList({});
        getOrderStatusList({});
        getBasisOrderList({});
        getBasisTerminationList({});
        getResultOrderList({});
    }, [])
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
    ordersStatus = Normalizer.Denormalize(ordersStatus,[StatusOrderScheme],entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));

    basisOrder = Normalizer.Denormalize(basisOrder,[BasisOrderScheme],entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));

    basisTermination = Normalizer.Denormalize(basisTermination,[BasisTerminationScheme],entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));

    resultOrder = Normalizer.Denormalize(resultOrder,[ResultOrderScheme],entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));

    const getDistrictsByRegion = (regId) => {
        getDistrictsListByRegion({regId});
    }
    const getNeighborhoodsByDistrict = (districtId) => {
        getNeighborhoodsListByDistrict({districtId})
    }
    const create = (params) => {
        setLoading(true);
        ApiService.CreateOrder(params).then((res) => {
            if (res && res.data) {
                setLoading(false);
                toast.success('SUCCESS');
                history.push('/order/list')
            }
        }).catch((error) => {
            setLoading(false);
            if (error.response && error.response.data) {
                toast.error(`${error.response.data}`);
                return;
            }
            toast.error('ERROR');
        })
    }

    if(isEqual(get(user,'accountrole.name'),config.ROLES.REGION_ADMIN)){
        regions = regions.filter(item => isEqual(get(item,'value'),get(user,'regionId._id')));
    }
    if(isEqual(get(user,'accountrole.name'),config.ROLES.USER)){
        regions = regions.filter(item => isEqual(get(item,'value'),get(user,'regionId._id')));
        districts = districts.filter(item => isEqual(get(item,'value'),get(user,'districtsId._id')));
    }

    return (
        <>
            <Row className={'mb-48'}>
                <Col xs={12}>
                    {loading && <Loader/>}
                </Col>
                <Col xs={12}>
                    <hr className={'mb-24'}/>
                </Col>
                <Col xs={12}>
                    <Title>Янги ордер яратиш</Title>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <OrderCreateForm neighborhoods={neighborhoods} regions={regions} districts={districts}
                                     getDistrictsByRegion={getDistrictsByRegion}
                                     getNeighborhoodsByDistrict={getNeighborhoodsByDistrict} create={create} ordersStatus={ordersStatus} basisOrder={basisOrder} basisTermination={basisTermination} resultOrder={resultOrder}/>
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
        neighborhoods: get(state, 'normalizer.data.neighborhoods-list.result.mfy', []),
        ordersStatus: get(state, 'normalizer.data.status-order-list.result.statusOrder', []),
        basisOrder: get(state, 'normalizer.data.basis-order-list.result.basisorder', []),
        basisTermination: get(state, 'normalizer.data.basis-termination-list.result.basistermination', []),
        resultOrder: get(state, 'normalizer.data.result-order-list.result.resultorder', []),
        user:get(state,'auth.user',{})
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
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
        getDistrictsListByRegion: ({regId, page = 0}) => {
            const storeName = 'districts-list';
            const entityName = 'district';
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



    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderCreateContainer));
