import {request} from "../../services/api";

class ApiService{

    static Login = (email,password) => {
        return request.post('/auth/login', {email,password});
    }


    static GetMe = (token = null,user_id=null) => {
        if (token) {
            return request.get(`/user/${user_id}`, {
                headers: {
                    'auth': `${token}`
                },
            });
        }

        return request.get(`/user/${user_id}`);
    }


}

export default ApiService;