import React from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import {get, includes, isEqual} from "lodash";
import Label from "../../../../components/elements/label";
import Input from "../../../../components/elements/input";
import {Controller, useForm} from "react-hook-form";
import FormSelect from "../../../../components/elements/form-select";
import Button from "../../../../components/button";
import config from "../../../../config";
import InputMask from "react-input-mask";
import classNames from "classnames";
const StyledUserCreateForm = styled.form`
    .form__phone{
      min-width: 250px;
      padding: 15px 25px;
      border-radius: 5px;
      border: 1px solid #707070;
      outline: none;
      font-size: 16px;
      font-weight: 300;
      color: #7E7E7E;
      font-family: 'Ubuntu',sans-serif;
      border-color: #E8E8E8;
      padding: 10px;
      width: 100%;
      font-size: 16px;
    }
`;
const UserCreateForm = ({
                            user = {},
                            regions = [],
                            districts = [],
                            neighborhoods = [],
                            roles = [],
                            ranks = [],
                            statusList = [],
                            create = () => {
                            },
                            getDistrictsByRegion = () => {
                            },
                            getNeighborhoodsByDistrict = () => {

                            },
                            ...props
                        }) => {
    const {register, handleSubmit, formState: {errors}, control, setValue} = useForm();
    const onSubmit = (data) => {
        create(data);
    }
    if(isEqual(get(user,'accountrole.name'),config.ROLES.REGION_ADMIN)){
        regions = regions.filter(item => isEqual(get(item,'value'),get(user,'regionId._id')));
        roles = roles.filter(role => includes([config.ROLES.USER],get(role,'label')));
    }

    return (
        <StyledUserCreateForm onSubmit={handleSubmit(onSubmit)} {...props}>
            <Row className={'mb-48'}>
                <Col xs={3} className={'mb-24'}>
                    <Label>???????????????????????? ????????</Label>
                    <Input register={register} label={'???????????????????????? ????????'} name={'name'} validation={{required: true}}
                           error={errors?.name} sm/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>???????????????????????? ??????????????????</Label>
                    <Input register={register} label={'???????????????????????? ????????'} name={'secondname'}
                           validation={{required: true}}
                           error={errors?.secondname} sm/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>???????????????????????? ????????????</Label>
                    <Input register={register} label={'???????????????????????? ????????'} name={'middlename'}
                           validation={{required: true}}
                           error={errors?.middlename} sm/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Email</Label>
                    <Input register={register} label={'Email'} name={'email'} validation={{
                        required: true,
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    }}
                           error={errors?.email} sm/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>??????????</Label>
                    <Input type={'password'} register={register} label={'??????????'} name={'password'}
                           validation={{required: true}}
                           error={errors?.password} sm/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>??????????????</Label>
                    <Input register={register} label={'??????????????'} name={'position'} validation={{required: true}}
                           error={errors?.position} sm/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Zvaniya</Label>
                    <FormSelect  options={ranks}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'zvaniya'}
                                label={'Zvaniya'} placeholder={'??????????????'} error={errors?.zvaniya}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>?????????????? ??????????</Label>
                   <div>
                       <Controller
                           as={InputMask}
                           control={control}
                           name={'phone'}
                           defaultValue=""
                           rules={{required: true, pattern: /^[0-9-)(]*$/}}
                           render={({field}) => <InputMask value={props.value}
                                                           onChange={props.onChange}   {...field}
                                                           className={classNames('form-control form__phone', {error: errors['phone']})}
                                                           mask="(99)999-99-99" maskChar={null}/>}
                       />
                   </div>
                    {errors.phone && errors['phone']['type'] == 'required' &&
                    <span className={'text-danger'}> M?????????? ?????????????????????? ????????</span>}
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>????????????</Label>
                    <FormSelect onChange={({value}) => getDistrictsByRegion(value)} options={regions}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'regionId'}
                                label={'????????????'} placeholder={'??????????????'} error={errors?.regionId}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>??????????</Label>
                    <FormSelect onChange={({value}) => getNeighborhoodsByDistrict(value)} options={districts}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'districtsId'}
                                label={'??????????'} placeholder={'??????????????'} error={errors?.districtsId}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>??????????????</Label>
                    <FormSelect options={neighborhoods}
                                setValue={setValue} Controller={Controller} control={control}
                                name={'mfyId'}
                                label={'??????????????'} placeholder={'??????????????'}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>?????????????????????? ??????????????</Label>
                    <FormSelect options={statusList}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'accountstatus'}
                                label={'?????????????????????? ??????????????'} placeholder={'??????????????'} error={errors?.accountstatus}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>?????????????????????? ????????</Label>
                    <FormSelect options={roles}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'accountrole'}
                                label={'?????????????????????? ????????'} placeholder={'??????????????'} error={errors?.accountrole}/>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Button success lg>????????????</Button>
                </Col>
            </Row>
        </StyledUserCreateForm>
    );
};

export default UserCreateForm;
