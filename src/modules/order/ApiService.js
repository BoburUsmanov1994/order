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


}

export default ApiService;