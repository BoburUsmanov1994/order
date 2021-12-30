import {request} from "../../services/api";

class ApiService{

    static CreateRegion = (params) => {
        return request.post(`/regions/`,{...params});
    }

    static UpdateRegion = (id,params) => {
        return request.put(`/regions/${id}`,{...params});
    }

    static DeleteRegion = (id) => {
        return request.delete(`/regions/${id}`);
    }

    static CreateDistrict = (params) => {
        return request.post(`/districts/`,{...params});
    }

    static UpdateDistrict = (id,params) => {
        return request.put(`/districts/${id}`,{...params});
    }

    static DeleteDistrict = (id) => {
        return request.delete(`/districts/${id}`);
    }

    static CreateNeighborhood = (params) => {
        return request.post(`/mfy/`,{...params});
    }

    static UpdateNeighborhood= (id,params) => {
        return request.put(`/mfy/${id}`,{...params});
    }

    static DeleteNeighborhood = (id) => {
        return request.delete(`/mfy/${id}`);
    }

    static CreateRank = (params) => {
        return request.post(`/zvaniya/`,{...params});
    }

    static UpdateRank= (id,params) => {
        return request.put(`/zvaniya/${id}`,{...params});
    }

    static DeleteRank = (id) => {
        return request.delete(`/zvaniya/${id}`);
    }

    static CreateAccountRole = (params) => {
        return request.post(`/accountroles/`,{...params});
    }

    static UpdateAccountRole= (id,params) => {
        return request.put(`/accountroles/${id}`,{...params});
    }

    static DeleteAccountRole = (id) => {
        return request.delete(`/accountroles/${id}`);
    }

    static CreatePosition = (params) => {
        return request.post(`/position/`,{...params});
    }

    static UpdatePosition = (id,params) => {
        return request.put(`/position/${id}`,{...params});
    }

    static DeletePosition = (id) => {
        return request.delete(`/position/${id}`);
    }

    static CreateAccountStatus = (params) => {
        return request.post(`/accountstatus/`,{...params});
    }

    static UpdateAccountStatus = (id,params) => {
        return request.put(`/accountstatus/${id}`,{...params});
    }

    static DeleteAccountStatus = (id) => {
        return request.delete(`/accountstatus/${id}`);
    }

    static CreateStatusOrder = (params) => {
        return request.post(`/statusorder/`,{...params});
    }

    static UpdateStatusOrder = (id,params) => {
        return request.put(`/statusorder/${id}`,{...params});
    }

    static DeleteStatusOrder = (id) => {
        return request.delete(`/statusorder/${id}`);
    }

    static CreatePersonViolence = (params) => {
        return request.post(`/personviolence/`,{...params});
    }

    static UpdatePersonViolence = (id,params) => {
        return request.put(`/personviolence/${id}`,{...params});
    }

    static DeletePersonViolence = (id) => {
        return request.delete(`/personviolence/${id}`);
    }

    static CreateWorkingPlace = (params) => {
        return request.post(`/workingplace/`,{...params});
    }

    static UpdateWorkingPlace = (id,params) => {
        return request.put(`/workingplace/${id}`,{...params});
    }

    static DeleteWorkingPlace = (id) => {
        return request.delete(`/workingplace/${id}`);
    }

    static CreateViolenceType = (params) => {
        return request.post(`/typeviolence/`,{...params});
    }

    static UpdateViolenceType = (id,params) => {
        return request.put(`/typeviolence/${id}`,{...params});
    }

    static DeleteViolenceType = (id) => {
        return request.delete(`/typeviolence/${id}`);
    }

    static CreateRestrictionsType = (params) => {
        return request.post(`/typerestrictions/`,{...params});
    }

    static UpdateRestrictionsType = (id,params) => {
        return request.put(`/typerestrictions/${id}`,{...params});
    }

    static DeleteRestrictionsType = (id) => {
        return request.delete(`/typerestrictions/${id}`);
    }

    static CreateStateViolence = (params) => {
        return request.post(`/stateviolence/`,{...params});
    }

    static UpdateStateViolence = (id,params) => {
        return request.put(`/stateviolence/${id}`,{...params});
    }

    static DeleteStateViolence = (id) => {
        return request.delete(`/stateviolence/${id}`);
    }

    static CreateSocialStatus = (params) => {
        return request.post(`/socialstatus/`,{...params});
    }

    static UpdateSocialStatus = (id,params) => {
        return request.put(`/socialstatus/${id}`,{...params});
    }

    static DeleteSocialStatus = (id) => {
        return request.delete(`/socialstatus/${id}`);
    }

    static CreateSendPreparation = (params) => {
        return request.post(`/sendpreparation/`,{...params});
    }

    static UpdateSendPreparation= (id,params) => {
        return request.put(`/sendpreparation/${id}`,{...params});
    }

    static DeleteSendPreparation = (id) => {
        return request.delete(`/sendpreparation/${id}`);
    }

    static CreateUser = (params) => {
        return request.post(`/user/`,{...params});
    }

    static UpdateUser= (id,params) => {
        return request.put(`/user/${id}`,{...params});
    }

    static DeleteUser = (id) => {
        return request.delete(`/user/${id}`);
    }

    static CreateOrder = (params) => {
        return request.post(`/orders/`,{...params});
    }

    static UpdateOrder = (id,params) => {
        return request.put(`/orders/${id}`,{...params});
    }

    static DeleteOrder = (id) => {
        return request.delete(`/orders/${id}`);
    }

    static CreateVictim = (id,params) => {
        return request.post(`/victim/${id}`,{...params});
    }

    static UpdateVictim = (id,params) => {
        return request.put(`/victim/${id}`,{...params});
    }

    static DeleteVictim = (id) => {
        return request.delete(`/victim/${id}`);
    }

    static CreateViolent = (id,params) => {
        return request.post(`/violent/${id}`,{...params});
    }

    static UpdateViolent = (id,params) => {
        return request.put(`/violent/${id}`,{...params});
    }

    static DeleteViolent = (id) => {
        return request.delete(`/violent/${id}`);
    }

    static CreateFamilyConflicting = (params) => {
        return request.post(`/conflictingfamilies`,{...params});
    }
    static DeleteFamilyConflicting = (id,params) => {
        return request.delete(`/conflictingfamilies/${id}`);
    }
    static CreateReasonViolence = (params) => {
        return request.post(`/reasonviolence/`,{...params});
    }

    static UpdateCreateReasonViolence= (id,params) => {
        return request.put(`/reasonviolence/${id}`,{...params});
    }

    static DeleteCreateReasonViolence = (id) => {
        return request.delete(`/reasonviolence/${id}`);
    }

    static CreateCriminalCase = (params) => {
        return request.post(`/criminalcase/`,{...params});
    }

    static UpdateCriminalCase= (id,params) => {
        return request.put(`/criminalcase/${id}`,{...params});
    }

    static DeleteCrimnalCase = (id) => {
        return request.delete(`/criminalcase/${id}`);
    }

    static CreateCriminalCodex= (params) => {
        return request.post(`/criminalcodex/`,{...params});
    }

    static UpdateCriminalCodex= (id,params) => {
        return request.put(`/criminalcodex/${id}`,{...params});
    }

    static DeleteCrimnalCodex = (id) => {
        return request.delete(`/criminalcodex/${id}`);
    }

    static CreateAdministrative= (params) => {
        return request.post(`/administrative/`,{...params});
    }

    static UpdateAdministrative= (id,params) => {
        return request.put(`/administrative/${id}`,{...params});
    }

    static DeleteAdministrative = (id) => {
        return request.delete(`/administrative/${id}`);
    }

    static CreateAdministrativeCodex= (params) => {
        return request.post(`/administrativecodex/`,{...params});
    }

    static UpdateAdministrativeCodex= (id,params) => {
        return request.put(`/administrativecodex/${id}`,{...params});
    }

    static DeleteAdministrativeCodex = (id) => {
        return request.delete(`/administrativecodex/${id}`);
    }

    static CreateCitizenship= (params) => {
        return request.post(`/citizenship/`,{...params});
    }

    static UpdateCitizenship= (id,params) => {
        return request.put(`/citizenship/${id}`,{...params});
    }

    static DeleteCitizenship = (id) => {
        return request.delete(`/citizenship/${id}`);
    }

    static CreateAges= (params) => {
        return request.post(`/ages/`,{...params});
    }

    static UpdateAges= (id,params) => {
        return request.put(`/ages/${id}`,{...params});
    }

    static DeleteAges = (id) => {
        return request.delete(`/ages/${id}`);
    }

    static CreateEducation= (params) => {
        return request.post(`/education/`,{...params});
    }

    static UpdateEducation= (id,params) => {
        return request.put(`/education/${id}`,{...params});
    }

    static DeleteEducation = (id) => {
        return request.delete(`/education/${id}`);
    }

    static CreateFamilyPosition= (params) => {
        return request.post(`/familyposition/`,{...params});
    }

    static UpdateFamilyPosition= (id,params) => {
        return request.put(`/familyposition/${id}`,{...params});
    }

    static DeleteFamilyPosition = (id) => {
        return request.delete(`/familyposition/${id}`);
    }

    static CreatePersonCondition= (params) => {
        return request.post(`/conditionperson/`,{...params});
    }

    static UpdatePersonCondition= (id,params) => {
        return request.put(`/conditionperson/${id}`,{...params});
    }

    static DeletePersonCondition = (id) => {
        return request.delete(`/conditionperson/${id}`);
    }

    static CreateGuardianship= (params) => {
        return request.post(`/guardianship/`,{...params});
    }

    static UpdateGuardianship = (id,params) => {
        return request.put(`/guardianship/${id}`,{...params});
    }

    static DeleteGuardianship = (id) => {
        return request.delete(`/guardianship/${id}`);
    }

    static CreateBasisTermination= (params) => {
        return request.post(`/basistermination/`,{...params});
    }

    static UpdateBasisTermination = (id,params) => {
        return request.put(`/basistermination/${id}`,{...params});
    }

    static DeleteBasisTermination = (id) => {
        return request.delete(`/basistermination/${id}`);
    }

    static CreateActionPersonViolence= (params) => {
        return request.post(`/ectionspersonviolence/`,{...params});
    }

    static UpdateActionPersonViolence = (id,params) => {
        return request.put(`/ectionspersonviolence/${id}`,{...params});
    }

    static DeleteActionPersonViolence = (id) => {
        return request.delete(`/ectionspersonviolence/${id}`);
    }

    static CreateConditionPersonViolence= (params) => {
        return request.post(`/conditionpersonviolence/`,{...params});
    }

    static UpdateConditionPersonViolence = (id,params) => {
        return request.put(`/conditionpersonviolence/${id}`,{...params});
    }

    static DeleteConditionPersonViolence = (id) => {
        return request.delete(`/conditionpersonviolence/${id}`);
    }

    static CreateOccuredRepetition= (params) => {
        return request.post(`/occurredrepetition/`,{...params});
    }

    static UpdateOccuredRepetition = (id,params) => {
        return request.put(`/occurredrepetition/${id}`,{...params});
    }

    static DeleteOccuredRepetition = (id) => {
        return request.delete(`/occurredrepetition/${id}`);
    }

    static CreateRestrictionOfType = (params) => {
        return request.post(`/restrictionoftype/`,{...params});
    }

    static UpdateRestrictionOfType = (id,params) => {
        return request.put(`/restrictionoftype/${id}`,{...params});
    }

    static DeleteRestrictionOfType = (id) => {
        return request.delete(`/restrictionoftype/${id}`);
    }

    static CreateBehavior = (params) => {
        return request.post(`/behavior/`,{...params});
    }

    static UpdateBehavior = (id,params) => {
        return request.put(`/behavior/${id}`,{...params});
    }

    static DeleteBehavior = (id) => {
        return request.delete(`/behavior/${id}`);
    }

    static CreateResultOrder = (params) => {
        return request.post(`/resultorder/`,{...params});
    }

    static UpdateResultOrder = (id,params) => {
        return request.put(`/resultorder/${id}`,{...params});
    }

    static DeleteResultOrder = (id) => {
        return request.delete(`/resultorder/${id}`);
    }

    static CreateTypeOfProblems = (params) => {
        return request.post(`/typeofproblems/`,{...params});
    }

    static UpdateTypeOfProblems = (id,params) => {
        return request.put(`/typeofproblems/${id}`,{...params});
    }

    static DeleteTypeOfProblems = (id) => {
        return request.delete(`/typeofproblems/${id}`);
    }

    static CreateResultConflict = (params) => {
        return request.post(`/resultofconflict/`,{...params});
    }

    static UpdateResultConflict = (id,params) => {
        return request.put(`/resultofconflict/${id}`,{...params});
    }

    static DeleteResultConflict = (id) => {
        return request.delete(`/resultofconflict/${id}`);
    }
    static StatisticsPlaceActionCounts = () => {
        return request.get(`/statistics/vicplaceection`);
    }

    static StatisticsOrderCounts = ({from = null, to = null, regId = null, distId = null, mfyId = null}) => {
        return request.get(`/orders/statistics/ordercounts`, {
            headers: {
                'from': `${from}`,
                'to': `${to}`,
                'regId': `${regId}`,
                'distId': `${distId}`,
                'mfyId': `${mfyId}`,
            },
        });
    }

    static StatisticsTypeViolence = () => {
        return request.get(`/orders/statistics/typeviolence`);
    }

    static StatisticsVictimCount = () => {
        return request.get(`/statistics/victimcount`);
    }

    static MonthlyStatistics = () => {
        return request.get(`/statistics/monthly`);
    }

    static MvdData = (params) => {
        return request.post(`/getdata`,{...params});
    }

    static ChangeMessageItemStatus = (id,params) => {
        return request.put(`/messages/${id}`,{...params});
    }


}

export default ApiService;