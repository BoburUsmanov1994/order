import React, {useEffect} from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import {get} from "lodash";
import Label from "../../../../components/elements/label";
import Input from "../../../../components/elements/input";
import {Controller, useForm} from "react-hook-form";
import FormSelect from "../../../../components/elements/form-select";
import Button from "../../../../components/button";
import HasAccess from "../../../../services/auth/HasAccess";
import config from "../../../../config";

const StyledUserCreateForm = styled.form`
`;
const UserCreateForm = ({
                            user,
                            regions = [],
                            districts = [],
                            neighborhoods = [],
                            roles = [],
                            statusList = [],
                            update = () => {
                            },
                            getDistrictsByRegion = () => {
                            },
                            getNeighborhoodsByDistrict = () => {

                            },
                            ...props
                        }) => {
    useEffect(() => {
        if (get(user, 'regionId._id')){
            getDistrictsByRegion(get(user, 'regionId._id', null));
        }
        if (get(user, 'districtsId._id')){
            getNeighborhoodsByDistrict(get(user, 'districtsId._id', null));
        }
    }, [])
    const {register, handleSubmit, formState: {errors}, control, setValue} = useForm();
    const onSubmit = (data) => {
        update(data);
    }
    return (
        <StyledUserCreateForm onSubmit={handleSubmit(onSubmit)} {...props}>
            <Row className={'mb-48'}>
                <Col xs={3} className={'mb-24'}>
                    <Label>Фойдаланувчи исми</Label>
                    <Input defaultValue={get(user,'name')} register={register} label={'Фойдаланувчи исми'} name={'name'} validation={{required: true}}
                           error={errors?.name} sm/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Фойдаланувчи фамилияси</Label>
                    <Input defaultValue={get(user,'secondname')} register={register} label={'Фойдаланувчи исми'} name={'secondname'}
                           validation={{required: true}}
                           error={errors?.secondname} sm/>
                </Col>
                <Col  xs={3} className={'mb-24'}>
                    <Label>Фойдаланувчи шарифи</Label>
                    <Input defaultValue={get(user,'middlename')} register={register} label={'Фойдаланувчи исми'} name={'middlename'}
                           validation={{required: true}}
                           error={errors?.middlename} sm/>
                </Col>
                <Col  xs={3} className={'mb-24'}>
                    <Label>Email</Label>
                    <Input defaultValue={get(user,'email')} register={register} label={'Email'} name={'email'} validation={{
                        required: true,
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    }}
                           error={errors?.email} sm/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Парол</Label>
                    <Input  type={'password'} register={register} label={'Парол'} name={'password'} sm/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Лавозим</Label>
                    <Input defaultValue={get(user,'position')} register={register} label={'Лавозим'} name={'position'} validation={{required: true}}
                           error={errors?.position} sm/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Вилоят</Label>
                    <HasAccess>
                        {
                            ({userCan}) => <FormSelect isDisabled={userCan([config.ROLES.REGION_ADMIN])} defaultValue={get(user, 'regionId._id')}
                                        onChange={({value}) => getDistrictsByRegion(value)} options={regions}
                                        setValue={setValue} Controller={Controller} rule={{required: true}}
                                        control={control}
                                        name={'regionId'}
                                        label={'Вилоят'} placeholder={'Танланг'} error={errors?.regionId}/>
                        }
                    </HasAccess>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Туман</Label>
                    <FormSelect defaultValue={get(user,'districtsId._id')} onChange={({value}) => getNeighborhoodsByDistrict(value)} options={districts}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'districtsId'}
                                label={'Туман'} placeholder={'Танланг'} error={errors?.districtsId}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Маҳалла</Label>
                    <FormSelect defaultValue={get(user,'mfyId._id')} options={neighborhoods}
                                setValue={setValue} Controller={Controller} control={control}
                                name={'mfyId'}
                                label={'Маҳалла'} placeholder={'Танланг'}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Фойдалаувчи статуси</Label>
                    <FormSelect defaultValue={get(user,'accountstatus._id')} options={statusList}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'status'}
                                label={'Фойдалаувчи статуси'} placeholder={'Танланг'} error={errors?.status}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Фойдалаувчи роли
                    </Label>
                    <HasAccess>
                        {
                            ({userCan}) =><FormSelect isDisabled={userCan([config.ROLES.REGION_ADMIN])} defaultValue={get(user,'accountrole._id')} options={roles}
                                                      setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                                      name={'role'}
                                                      label={'Фойдалаувчи роли'} placeholder={'Танланг'} error={errors?.role}/>
                        }
                    </HasAccess>

                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Button success lg>Ўзгартириш</Button>
                </Col>
            </Row>
        </StyledUserCreateForm>
    );
};

export default UserCreateForm;
