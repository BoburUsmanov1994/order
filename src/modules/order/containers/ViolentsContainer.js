import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-grid-system";
import moment from "moment";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {confirmAlert} from 'react-confirm-alert';
import Title from "../../../components/title";
import Button from "../../../components/button";
import {Table} from "../../../components/table";
import ApiActions from "../../../services/api/Actions";
import {get, isEmpty, isEqual} from "lodash";
import Normalizer from "../../../services/normalizer";
import {Edit, Eye, List, Trash} from 'react-feather';
import ApiService from "../ApiService";
import Loader from "../../../components/loader";
import {toast} from "react-toastify";
import ContentLoader from "../../../components/loader/ContentLoader";
import ViolentScheme from "../../../schema/ViolentScheme";
import config from "../../../config";
import HasAccess from "../../../services/auth/HasAccess";
import RegionScheme from "../../../schema/RegionScheme";
import DistrictScheme from "../../../schema/DistrictScheme";
import NeighborhoodScheme from "../../../schema/NeighborhoodScheme";
import CitizenshipScheme from "../../../schema/CitizenshipScheme";
import AgeScheme from "../../../schema/AgeScheme";
import EducationScheme from "../../../schema/EducationScheme";
import FamilyPositionScheme from "../../../schema/FamilyPositionScheme";
import SocialStatusScheme from "../../../schema/SocialStatusScheme";
import WorkingPlaceScheme from "../../../schema/WorkingPlaceScheme";
import PersonConditionScheme from "../../../schema/PersonConditionScheme";
import ActionPlaceScheme from "../../../schema/ActionPlaceScheme";
import TypeViolenceScheme from "../../../schema/TypeViolenceScheme";
import RestrictionTypeScheme from "../../../schema/RestrictionTypeScheme";
import Flex from "../../../components/flex/Flex";
import FormSelect from "../../../components/elements/form-select";
import {Controller} from "react-hook-form";
import Filter from "../../../components/filter";


const ViolentsContainer = ({
                               history,
                               user,
                               getViolentsList,
                               entities,
                               violents,
                               isFetched,
                               totalItems,
                               setListTrigger,
                               getRegionList,
                               getDistrictsList,
                               getNeighborhoodsListByDistrict,
                               regions,
                               districts,
                               neighborhoods,
                               typeviolence,
                               typerestrictions,
                               citizenship,
                               ages,
                               education,
                               familyPosition,
                               socialStatus,
                               workingplace,
                               personcondition,
                               actionplace,
                               getCitizenshipList,
                               getAgesList,
                               getEducationTypesList,
                               getFamilyPositionList,
                               getSocialStatusList,
                               getWorkingPlaceList,
                               getPersonConditionList,
                               getActionPlaceList,
                               getTypeViolenceList,
                               getRestrictionTypeList,
                               getViolentListByFilter
                           }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState({
        page: 0,
        regId: '',
        distId: '',
        agesId: '',
        citizensId: '',
        educationId: '',
        familypositionId: '',
        socialstatusId: '',
        conditionpersonId: '',
        placeectionId: '',
        workingplaceId: '',
        typeviolencesId: '',
        typerestrictionsId: ''
    });
    violents = Normalizer.Denormalize(violents, [ViolentScheme], entities);

    useEffect(() => {
        setListTrigger();
        getViolentsList({...filter})
    }, [get(filter, 'page')]);

    useEffect(() => {
        getRegionList({});
        getCitizenshipList({});
        getAgesList({});
        getEducationTypesList({});
        getFamilyPositionList({});
        getSocialStatusList({});
        getWorkingPlaceList({});
        getPersonConditionList({});
        getActionPlaceList({});
        getTypeViolenceList({});
        getRestrictionTypeList({});
    }, [])
    if (isEqual(get(user, 'accountrole.name'), config.ROLES.REGION_ADMIN)) {
        violents = violents.filter(item => isEqual(get(item, 'regId._id'), get(user, 'regionId._id')));
    }

    if (isEqual(get(user, 'accountrole.name'), config.ROLES.USER)) {
        violents = violents.filter(item => isEqual(get(item, 'destId._id'), get(user, 'districtsId._id')));
    }

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

    citizenship = Normalizer.Denormalize(citizenship, [CitizenshipScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));
    ages = Normalizer.Denormalize(ages, [AgeScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));
    education = Normalizer.Denormalize(education, [EducationScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));
    familyPosition = Normalizer.Denormalize(familyPosition, [FamilyPositionScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));
    socialStatus = Normalizer.Denormalize(socialStatus, [SocialStatusScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));
    workingplace = Normalizer.Denormalize(workingplace, [WorkingPlaceScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));
    personcondition = Normalizer.Denormalize(personcondition, [PersonConditionScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));
    actionplace = Normalizer.Denormalize(actionplace, [ActionPlaceScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));
    typeviolence = Normalizer.Denormalize(typeviolence, [TypeViolenceScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));

    typerestrictions = Normalizer.Denormalize(typerestrictions, [RestrictionTypeScheme], entities).map(({
                                                                                                            _id,
                                                                                                            name
                                                                                                        }) => ({
        value: _id,
        label: name
    }));

    const onSubmit = (data) => {
        getViolentListByFilter({...filter, ...data});
        setFilter(filter => ({...filter, ...data}));
        setOpen(false);
    }

    return (
        <>
            <Row className={'mb-24'}>
                <Col xs={12}>
                    <hr/>
                    <Filter open={open} setOpen={setOpen}>
                        {({register, handleSubmit, setValue, getValues, control}) => (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Row className={'mb-16'}>
                                    <Col xs={12}>
                                        <FormSelect defaultValue={get(filter, 'regiId')} options={regions}
                                                    setValue={setValue} Controller={Controller} control={control}
                                                    name={'regiId'} onChange={({value}) => setFilter(filter => ({
                                            ...filter,
                                            regId: value
                                        }))} placeholder={'Вилоятни танланг'}/>

                                    </Col>
                                </Row>
                                <Row className={'mb-16'}>
                                    <Col xs={12}>
                                        <FormSelect defaultValue={get(filter, 'distId')} options={districts}
                                                    setValue={setValue} Controller={Controller} control={control}
                                                    name={'distId'} onChange={({value}) => setFilter(filter => ({
                                            ...filter,
                                            distId: value
                                        }))} placeholder={'Туманни танланг'}/>

                                    </Col>
                                </Row>
                                <Row className={'mb-16'}>
                                    <Col xs={12}>
                                        <FormSelect defaultValue={get(filter, 'mfyId')} options={neighborhoods}
                                                    setValue={setValue} Controller={Controller} control={control}
                                                    name={'mfyId'} placeholder={'Маҳаллани танланг'}/>

                                    </Col>
                                </Row>
                                <Row className={'mb-16'}>
                                    <Col xs={12}>
                                        <FormSelect defaultValue={get(filter, 'agesId')}
                                                    options={ages}
                                                    setValue={setValue} Controller={Controller} control={control}
                                                    name={'agesId'} placeholder={'Ëши'}/>

                                    </Col>
                                </Row>
                                <Row className={'mb-16'}>
                                    <Col xs={12}>
                                        <FormSelect defaultValue={get(filter, 'citizensId')}
                                                    options={citizenship}
                                                    setValue={setValue} Controller={Controller} control={control}
                                                    name={'citizensId'} placeholder={'Фуқаролиги'}/>

                                    </Col>
                                </Row>
                                <Row className={'mb-16'}>
                                    <Col xs={12}>
                                        <FormSelect defaultValue={get(filter, 'educationId')}
                                                    options={education}
                                                    setValue={setValue} Controller={Controller} control={control}
                                                    name={'educationId'}
                                                    placeholder={'Маълумоти'}/>

                                    </Col>
                                </Row>
                                <Row className={'mb-16'}>
                                    <Col xs={12}>
                                        <FormSelect defaultValue={get(filter, 'familypositionId')}
                                                    options={familyPosition}
                                                    setValue={setValue} Controller={Controller} control={control}
                                                    name={'familypositionId'} placeholder={'Оилавий аҳволи'}/>

                                    </Col>
                                </Row>
                                <Row className={'mb-16'}>
                                    <Col xs={12}>
                                        <FormSelect defaultValue={get(filter, 'socialstatusId')}
                                                    options={socialStatus}
                                                    setValue={setValue} Controller={Controller} control={control}
                                                    name={'socialstatusId'} placeholder={'Ижтимоий аҳволи'}/>

                                    </Col>
                                </Row>
                                <Row className={'mb-16'}>
                                    <Col xs={12}>
                                        <FormSelect defaultValue={get(filter, 'conditionpersonId')}
                                                    options={personcondition}
                                                    setValue={setValue} Controller={Controller} control={control}
                                                    name={'conditionpersonId'} placeholder={'Шахснинг ҳолати бўйича'}/>

                                    </Col>
                                </Row>
                                <Row className={'mb-16'}>
                                    <Col xs={12}>
                                        <FormSelect defaultValue={get(filter, 'placeectionId')}
                                                    options={actionplace}
                                                    setValue={setValue} Controller={Controller} control={control}
                                                    name={'placeectionId'} placeholder={'Содир этилган жойи'}/>

                                    </Col>
                                </Row>
                                <Row className={'mb-16'}>
                                    <Col xs={12}>
                                        <FormSelect defaultValue={get(filter, 'workingplaceId')}
                                                    options={workingplace}
                                                    setValue={setValue} Controller={Controller} control={control}
                                                    name={'workingplaceId'} placeholder={'Шахснинг бандлиги'}/>

                                    </Col>
                                </Row>
                                <Row className={'mb-16'}>
                                    <Col xs={12}>
                                        <FormSelect defaultValue={get(filter, 'typeviolencesId')}
                                                    options={typeviolence}
                                                    setValue={setValue} Controller={Controller} control={control}
                                                    name={'typeviolencesId'}
                                                    placeholder={'Тазйиқ ва зўравонлик турлари'}/>

                                    </Col>
                                </Row>
                                <Row className={'mb-16'}>
                                    <Col xs={12}>
                                        <FormSelect defaultValue={get(filter, 'typerestrictionsId')}
                                                    options={typerestrictions}
                                                    setValue={setValue} Controller={Controller} control={control}
                                                    name={'typerestrictionsId'}
                                                    placeholder={'Тазйиқ ўтказган ёки зўравонлик содир этган этишга белгиланган чекловлар'}/>

                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={12} className={'text-center mt-16'}>
                                        <Button type={'submit'} success>Саралаш</Button>
                                    </Col>
                                </Row>
                            </form>)}
                    </Filter>
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
                    <Flex align={'center'} justify={'flex-end'}>
                        <List size={32} color={'#21D59B'} className={'mr-16 cursor-pointer'}
                              onClick={() => setOpen(true)}/>
                        <Button success lg thin handleClick={() => history.push('/order/list')}>Янги яратиш</Button>
                        </Flex>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {isFetched ? <Table current={get(filter,'page',0)} paginate={({selected}) => setFilter(filter => ({...filter,page:selected}))} totalItems={totalItems} columns={['ID', 'Ф.И.Ш','Туғилган санаси','Пасспорт','ПИНФЛ','Шахснинг бандлиги','Вилоят/Туман/Маҳалла','Яратилган вақти','Actions']} >
                        {
                            !isEmpty(violents) ? violents && violents.map((violent, index) => <tr key={get(violent, '_id')}>
                                <td>{index + 1}</td>
                                <td>{`${get(violent, 'citizensId.name', '-')} ${get(violent, 'citizensId.secondname', '-')} ${get(violent, 'citizensId.middlename', '-')}`}</td>
                                <td>{moment.unix(get(violent, 'citizensId.dateofbirthday', '-')/1000).format("DD-MM-YYYY")}</td>
                                <td>{get(violent, 'citizensId.passportinfo', '-')}</td>
                                <td>{get(violent, 'citizensId.identitynumber', '-')}</td>
                                <td>{get(violent, 'conditionpersonId.name', '-')}</td>
                                <td>{`${get(violent, 'regId.name', '-')}/${get(violent, 'destId.name', '-')}/${get(violent, 'mahallaId.name', '-')}`}</td>
                                <td>{moment(get(violent, 'createdAt', '-')).format("DD-MM-YYYY")}</td>
                                <td>
                                    <Eye className={'mr-8 cursor-pointer'} color="#FFC700" size={24} onClick={() => history.push(`/violent/view/${get(violent,'_id')}`)} />
                                    <Edit className={'mr-8 cursor-pointer'} color="#2BCC71" size={24} />
                                    <HasAccess>
                                        {
                                            ({userCan}) =>userCan([config.ROLES.ADMIN]) &&  <Trash
                                                onClick={() => deleteViolent(get(violent, '_id'))} className={'cursor-pointer'}
                                                color="#E3111A" size={24}/>
                                        }
                                    </HasAccess>
                                    </td>
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
        totalItems: get(state, 'normalizer.data.violent-list.result.totalItems', 0),
        user: get(state, 'auth.user', {}),
        regions: get(state, 'normalizer.data.region-list.result.region', []),
        districts: get(state, 'normalizer.data.district-list.result.districts', []),
        neighborhoods: get(state, 'normalizer.data.neighborhoods-list.result.mfy', []),
        typeviolence: get(state, 'normalizer.data.type-violence-list.result.data', []),
        typerestrictions: get(state, 'normalizer.data.restriction-type-list.result.data', []),
        citizenship: get(state, 'normalizer.data.citizenship-list.result.Agess', []),
        ages: get(state, 'normalizer.data.ages-list.result.Agess', []),
        education: get(state, 'normalizer.data.education-types.result.data', []),
        familyPosition: get(state, 'normalizer.data.family-position-list.result.data', []),
        socialStatus: get(state, 'normalizer.data.social-status-list.result.data', []),
        workingplace: get(state, 'normalizer.data.working-place-list.result.data', []),
        personcondition: get(state, 'normalizer.data.person-condition-list.result.Agess', []),
        actionplace: get(state, 'normalizer.data.action-place-list.result.data', []),
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
                            page: page + 1,
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getViolentListByFilter: ({
                                     page = 0, size = 20,
                                     regId = '',
                                     distId = '',
                                     agesId = '',
                                     citizensId = '',
                                     educationId = '',
                                     familypositionId = '',
                                     socialstatusId = '',
                                     conditionpersonId = '',
                                     placeectionId = '',
                                     workingplaceId = '',
                                     typeviolencesId = '',
                                     typerestrictionsId = ''
                                 }) => {
            const storeName = 'violent-list';
            const entityName = 'violent';
            const scheme = {data: [ViolentScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/violent/violent/filter',
                    config: {
                        params: {
                            page: page + 1,
                            regId,
                            distId,
                            agesId,
                            citizensId,
                            educationId,
                            familypositionId,
                            socialstatusId,
                            conditionpersonId,
                            placeectionId,
                            workingplaceId,
                            typeviolencesId,
                            typerestrictionsId
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
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
        getDistrictsList: ({regId, page = 1}) => {
            const storeName = 'district-list';
            const entityName = 'district';
            const scheme = {districts: [DistrictScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/districts/reg/${regId}`,
                    config: {
                        params: {},
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
        getCitizenshipList: ({page = 1}) => {
            const storeName = 'citizenship-list';
            const entityName = 'citizenship';
            const scheme = {Agess: [CitizenshipScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/citizenship`,
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

        getAgesList: ({page = 1}) => {
            const storeName = 'ages-list';
            const entityName = 'age';
            const scheme = {Agess: [AgeScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/ages`,
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

        getEducationTypesList: ({page = 1}) => {
            const storeName = 'education-types';
            const entityName = 'education';
            const scheme = {data: [EducationScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/education`,
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

        getFamilyPositionList: ({page = 1}) => {
            const storeName = 'family-position-list';
            const entityName = 'family-position';
            const scheme = {data: [FamilyPositionScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/familyposition`,
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

        getSocialStatusList: ({page = 1}) => {
            const storeName = 'social-status-list';
            const entityName = 'social-status';
            const scheme = {data: [SocialStatusScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/socialstatus`,
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

        getWorkingPlaceList: ({page = 1}) => {
            const storeName = 'working-place-list';
            const entityName = 'working-place';
            const scheme = {data: [WorkingPlaceScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/workingplace`,
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

        getPersonConditionList: ({page = 1}) => {
            const storeName = 'person-condition-list';
            const entityName = 'person-condition';
            const scheme = {Agess: [PersonConditionScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/conditionperson`,
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

        getActionPlaceList: ({page = 1}) => {
            const storeName = 'action-place-list';
            const entityName = 'action-place';
            const scheme = {data: [ActionPlaceScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/placeection`,
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
        getTypeViolenceList: ({page = 1}) => {
            const storeName = 'type-violence-list';
            const entityName = 'type-violence';
            const scheme = {data: [TypeViolenceScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/typeviolence`,
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
        getRestrictionTypeList: ({page = 1}) => {
            const storeName = 'restriction-type-list';
            const entityName = 'restriction-type';
            const scheme = {data: [RestrictionTypeScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/restrictionoftype`,
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
