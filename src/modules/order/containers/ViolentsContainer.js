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
import ViolentScheme from "../../../schema/ViolentScheme";


const ViolentsContainer = ({
                              history,
                               getViolentsList,
                              entities,
                               violents,
                              isFetched,
                              totalItems,
                              setListTrigger
                          }) => {
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({page:0});
    violents = Normalizer.Denormalize(violents, [ViolentScheme], entities);

    useEffect(() => {
        setListTrigger();
        getViolentsList({...filter})
    }, [filter]);



    const deleteViolent = (id) => {
        confirmAlert({
            title: 'Ишончингиз комилми?',
            buttons: [
                {
                    label: 'Ўчириш',
                    onClick: () => {
                        setLoading(true);
                        ApiService.DeleteViolent(id).then((res) => {
                            if (res && res.data) {
                                setLoading(false);
                                toast.success('SUCCESS');
                                getViolentsList({...filter});
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
                    <Title>Зўравонлар рўйхати</Title>
                </Col>
                <Col xs={6} className={'text-right'}>
                    <Button success lg thin handleClick={() => history.push('/order/list')}>Янги яратиш</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {isFetched ? <Table current={get(filter,'page',0)} paginate={({selected}) => setFilter(filter => ({...filter,page:selected}))} totalItems={totalItems} columns={['ID', 'Name', 'Lastname', 'Middlename','Birthday date','Passport','INPS','Position','Region','District','Neighborhood','Created at','Actions']} >
                        {
                            !isEmpty(violents) ? violents && violents.map((violent, index) => <tr key={get(violent, '_id')}>
                                <td>{index + 1}</td>
                                <td>{get(violent, 'citizensId.name', '-')}</td>
                                <td>{get(violent, 'citizensId.secondname', '-')}</td>
                                <td>{get(violent, 'citizensId.middlename', '-')}</td>
                                <td>{moment.unix(get(violent, 'citizensId.dateofbirthday', '-')).format("DD-MM-YYYY")}</td>
                                <td>{get(violent, 'citizensId.passportinfo', '-')}</td>
                                <td>{get(violent, 'citizensId.identitynumber', '-')}</td>
                                <td>{get(violent, 'conditionpersonId.name', '-')}</td>
                                <td>{get(violent, 'regId.name', '-')}</td>
                                <td>{get(violent, 'destId.name', '-')}</td>
                                <td>{get(violent, 'mahallaId.name', '-')}</td>
                                <td>{moment(get(violent, 'createdAt', '-')).format("DD-MM-YYYY")}</td>
                                <td>
                                    <Eye className={'mr-8 cursor-pointer'} color="#FFC700" size={24} />
                                    <Edit className={'mr-8 cursor-pointer'} color="#2BCC71" size={24} />
                                    <Trash
                                        onClick={() => deleteViolent(get(violent, '_id'))} className={'cursor-pointer'}
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
        violents: get(state, 'normalizer.data.violent-list.result.data', []),
        isFetched: get(state, 'normalizer.data.violent-list.isFetched', false),
        totalItems:get(state, 'normalizer.data.violent-list.result.totalItems', 0),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getViolentsList: ({page = 0, size = 20}) => {
            const storeName = 'violent-list';
            const entityName = 'violent';
            const scheme = {data: [ViolentScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/violent',
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
                storeName: 'violent-list',
            },
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViolentsContainer));
