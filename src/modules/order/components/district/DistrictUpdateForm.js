import React, {useEffect} from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import {Controller, useForm} from "react-hook-form";
import {get} from "lodash";
import Label from "../../../../components/elements/label";
import Input from "../../../../components/elements/input";
import Textarea from "../../../../components/elements/textarea";
import Button from "../../../../components/button";
import ContentLoader from "../../../../components/loader/ContentLoader";
import FormSelect from "../../../../components/elements/form-select";

const StyledDistrictUpdateForm = styled.form`
  h2 {
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: 500;
  }
`;
const DistrictUpdateForm = ({
                                updateDistrict = () => {
                                },
                                isFetched = false,
                                district = {},
                                regions = [],
                                ...props
                            }) => {
    const {register, handleSubmit, formState: {errors}, control, setValue} = useForm();
    const onSubmit = (data) => {
        updateDistrict(data);
    }
    useEffect(() => {
        setValue('name', get(district, 'name'));
        setValue('viewBox', get(district, 'viewBox'));
        setValue('transform',get(district, 'transform'));
        setValue('pathd', get(district, 'pathd'));
        setValue('regiId', get(district, 'regiId'));
    }, [district])
    return (
        <>{isFetched ?
            <StyledDistrictUpdateForm onSubmit={handleSubmit(onSubmit)} {...props}>
                <Row>
                    <Col xs={12}>
                        <h2>Малумотни янгилаш</h2>
                    </Col>
                </Row>

                <Row className={'mb-16'}>
                    <Col xs={12}>
                        <Label>Туман номи</Label>
                        <Input defaultValue={get(district, 'name')} register={register} label={'Вилоят номи'}
                               name={'name'}
                               validation={{required: true}}
                               error={errors?.name} sm/>
                    </Col>
                </Row>
                <Row className={'mb-16'}>
                    <Col xs={12}>
                        <Label>Вилоятни танланг</Label>
                        <FormSelect defaultValue={get(district,'regiId')} options={regions}
                                    setValue={setValue} Controller={Controller} rule={{required: true}}
                                    control={control}
                                    name={'regiId'}
                                    label={'Вилоят'} placeholder={'Вилоятни танланг'} error={errors?.regiId}/>
                    </Col>
                </Row>
                <Row className={'mb-16'}>
                    <Col xs={12}>
                        <Label>ViewBox</Label>
                        <Input defaultValue={get(district, 'viewBox')} sm register={register} label={'ViewBox'}
                               name={'viewBox'} validation={{required: true}}
                               error={errors?.viewBox}/>
                    </Col>
                </Row>
                <Row className={'mb-16'}>
                    <Col xs={12}>
                        <Label>Transform</Label>
                        <Input defaultValue={get(district, 'transform')} sm register={register} label={'Transform'} name={'transform'}  validation={{required: true}} error={errors?.transform}/>
                    </Col>
                </Row>
                <Row className={'mb-24'}>
                    <Col xs={12}>
                        <Label>PATH</Label>
                        <Textarea defaultValue={get(district, 'pathd')} register={register} label={'PATH'}
                                  name={'pathd'}
                                  validation={{required: true}}
                                  error={errors?.pathd} noshadow sm/>
                    </Col>
                </Row>
                <Row className={'mb-24'}>
                    <Col xs={12}>
                        <Label>Circle dot</Label>
                        <Textarea defaultValue={get(district, 'circle')} register={register} label={'Circle dot'}
                                  name={'circle'}
                                  noshadow sm/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className={'text-center'}>
                        <Button type={'submit'} success>Сақлаш</Button>
                    </Col>
                </Row>
            </StyledDistrictUpdateForm> : <ContentLoader/>
        }</>
    );
};

export default DistrictUpdateForm;
