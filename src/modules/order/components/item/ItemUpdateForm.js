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
                              update = () => {
                              },
                              isFetched =false,
                              item = {},
                              ...props
                          }) => {
    const {register, handleSubmit, formState: {errors}, control, setValue} = useForm();
    const onSubmit = (data) => {
        update(data);
    }
    useEffect(() => {
        setValue('name',get(item, 'name'));
    },[item])
    return (
        <>{isFetched ?
            <StyledRegionCreateForm onSubmit={handleSubmit(onSubmit)} {...props}>
                <Row>
                    <Col xs={12}>
                        <h2>Малумотни янгилаш</h2>
                    </Col>
                </Row>

                <Row className={'mb-48'}>
                    <Col xs={12}>
                        <Label>Номи</Label>
                        <Input defaultValue={get(item, 'name')} register={register} label={'Номи'} name={'name'}
                               validation={{required: true}}
                               error={errors?.name} sm/>
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
