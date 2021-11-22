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
import Select from "../../../components/elements/select/Select";
import Flex from "../../../components/flex/Flex";
import NeighborhoodScheme from "../../../schema/NeighborhoodScheme";
import NeighborhoodCreateForm from "../components/neighborhood/NeighborhoodCreateForm";
import NeighborhoodUpdateForm from "../components/neighborhood/NeighborhoodUpdateForm";


const NeighborhoodsContainer = ({
                                    history,
                                    getRegionList,
                                    districts,
                                    entities,
                                    regions,
                                    neighborhoods,
                                    neighborhood,
                                    getOneNeighborhood,
                                    isFetched,
                                    isFetchedNeighborhood,
                                    district,
                                    setTrigger,
                                    totalItems,
                                    setListTrigger,
                                    getNeighborhoodsList,
                                    getDistrictsListByRegion,
                                    getNeighborhoodsByRegion
                                }) => {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [neighborhood_id, setNeighborhoodId] = useState(null);
    const [filter, setFilter] = useState({page: 0});
    const [region, setRegion] = useState(null);

    useEffect(() => {
        getRegionList({});
    }, []);
    useEffect(() => {
        setListTrigger();
        getNeighborhoodsList({...filter});
    }, [filter]);

    useEffect(() => {
        if (neighborhood_id) {
            setTrigger();
            getOneNeighborhood({neighborhood_id});
        }
    }, [neighborhood_id])

    useEffect(() => {
        if (region) {
            getDistrictsListByRegion({regId: region});
            getNeighborhoodsByRegion({region});
        }
    }, [region])

    regions = Normalizer.Denormalize(regions, [RegionScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));
    districts = Normalizer.Denormalize(districts, [DistrictScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));;
    neighborhoods = Normalizer.Denormalize(neighborhoods,[NeighborhoodScheme],entities);
    neighborhood = Normalizer.Denormalize(neighborhood,NeighborhoodScheme,entities);
    district = Normalizer.Denormalize(district, DistrictScheme, entities);

    const createNeighborhood = (params) => {
        setLoading(true);
        ApiService.CreateNeighborhood(params).then((res) => {
            if (res && res.data) {
                setLoading(false);
                setShow(false);
                toast.success('SUCCESS');
                getNeighborhoodsList({...filter});
            }
        }).catch((error) => {
            setLoading(false);
            setShow(false);
            if (error.response && error.response.data) {
                toast.error(`${error.response.data}`)
            }
        })
    }
    const updateNeighborhood = (params) => {
        setLoading(true);
        ApiService.UpdateNeighborhood(neighborhood_id, params).then((res) => {
            if (res && res.data) {
                setLoading(false);
                setShow(false);
                toast.success('SUCCESS');
                getNeighborhoodsList({...filter});
            }
        }).catch((error) => {
            setLoading(false);
            setShow(false);
            if (error.response && error.response.data) {
                toast.error(`${error.response.data}`)
            }
        })
    }
    const deleteNeighborhood = (id) => {
        confirmAlert({
            title: 'Ишончингиз комилми?',

            buttons: [
                {
                    label: 'Ўчириш',
                    onClick: () => {
                        setLoading(true);
                        ApiService.DeleteNeighborhood(id).then((res) => {
                            if (res && res.data) {
                                setLoading(false);
                                toast.success('SUCCESS');
                                getNeighborhoodsList({...filter});
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
                        {isNil(neighborhood_id) ?
                            <NeighborhoodCreateForm regions={regions} districts={districts} createNeighborhood={createNeighborhood} getDistrictsByRegion={(value) => setRegion(value)}/> :
                            <NeighborhoodUpdateForm neighborhood={neighborhood} isFetched={isFetchedNeighborhood} getDistrictsByRegion={(value) => setRegion(value)} districts={districts} regions={regions}
                                                updateNeighborhood={updateNeighborhood} />}
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
                    <Title>Маҳаллалар рўйхати</Title>
                </Col>
                <Col xs={7}>
                    <Flex justify={'flex-end'}>
                        <Select defaultValue={{value: null, label: "Барчаси"}}
                                options={[{value: null, label: "Барчаси"}, ...regions]} placeholder={'Вилоятни танланг'}
                                handleChange={({value}) => setRegion(value)} className={'mr-16'}/>
                        <Button success lg thin handleClick={() => {
                            setNeighborhoodId(null);
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
                                        columns={['ID', 'Вилоят ID','Туман ID', 'Маҳалла номи', 'Базага ёзилган сана', 'Actions']}
                                        rows={regions}>
                        {
                            !isEmpty(neighborhoods) ? neighborhoods.map((neighborhood, index) => <tr key={get(district, '_id')}>
                                <td>{index + 1}</td>
                                <td>{get(neighborhood, 'regionId.name', '-')}</td>
                                <td>{get(neighborhood, 'districtId.name', '-')}</td>
                                <td>{get(neighborhood, 'name', '-')}</td>
                                <td>{moment(get(neighborhood, 'createdAt', '-')).format("DD-MM-YYYY")}</td>
                                <td><Edit className={'mr-8 cursor-pointer'} color="#2BCC71" size={24} onClick={() => {
                                    setNeighborhoodId(get(neighborhood, '_id'));
                                    setRegion(get(neighborhood, 'regionId'));
                                    setShow(true);
                                }
                                }/><Trash
                                    onClick={() => deleteNeighborhood(get(neighborhood, '_id'))} className={'cursor-pointer'}
                                    color="#E3111A" size={24}/></td>
                            </tr>) : <tr>
                                <td colSpan={6}>Маълумот мавжуд эмас</td>
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
        neighborhoods: get(state, 'normalizer.data.neighborhoods-list.result.mfy', []),
        isFetched: get(state, 'normalizer.data.neighborhoods-list.isFetched', false),
        neighborhood: get(state, 'normalizer.data.get-one-neighborhood.result.mfy', {}),
        isFetchedNeighborhood: get(state, 'normalizer.data.get-one-neighborhood.isFetched', false),
        totalItems: get(state, 'normalizer.data.neighborhoods-list.result.totalItems', 0),
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
        getNeighborhoodsList: ({page = 0, size = 20}) => {
            const storeName = 'neighborhoods-list';
            const entityName = 'neighborhood';
            const scheme = {mfy: [NeighborhoodScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/mfy',
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
        getNeighborhoodsByRegion: ({region = null, page = 0, size = 20}) => {
            const storeName = 'neighborhoods-list';
            const entityName = 'neighborhood';
            const scheme = {mfy: [NeighborhoodScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/mfy/regId/${region}`,
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
        getOneNeighborhood: ({neighborhood_id}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/mfy/${neighborhood_id}`,
                config: {
                    params: {},
                },
                scheme: {mfy: NeighborhoodScheme},
                storeName: 'get-one-neighborhood',
                entityName: 'neighborhood',
            },
        }),
        setTrigger: () => dispatch({
            type: ApiActions.GET_ONE.TRIGGER,
            payload: {
                scheme: {},
                storeName: 'get-one-neighborhood',
            },
        }),
        setListTrigger: () => dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                scheme: {},
                storeName: 'neighborhoods-list',
            },
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NeighborhoodsContainer));
