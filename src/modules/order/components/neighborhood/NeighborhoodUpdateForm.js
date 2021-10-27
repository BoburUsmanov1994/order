import React, {useEffect} from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import {Controller, useForm} from "react-hook-form";
import Label from "../../../../components/elements/label";
import Input from "../../../../components/elements/input";
import Button from "../../../../components/button";
import FormSelect from "../../../../components/elements/form-select";
import {get} from "lodash";
import ContentLoader from "../../../../components/loader/ContentLoader";

const StyledNeighborhoodUpdateForm = styled.form`
  h2 {
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: 500;
  }
`;
const NeighborhoodUpdateForm = ({
                                    updateNeighborhood = () => {
                                    },
                                    getDistrictsByRegion = () => {
                                    },
                                    regions = [],
                                    districts = [],
                                    neighborhood = {},
                                    isFetched = false,
                                    ...props
                                }) => {
    useEffect(() => {
        setValue('name', get(neighborhood, 'name'));
        setValue('districtId', get(neighborhood, 'districtId'));
        setValue('regionId', get(neighborhood, 'regionId'));
    }, [neighborhood])
    const {register, handleSubmit, formState: {errors}, control, setValue} = useForm();

    const onSubmit = (data) => {
        updateNeighborhood(data);
    }
    return (
        <>{isFetched ?
            <StyledNeighborhoodUpdateForm onSubmit={handleSubmit(onSubmit)} {...props}>
                <Row>
                    <Col xs={12}>
                        <h2>Малумотни янгилаш</h2>
                    </Col>
                </Row>

                <Row className={'mb-16'}>
                    <Col xs={12}>
                        <Label>Маҳалла номи</Label>
                        <Input defaultValue={get(neighborhood,'name')} register={register} label={'Туман номи'} name={'name'} validation={{required: true}}
                               error={errors?.name} sm/>
                    </Col>
                </Row>
                <Row className={'mb-16'}>
                    <Col xs={12}>
                        <Label>Вилоятни танланг</Label>
                        <FormSelect defaultValue={get(neighborhood,'regionId')} onChange={({value}) => getDistrictsByRegion(value)} options={regions}
                                    setValue={setValue} Controller={Controller} rule={{required: true}}
                                    control={control}
                                    name={'regionId'}
                                    label={'Вилоят'} placeholder={'Вилоятни танланг'} error={errors?.regionId}/>
                    </Col>
                </Row>
                <Row className={'mb-32'}>
                    <Col xs={12}>
                        <Label>Туманни танланг</Label>
                        <FormSelect defaultValue={get(neighborhood,'districtId')} options={districts}
                                    setValue={setValue} Controller={Controller} rule={{required: true}}
                                    control={control}
                                    name={'districtId'}
                                    label={'Туман'} placeholder={'Туманни танланг'} error={errors?.districtId}/>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} className={'text-center'}>
                        <Button type={'submit'} success>Сақлаш</Button>
                    </Col>
                </Row>
            </StyledNeighborhoodUpdateForm> : <ContentLoader/>
        }</>
    );
};

export default NeighborhoodUpdateForm;
