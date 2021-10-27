import React from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import userIcon from "../../../assets/images/icons/user.png";
import passwordIcon from "../../../assets/images/icons/key.png";
import {Link} from "react-router-dom";
import { useForm } from "react-hook-form";

const StyledLoginForm = styled.form`

  label {
    display: block;
    font-size: 20px;
    margin-bottom: 5px;
    color: #fff;
    padding-left: 10px;
    text-align: left;
    font-weight: 300;
  }

  .form {
    &-input {
      height: 45px;
      border-radius: 8px;
      background-color: #fff;
      padding: 5px 40px 5px 15px;
      position: relative;
      .icon{
        position: absolute;
        right: 15px;
        top: 12px;
      }

      input {
        height: 100%;
        width: 100%;
        outline: none;
        border: none;
        font-size: 18px;
      }
    }

    &-group {
      margin-bottom: 20px;
      text-align: left;
      a{
        text-align: left;
        font-size: 14px;
        color: #fff;
        text-decoration: underline;
      }
      button{
        width: 100%;
       padding: 15px;
        background-color: #21D59B;
        border-radius: 10px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16);
        border:none;
        cursor: pointer;
        font-size: 20px;
        color: #fff;
        font-weight: 500;
      }
    }
  }
`;
const LoginForm = ({login = () => {}}) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        login(data);
    };
    return (
        <StyledLoginForm onSubmit={handleSubmit(onSubmit)}>
            <Row justify={'center'}>
                <Col xs={7}>
                    <div className={'form-group'}>
                        <label htmlFor="#login">Логин</label>
                        <div className={'form-input'}>
                            <input id={'login'} {...register("email", { required: true })} type="text"/>
                            <img className={'icon'} src={userIcon} alt=""/>
                        </div>
                        {errors.email && <span className={'text-danger'}>Login is required</span>}
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="#password">Пароль</label>
                        <div className={'form-input'}>
                            <input id={'password'} {...register("password", { required: true })} type="password"/>
                            <img className={'icon'} src={passwordIcon} alt=""/>
                        </div>
                        {errors.password && <span className={'text-danger'}>Password is required</span>}
                    </div>
                    <div className="form-group">
                        <Link to={'/auth'}>Пароль эсингиздан чиқдими?</Link>
                    </div>
                    <div className="form-group">
                       <button>Кириш</button>
                    </div>

                </Col>
            </Row>

        </StyledLoginForm>
    );
};

export default LoginForm;
