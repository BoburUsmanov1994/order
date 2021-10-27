import React from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import {Controller, useForm} from "react-hook-form";
import Label from "../../../../components/elements/label";
import Input from "../../../../components/elements/input";
import Button from "../../../../components/button";
import FormSelect from "../../../../components/elements/form-select";

const StyledNeighborhoodCreateForm = styled.form`
  h2 {
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: 500;
  }
`;
const NeighborhoodCreateForm = ({
                                    createNeighborhood = () => {
                                    },
                                    getDistrictsByRegion = () => {
                                    },
                                    regions = [],
                                    districts = [],
                                    ...props
                                }) => {
    const {register, handleSubmit, formState: {errors}, control, setValue} = useForm();

    const onSubmit = (data) => {
        createNeighborhood(data);
    }
    return (
        <StyledNeighborhoodCreateForm onSubmit={handleSubmit(onSubmit)} {...props}>
            <Row>
                <Col xs={12}>
                    <h2>Маълумотларни базага киритиш</h2>
                </Col>
            </Row>

            <Row className={'mb-16'}>
                <Col xs={12}>
                    <Label>Маҳалла номи</Label>
                    <Input register={register} label={'Туман номи'} name={'name'} validation={{required: true}}
                           error={errors?.name} sm/>
                </Col>
            </Row>
            <Row className={'mb-16'}>
                <Col xs={12}>
                    <Label>Вилоятни танланг</Label>
                    <FormSelect onChange={({value}) => getDistrictsByRegion(value)}  options={regions}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'regionId'}
                                label={'Вилоят'} placeholder={'Вилоятни танланг'} error={errors?.regionId}/>
                </Col>
            </Row>
            <Row className={'mb-32'}>
                <Col xs={12}>
                    <Label>Туманни танланг</Label>
                    <FormSelect options={districts}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'districtId'}
                                label={'Туман'} placeholder={'Туманни танланг'} error={errors?.districtId}/>
                </Col>
            </Row>

            <Row>
                <Col xs={12} className={'text-center'}>
                    <Button type={'submit'} success>Сақлаш</Button>
                </Col>
            </Row>
        </StyledNeighborhoodCreateForm>
    );
};

export default NeighborhoodCreateForm;
