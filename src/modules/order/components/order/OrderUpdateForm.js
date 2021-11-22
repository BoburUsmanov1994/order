import React, {useEffect, useState} from 'react';
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
import {get} from "lodash";
import HasAccess from "../../../../services/auth/HasAccess";
import config from "../../../../config";

const StyledOrderUpdateForm = styled.form`
`;
const OrderUpdateForm = ({
                             order = {},
                             regions = [],
                             districts = [],
                             neighborhoods = [],
                             ordersStatus = [],
                             basisOrder = [],
                             basisTermination = [],
                             resultOrder = [],
                             update = () => {
                             },
                             getDistrictsByRegion = () => {
                             },
                             getNeighborhoodsByDistrict = () => {

                             },
                             ...props
                         }) => {
    const [givendate, setGivenDate] = useState(moment(get(order,'givendate')).toDate());
    const [endedate, setEndDate] = useState(moment(get(order,'endedate')).toDate());
    const {register, handleSubmit, formState: {errors}, control, setValue} = useForm();
    useEffect(() => {
        if (get(order, 'regiId._id')){
            getDistrictsByRegion(get(order, 'regiId._id', null));
        }
        if (get(order, 'districtId._id')){
            getNeighborhoodsByDistrict(get(order, 'districtId._id', null));
        }
    }, [])

    const onSubmit = (data) => {
        data = {...data, givendate: givendate, endedate: endedate};
        update(data);
    }
    return (
        <StyledOrderUpdateForm onSubmit={handleSubmit(onSubmit)} {...props}>
            <Row className={'mb-48'}>
                <Col xs={3} className={'mb-24'}>
                    <Label>Ҳимоя ордерининг серияси</Label>
                    <Input defaultValue={get(order,'protectionorderseries')} register={register}  label={'Protection order series'}
                           name={'protectionorderseries'} validation={{required: true}}
                           error={errors?.protectionorderseries} sm/>
                </Col>


                <Col xs={3} className={'mb-24'}>
                    <Label>Вилоят</Label>
                    <HasAccess>
                        {
                            ({userCan}) => <FormSelect isDisabled={userCan([config.ROLES.REGION_ADMIN])} defaultValue={get(order,'regiId._id')} onChange={({value}) => getDistrictsByRegion(value)} options={regions}
                                                       setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                                       name={'regiId'}
                                                       label={'Вилоят'} placeholder={'Вилоятни танланг'} error={errors?.regiId}/>
                        }
                    </HasAccess>

                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Туман</Label>
                    <FormSelect defaultValue={get(order,'districtId._id')} onChange={({value}) => getNeighborhoodsByDistrict(value)} options={districts}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'districtId'}
                                label={'Туман'} placeholder={'Туманни танланг'} error={errors?.districtId}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Маҳалла</Label>
                    <FormSelect defaultValue={get(order,'mfy._id')} options={neighborhoods}
                                setValue={setValue} Controller={Controller} control={control}
                                name={'mfyId'}
                                label={'Маҳалла'} placeholder={'Маҳаллани танланг'}/>
                </Col>
                <Col xs={12} className={'mb-24'}>
                    <Label>Тазйиқ ва зўравонлик содир этилган жой</Label>
                    <Textarea defaultValue={get(order,'description')} register={register} label={'Тазйиқ ва зўравонлик содир этилган жой'} name={'description'}
                              validation={{required: true}} error={errors?.description} noshadow sm/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Берилган ордернинг холати</Label>
                    <FormSelect defaultValue={get(order,'orderstatus._id')} options={ordersStatus}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'orderstatus'}
                                label={'Берилган ордернинг холати'} placeholder={'Берилган ордернинг холати'} error={errors?.orderstatus}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Ҳимоя ордери бериш учун асос</Label>
                    <FormSelect defaultValue={get(order,'basisorder._id')} options={basisOrder}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'basisorder'}
                                label={'Ҳимоя ордери бериш учун асос'} placeholder={'Ҳимоя ордери бериш учун асос'} error={errors?.basisorder}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Ҳимоя ордерини тугатиш асослари</Label>
                    <FormSelect defaultValue={get(order,'basistermination._id')} options={basisTermination}
                                setValue={setValue} Controller={Controller}  control={control}
                                name={'basistermination'}
                                label={'Ҳимоя ордерини тугатиш асослари'} placeholder={'Ҳимоя ордерини тугатиш асослари'}
                                error={errors?.basistermination}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Ҳимоя ордери бериш натижаси</Label>
                    <FormSelect defaultValue={get(order,'orederresults._id')} options={resultOrder}
                                setValue={setValue} Controller={Controller}  control={control}
                                name={'orederresults'}
                                label={'Ҳимоя ордери бериш натижаси'} placeholder={'Ҳимоя ордери бериш натижаси'} rule={{required: true}} error={errors?.orederresults}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Ордернинг берилган вақти</Label>
                    <Calendar defaultValue={givendate} onChange={(val) => setGivenDate(val)}/>
                </Col>
                <Col xs={3} className={'mb-24'}>
                    <Label>Ордернинг тугаш вақти</Label>
                    <Calendar defaultValue={endedate} onChange={(val) => setEndDate(val)}/>
                </Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}>
                    <Button success lg>Ўзгартириш</Button>
                </Col>
            </Row>
        </StyledOrderUpdateForm>
    );
};

export default OrderUpdateForm;
