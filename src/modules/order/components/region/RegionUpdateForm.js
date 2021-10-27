import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import {useForm} from "react-hook-form";
import {get} from "lodash";
import Label from "../../../../components/elements/label";
import Input from "../../../../components/elements/input";
import Textarea from "../../../../components/elements/textarea";
import Button from "../../../../components/button";
import ContentLoader from "../../../../components/loader/ContentLoader";

const StyledRegionCreateForm = styled.form`
  h2 {
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: 500;
  }
`;
const RegionCreateForm = ({
                              updateRegion = () => {
                              },
                              isFetched =false,
                              region = {},
                              ...props
                          }) => {
    const {register, handleSubmit, formState: {errors}, control, setValue} = useForm();
    const onSubmit = (data) => {
        updateRegion(data);
    }
    useEffect(() => {
        setValue('name',get(region, 'name'));
        setValue('viewBox',get(region, 'viewBox'));
        setValue('transform',get(region, 'transform'));
        setValue('pathd',get(region, 'pathd'));
    },[region])
    return (
        <>{isFetched ?
        <StyledRegionCreateForm onSubmit={handleSubmit(onSubmit)} {...props}>
            <Row>
                <Col xs={12}>
                    <h2>Малумотни янгилаш</h2>
                </Col>
            </Row>

            <Row className={'mb-16'}>
                <Col xs={12}>
                    <Label>Вилоят номи</Label>
                    <Input defaultValue={get(region, 'name')} register={register} label={'Вилоят номи'} name={'name'}
                           validation={{required: true}}
                           error={errors?.name} sm/>
                </Col>
            </Row>
            <Row className={'mb-16'}>
                <Col xs={12}>
                    <Label>ViewBox</Label>
                    <Input defaultValue={get(region, 'viewBox')} sm register={register} label={'ViewBox'}
                           name={'viewBox'} validation={{required: true}}
                           error={errors?.viewBox}/>
                </Col>
            </Row>
            <Row className={'mb-16'}>
                <Col xs={12}>
                    <Label>Transform</Label>
                    <Input defaultValue={get(region, 'transform')} sm register={register} label={'Transform'} name={'transform'}  validation={{required: true}} error={errors?.transform}/>
                </Col>
            </Row>
            <Row className={'mb-24'}>
                <Col xs={12}>
                    <Label>PATH</Label>
                    <Textarea defaultValue={get(region, 'pathd')} register={register} label={'PATH'} name={'pathd'}
                              validation={{required: true}}
                              error={errors?.pathd} noshadow sm/>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className={'text-center'}>
                    <Button type={'submit'} success>Сақлаш</Button>
                </Col>
            </Row>
        </StyledRegionCreateForm>:<ContentLoader />
        }</>
    );
};

export default RegionCreateForm;
