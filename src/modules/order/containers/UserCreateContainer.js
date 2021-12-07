import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-grid-system";
import Title from "../../../components/title";
import UserCreateForm from "../components/user/UserCreateForm";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import RegionScheme from "../../../schema/RegionScheme";
import ApiActions from "../../../services/api/Actions";
import DistrictScheme from "../../../schema/DistrictScheme";
import Normalizer from "../../../services/normalizer";
import StatusScheme from "../../../schema/StatusScheme";
import RoleScheme from "../../../schema/RoleScheme";
import NeighborhoodScheme from "../../../schema/NeighborhoodScheme";
import ApiService from "../ApiService";
import {toast} from "react-toastify";
import Loader from "../../../components/loader";
import RankScheme from "../../../schema/RankScheme";


const UserCreateContainer = ({
                                 history,
                                 user,
                                 entities,
                                 regions,
                                 districts,
                                 getRegionList,
                                 getDistrictsListByRegion,
                                 neighborhoods,
                                 getStatusList,
                                 status,
                                 getRoleList,
                                 roles,
                                 getNeighborhoodsListByDistrict,
                                 getRankList,
                                 ranks
                             }) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getRegionList({});
        getStatusList({});
        getRoleList({});
        getRankList({});
    }, [])
    regions = Normalizer.Denormalize(regions, [RegionScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));
    districts = Normalizer.Denormalize(districts, [DistrictScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));
    neighborhoods = Normalizer.Denormalize(neighborhoods,[NeighborhoodScheme],entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));;
    status = Normalizer.Denormalize(status, [StatusScheme], entities).map(({_id, name}) => ({value: _id, label: name}));
    roles = Normalizer.Denormalize(roles, [RoleScheme], entities).map(({_id, name}) => ({value: _id, label: name}));
    ranks = Normalizer.Denormalize(ranks, [RankScheme], entities).map(({_id, name}) => ({value: _id, label: name}));

    const getDistrictsByRegion = (regId) => {
        getDistrictsListByRegion({regId});
    }
    const getNeighborhoodsByDistrict = (districtId) => {
        getNeighborhoodsListByDistrict({districtId})
    }
    const create = (params) => {
        setLoading(true);
        ApiService.CreateUser(params).then((res) => {
            if (res && res.data) {
                setLoading(false);
                toast.success('SUCCESS');
                history.push('/users')
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

    return (
        <>
            <Row className={'mb-32'}>
                <Col xs={12}>
                    {loading && <Loader/>}
                </Col>
                <Col xs={12}>
                    <hr className={'mb-24'}/>
                </Col>
                <Col xs={12}>
                    <Title>Янги фойдаланувчи яратиш</Title>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <UserCreateForm user={user} neighborhoods={neighborhoods} regions={regions} districts={districts} statusList={status} roles={roles} ranks={ranks}
                                    getDistrictsByRegion={getDistrictsByRegion} getNeighborhoodsByDistrict={getNeighborhoodsByDistrict} create={create}/>
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
        status: get(state, 'normalizer.data.status-list.result.accounts', []),
        roles: get(state, 'normalizer.data.role-list.result.accounts', []),
        neighborhoods: get(state, 'normalizer.data.neighborhoods-list.result.mfy', []),
        user: get(state, 'auth.user', {}),
        ranks: get(state, 'normalizer.data.rank-list.result.zvaniya', []),
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
        getStatusList: ({page = 0, size = 20}) => {
            const storeName = 'status-list';
            const entityName = 'status';
            const scheme = {accounts: [StatusScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/accountstatus',
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
        getRoleList: ({page = 0, size = 20}) => {
            const storeName = 'role-list';
            const entityName = 'role';
            const scheme = {accounts: [RoleScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/accountroles',
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

        getRankList: ({page = 0, size = 20}) => {
            const storeName = 'rank-list';
            const entityName = 'item';
            const scheme = {zvaniya: [RankScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/zvaniya',
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
        setDistrictListTrigger: () => dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                scheme: {},
                storeName: 'district-list',
            },
        })

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserCreateContainer));
