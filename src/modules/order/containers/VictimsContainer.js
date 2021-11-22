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
import VictimScheme from "../../../schema/VictimScheme";
import config from "../../../config";
import HasAccess from "../../../services/auth/HasAccess";


const VictimsContainer = ({
                              history,
                              user,
                              getVictimsList,
                              entities,
                              victims,
                              isFetched,
                              totalItems,
                              setListTrigger
                          }) => {
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({page:0});
    victims = Normalizer.Denormalize(victims, [VictimScheme], entities);

    useEffect(() => {
        setListTrigger();
        getVictimsList({...filter})
    }, [filter]);

    if(isEqual(get(user,'accountrole.name'),config.ROLES.REGION_ADMIN)){
        victims = victims.filter(item => isEqual(get(item,'regId._id'),get(user,'regionId._id')));
    }

    if(isEqual(get(user,'accountrole.name'),config.ROLES.USER)){
        victims = victims.filter(item => isEqual(get(item,'destId._id'),get(user,'districtsId._id')));
    }

    const deleteVictim = (id) => {
        confirmAlert({
            title: 'Ишончингиз комилми?',
            buttons: [
                {
                    label: 'Ўчириш',
                    onClick: () => {
                        setLoading(true);
                        ApiService.DeleteVictim(id).then((res) => {
                            if (res && res.data) {
                                setLoading(false);
                                toast.success('SUCCESS');
                                getVictimsList({...filter});
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
                    <Title>Жабрланувчилар рўйхати</Title>
                </Col>
                <Col xs={6} className={'text-right'}>
                    <Button success lg thin handleClick={() => history.push('/order/list')}>Янги яратиш</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {isFetched ? <Table current={get(filter,'page',0)} paginate={({selected}) => setFilter(filter => ({...filter,page:selected}))} totalItems={totalItems} columns={['ID', 'Ф.И.Ш','Туғилган санаси','Пасспорт','ПИНФЛ','Шахснинг бандлиги','Вилоят/Туман/Маҳалла','Яратилган вақти','Actions']} >
                        {
                            !isEmpty(victims) ? victims && victims.map((victim, index) => <tr key={get(victim, '_id')}>
                                <td>{index + 1}</td>
                                <td>{`${get(victim, 'citizensId.name', '-')} ${get(victim, 'citizensId.secondname', '-')} ${get(victim, 'citizensId.middlename', '-')}`}</td>
                                <td>{moment.unix(get(victim, 'citizensId.dateofbirthday', '-')/1000).format("DD-MM-YYYY")}</td>
                                <td>{get(victim, 'citizensId.passportinfo', '-')}</td>
                                <td>{get(victim, 'citizensId.identitynumber', '-')}</td>
                                <td>{get(victim, 'conditionpersonId.name', '-')}</td>
                                <td>{`${get(victim, 'regId.name', '-')}/${get(victim, 'destId.name', '-')}/${get(victim, 'mahallaId.name', '-')}`}</td>
                                <td>{moment(get(victim, 'createdAt', '-')).format("DD-MM-YYYY")}</td>
                                <td>
                                    <Eye className={'mr-8 cursor-pointer'} onClick={() => history.push(`/victim/view/${get(victim, '_id')}`)} color="#FFC700" size={24} />
                                    <Edit className={'mr-8 cursor-pointer'} color="#2BCC71" size={24} onClick={() => history.push(`/victim/update/${get(victim,'_id')}`)} />
                                    <HasAccess>
                                        {({userCan}) => userCan([config.ROLES.ADMIN]) && <Trash
                                            onClick={() => deleteVictim(get(victim, '_id'))} className={'cursor-pointer'}
                                            color="#E3111A" size={24}/>}
                                    </HasAccess>
                                    </td>
                            </tr>) : <tr>
                                <td colSpan={9}>Маълумот мавжуд эмас</td>
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
        victims: get(state, 'normalizer.data.victim-list.result.data', []),
        isFetched: get(state, 'normalizer.data.victim-list.isFetched', false),
        totalItems:get(state, 'normalizer.data.victim-list.result.totalItems', 0),
        user: get(state, 'auth.user', {})
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getVictimsList: ({page = 0, size = 20}) => {
            const storeName = 'victim-list';
            const entityName = 'victim';
            const scheme = {data: [VictimScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/victim',
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
        setListTrigger: () => dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                scheme: {},
                storeName: 'victim-list',
            },
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VictimsContainer));
