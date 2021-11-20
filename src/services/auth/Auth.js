import React, {Component} from 'react';
import {get} from "lodash";
import Provider from "../../context/auth/AuthProvider";
import {connect} from 'react-redux';
import Actions from "../../modules/auth/Actions";
import {hasAccess} from "../../utils";
import storage from "../local-storage";

class Auth extends Component {

    componentDidMount() {
        const {checkAuth} = this.props;
        const token =  JSON.parse(storage.get('token')) || {};
        checkAuth({user_id:get(token,'userId',null)});
    }

    render() {
        const {
            children,
            isAuthenticated,
            isFetched,
            user,
            role

        } = this.props;


        return <Provider value={{
            isAuthenticated,
            isFetched,
            user,
            role,
            userCan: (roles=[]) => {
                return hasAccess(roles, role);
            }
        }}>
            {children}
        </Provider>
    }
}


const mapDispatchToProps = dispatch => {
    return {
        checkAuth: ({user_id}) => dispatch({
            type: Actions.CHECK_AUTH.REQUEST,
            payload:{user_id}
        })
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: get(state, 'auth.isAuthenticated', false),
        isFetched: get(state, 'auth.isFetched', false),
        user: get(state, 'auth.user', {}),
        role: get(state, 'auth.user.accountrole.name')
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
