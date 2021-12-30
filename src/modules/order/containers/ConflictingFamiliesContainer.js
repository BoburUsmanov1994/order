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
import {get, isEmpty, isEqual} from "lodash";
import Normalizer from "../../../services/normalizer";
import {Edit, Eye, Trash} from 'react-feather';
import ApiService from "../ApiService";
import Loader from "../../../components/loader";
import {toast} from "react-toastify";
import ContentLoader from "../../../components/loader/ContentLoader";
import UserScheme from "../../../schema/UserScheme";
import config from "../../../config";
import HasAccess from "../../../services/auth/HasAccess";
import ConflictingFamilies from "../../../schema/ConflictingFamilies";


const ConflictingFamiliesContainer = ({
                                          history,
                                          user,
                                          getConflictingFamiliesList,
                                          entities,
                                          conflictingFamilies,
                                          isFetched,
                                          totalItems,
                                          setListTrigger,
                                      }) => {
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({page: 0, regId: '', distId: ''});


    useEffect(() => {
        setListTrigger();
        if (isEqual(get(user, 'accountrole.name'), config.ROLES.REGION_ADMIN)) {
            getConflictingFamiliesList({...filter, regId: get(user, 'regionId._id')});
        } else {
            getConflictingFamiliesList({...filter});
        }
    }, [filter]);

    conflictingFamilies = Normalizer.Denormalize(conflictingFamilies, [ConflictingFamilies], entities);

    const deleteUser = (id) => {
        confirmAlert({
            title: 'Ишончингиз комилми?',
            buttons: [
                {
                    label: 'Ўчириш',
                    onClick: () => {
                        setLoading(true);
                        ApiService.DeleteFamilyConflicting(id).then((res) => {
                            if (res && res.data) {
                                setLoading(false);
                                toast.success('SUCCESS');
                                getConflictingFamiliesList({...filter});
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
                    <hr/>
                </Col>
                <Col xs={12}>
                    {loading && <Loader/>}
                </Col>
            </Row>
            <Row className={'mb-24'} align={'center'}>
                <Col xs={6}>
                    <Title>Низоли оилаларнинг рўйхати</Title>
                </Col>
                <Col xs={6} className={'text-right'}>
                    <Button success lg thin handleClick={() => history.push('/conflicting-families/create')}>Янги яратиш</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {isFetched ? <Table current={get(filter, 'page', 0)}
                                        paginate={({selected}) => setFilter(filter => ({...filter, page: selected}))}
                                        totalItems={totalItems}
                                        columns={['ID', 'Давогар', 'Давогар манзили', 'Жавобгар', 'Жавобгар манзили', 'Иш туркуми','Натижа','Зиддият тури', 'Яратилган вақти', 'Actions']}>
                        {
                            !isEmpty(conflictingFamilies) ? conflictingFamilies && conflictingFamilies.map((item, index) => <tr key={get(item, '_id')}>
                                <td>{(index + 1) + get(filter, 'page', 0) * 20}</td>
                                <td>{`${get(item, 'davsecondname', '-')} ${get(item, 'davname', '-')} ${get(item, 'davmiddelname', '-')}`}</td>
                                <td>{`${get(item, 'davregId.name', '-')} ${get(item, 'davdistrictId.name', '-')} ${get(item, 'davmfyId.name', '-')} ${get(item, 'davaddress', '-')}`}</td>
                                <td>{`${get(item, 'javsecondname', '-')} ${get(item, 'javname', '-')} ${get(item, 'javmiddelname', '-')}`}</td>
                                <td>{`${get(item, 'javregId.name', '-')} ${get(item, 'javdistrictId.name', '-')} ${get(item, 'javmfyId.name', '-')} ${get(item, 'javaddress', '-')}`}</td>
                                <td>{`${get(item, 'typeofproblems.name', '-')} `}</td>
                                <td>{get(item, 'resultofconflicts.name', '-')}</td>
                                <td>{get(item, 'typeofconflect', '-')}</td>
                                <td>{moment(get(item, 'createdAt', '-')).format("DD-MM-YYYY")}</td>
                                <td>
                                    {/*<Eye className={'mr-8 cursor-pointer d-none'} color="#FFC700" size={24}*/}
                                    {/*     onClick={() => history.push(`/user/view/${get(item, '_id')}`)}/>*/}
                                    {/*<Edit className={'mr-8 cursor-pointer'} color="#2BCC71" size={24}*/}
                                    {/*      onClick={() => history.push(`/user/update/${get(item, '_id')}`)}/>*/}
                                    <HasAccess>
                                        {
                                            ({userCan}) => userCan(config.ROLES.ADMIN) && <Trash
                                                onClick={() => deleteUser(get(item, '_id'))}
                                                className={'cursor-pointer'}
                                                color="#E3111A" size={24}/>
                                        }
                                    </HasAccess>
                                </td>
                            </tr>) : <tr>
                                <td colSpan={8}>Маълумот мавжуд эмас</td>
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
        conflictingFamilies: get(state, 'normalizer.data.conflicting-families-list.result.accounts', []),
        isFetched: get(state, 'normalizer.data.conflicting-families-list.isFetched', false),
        totalItems: get(state, 'normalizer.data.conflicting-families-list.result.totalItems', 0),
        user: get(state, 'auth.user', {})
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getConflictingFamiliesList: ({page = 0, size = 20}) => {
            const storeName = 'conflicting-families-list';
            const entityName = 'conflicting-families';
            const scheme = {accounts: [ConflictingFamilies]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/conflictingfamilies',
                    config: {
                        params: {
                            page: page + 1,
                        },
                        header: {}
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
                storeName: 'conflicting-families-list',
            },
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConflictingFamiliesContainer));
