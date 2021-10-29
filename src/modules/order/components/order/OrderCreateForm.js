import React,{useState} from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import moment from "moment";
import Label from "../../../../components/elements/label";
import Input from "../../../../components/elements/input";
import {Controller, useForm} from "react-hook-form";
import FormSelect from "../../../../components/elements/form-select";
import Button from "../../../../components/button";
import Textarea from "../../../../components/elements/textarea";
import Calendar from "../../../../components/elements/calendar";

const StyledOrderCreateForm = styled.form`
`;
const OrderCreateForm = ({
                             regions = [],
                             districts = [],
                             neighborhoods = [],
                             ordersStatus = [],
                             basisOrder = [],
                             basisTermination=[],
                             resultOrder = [],
                             create = () => {
                             },
                             getDistrictsByRegion = () => {
                             },
                             getNeighborhoodsByDistrict = () => {

                             },
                             ...props
                         }) => {
    const [givendate,setGivenDate] = useState(moment().subtract(1, 'months').toDate());
    const [endedate,setEndDate] = useState(moment().toDate());

    const {register, handleSubmit, formState: {errors}, control, setValue} = useForm();
    const onSubmit = (data) => {
        data = {...data,givendate:givendate,endedate:endedate};
        create(data);
    }
    return (
        <StyledOrderCreateForm onSubmit={handleSubmit(onSubmit)} {...props}>
            <Row className={'mb-32'}>
                <Col xs={3} className={'mb-24'}>
                    <Label>Ҳимоя ордерининг серияси</Label>
                    <Input register={register} type={'number'} label={'Ҳимоя ордерининг серияси'}
                           name={'protectionorderseries'} validation={{required: true}}
                           error={errors?.protectionorderseries} sm/>
                </Col>


                <Col xs={3} className={'mb-24'}>
                    <Label>Вилоят</Label>
                    <FormSelect onChange={({value}) => getDistrictsByRegion(value)} options={regions}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'regiId'}
                                label={'Вилоят'} placeholder={'Вилоятни танланг'} error={errors?.regiId}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Туман</Label>
                    <FormSelect onChange={({value}) => getNeighborhoodsByDistrict(value)} options={districts}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'districtId'}
                                label={'Туман'} placeholder={'Туманни танланг'} error={errors?.districtId}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Маҳалла</Label>
                    <FormSelect options={neighborhoods}
                                setValue={setValue} Controller={Controller} control={control}
                                name={'mfyId'}
                                label={'Маҳалла'} placeholder={'Маҳаллани танланг'}/>
                </Col>
                <Col xs={12} className={'mb-24'}>
                    <Label>Тазйиқ ва зўравонлик содир этилган жой</Label>
                    <Textarea register={register} label={'Тазйиқ ва зўравонлик содир этилган жой'} name={'description'}
                              validation={{required: true}} error={errors?.description} noshadow sm/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Берилган ордернинг холати</Label>
                    <FormSelect options={ordersStatus}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'orderstatus'}
                                label={'Order status'} placeholder={'Берилган ордернинг холати'} error={errors?.orderstatus}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Ҳимоя ордери бериш учун асос</Label>
                    <FormSelect options={basisOrder}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'basisorder'}
                                label={'Ҳимоя ордери бериш учун асос'} placeholder={'Ҳимоя ордери бериш учун асос'} error={errors?.basisorder}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Ҳимоя ордерини тугатиш асослари</Label>
                    <FormSelect options={basisTermination}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'basistermination'}
                                label={'Ҳимоя ордерини тугатиш асослари'} placeholder={'Ҳимоя ордерини тугатиш асослари'} error={errors?.basistermination}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Ҳимоя ордери бериш натижаси</Label>
                    <FormSelect options={resultOrder}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'orederresults'}
                                label={'Basis order'} placeholder={'Ҳимоя ордери бериш натижаси'} error={errors?.orederresults}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Ордернинг берилган вақти</Label>
                    <Calendar sm defaultValue={givendate} onChange={(val) => setGivenDate(val)}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Ордернинг тугаш вақти</Label>
                    <Calendar sm defaultValue={endedate} onChange={(val) => setEndDate(val)} />
                </Col>
            </Row>
            <Row className={'mb-32'}>
                <Col xs={12}>
                    <Button success lg>Яратиш</Button>
                </Col>
            </Row>
        </StyledOrderCreateForm>
    );
};

export default OrderCreateForm;
