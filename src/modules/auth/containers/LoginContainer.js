import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import {Col, Container, Row} from "react-grid-system";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import bg from "../../../assets/images/bg.png";
import mvdLogo from "../../../assets/images/mvd-logo.png";
import LoginForm from "../components/LoginForm";
import Actions from "../Actions";
import Loader from "../../../components/loader";
import Normalizer from "../../../services/normalizer";
import TokenScheme from "../../../schema/TokenScheme";


const StyledLoginContainer = styled.div`
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url(${bg});
  background-color: #181838;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;

  img {
    max-width: 200px;
    height: auto;
  }
  h2{
    color: #fff;
    font-size: 24px;
    font-weight: 500;
    line-height: 1.25;
    margin-top: 5px;
    margin-bottom: 20px;
  }
`;
const LoginContainer = ({history,loginRequest,isFetched,token,entities,checkAuthRequest}) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (isFetched && token) {
            token = Normalizer.Denormalize(token, TokenScheme, entities);
            checkAuthRequest({token: get(token, 'token', null),user_id:get(token, 'userId', null)});
            history.push('/');
        }
    }, [token]);
    const login = (data) => {
        loginRequest({...data,setLoading});
    }
    return (
        <StyledLoginContainer>
            <Container fluid>
                <Row>
                    <Col xs={12}>
                        {loading && <Loader />}
                    </Col>
                </Row>
                <Row>
                    <Col xs={8} offset={{xs: 2}}>
                        <img src={mvdLogo} alt="logo"/>
                        <h2>Тазйиқ ва зўравонликдан жабрланган
                            хотин-қизларни хисобга олиш ягона ахборот тизими </h2>
                        <LoginForm login={login}/>
                    </Col>
                </Row>
            </Container>
        </StyledLoginContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        token: get(state, 'normalizer.data.get-token.result', null),
        isFetched: get(state, 'normalizer.data.get-token.isFetched', false),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: ({email, password,  setLoading}) => dispatch({
            type: Actions.LOGIN.REQUEST,
            payload: {email, password, setLoading}
        }),
        checkAuthRequest: ({token,user_id}) => dispatch({type: Actions.CHECK_AUTH.REQUEST, payload:{token,user_id}}),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(LoginContainer));
