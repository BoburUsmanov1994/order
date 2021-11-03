import React, {useEffect} from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import {Controller, useForm} from "react-hook-form";
import Label from "../../../../components/elements/label";
import Input from "../../../../components/elements/input";
import Textarea from "../../../../components/elements/textarea";
import Button from "../../../../components/button";
import FormSelect from "../../../../components/elements/form-select";

const StyledRegionCreateForm = styled.form`
  h2 {
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: 500;
  }
`;
const DistrictCreateForm = ({
                                createDistrict = () => {
                                },
                                regions = [],
                                ...props
                            }) => {
    const {register, handleSubmit, formState: {errors}, control, setValue} = useForm();

    const onSubmit = (data) => {
        createDistrict(data);
    }

    return (
        <StyledRegionCreateForm onSubmit={handleSubmit(onSubmit)} {...props}>
            <Row>
                <Col xs={12}>
                    <h2>Маълумотларни базага киритиш</h2>
                </Col>
            </Row>

            <Row className={'mb-16'}>
                <Col xs={12}>
                    <Label>Туман номи</Label>
                    <Input register={register} label={'Туман номи'} name={'name'} validation={{required: true}}
                           error={errors?.name} sm/>
                </Col>
            </Row>
            <Row className={'mb-16'}>
                <Col xs={12}>
                    <Label>Вилоятни танланг</Label>
                    <FormSelect options={regions}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'regiId'}
                                label={'Вилоят'} placeholder={'Вилоятни танланг'} error={errors?.regiId}/>
                </Col>
            </Row>
            <Row className={'mb-16'}>
                <Col xs={12}>
                    <Label>ViewBox</Label>
                    <Input sm register={register} label={'ViewBox'} name={'viewBox'} validation={{required: true}}
                           error={errors?.viewBox}/>
                </Col>
            </Row>
            <Row className={'mb-16'}>
                <Col xs={12}>
                    <Label>Transform</Label>
                    <Input sm register={register} label={'Transform'} name={'transform'}  validation={{required: true}} error={errors?.transform}/>
                </Col>
            </Row>
            <Row className={'mb-24'}>
                <Col xs={12}>
                    <Label>PATH</Label>
                    <Textarea register={register} label={'PATH'} name={'pathd'} validation={{required: true}}
                              error={errors?.pathd} noshadow sm/>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className={'text-center'}>
                    <Button type={'submit'} success>Сақлаш</Button>
                </Col>
            </Row>
        </StyledRegionCreateForm>
    );
};

export default DistrictCreateForm;
