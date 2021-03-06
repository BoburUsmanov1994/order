import React,{useEffect} from 'react';
import {Col, Row} from "react-grid-system";
import RangeCalendar from "../../../components/range-calendar";
import Title from "../../../components/title";
import {Controller, useForm} from "react-hook-form";
import FormSelect from "../../../components/elements/form-select";
import Button from "../../../components/button";
import {get, isEqual} from "lodash";
import classNames from "classnames";
import moment from "moment";
import {Table} from "../../../components/table";
import {connect} from "react-redux";
import OrderScheme from "../../../schema/OrderScheme";
import ApiActions from "../../../services/api/Actions";

const DynamicFilterContainer = ({getDynamicFilterData}) => {
    const {register, handleSubmit, setValue, getValues, control} = useForm();
    const handleCalendar = () => {

    }
    useEffect(()=>{
        getDynamicFilterData({})
    },[])
    return (
        <>
            <Row className={'mb-24'}>
                <Col xs={8} className={'mb-24'}>
                    <Title>Филтер </Title>
                </Col>
                <Col xs={4} className={'text-right'}>
                    <Button success>Натижаларни экспорт қилиш</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <form>
                        <Row>
                            <Col xs={3} className={'mb-24'}>
                                <RangeCalendar handleCalendar={handleCalendar} lg/>
                            </Col>
                            <Col xs={3} className={'mb-24'}>
                                <FormSelect defaultValue={null} options={[]}
                                            setValue={setValue} Controller={Controller} control={control}
                                            name={'regiId'} placeholder={'Вилоятни танланг'}/>
                            </Col>
                            <Col xs={3} className={'mb-24'}>
                                <FormSelect defaultValue={null} options={[]}
                                            setValue={setValue} Controller={Controller} control={control}
                                            name={'regiId'} placeholder={'Туманни танланг'}/>
                            </Col>
                            <Col xs={3} className={'mb-24'}>
                                <FormSelect defaultValue={null} options={[]}
                                            setValue={setValue} Controller={Controller} control={control}
                                            name={'regiId'} placeholder={'Маҳаллани танланг'}/>
                            </Col>
                            <Col xs={3} className={'mb-24'}>
                                <FormSelect defaultValue={null} options={[]}
                                            setValue={setValue} Controller={Controller} control={control}
                                            name={'regiId'} placeholder={'Берилган ордернинг холати'}/>
                            </Col>
                            <Col xs={3} className={'mb-24'}>
                                <FormSelect defaultValue={null} options={[]}
                                            setValue={setValue} Controller={Controller} control={control}
                                            name={'regiId'} placeholder={'Ҳимоя ордери бериш учун асос'}/>
                            </Col>
                            <Col xs={3} className={'mb-24'}>
                                <FormSelect defaultValue={null} options={[]}
                                            setValue={setValue} Controller={Controller} control={control}
                                            name={'regiId'} placeholder={'Ҳимоя ордерини тугатиш асослари'}/>
                            </Col>
                            <Col xs={3} className={'mb-24'}>
                                <FormSelect defaultValue={null} options={[]}
                                            setValue={setValue} Controller={Controller} control={control}
                                            name={'regiId'} placeholder={'Ҳимоя ордери бериш натижаси'}/>
                            </Col>


                        </Row>
                    </form>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Table current={0}

                           totalItems={1}
                           columns={['ID', 'Ҳимоя ордер серияси', 'Вилоят/Туман/Маҳалла',   'Очилиш сабаби', 'Ёпилиш сабаби','Шахсни кўшиш','Ҳолати',  'Ордер берилган\n' +
                           'вақти', ]}>
                        {
                          false ? [1,2].map((order, index) => <tr className={classNames({'bg-danger':isEqual(get(order, 'orderstatus.name'),'узайтирилган'),'bg-success':isEqual(get(order, 'orderstatus.name'),'тугатилган'),'bg-primary':isEqual(get(order, 'orderstatus.name'),'янги берилган')})} key={get(order, '_id')}>
                                <td>{index + 1}</td>
                                <td>{get(order, 'protectionorderseries', '-')}</td>
                                <td>{`${get(order, 'regiId.name', '-')}/${get(order, 'districtId.name', '-')}/${get(order, 'mfyId.name', '-')}`}</td>
                                <td>{get(order, 'basisorder.name', '-')}</td>
                                <td>{get(order, 'basistermination.name', '-')}</td>
                                <td>-</td>
                                <td className={'w-200'}>
                                    {isEqual(get(order, 'orderstatus.name'),'узайтирилган') && <Button danger status>{get(order, 'orderstatus.name', '-')}</Button>}
                                    {isEqual(get(order, 'orderstatus.name'),'тугатилган') && <Button success status>{get(order, 'orderstatus.name', '-')}</Button>}
                                    {isEqual(get(order, 'orderstatus.name'),'янги берилган') && <Button primary status>{get(order, 'orderstatus.name', '-')}</Button>}
                                </td>
                                <td>{moment(get(order, 'createdAt', '-')).format("DD-MM-YYYY")}</td>

                            </tr>) : <tr>
                              <td colSpan={12}>Маълумот мавжуд эмас</td>
                          </tr>
                        }
                    </Table>
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        data: get(state, 'normalizer.data.dynamic-filter-data', []),
        isFetched: get(state, 'normalizer.data.dynamic-filter-data.isFetched', false),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDynamicFilterData: ({
                                   page = 0,
                                   size = 20,
                                   from = null,
                                   to = null,
                                   regiId = null,
                                   distId = null,
                                   mfyId = null,
                                   victypeviolences ,
                                   victyperestrictions ,
                                   vicguardianships,
                                   vicage ,
                                   viccitizens,
                                   vicconditionperson,
                                   viceducation,
                                   vicfamilyposition,
                                   vicgenders,
                                   vicoccurredrepetition,
                                   vicplaceection,
                                   vicsendpreparation,
                                   vicsocialstatus,
                                   vicworkingplace
                               }) => {
            const storeName = 'dynamic-filter-data';
            const entityName = 'order';
            const scheme = {oreders: [OrderScheme]};
            dispatch({
                type: ApiActions.POST_ALL.REQUEST,
                payload: {
                    url: `/reports/report-dynamic`,
                    config: {
                        from,
                        to,
                        // regiId,
                        // distId,
                        // mfyId,
                        victypeviolences ,
                        victyperestrictions ,
                        vicguardianships,
                        vicage ,
                        viccitizens,
                        vicconditionperson,
                        viceducation,
                        vicfamilyposition,
                        vicgenders,
                        vicoccurredrepetition,
                        vicplaceection,
                        vicsendpreparation,
                        vicsocialstatus,
                        vicworkingplace
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DynamicFilterContainer);
