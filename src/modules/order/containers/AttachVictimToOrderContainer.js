import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-grid-system";
import StepWizard from "react-step-wizard";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Line from "../../../components/line";
import StepOneForm from "../components/step/StepOneForm";
import StepTwoForm from "../components/step/StepTwoForm";
import ApiActions from "../../../services/api/Actions";
import {get, isEqual} from "lodash";
import GenderScheme from "../../../schema/GenderScheme";
import Normalizer from "../../../services/normalizer";
import CitizenshipScheme from "../../../schema/CitizenshipScheme";
import AgeScheme from "../../../schema/AgeScheme";
import storage from "../../../services/local-storage";
import EducationScheme from "../../../schema/EducationScheme";
import FamilyPositionScheme from "../../../schema/FamilyPositionScheme";
import SocialStatusScheme from "../../../schema/SocialStatusScheme";
import WorkingPlaceScheme from "../../../schema/WorkingPlaceScheme";
import PersonConditionScheme from "../../../schema/PersonConditionScheme";
import ActionPlaceScheme from "../../../schema/ActionPlaceScheme";
import StepThreeForm from "../components/step/StepThreeForm";
import RegionScheme from "../../../schema/RegionScheme";
import DistrictScheme from "../../../schema/DistrictScheme";
import NeighborhoodScheme from "../../../schema/NeighborhoodScheme";
import StepFourForm from "../components/step/StepFourForm";
import TypeViolenceScheme from "../../../schema/TypeViolenceScheme";
import RestrictionTypeScheme from "../../../schema/RestrictionTypeScheme";
import GuardianScheme from "../../../schema/GuardianScheme";
import SendPreparationScheme from "../../../schema/SendPreparationScheme";
import OccuredRepetitionScheme from "../../../schema/OccuredRepetitionScheme";
import ApiService from "../ApiService";
import {toast} from "react-toastify";
import Loader from "../../../components/loader";
import moment from "moment";


const AttachVictimToOrderContainer = ({id,
                                          history,
                                          getGendersList,
                                          entities,
                                          genders,
                                          getCitizenshipList,
                                          citizenship,
                                          getAgesList,
                                          ages,
                                          getEducationTypesList,
                                          education,
                                          getFamilyPositionList,
                                          familyPosition,
                                          getSocialStatusList,
                                          socialStatus,
                                          getWorkingPlaceList,
                                          workingplace,
                                          getPersonConditionList,
                                          personcondition,
                                          getActionPlaceList,
                                          actionplace,
                                          regions,
                                          districts,
                                          getRegionList,
                                          getDistrictsListByRegion,
                                          getNeighborhoodsListByDistrict,
                                          neighborhoods,
                                          getPermanentDistrictsListByRegion,
                                          getPermanentNeighborhoodsListByDistrict,
                                          permanentdistricts,
                                          permanentsneighborhoods,
                                          getTypeViolenceList,
                                          getRestrictionTypeList,
                                          getGuardianshipList,
                                          typeviolence,
                                          typerestrictions,
                                          getSendPreparationList,
                                          sendpreparationlist,
                                          guardianshipList,
                                          getOccuredRepititionList,
                                          occuredRepetitionList

                                      }) => {
    const [victim, setVictim] = useState(JSON.parse(storage.get('victim')));
    const [mvdData, setMvdData] = useState({
        birthday: '',
        name: '',
        surname: '',
        patronym: '',
        genderId: '',
        inps: '',
        place: '',
        status: false
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getGendersList({});
        getCitizenshipList({});
        getAgesList({});
        getEducationTypesList({});
        getFamilyPositionList({});
        getSocialStatusList({});
        getWorkingPlaceList({});
        getPersonConditionList({});
        getActionPlaceList({});
        getRegionList({});
        getTypeViolenceList({});
        getRestrictionTypeList({});
        getGuardianshipList({});
        getSendPreparationList({});
        getOccuredRepititionList({});
    }, []);

    genders = Normalizer.Denormalize(genders, [GenderScheme], entities).map(({_id, name}) => ({
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
    regions = Normalizer.Denormalize(regions, [RegionScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));
    districts = Normalizer.Denormalize(districts, [DistrictScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));
    permanentdistricts = Normalizer.Denormalize(permanentdistricts, [DistrictScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));
    neighborhoods = Normalizer.Denormalize(neighborhoods, [NeighborhoodScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));
    permanentsneighborhoods = Normalizer.Denormalize(permanentsneighborhoods, [NeighborhoodScheme], entities).map(({
                                                                                                                       _id,
                                                                                                                       name
                                                                                                                   }) => ({
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

    guardianshipList = Normalizer.Denormalize(guardianshipList, [GuardianScheme], entities).map(({
                                                                                                            _id,
                                                                                                            name
                                                                                                        }) => ({
        value: _id,
        label: name
    }));

    sendpreparationlist = Normalizer.Denormalize(sendpreparationlist, [SendPreparationScheme], entities).map(({
                                                                                                                  _id,
                                                                                                                  name
                                                                                                              }) => ({
        value: _id,
        label: name
    }));
    occuredRepetitionList = Normalizer.Denormalize(occuredRepetitionList, [OccuredRepetitionScheme], entities).map(({
                                                                                                                    _id,
                                                                                                                    name
                                                                                                                }) => ({
        value: _id,
        label: name
    }));
    const saveToLocalStorage = (data) => {
        const victimData = {...victim, ...data};
        setVictim(victimData);
        storage.set('victim', JSON.stringify(victimData));
    }
    const create = (data) => {
        setLoading(true);
        const victimData = {...victim, ...data};
        ApiService.CreateVictim(id,{...victimData}).then((res) => {
            if (res && res.data) {
                storage.remove('victim')
                setLoading(false);
                toast.success('SUCCESS');
                history.push('/victim/list')
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
    const reset = async ({firstStep}) => {
        await setVictim({});
        await firstStep();
        await storage.remove('victim');
    }

    const getDistrictsByRegion = (regId) => {
        getDistrictsListByRegion({regId});
    }
    const getNeighborhoodsByDistrict = (districtId) => {
        getNeighborhoodsListByDistrict({districtId})
    }

    const getPermanentDistrictsByRegion = (regId) => {
        getPermanentDistrictsListByRegion({regId});
    }
    const getPermanentNeighborhoodsByDistrict = (districtId) => {
        getPermanentNeighborhoodsListByDistrict({districtId})
    }

    const getDataFromMvd = (passport, brth) => {
        brth = moment(brth).format('DD.MM.YYYY');
        if (brth.length == 10) {
            ApiService.MvdData({passport, brth}).then((res) => {
                if (res && res.data) {
                    if (isEqual(get(res.data, 'AnsweredId'), 1)) {
                        toast.success(get(res.data,'AnswereMessage','SUCCESS'));
                        setMvdData(mvdData => ({
                                ...mvdData,
                                birthday: get(res.data, 'Data.Person.DateBirth'),
                                name: get(res.data, 'Data.Person.NameLatin'),
                                surname: get(res.data, 'Data.Person.SurnameLatin'),
                                patronym: get(res.data, 'Data.Person.PatronymLatin'),
                                inps: get(res.data, 'Data.Person.Pinpp'),
                                genderId: get(res.data, 'Data.Person.Sex.Id'),
                                place: get(res.data, 'Data.Person.BirthPlace'),
                                status: true
                            }));
                    } else {
                        toast.warn(get(res.data,'AnswereMessage','WARNING'));
                    }
                }
            }).catch((e) => {
                toast.error('ERROR');
            })
        }
    }
    return (
        <>
            <Row>
                <Col xs={12}>
                    {loading && <Loader/>}
                </Col>
                <Col xs={12}>
                    <Line>Тазйиқ ва зўравонликдан жабрланган хотин - қизларни ҳисобга олиш ягона статистик карточкаси
                    </Line>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <StepWizard isHashEnabled={true}>
                        <StepOneForm victim={victim} reset={reset} hashKey={"one"} genders={genders}
                                     citizenship={citizenship} ages={ages} saveToLocalStorage={saveToLocalStorage}
                                     getDataFromMvd={getDataFromMvd} mvdData={mvdData}/>
                        <StepTwoForm hashKey={"two"} victim={victim} reset={reset} education={education}
                                     familyPosition={familyPosition} socialStatus={socialStatus}
                                     workingplace={workingplace} personcondition={personcondition}
                                     actionplace={actionplace} saveToLocalStorage={saveToLocalStorage}/>
                        <StepThreeForm victim={victim} reset={reset} hashKey={"three"}
                                       getDistrictsByRegion={getDistrictsByRegion}
                                       getNeighborhoodsByDistrict={getNeighborhoodsByDistrict} regions={regions}
                                       districts={districts}
                                       neighborhoods={neighborhoods}
                                       permanentdistricts={permanentdistricts}
                                       permanentsneighborhoods={permanentsneighborhoods}
                                       getPermanentDistrictsByRegion={getPermanentDistrictsByRegion}
                                       getPermanentNeighborhoodsByDistrict={getPermanentNeighborhoodsByDistrict}
                                       saveToLocalStorage={saveToLocalStorage}
                        />
                        <StepFourForm hashKey={"four"}
                                      reset={reset}
                                      create={create}
                                      typeviolence={typeviolence}
                                      typerestrictions={typerestrictions}
                                      sendpreparationlist={sendpreparationlist}
                                      guardianshipList={guardianshipList}
                                      occuredRepetitionList={occuredRepetitionList}
                        />
                    </StepWizard>
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        genders: get(state, 'normalizer.data.genders-list.result.data', []),
        citizenship: get(state, 'normalizer.data.citizenship-list.result.Agess', []),
        ages: get(state, 'normalizer.data.ages-list.result.Agess', []),
        education: get(state, 'normalizer.data.education-types.result.data', []),
        familyPosition: get(state, 'normalizer.data.family-position-list.result.data', []),
        socialStatus: get(state, 'normalizer.data.social-status-list.result.data', []),
        workingplace: get(state, 'normalizer.data.working-place-list.result.data', []),
        personcondition: get(state, 'normalizer.data.person-condition-list.result.Agess', []),
        actionplace: get(state, 'normalizer.data.action-place-list.result.data', []),
        regions: get(state, 'normalizer.data.region-list.result.region', []),
        districts: get(state, 'normalizer.data.districts-list.result.districts', []),
        neighborhoods: get(state, 'normalizer.data.neighborhoods-list.result.mfy', []),
        permanentdistricts: get(state, 'normalizer.data.permanent-districts-list.result.districts', []),
        permanentsneighborhoods: get(state, 'normalizer.data.permanent-neighborhoods-list.result.mfy', []),
        typeviolence: get(state, 'normalizer.data.type-violence-list.result.data', []),
        typerestrictions: get(state, 'normalizer.data.restriction-type-list.result.data', []),
        sendpreparationlist: get(state, 'normalizer.data.send-preparation-list.result.data', []),
        guardianshipList: get(state, 'normalizer.data.guardianship-list.result.data', []),
        occuredRepetitionList: get(state, 'normalizer.data.occurred-repetition-list.result.data', []),


    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGendersList: ({page = 1}) => {
            const storeName = 'genders-list';
            const entityName = 'gender';
            const scheme = {data: [GenderScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/genders`,
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

        getPermanentDistrictsListByRegion: ({regId, page = 0}) => {
            const storeName = 'permanent-districts-list';
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
        getPermanentNeighborhoodsListByDistrict: ({districtId, page = 0}) => {
            const storeName = 'permanent-neighborhoods-list';
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
        getGuardianshipList: ({page = 1}) => {
            const storeName = 'guardianship-list';
            const entityName = 'guardianship-type';
            const scheme = {data: [GuardianScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/guardianship`,
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

        getSendPreparationList: ({page = 1}) => {
            const storeName = 'send-preparation-list';
            const entityName = 'send-preparation';
            const scheme = {data: [SendPreparationScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/sendpreparation`,
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

        getOccuredRepititionList: ({page = 1}) => {
            const storeName = 'occurred-repetition-list';
            const entityName = 'occurred-repetition';
            const scheme = {data: [OccuredRepetitionScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/occurredrepetition`,
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


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AttachVictimToOrderContainer));
