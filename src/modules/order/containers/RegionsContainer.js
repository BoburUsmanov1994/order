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
import RegionCreateForm from "../components/region/RegionCreateForm";
import RegionUpdateForm from "../components/region/RegionUpdateForm";
import ContentLoader from "../../../components/loader/ContentLoader";


const RegionsContainer = ({
                              history,
                              getRegionList,
                              entities,
                              regions,
                              getOneRegion,
                              isFetched,
                              isFetchedRegion,
                              region,
                              setTrigger,
                              totalItems,
                              setRegionListTrigger
                          }) => {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [region_id, setRegionId] = useState(null);
    const [filter, setFilter] = useState({page:0});
    regions = Normalizer.Denormalize(regions, [RegionScheme], entities);
    region = Normalizer.Denormalize(region, RegionScheme, entities);
    useEffect(() => {
        setRegionListTrigger();
        getRegionList({...filter})
    }, [filter]);
    useEffect(() => {
        if (region_id) {
            setTrigger();
            getOneRegion({region_id})
        }
    }, [region_id]);


    const createRegion = (params) => {
        setLoading(true);
        ApiService.CreateRegion(params).then((res) => {
            if (res && res.data) {
                setLoading(false);
                setShow(false);
                toast.success('SUCCESS');
                getRegionList({...filter});
            }
        }).catch((error) => {
            setLoading(false);
            setShow(false);
            if (error.response && error.response.data) {
                toast.error(`${error.response.data}`)
            }
        })
    }
    const updateRegion = (params) => {
        setLoading(true);
        ApiService.UpdateRegion(region_id, params).then((res) => {
            if (res && res.data) {
                setLoading(false);
                setShow(false);
                toast.success('SUCCESS');
                getRegionList({...filter});
            }
        }).catch((error) => {
            setLoading(false);
            setShow(false);
            if (error.response && error.response.data) {
                toast.error(`${error.response.data}`)
            }
        })
    }
    const deleteRegion = (id) => {
        confirmAlert({
            title: 'Ишончингиз комилми?',

            buttons: [
                {
                    label: 'Ўчириш',
                    onClick: () => {
                        setLoading(true);
                        ApiService.DeleteRegion(id).then((res) => {
                            if (res && res.data) {
                                setLoading(false);
                                toast.success('SUCCESS');
                                getRegionList({...filter});
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
                        {isNil(region_id) ? <RegionCreateForm createRegion={createRegion}/> :
                            <RegionUpdateForm isFetched={isFetchedRegion} region={isFetchedRegion && region}
                                              updateRegion={updateRegion}/>}
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
                <Col xs={6}>
                    <Title>Вилоятлар рўйхати</Title>
                </Col>
                <Col xs={6} className={'text-right'}>
                    <Button success lg thin handleClick={() => {
                        setRegionId(null);
                        setShow(true)
                    }}>Янги яратиш</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {isFetched ? <Table current={get(filter,'page',0)} paginate={({selected}) => setFilter(filter => ({...filter,page:selected}))} totalItems={totalItems} columns={['ID', 'Вилоят', 'Базага ёзилган сана', 'Actions']} rows={regions}>
                        {
                            !isEmpty(regions) ? regions.map((region, index) => <tr key={get(region, '_id')}>
                                <td>{index + 1}</td>
                                <td>{get(region, 'name', '-')}</td>
                                <td>{moment(get(region, 'createdAt', '-')).format("DD-MM-YYYY")}</td>
                                <td><Edit className={'mr-8 cursor-pointer'} color="#2BCC71" size={24} onClick={() => {
                                    setRegionId(get(region, '_id'));
                                    setShow(true);
                                }
                                }/><Trash
                                    onClick={() => deleteRegion(get(region, '_id'))} className={'cursor-pointer'}
                                    color="#E3111A" size={24}/></td>
                            </tr>) : <tr>
                                <td colSpan={4}>Маълумот мавжуд эмас</td>
                            </tr>
                        }
                    </Table> : <ContentLoader />}
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        regions: get(state, 'normalizer.data.region-list.result.region', []),
        region: get(state, 'normalizer.data.get-one-region.result.region', {}),
        isFetched: get(state, 'normalizer.data.region-list.isFetched', false),
        isFetchedRegion: get(state, 'normalizer.data.get-one-region.isFetched', false),
        totalItems:get(state, 'normalizer.data.region-list.result.totalItems', 0),
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
                            page:page+1,
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getOneRegion: ({region_id}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/regions/${region_id}`,
                config: {
                    params: {},
                },
                scheme: {region: RegionScheme},
                storeName: 'get-one-region',
                entityName: 'region',
            },
        }),
        setTrigger: () => dispatch({
            type: ApiActions.GET_ONE.TRIGGER,
            payload: {
                scheme: {},
                storeName: 'get-one-region',
            },
        }),
        setRegionListTrigger: () => dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                scheme: {},
                storeName: 'region-list',
            },
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegionsContainer));
