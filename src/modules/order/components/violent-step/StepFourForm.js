import React, {useEffect} from 'react';
import styled from "styled-components";
import {Row,Col} from "react-grid-system";
import {Controller, useForm} from "react-hook-form";
import Title from "../../../../components/title";
import StepNav from "../../../../components/step-nav";
import Button from "../../../../components/button";
import Label from "../../../../components/elements/label";
import {get} from "lodash";
import FormSelect from "../../../../components/elements/form-select";
import Textarea from "../../../../components/elements/textarea";


const StyledStepFourForm = styled.form`
`;
const StepFourForm = ({reset=()=>{},create = () =>{},typeviolence=[],typerestrictions=[],actionsPersonViolenceList=[],occuredRepetitionList=[],
                          reasonViolenceList=[],
                          behaviorList=[],
                          stateViolenceList=[],
                          personViolence=[],
                          conditionPersonViolenceList=[],
                          criminalCaseList=[],
                          criminalCodexList=[],
                          administrativeList=[],
                          administrativeCodexList=[],
                          ...props}) => {
    const { register, handleSubmit, watch, formState: { errors },setValue,control } = useForm();


    const onSubmit = (data) => {
     create(data);
    }

    const firstStep = () => {
        reset({firstStep: props.firstStep})
    }

    return (
        <StyledStepFourForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Row >
                <Col xs={12}><StepNav step={props.currentStep}/></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}><Title>4. Зўравоннинг ўтказилган зўравонлик ҳақида маълумот</Title></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={6} className={'mb-32'}>
                    <Label>Тазйиқ ва зўравонликнинг қисқача фабуласи</Label>
                    <Textarea register={register} label={'Айни вақтда яшаш манзили'} name={'briefinformation'}
                              validation={{required: true}} error={errors?.briefinformation} noshadow sm/>
                </Col>
                <Col xs={6} className={'mb-32'}>
                    <Label>Судланганлик ҳолати</Label>
                    <Textarea register={register} label={'Айни вақтда яшаш манзили'} name={'sudlangan'}
                              validation={{required: true}} error={errors?.sudlangan} noshadow sm/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label >Тазйиқ ва зўравонлик
                        турлари </Label>
                    <FormSelect
                                 options={typeviolence}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'typeviolencesId'}
                                label={'Тазйиқ ва зўравонлик\n' +
                                '                        турлари'} placeholder={'Тазйиқ ва зўравонлик\n' +
                    '                        турлари'}
                                error={errors?.typeviolencesId} isMulti/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label >Тазйиқ ўтказган ёки зўравонлик содир этган  этишга белгиланган чекловлар</Label>
                    <FormSelect
                         options={typerestrictions}
                        setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                        name={'typerestrictionsId'}
                        label={'Чеклов турлари'} placeholder={''}
                        error={errors?.typerestrictionsId} isMulti/>
                </Col>

                <Col xs={4} className={'mb-32'}>
                    <Label >Такрорийлиги</Label>
                    <FormSelect
                        options={occuredRepetitionList}
                        setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                        name={'occurredrepetitionId'}
                        label={'Такрорийлиги'} placeholder={'Такрорийлиги'}
                        error={errors?.occurredrepetitionId}/>
                </Col>

                <Col xs={4} className={'mb-32'}>
                    <Label >Тазйиқ ким томондан содир этилганлиги</Label>
                    <FormSelect
                        options={actionsPersonViolenceList}
                        setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                        name={'ectionspersonviolencesId'}
                        label={'Тазйиқ ким томондан содир этилганлиги'} placeholder={'Тазйиқ ким томондан содир этилганлиги'}
                        error={errors?.ectionspersonviolencesId}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label >Зўравонлик содир этиш сабабалари</Label>
                    <FormSelect
                        rule={{required: true}}
                        options={reasonViolenceList}
                        setValue={setValue} Controller={Controller}  control={control}
                        name={'reasonviolenceId'}
                        label={'Зўравонлик содир этиш сабабалари'} placeholder={'Зўравонлик содир этиш сабабалари'}
                        error={errors?.reasonviolenceId}/>
                </Col>

                <Col xs={4} className={'mb-32'}>
                    <Label >Тазйиқ содир этишга шахсни ҳулқ-атворини тузатиш дастурига</Label>
                    <FormSelect
                        rule={{required: true}}
                        options={behaviorList}
                        setValue={setValue} Controller={Controller}  control={control}
                        name={'behaviorId'}
                        label={'Тазйиқ содир этишга шахсни ҳулқ-атворини тузатиш дастурига'} placeholder={''}
                        error={errors?.behaviorId}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label >Тазйиқ ва зўравонлик содир этган ҳолати</Label>
                    <FormSelect
                        rule={{required: true}}
                        options={stateViolenceList}
                        setValue={setValue} Controller={Controller}  control={control}
                        name={'stateviolenceId'}
                        label={'Тазйиқ ва зўравонлик содир этган ҳолати'} placeholder={''}
                        error={errors?.stateviolenceId}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>Тазйиқ ва зўравонлик содир этган шахс ҳолати</Label>
                    <FormSelect
                        rule={{required: true}}
                        options={personViolence}
                        setValue={setValue} Controller={Controller}  control={control}
                        name={'personviolenceId'}
                        label={'Тазйиқ ва зўравонлик содир этган шахс ҳолати'} placeholder={''}
                        error={errors?.personviolenceId}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>Тазйиқ ва зўравонлик содир этган шахс ҳолати (юборилганлиги)</Label>
                    <FormSelect
                        rule={{required: true}}
                        options={conditionPersonViolenceList}
                        setValue={setValue} Controller={Controller}  control={control}
                        name={'conditionpersonviolenceId'}
                        label={'Тазйиқ ва зўравонлик содир этган шахс ҳолати (юборилганлиги)'} placeholder={''}
                        error={errors?.conditionpersonviolenceId}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>Ушбу ҳолат жиноят иши қўзғатилганлиги</Label>
                    <FormSelect
                        rule={{required: true}}
                        options={criminalCaseList}
                        setValue={setValue} Controller={Controller}  control={control}
                        name={'criminalcaseId'}
                        label={'Ушбу ҳолат жиноят иши қўзғатилганлиги'} placeholder={''}
                        error={errors?.criminalcaseId}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>Жиноят кодекси модалари</Label>
                    <FormSelect
                        options={criminalCodexList}
                        setValue={setValue} Controller={Controller}  control={control}
                        name={'criminalcodexId'}
                        label={'Жиноят кодекси модалари'} placeholder={''}
                        error={errors?.criminalcodexId}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>Ушбу ҳолат бўйича маъмурий жавобгарликка тортилганлиги</Label>
                    <FormSelect
                        rule={{required: true}}
                        options={administrativeList}
                        setValue={setValue} Controller={Controller}  control={control}
                        name={'administrativeworkId'}
                        label={'Ушбу ҳолат бўйича маъмурий жавобгарликка тортилганлиги'} placeholder={''}
                        error={errors?.administrativeworkId}/>
                </Col>


                <Col xs={4} className={'mb-32'}>
                    <Label>Маъмурий кодекси моддалари</Label>
                    <FormSelect
                        options={administrativeCodexList}
                        setValue={setValue} Controller={Controller}  control={control}
                        name={'administrativecodexId'}
                        label={'Маъмурий кодекси моддалари'} placeholder={''}
                        error={errors?.administrativecodexId}/>
                </Col>

            </Row>

            <Row className={'mb-48'}>
                <Col xs={12}>
                    <Button className={'mr-16'} type={'button'} onClick={firstStep} danger outlined back>Қайта
                        киритиш</Button>
                    <Button className={'mr-16'} type={'button'} onClick={() => props.previousStep()}
                            outlined>Ортга</Button>
                    <Button type={'submit'} success>Маълумотларни сақлаш</Button>
                </Col>
            </Row>
        </StyledStepFourForm>
    );
};

export default StepFourForm;
