import React, {Component} from 'react';
import {get, isEqual} from "lodash";
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
            departments,
            pages,
            permissions,

        } = this.props;


        return <Provider value={{
            isAuthenticated,
            isFetched,
            user,
            departments,
            pages,
            permissions,
            userCan: (items=[], can = "") => {
                return hasAccess(items, can);
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
        departments: get(state, 'auth.user.departments', []),
        pages: get(state, 'auth.user.pages', []),
        permissions: get(state, 'auth.user.permissions', []),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
