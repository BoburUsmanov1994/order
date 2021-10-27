import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-grid-system";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import moment from "moment";
import {confirmAlert} from 'react-confirm-alert';
import Title from "../../../components/title";
import Button from "../../../components/button";
import {Table} from "../../../components/table";
import ApiActions from "../../../services/api/Actions";
import {get, isEmpty, isNil} from "lodash";
import Normalizer from "../../../services/normalizer";
import {Edit, Trash} from 'react-feather';
import ApiService from "../ApiService";
import Loader from "../../../components/loader";
import {toast} from "react-toastify";
import Modal from "../../../components/modal";
import ContentLoader from "../../../components/loader/ContentLoader";
import RankScheme from "../../../schema/RankScheme";
import ItemCreateForm from "../components/item/ItemCreateForm";
import ItemUpdateForm from "../components/item/ItemUpdateForm";


const CriminalCaseContainer = ({
                            history,
                            getItemsList,
                            entities,
                            items,
                            getOneItem,
                            isFetched,
                            isFetchedItem,
                            item,
                            setTrigger,
                            totalItems,
                            setListTrigger
                        }) => {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [item_id, setItemId] = useState(null);
    const [filter, setFilter] = useState({page:0});
    items = Normalizer.Denormalize(items, [RankScheme], entities);
    item = Normalizer.Denormalize(item, RankScheme, entities);
    useEffect(() => {
        setListTrigger();
        getItemsList({...filter})
    }, [filter]);
    useEffect(() => {
        if (item_id) {
            setTrigger();
            getOneItem({item_id})
        }
    }, [item_id]);


    const create = (params) => {
        setLoading(true);
        ApiService.CreateCriminalCase(params).then((res) => {
            if (res && res.data) {
                setLoading(false);
                setShow(false);
                toast.success('SUCCESS');
                getItemsList({...filter});
            }
        }).catch((error) => {
            setLoading(false);
            setShow(false);
            if (error.response && error.response.data) {
                toast.error(`${error.response.data}`)
            }
        })
    }
    const update = (params) => {
        setLoading(true);
        ApiService.UpdateCriminalCase(item_id, params).then((res) => {
            if (res && res.data) {
                setLoading(false);
                setShow(false);
                toast.success('SUCCESS');
                getItemsList({...filter});
            }
        }).catch((error) => {
            setLoading(false);
            setShow(false);
            if (error.response && error.response.data) {
                toast.error(`${error.response.data}`)
            }
        })
    }
    const deleteItem = (id) => {
        confirmAlert({
            title: 'Ишончингиз комилми?',

            buttons: [
                {
                    label: 'Ўчириш',
                    onClick: () => {
                        setLoading(true);
                        ApiService.DeleteCrimnalCase(id).then((res) => {
                            if (res && res.data) {
                                setLoading(false);
                                toast.success('SUCCESS');
                                getItemsList({...filter});
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
                        {isNil(item_id) ? <ItemCreateForm create={create}/> :
                            <ItemUpdateForm isFetched={isFetchedItem} item={isFetchedItem && item}
                                            update={update}/>}
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
                    <Title>Criminal case рўйхати</Title>
                </Col>
                <Col xs={6} className={'text-right'}>
                    <Button success lg thin handleClick={() => {
                        setItemId(null);
                        setShow(true)
                    }}>Янги яратиш</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {isFetched ? <Table current={get(filter,'page',0)} paginate={({selected}) => setFilter(filter => ({...filter,page:selected}))} totalItems={totalItems} columns={['ID', 'Номи', 'Базага ёзилган сана', 'Actions']} >
                        {
                            !isEmpty(items) ? items.map((item, index) => <tr key={get(item, '_id')}>
                                <td>{index + 1}</td>
                                <td>{get(item, 'name', '-')}</td>
                                <td>{moment(get(item, 'createdAt', '-')).format("DD-MM-YYYY")}</td>
                                <td><Edit className={'mr-8 cursor-pointer'} color="#2BCC71" size={24} onClick={() => {
                                    setItemId(get(item, '_id'));
                                    setShow(true);
                                }
                                }/><Trash
                                    onClick={() => deleteItem(get(item, '_id'))} className={'cursor-pointer'}
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
        items: get(state, 'normalizer.data.item-list.result.data', []),
        item: get(state, 'normalizer.data.get-one-item.result.result', {}),
        isFetched: get(state, 'normalizer.data.item-list.isFetched', false),
        isFetchedItem: get(state, 'normalizer.data.get-one-item.isFetched', false),
        totalItems:get(state, 'normalizer.data.item-list.result.totalItems', 0),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getItemsList: ({page = 0, size = 20}) => {
            const storeName = 'item-list';
            const entityName = 'item';
            const scheme = {data: [RankScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/criminalcase',
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
        getOneItem: ({item_id}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/criminalcase/${item_id}`,
                config: {
                    params: {},
                },
                scheme: {result: RankScheme},
                storeName: 'get-one-item',
                entityName: 'item',
            },
        }),
        setTrigger: () => dispatch({
            type: ApiActions.GET_ONE.TRIGGER,
            payload: {
                scheme: {},
                storeName: 'get-one-item',
            },
        }),
        setListTrigger: () => dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                scheme: {},
                storeName: 'item-list',
            },
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CriminalCaseContainer));
