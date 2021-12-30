import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-grid-system";
import StepWizard from "react-step-wizard";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Line from "../../../components/line";
import ApiActions from "../../../services/api/Actions";
import {get} from "lodash";
import Normalizer from "../../../services/normalizer";
import storage from "../../../services/local-storage";
import RegionScheme from "../../../schema/RegionScheme";
import DistrictScheme from "../../../schema/DistrictScheme";
import NeighborhoodScheme from "../../../schema/NeighborhoodScheme";
import ApiService from "../ApiService";
import {toast} from "react-toastify";
import Loader from "../../../components/loader";
import StepOneForm from "../components/conflicting-families/StepOneForm";
import StepTwoForm from "../components/conflicting-families/StepTwoForm";
import StepThreeForm from "../components/conflicting-families/StepThreeForm";
import RankScheme from "../../../schema/RankScheme";
import StepFourForm from "../components/conflicting-families/StepFourForm";
import CrirminalCaseScheme from "../../../schema/CriminalCaseScheme";
import CriminalCodexScheme from "../../../schema/CriminalCodexScheme";
import AdministrativeScheme from "../../../schema/AdministrativeScheme";


const ConflictingFamiliesCreateContainer = ({
                                                id,
                                                history,
                                                entities,
                                                regions,
                                                districts,
                                                getRegionList,
                                                getDistrictsListByRegion,
                                                getNeighborhoodsListByDistrict,
                                                neighborhoods,
                                                getTypeOfProblemsList,
                                                typeofproblems,
                                                getResultConflictList,
                                                resultofconflicts,
                                                getAdministrativeCodexList,
                                                getAdministrativeList,
                                                getCriminalCaseList,
                                                getCriminalCodexList,
                                                administrativeCodexList,
                                                criminalCaseList,
                                                criminalCodexList,
                                                administrativeList

                                            }) => {
    const [family, setFamily] = useState(JSON.parse(storage.get('family')));
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getRegionList({});
        getTypeOfProblemsList({});
        getResultConflictList({});
        getAdministrativeCodexList({});
        getAdministrativeList({});
        getCriminalCaseList({});
        getCriminalCodexList({});
    }, []);


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

    typeofproblems = Normalizer.Denormalize(typeofproblems, [RankScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));

    resultofconflicts = Normalizer.Denormalize(resultofconflicts, [RankScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));
    criminalCaseList = Normalizer.Denormalize(criminalCaseList, [CrirminalCaseScheme], entities).map(({
                                                                                                          _id,
                                                                                                          name
                                                                                                      }) => ({
        value: _id,
        label: name
    }));

    criminalCodexList = Normalizer.Denormalize(criminalCodexList, [CriminalCodexScheme], entities).map(({
                                                                                                            _id,
                                                                                                            name
                                                                                                        }) => ({
        value: _id,
        label: name
    }));

    administrativeList = Normalizer.Denormalize(administrativeList, [AdministrativeScheme], entities).map(({
                                                                                                               _id,
                                                                                                               name
                                                                                                           }) => ({
        value: _id,
        label: name
    }));

    administrativeCodexList = Normalizer.Denormalize(administrativeCodexList, [AdministrativeScheme], entities).map(({
                                                                                                                         _id,
                                                                                                                         name
                                                                                                                     }) => ({
        value: _id,
        label: name
    }));


    const saveToLocalStorage = (data) => {
        const familyData = {...family, ...data};
        setFamily(familyData);
        storage.set('family', JSON.stringify(familyData));
    }
    const create = (data) => {
        setLoading(true);
        const familyData = {...family, ...data};
        debugger
        ApiService.CreateFamilyConflicting({
            ...familyData,
            oredergiven: true,
            courts: "",
            seedate: ""
        }).then((res) => {
            if (res && res.data) {
                storage.remove('family')
                setLoading(false);
                toast.success('SUCCESS');
                history.push('/conflicting-families/list')
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
        await setFamily({});
        await firstStep();
        await storage.remove('family');
    }

    const getDistrictsByRegion = (regId) => {
        getDistrictsListByRegion({regId});
    }
    const getNeighborhoodsByDistrict = (districtId) => {
        getNeighborhoodsListByDistrict({districtId})
    }


    return (
        <>
            <Row>
                <Col xs={12}>
                    {loading && <Loader/>}
                </Col>
                <Col xs={12}>
                    <Line>Низоли оилаларни рўйхатга олиш
                    </Line>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <StepWizard isHashEnabled={true}>
                        <StepOneForm family={family} saveToLocalStorage={saveToLocalStorage} reset={reset}
                                     regions={regions} districts={districts} neighborhoods={neighborhoods}
                                     getDistrictsByRegion={getDistrictsByRegion}
                                     getNeighborhoodsByDistrict={getNeighborhoodsByDistrict}/>
                        <StepTwoForm family={family} saveToLocalStorage={saveToLocalStorage} reset={reset}
                                     regions={regions} districts={districts} neighborhoods={neighborhoods}
                                     getDistrictsByRegion={getDistrictsByRegion}
                                     getNeighborhoodsByDistrict={getNeighborhoodsByDistrict}/>
                        <StepThreeForm saveToLocalStorage={saveToLocalStorage} reset={reset} family={family}
                                       typeofproblems={typeofproblems} resultofconflicts={resultofconflicts}/>
                        <StepFourForm reset={reset} create={create} administrativeCodexList={administrativeCodexList}
                                      administrativeList={administrativeList} criminalCaseList={criminalCaseList}
                                      criminalCodexList={criminalCodexList}/>
                    </StepWizard>
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
        typeofproblems: get(state, 'normalizer.data.type-of-problems-list.result.accounts', []),
        resultofconflicts: get(state, 'normalizer.data.result-conflict-list.result.accounts', []),
        criminalCaseList: get(state, 'normalizer.data.criminal-case-list.result.data', []),
        criminalCodexList: get(state, 'normalizer.data.criminal-codex-list.result.data', []),
        administrativeList: get(state, 'normalizer.data.administrative-list.result.data', []),
        administrativeCodexList: get(state, 'normalizer.data.administrativecodex-list.result.data', []),

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
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

        getTypeOfProblemsList: ({page = 1}) => {
            const storeName = 'type-of-problems-list';
            const entityName = 'rank';
            const scheme = {accounts: [RankScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/typeofproblems`,
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

        getResultConflictList: ({page = 1}) => {
            const storeName = 'result-conflict-list';
            const entityName = 'rank';
            const scheme = {accounts: [RankScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/resultofconflict`,
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
        getCriminalCaseList: ({page = 1}) => {
            const storeName = 'criminal-case-list';
            const entityName = 'criminal-case';
            const scheme = {data: [CrirminalCaseScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/criminalcase`,
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
        getCriminalCodexList: ({page = 1}) => {
            const storeName = 'criminal-codex-list';
            const entityName = 'criminal-codex';
            const scheme = {data: [CriminalCodexScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/criminalcodex`,
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
        getAdministrativeList: ({page = 1}) => {
            const storeName = 'administrative-list';
            const entityName = 'administrative';
            const scheme = {data: [AdministrativeScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/administrative`,
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

        getAdministrativeCodexList: ({page = 1}) => {
            const storeName = 'administrativecodex-list';
            const entityName = 'administrative';
            const scheme = {data: [AdministrativeScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/administrativecodex`,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConflictingFamiliesCreateContainer));
