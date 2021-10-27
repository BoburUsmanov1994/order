import React from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import {Controller, useForm} from "react-hook-form";
import Label from "../../../../components/elements/label";
import Input from "../../../../components/elements/input";
import Textarea from "../../../../components/elements/textarea";
import Button from "../../../../components/button";

const StyledItemCreateForm = styled.form`
  h2 {
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: 500;
  }
`;
const ItemCreateForm = ({
                              create = () => {
                              },
                              ...props
                          }) => {
    const {register, handleSubmit, formState: {errors}, control, setValue} = useForm();
    const onSubmit = (data) => {
        create(data);
    }
    return (
        <StyledItemCreateForm onSubmit={handleSubmit(onSubmit)} {...props}>
            <Row>
                <Col xs={12}>
                    <h2>Маълумотларни базага киритиш</h2>
                </Col>
            </Row>

            <Row className={'mb-48'}>
                <Col xs={12}>
                    <Label>Номи</Label>
                    <Input register={register} label={'Номи'}  name={'name'}  validation={{required: true}} error={errors?.name} sm/>
                </Col>
            </Row>

            <Row>
                <Col xs={12} className={'text-center'}>
                    <Button type={'submit'} success>Сақлаш</Button>
                </Col>
            </Row>
        </StyledItemCreateForm>
    );
};

export default ItemCreateForm;
