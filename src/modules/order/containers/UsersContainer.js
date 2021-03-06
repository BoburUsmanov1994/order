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
import {get, isEmpty,isEqual} from "lodash";
import Normalizer from "../../../services/normalizer";
import {Edit, Eye, Trash} from 'react-feather';
import ApiService from "../ApiService";
import Loader from "../../../components/loader";
import {toast} from "react-toastify";
import ContentLoader from "../../../components/loader/ContentLoader";
import UserScheme from "../../../schema/UserScheme";
import config from "../../../config";
import HasAccess from "../../../services/auth/HasAccess";


const UsersContainer = ({
                              history,
                              user,
                              getUsersList,
                              entities,
                              users,
                              isFetched,
                              totalItems,
                              setListTrigger,
                              getUsersListByFilter
                          }) => {
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({page:0,regId:'',distId:''});


    useEffect(() => {
        setListTrigger();
        if(isEqual(get(user,'accountrole.name'),config.ROLES.REGION_ADMIN)) {
            getUsersListByFilter({...filter,regId: get(user, 'regionId._id')});
        }else{
            getUsersListByFilter({...filter});
        }
    }, [filter]);

    users = Normalizer.Denormalize(users, [UserScheme], entities);

    const deleteUser = (id) => {
        confirmAlert({
            title: 'Ишончингиз комилми?',
            buttons: [
                {
                    label: 'Ўчириш',
                    onClick: () => {
                        setLoading(true);
                        ApiService.DeleteUser(id).then((res) => {
                            if (res && res.data) {
                                setLoading(false);
                                toast.success('SUCCESS');
                                getUsersList({...filter});
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
                    <Title>Фойдаланувчилар рўйхати</Title>
                </Col>
                <Col xs={6} className={'text-right'}>
                    <Button success lg thin handleClick={() => history.push('user/create')}>Янги яратиш</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {isFetched ? <Table current={get(filter,'page',0)} paginate={({selected}) => setFilter(filter => ({...filter,page:selected}))} totalItems={totalItems} columns={['ID', 'Ф.И.Ш','Шахснинг бандлиги','Вилоят/Туман','Фойдалаувчи статуси','Фойдалаувчи роли','Яратилган вақти','Actions']} >
                        {
                            !isEmpty(users) ? users && users.map((user, index) => <tr key={get(user, '_id')}>
                                <td>{(index+1)+get(filter, 'page', 0)*20}</td>
                                <td>{`${get(user, 'name', '-')} ${get(user, 'secondname', '-')} ${get(user, 'middlename', '-')}`}</td>
                                <td>{get(user, 'position', '-')}</td>
                                <td>{`${get(user, 'regionId.name', '-')} ${get(user, 'districtsId.name', '-')}`}</td>
                                <td>{get(user, 'accountstatus.name', '-')}</td>
                                <td>{get(user, 'accountrole.name', '-')}</td>
                                <td>{moment(get(user, 'createdAt', '-')).format("DD-MM-YYYY")}</td>
                                <td>
                                    <Eye className={'mr-8 cursor-pointer'} color="#FFC700" size={24} onClick={() => history.push(`/user/view/${get(user, '_id')}`)}/>
                                    <Edit className={'mr-8 cursor-pointer'} color="#2BCC71" size={24} onClick={() => history.push(`/user/update/${get(user, '_id')}`)}/>
                                    <HasAccess>
                                        {
                                            ({userCan}) =>userCan(config.ROLES.ADMIN) && <Trash
                                                onClick={() => deleteUser(get(user, '_id'))} className={'cursor-pointer'}
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
        users: get(state, 'normalizer.data.users-list.result.users', []),
        isFetched: get(state, 'normalizer.data.users-list.isFetched', false),
        totalItems:get(state, 'normalizer.data.users-list.result.totalItems', 0),
        user: get(state, 'auth.user', {})
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUsersList: ({page = 0, size = 20}) => {
            const storeName = 'users-list';
            const entityName = 'user';
            const scheme = {users: [UserScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/user',
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
        getUsersListByFilter: ({page = 0, size = 20,regId='',distId='',mfyId=''}) => {
            const storeName = 'users-list';
            const entityName = 'user';
            const scheme = {users: [UserScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/user/list/filter',
                    config: {
                        params: {
                            page:page+1,
                        },
                        headers: {
                            'regId': `${regId}`,
                            'distId': `${distId}`,
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
                storeName: 'users-list',
            },
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UsersContainer));
