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
import {Edit, Trash,Eye} from 'react-feather';
import ApiService from "../ApiService";
import Loader from "../../../components/loader";
import {toast} from "react-toastify";
import ContentLoader from "../../../components/loader/ContentLoader";
import VictimScheme from "../../../schema/VictimScheme";


const VictimsContainer = ({
                              history,
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
                    {isFetched ? <Table current={get(filter,'page',0)} paginate={({selected}) => setFilter(filter => ({...filter,page:selected}))} totalItems={totalItems} columns={['ID', 'Name', 'Lastname', 'Middlename','Birthday date','Passport','INPS','Position','Region','District','Neighborhood','Created at','Actions']} >
                        {
                            !isEmpty(victims) ? victims && victims.map((victim, index) => <tr key={get(victim, '_id')}>
                                <td>{index + 1}</td>
                                <td>{get(victim, 'citizensId.name', '-')}</td>
                                <td>{get(victim, 'citizensId.secondname', '-')}</td>
                                <td>{get(victim, 'citizensId.middlename', '-')}</td>
                                <td>{moment.unix(get(victim, 'citizensId.dateofbirthday', '-')).format("DD-MM-YYYY")}</td>
                                <td>{get(victim, 'citizensId.passportinfo', '-')}</td>
                                <td>{get(victim, 'citizensId.identitynumber', '-')}</td>
                                <td>{get(victim, 'conditionpersonId.name', '-')}</td>
                                <td>{get(victim, 'regId.name', '-')}</td>
                                <td>{get(victim, 'destId.name', '-')}</td>
                                <td>{get(victim, 'mahallaId.name', '-')}</td>
                                <td>{moment(get(victim, 'createdAt', '-')).format("DD-MM-YYYY")}</td>
                                <td>
                                    <Eye className={'mr-8 cursor-pointer'} color="#FFC700" size={24} />
                                    <Edit className={'mr-8 cursor-pointer'} color="#2BCC71" size={24} onClick={() => history.push(`/victim/update/${get(victim,'_id')}`)} />
                                    <Trash
                                        onClick={() => deleteVictim(get(victim, '_id'))} className={'cursor-pointer'}
                                        color="#E3111A" size={24}/></td>
                            </tr>) : <tr>
                                <td colSpan={12}>Маълумот мавжуд эмас</td>
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