import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {connect} from "react-redux";
import ApiActions from "../../../../services/api/Actions";
import {get, includes, round, unionBy} from "lodash";
import {Col, Row} from "react-grid-system";
import {CustomPieChart} from "../../../../components/chart";
import Title from "../../../../components/title";
import Dropdown from "../../../../components/dropdown";

const StyledPieChartList = styled.div`
`;

const PieChartList = ({
                          getBasisOrder,
                          getBasisTermination,
                          getResultOrder,
                          getAgesVictim,
                          getVictimWorkingPlace,
                          getVictimConditionPerson,
                          getVictimFamilyPosition,
                          getVictimSocialStatus,
                          getVictimEducation,
                          getVictimPlaceAction,
                          getVictimOccuredRepetitions,
                          getVictimSendPreparations,
                          getVictimTypeViolences,
                          getVictimTypeRestrictions,
                          getVictimGuardianships,
                          getVictimCitizenship,
                          getViolentAdministratives,
                          getViolentAdministrativesCodex,
                          getAgesViolent,
                          getViolentCriminalCase,
                          getViolentCriminalCodex,
                          getViolentGender,
                          getViolentCitizens,
                          getViolentEducations,
                          getViolentFamilyPosition,
                          getViolentSocialStatus,
                          getViolentWorkingPlace,
                          getViolentConditionPerson,
                          getViolentPlaceAction,
                          getViolentRestrictionOfTypes,
                          getViolentTypeViolences,
                          getViolentOccurredRepetitions,
                          getViolentActionPersonViolences,
                          getViolentCauseViolences,
                          getViolentBehaviors,
                          getViolentStateViolences,
                          getViolentPersonViolences,
                          getViolentConditionPersonViolences,
                          statisticsBasisOrder,
                          statisticsBasisTermination,
                          statisticsResultOrder,
                          statisticsAgesVictim,
                          statisticsVictimWorkingPlace,
                          statisticsVictimConditionPerson,
                          statisticsVictimFamilyPosition,
                          statisticsVictimSocialStatus,
                          statisticsVictimEducation,
                          statisticsVictimPlaceAction,
                          statisticsVictimOccuredRepetitions,
                          statisticsVictimSendPreparations,
                          statisticsVictimTypeViolences,
                          statisticsVictimTypeRestrictions,
                          statisticsVictimGuardianships,
                          statisticsVictimCitizenship,
                          statisticsViolentAdministratives,
                          statisticsViolentAdministrativesCodex,
                          statisticsViolentAges,
                          statisticsViolentCriminalCase,
                          statisticsViolentCriminalCodex,
                          statisticsViolentGender,
                          statisticsViolentCitizens,
                          statisticsViolentEducations,
                          statisticsViolentFamilyPosition,
                          statisticsViolentSocialStatus,
                          statisticsViolentWorkingPlace,
                          statisticsViolentConditionPerson,
                          statisticsViolentPlaceAction,
                          statisticsViolentRestrictionOfTypes,
                          statisticsViolentTypeViolences,
                          statisticsViolentOccurredRepetitions,
                          statisticsViolentActionPersonViolences,
                          statisticsViolentCauseViolences,
                          statisticsViolentBehaviors,
                          statisticsViolentStateViolences,
                          statisticsViolentPersonViolences,
                          statisticsConditionViolentPersonViolences,
                          ...props
                      }) => {
    const [items, setItems] = useState([]);
    const [activeItems, setActiveItems] = useState([]);
    const [filter, setFilter] = useState({from: '2020-01-01', to: '2021-12-31', regId: '', distId: '', mfyId: ''})
    useEffect(() => {
        getBasisOrder({...filter});
        getBasisTermination({...filter});
        getResultOrder({...filter});
        getAgesVictim({...filter});
        getVictimWorkingPlace({...filter});
        getVictimConditionPerson({...filter});
        getVictimFamilyPosition({...filter});
        getVictimSocialStatus({...filter});
        getVictimEducation({...filter});
        getVictimPlaceAction({...filter});
        getVictimOccuredRepetitions({...filter});
        getVictimSendPreparations({...filter});
        getVictimTypeViolences({...filter});
        getVictimTypeRestrictions({...filter});
        getVictimGuardianships({...filter});
        getViolentAdministratives({...filter});
        getViolentAdministrativesCodex({...filter});
        getAgesViolent({...filter});
        getVictimCitizenship({...filter});
        getViolentCriminalCase({...filter});
        getViolentCriminalCodex({...filter});
        getViolentGender({...filter});
        getViolentCitizens({...filter});
        getViolentEducations({...filter});
        getViolentFamilyPosition({...filter});
        getViolentSocialStatus({...filter});
        getViolentWorkingPlace({...filter});
        getViolentConditionPerson({...filter});
        getViolentPlaceAction({...filter});
        getViolentRestrictionOfTypes({...filter});
        getViolentTypeViolences({...filter});
        getViolentOccurredRepetitions({...filter});
        getViolentActionPersonViolences({...filter});
        getViolentCauseViolences({...filter});
        getViolentBehaviors({...filter});
        getViolentStateViolences({...filter});
        getViolentPersonViolences({...filter});
        getViolentConditionPersonViolences({...filter});
    }, [filter]);

    useEffect(() => {
        if (get(statisticsBasisOrder, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsBasisOrder, 'result.message', '-'),
                data: get(statisticsBasisOrder, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsBasisOrder, 'result.message', '-')]);
        }

    }, [statisticsBasisOrder]);


    useEffect(() => {
        if (get(statisticsBasisTermination, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsBasisTermination, 'result.message', '-'),
                data: get(statisticsBasisTermination, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsBasisTermination, 'result.message', '-')]);
        }
    }, [statisticsBasisTermination]);

    useEffect(() => {
        if (get(statisticsResultOrder, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsResultOrder, 'result.message', '-'),
                data: get(statisticsResultOrder, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsResultOrder, 'result.message', '-')]);
        }
    }, [statisticsResultOrder]);

    useEffect(() => {
        if (get(statisticsAgesVictim, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsAgesVictim, 'result.message', '-'),
                data: get(statisticsAgesVictim, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsAgesVictim, 'result.message', '-')]);
        }
    }, [statisticsAgesVictim]);

    useEffect(() => {
        if (get(statisticsVictimWorkingPlace, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsVictimWorkingPlace, 'result.message', '-'),
                data: get(statisticsVictimWorkingPlace, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsVictimWorkingPlace, 'result.message', '-')]);
        }
    }, [statisticsVictimWorkingPlace]);

    useEffect(() => {
        if (get(statisticsVictimConditionPerson, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsVictimConditionPerson, 'result.message', '-'),
                data: get(statisticsVictimConditionPerson, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsVictimConditionPerson, 'result.message', '-')]);
        }
    }, [statisticsVictimConditionPerson]);

    useEffect(() => {
        if (get(statisticsVictimFamilyPosition, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsVictimFamilyPosition, 'result.message', '-'),
                data: get(statisticsVictimFamilyPosition, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsVictimFamilyPosition, 'result.message', '-')]);
        }
    }, [statisticsVictimFamilyPosition]);

    useEffect(() => {
        if (get(statisticsVictimSocialStatus, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsVictimSocialStatus, 'result.message', '-'),
                data: get(statisticsVictimSocialStatus, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsVictimSocialStatus, 'result.message', '-')]);
        }
    }, [statisticsVictimSocialStatus]);

    useEffect(() => {
        if (get(statisticsVictimEducation, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsVictimEducation, 'result.message', '-'),
                data: get(statisticsVictimEducation, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: get(item, 'persentages')
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsVictimEducation, 'result.message', '-')]);
        }
    }, [statisticsVictimEducation]);

    useEffect(() => {
        if (get(statisticsVictimPlaceAction, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsVictimPlaceAction, 'result.message', '-'),
                data: get(statisticsVictimPlaceAction, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsVictimPlaceAction, 'result.message', '-')]);
        }
    }, [statisticsVictimPlaceAction]);

    useEffect(() => {
        if (get(statisticsVictimOccuredRepetitions, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsVictimOccuredRepetitions, 'result.message', '-'),
                data: get(statisticsVictimOccuredRepetitions, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsVictimOccuredRepetitions, 'result.message', '-')]);
        }
    }, [statisticsVictimOccuredRepetitions]);

    useEffect(() => {
        if (get(statisticsVictimSendPreparations, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsVictimSendPreparations, 'result.message', '-'),
                data: get(statisticsVictimSendPreparations, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsVictimSendPreparations, 'result.message', '-')]);
        }
    }, [statisticsVictimSendPreparations]);

    useEffect(() => {
        if (get(statisticsVictimTypeViolences, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsVictimTypeViolences, 'result.message', '-'),
                data: get(statisticsVictimTypeViolences, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsVictimTypeViolences, 'result.message', '-')]);
        }
    }, [statisticsVictimTypeViolences]);

    useEffect(() => {
        if (get(statisticsVictimTypeRestrictions, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsVictimTypeRestrictions, 'result.message', '-'),
                data: get(statisticsVictimTypeRestrictions, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsVictimTypeRestrictions, 'result.message', '-')]);
        }
    }, [statisticsVictimTypeRestrictions]);

    useEffect(() => {
        if (get(statisticsVictimGuardianships, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsVictimGuardianships, 'result.message', '-'),
                data: get(statisticsVictimGuardianships, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsVictimGuardianships, 'result.message', '-')]);
        }
    }, [statisticsVictimGuardianships]);

    useEffect(() => {
        if (get(statisticsVictimCitizenship, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsVictimCitizenship, 'result.message', '-'),
                data: get(statisticsVictimCitizenship, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsVictimCitizenship, 'result.message', '-')]);
        }
    }, [statisticsVictimCitizenship]);

    useEffect(() => {
        if (get(statisticsViolentAdministratives, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentAdministratives, 'result.message', '-'),
                data: get(statisticsViolentAdministratives, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentage'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentAdministratives, 'result.message', '-')]);
        }
    }, [statisticsViolentAdministratives]);

    useEffect(() => {
        if (get(statisticsViolentAdministrativesCodex, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentAdministrativesCodex, 'result.message', '-'),
                data: get(statisticsViolentAdministrativesCodex, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentage'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentAdministrativesCodex, 'result.message', '-')]);
        }
    }, [statisticsViolentAdministrativesCodex]);

    useEffect(() => {
        if (get(statisticsViolentAges, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentAges, 'result.message', '-'),
                data: get(statisticsViolentAges, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentAges, 'result.message', '-')]);
        }
    }, [statisticsViolentAges]);

    useEffect(() => {
        if (get(statisticsViolentCriminalCase, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentCriminalCase, 'result.message', '-'),
                data: get(statisticsViolentCriminalCase, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentCriminalCase, 'result.message', '-')]);
        }
    }, [statisticsViolentCriminalCase]);

    useEffect(() => {
        if (get(statisticsViolentCriminalCodex, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentCriminalCodex, 'result.message', '-'),
                data: get(statisticsViolentCriminalCodex, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentCriminalCodex, 'result.message', '-')]);
        }
    }, [statisticsViolentCriminalCodex]);

    useEffect(() => {
        if (get(statisticsViolentGender, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentGender, 'result.message', '-'),
                data: get(statisticsViolentGender, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentGender, 'result.message', '-')]);
        }
    }, [statisticsViolentGender]);

    useEffect(() => {
        if (get(statisticsViolentCitizens, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentCitizens, 'result.message', '-'),
                data: get(statisticsViolentCitizens, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentCitizens, 'result.message', '-')]);
        }
    }, [statisticsViolentCitizens]);

    useEffect(() => {
        if (get(statisticsViolentEducations, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentEducations, 'result.message', '-'),
                data: get(statisticsViolentEducations, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentEducations, 'result.message', '-')]);
        }
    }, [statisticsViolentEducations]);

    useEffect(() => {
        if (get(statisticsViolentFamilyPosition, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentFamilyPosition, 'result.message', '-'),
                data: get(statisticsViolentFamilyPosition, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentFamilyPosition, 'result.message', '-')]);
        }
    }, [statisticsViolentFamilyPosition]);

    useEffect(() => {
        if (get(statisticsViolentSocialStatus, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentSocialStatus, 'result.message', '-'),
                data: get(statisticsViolentSocialStatus, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentSocialStatus, 'result.message', '-')]);
        }
    }, [statisticsViolentSocialStatus]);

    useEffect(() => {
        if (get(statisticsViolentWorkingPlace, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentWorkingPlace, 'result.message', '-'),
                data: get(statisticsViolentWorkingPlace, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentWorkingPlace, 'result.message', '-')]);
        }
    }, [statisticsViolentWorkingPlace]);

    useEffect(() => {
        if (get(statisticsViolentConditionPerson, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentConditionPerson, 'result.message', '-'),
                data: get(statisticsViolentConditionPerson, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentConditionPerson, 'result.message', '-')]);
        }
    }, [statisticsViolentConditionPerson]);

    useEffect(() => {
        if (get(statisticsViolentPlaceAction, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentPlaceAction, 'result.message', '-'),
                data: get(statisticsViolentPlaceAction, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentPlaceAction, 'result.message', '-')]);
        }
    }, [statisticsViolentPlaceAction]);

    useEffect(() => {
        if (get(statisticsViolentRestrictionOfTypes, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentRestrictionOfTypes, 'result.message', '-'),
                data: get(statisticsViolentRestrictionOfTypes, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentRestrictionOfTypes, 'result.message', '-')]);
        }
    }, [statisticsViolentRestrictionOfTypes]);

    useEffect(() => {
        if (get(statisticsViolentTypeViolences, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentTypeViolences, 'result.message', '-'),
                data: get(statisticsViolentTypeViolences, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentTypeViolences, 'result.message', '-')]);
        }
    }, [statisticsViolentTypeViolences]);

    useEffect(() => {
        if (get(statisticsViolentOccurredRepetitions, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentOccurredRepetitions, 'result.message', '-'),
                data: get(statisticsViolentOccurredRepetitions, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentOccurredRepetitions, 'result.message', '-')]);
        }
    }, [statisticsViolentOccurredRepetitions]);

    useEffect(() => {
        if (get(statisticsViolentActionPersonViolences, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentActionPersonViolences, 'result.message', '-'),
                data: get(statisticsViolentActionPersonViolences, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentActionPersonViolences, 'result.message', '-')]);
        }
    }, [statisticsViolentActionPersonViolences]);

    useEffect(() => {
        if (get(statisticsViolentCauseViolences, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentCauseViolences, 'result.message', '-'),
                data: get(statisticsViolentCauseViolences, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentCauseViolences, 'result.message', '-')]);
        }
    }, [statisticsViolentCauseViolences]);

    useEffect(() => {
        if (get(statisticsViolentBehaviors, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentBehaviors, 'result.message', '-'),
                data: get(statisticsViolentBehaviors, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentBehaviors, 'result.message', '-')]);
        }
    }, [statisticsViolentBehaviors]);

    useEffect(() => {
        if (get(statisticsViolentStateViolences, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentStateViolences, 'result.message', '-'),
                data: get(statisticsViolentStateViolences, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentStateViolences, 'result.message', '-')]);
        }
    }, [statisticsViolentStateViolences]);

    useEffect(() => {
        if (get(statisticsViolentPersonViolences, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsViolentPersonViolences, 'result.message', '-'),
                data: get(statisticsViolentPersonViolences, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsViolentPersonViolences, 'result.message', '-')]);
        }
    }, [statisticsViolentPersonViolences]);

    useEffect(() => {
        if (get(statisticsConditionViolentPersonViolences, 'isFetched')) {
            const data = unionBy(items, [{
                name: get(statisticsConditionViolentPersonViolences, 'result.message', '-'),
                data: get(statisticsConditionViolentPersonViolences, 'result.persentages', []).map((item) => ({
                    name: get(item, 'name'),
                    value: round(get(item, 'persentages'), 2)
                }))
            }], 'name')
            setItems(data);
            setActiveItems(activeItems => [...activeItems, get(statisticsConditionViolentPersonViolences, 'result.message', '-')]);
        }
    }, [statisticsConditionViolentPersonViolences]);


    return (
        <StyledPieChartList {...props}>
            <Row className={'mb-24'}>
                <Col xs={8}>
                    <Title md>Тазйиқ ва зўравонликдан жабрланган хотин - қизларни ҳисобга олиш ягона
                        статистикаси
                    </Title>
                </Col>
                <Col xs={4} className={'text-right'}>
                    <Dropdown items={items} activeItems={activeItems} setActiveItems={setActiveItems}/>
                </Col>
            </Row>
            <Row>
                {items && items.map(({name, data}, index) => includes(activeItems, name) && <Col key={index} xs={6}>
                    <CustomPieChart name={name} data={data}/>
                </Col>)
                }
            </Row>
        </StyledPieChartList>
    );
};

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        statisticsBasisOrder: get(state, 'normalizer.data.statistics-basis-order', {}),
        statisticsBasisTermination: get(state, 'normalizer.data.statistics-basis-termination', {}),
        statisticsResultOrder: get(state, 'normalizer.data.statistics-result-order', {}),
        statisticsAgesVictim: get(state, 'normalizer.data.statistics-ages-victim', {}),
        statisticsVictimWorkingPlace: get(state, 'normalizer.data.statistics-victim-working-place', {}),
        statisticsVictimConditionPerson: get(state, 'normalizer.data.statistics-victim-condition-person', {}),
        statisticsVictimFamilyPosition: get(state, 'normalizer.data.statistics-victim-family-position', {}),
        statisticsVictimSocialStatus: get(state, 'normalizer.data.statistics-victim-social-status', {}),
        statisticsVictimEducation: get(state, 'normalizer.data.statistics-victim-education', {}),
        statisticsVictimPlaceAction: get(state, 'normalizer.data.statistics-victim-place-action', {}),
        statisticsVictimOccuredRepetitions: get(state, 'normalizer.data.statistics-victim-occured-repetitions', {}),
        statisticsVictimSendPreparations: get(state, 'normalizer.data.statistics-victim-send-preparations', {}),
        statisticsVictimTypeViolences: get(state, 'normalizer.data.statistics-victim-type-violences', {}),
        statisticsVictimTypeRestrictions: get(state, 'normalizer.data.statistics-victim-type-restrictions', {}),
        statisticsVictimGuardianships: get(state, 'normalizer.data.statistics-victim-guardianships', {}),
        statisticsVictimCitizenship: get(state, 'normalizer.data.statistics-victim-citizenship', {}),
        statisticsViolentAdministratives: get(state, 'normalizer.data.statistics-violent-administratives', {}),
        statisticsViolentAdministrativesCodex: get(state, 'normalizer.data.statistics-violent-administratives-codex', {}),
        statisticsViolentAges: get(state, 'normalizer.data.statistics-ages-violent', {}),
        statisticsViolentCriminalCase: get(state, 'normalizer.data.statistics-violent-criminalcase', {}),
        statisticsViolentCriminalCodex: get(state, 'normalizer.data.statistics-violent-criminalcodex', {}),
        statisticsViolentGender: get(state, 'normalizer.data.statistics-violent-gender', {}),
        statisticsViolentCitizens: get(state, 'normalizer.data.statistics-violent-citizens', {}),
        statisticsViolentEducations: get(state, 'normalizer.data.statistics-violent-educations', {}),
        statisticsViolentFamilyPosition: get(state, 'normalizer.data.statistics-violent-family-position', {}),
        statisticsViolentSocialStatus: get(state, 'normalizer.data.statistics-violent-social-status', {}),
        statisticsViolentWorkingPlace: get(state, 'normalizer.data.statistics-violent-working-place', {}),
        statisticsViolentConditionPerson: get(state, 'normalizer.data.statistics-violent-condition-person', {}),
        statisticsViolentPlaceAction: get(state, 'normalizer.data.statistics-violent-place-action', {}),
        statisticsViolentRestrictionOfTypes: get(state, 'normalizer.data.statistics-violent-restriction-of-types', {}),
        statisticsViolentTypeViolences: get(state, 'normalizer.data.statistics-violent-type-violences', {}),
        statisticsViolentOccurredRepetitions: get(state, 'normalizer.data.statistics-violent-occurred-repetitions', {}),
        statisticsViolentActionPersonViolences: get(state, 'normalizer.data.statistics-violent-action-person-violences', {}),
        statisticsViolentCauseViolences: get(state, 'normalizer.data.statistics-violent-cause-violences', {}),
        statisticsViolentBehaviors: get(state, 'normalizer.data.statistics-violent-behaviors', {}),
        statisticsViolentStateViolences: get(state, 'normalizer.data.statistics-violent-state-violences', {}),
        statisticsViolentPersonViolences: get(state, 'normalizer.data.statistics-violent-person-violences', {}),
        statisticsConditionViolentPersonViolences: get(state, 'normalizer.data.statistics-condition-violent-person-violences', {}),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBasisOrder: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/basisorder`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-basis-order',
            },
        }),
        getBasisTermination: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/basistermination`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-basis-termination',
            },
        }),
        getResultOrder: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/resultorder`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-result-order',
            },
        }),
        getAgesVictim: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/agesvictim`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-ages-victim',
            },
        }),
        getVictimWorkingPlace: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/vicworkingplace`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-victim-working-place',
            },
        }),
        getVictimConditionPerson: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/vicconditionperson`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-victim-condition-person',
            },
        }),
        getVictimFamilyPosition: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/vicfamilyposition`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-victim-family-position',
            },
        }),
        getVictimSocialStatus: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/vicsocialstatus`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-victim-social-status',
            },
        }),
        getVictimEducation: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/viceducation`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-victim-education',
            },
        }),
        getVictimPlaceAction: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/vicplaceection`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-victim-place-action',
            },
        }),
        getVictimOccuredRepetitions: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/vicoccurredrepetitions`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-victim-occured-repetitions',
            },
        }),
        getVictimSendPreparations: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/vicsendpreparations`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-victim-send-preparations',
            },
        }),
        getVictimTypeViolences: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/victypeviolences`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-victim-type-violences',
            },
        }),
        getVictimTypeRestrictions: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/victyperestrictions`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-victim-type-restrictions',
            },
        }),
        getVictimGuardianships: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/vicguardianships`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-victim-guardianships',
            },
        }),
        getVictimCitizenship: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/viccitizenship`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-victim-citizenship',
            },
        }),

        getViolentAdministratives: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/administratives`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-administratives',
            },
        }),
        getViolentAdministrativesCodex: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/administrativescodex`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-administratives-codex',
            },
        }),
        getAgesViolent: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/agesviolent`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-ages-violent',
            },
        }),
        getViolentCriminalCase: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/criminalcase`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-criminalcase',
            },
        }),
        getViolentCriminalCodex: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/criminalcodex`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-criminalcodex',
            },
        }),
        getViolentGender: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/violentgender`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-gender',
            },
        }),
        getViolentCitizens: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/violentcitizens`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-citizens',
            },
        }),
        getViolentEducations: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/violenteducations`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-educations',
            },
        }),
        getViolentFamilyPosition: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/violenfamilyposition`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-family-position',
            },
        }),
        getViolentSocialStatus: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/violensocialstatus`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-social-status',
            },
        }),
        getViolentWorkingPlace: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/violenworkingplace`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-working-place',
            },
        }),
        getViolentConditionPerson: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/violenconditionperson`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-condition-person',
            },
        }),
        getViolentPlaceAction: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/violenplaceection`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-place-action',
            },
        }),
        getViolentRestrictionOfTypes: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/violerestrictionoftypes`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-restriction-of-types',
            },
        }),
        getViolentTypeViolences: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/violentypeviolences`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-type-violences',
            },
        }),
        getViolentOccurredRepetitions: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/violenoccurredrepetitions`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-occurred-repetitions',
            },
        }),
        getViolentActionPersonViolences: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/violenectionspersonviolences`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-action-person-violences',
            },
        }),
        getViolentCauseViolences: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/violencauseviolences`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-cause-violences',
            },
        }),
        getViolentBehaviors: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/violenbehaviors`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-behaviors',
            },
        }),
        getViolentStateViolences: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/violenstateviolences`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-state-violences',
            },
        }),
        getViolentPersonViolences: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/violenpersonviolences`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-person-violences',
            },
        }),
        getViolentConditionPersonViolences: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/violenconditionpersonviolences`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'statistics-violent-condition-person-violences',
            },
        }),


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PieChartList);
