import React from 'react';
import styled from "styled-components";
import {Row,Col} from "react-grid-system";
import { useForm } from "react-hook-form";
import Title from "../../../components/title";
import StepNav from "../../../components/step-nav";
import Button from "../../../components/button";
import Label from "../../../components/elements/label";
import FormSelect from "../../../components/elements/form-select";
import Textarea from "../../../components/elements/textarea";
import CustomCheckbox from "../../../components/elements/checkbox";


const StyledStepFourForm = styled.form`
`;
const StepFourForm = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <StyledStepFourForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col xs={12}><StepNav step={props.currentStep}/></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}><Title>4. Жабрланувчининг ўтказилган зўравонлик ҳақида маълумот</Title></Col>
            </Row>
            <Row >
                <Col xs={6} className={'mb-32'}>
                    <Label>Судланганлик ҳолати</Label>
                    <Textarea />
                </Col>
                <Col xs={6} className={'mb-32'}>
                    <Label>Тазйиқ ва зўравонликнинг қисқача фабуласи</Label>
                    <Textarea />
                </Col>
                <Col xs={5} className={'mb-32'}>
                    <Label hasBorder>Тазйиқ ким томонидан <br/>
                        содир этилганлиги </Label>
                    <Row>
                        <Col xs={4}>
                            <CustomCheckbox className={'mt-16'} label={'Эр-хотинга'}/>
                            <CustomCheckbox className={'mt-16'} label={'Қайнона-келинга'}/>
                            <CustomCheckbox className={'mt-16'} label={'Ака-синглисига'}/>
                        </Col>
                        <Col xs={4}>
                            <CustomCheckbox className={'mt-16'} label={'Йигит-қизга'}/>
                            <CustomCheckbox className={'mt-16'} label={'Бошлиқ-ҳодимга'}/>
                            <CustomCheckbox className={'mt-16'} label={'Ҳодим-ҳодимга'}/>
                        </Col>
                        <Col xs={4}>
                            <CustomCheckbox className={'mt-16'} label={'Қариндошларга'}/>
                            <CustomCheckbox className={'mt-16'} label={'Вояга етганга нисбатан'}/>
                            <CustomCheckbox className={'mt-16'} label={'Қўшнисига'}/>
                        </Col>
                    </Row>
                </Col>
                <Col xs={2} className={'mb-32'}>
                    <Label hasBorder>Тазйиқ ва зўравонлик <br/>
                        содир этган шахс ҳолати</Label>
                    <Row>
                        <Col xs={12}>
                            <CustomCheckbox className={'mt-16'} label={'Ҳомиладор'}/>
                            <CustomCheckbox className={'mt-16'} label={'1,2-3 гуруҳ ногирони'}/>
                            <CustomCheckbox className={'mt-16'} label={'Руҳий казал'}/>
                        </Col>
                    </Row>
                </Col>
                <Col xs={5} className={'mb-32'}>
                    <Label hasBorder>Зўравонлик содир <br/>
                        этиш сабаблари </Label>
                    <Row gutterWidth={10}>
                        <Col xs={4}>
                            <CustomCheckbox className={'mt-16'} label={'Моддий етишмовчилик'}/>
                            <CustomCheckbox className={'mt-16'} label={'Рашк'}/>
                            <CustomCheckbox className={'mt-16'} label={'Ичкилик оқибатлари'}/>
                        </Col>
                        <Col xs={4}>
                            <CustomCheckbox className={'mt-16'} label={'Психотроп Оки гидхвандлик'}/>
                            <CustomCheckbox className={'mt-16'} label={'Оилавий низо '}/>
                            <CustomCheckbox className={'mt-16'} label={'Қарздорлик'}/>
                        </Col>
                        <Col xs={4}>
                            <CustomCheckbox className={'mt-16'} label={'Қасддан'}/>
                            <CustomCheckbox className={'mt-16'} label={'Эхтиётсизлик оқибатлари'}/>
                            <CustomCheckbox className={'mt-16'} label={'Ўзаро низо оқибатлари'}/>
                        </Col>
                    </Row>

                </Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}>
                    <hr/>
                </Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={2} className={'mb-32'}>
                    <Label hasBorder>Тазйиқ ва зўравонлик <br/>
                        содир этган шахс ҳолати </Label>
                    <Row>
                        <Col xs={12}>
                            <CustomCheckbox className={'mt-16'} label={'Мастлик ҳолда'}/>
                            <CustomCheckbox className={'mt-16'} label={'Гиёҳванд ва психотроп воситалар таъсирида '}/>
                            <CustomCheckbox className={'mt-16'} label={'Руҳий казал'}/>
                        </Col>
                    </Row>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label hasBorder>Тазйиқ ва зўравонлик <br/>
                        турлари</Label>
                    <Row>
                        <Col xs={6}>
                            <CustomCheckbox className={'mt-16'} label={'Жинсий зўравонлик '}/>
                            <CustomCheckbox className={'mt-16'} label={'Жисмоний зўравонлик'}/>
                            <CustomCheckbox className={'mt-16'} label={'Зўравонлик'}/>
                        </Col>
                        <Col xs={6}>
                            <CustomCheckbox className={'mt-16'} label={'Иқтисодий зўравонлик'}/>
                            <CustomCheckbox className={'mt-16'} label={'Руҳий зўравонлик'}/>
                            <CustomCheckbox className={'mt-16'} label={'Тазйиқ'}/>
                        </Col>
                    </Row>
                </Col>
                <Col xs={6} className={'mb-32'}>
                    <Label hasBorder>Тазйиқ содир этишга шахсни ҳулқ-атворини <br/>
                        тузатиш дастурига </Label>
                    <Row>
                        <Col xs={4}>
                            <CustomCheckbox className={'mt-16'} label={'Иқтисодий зўравонлик'}/>
                            <CustomCheckbox className={'mt-16'} label={'Руҳий зўравонлик'}/>
                            <CustomCheckbox className={'mt-16'} label={'Тазйиқ'}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}>
                    <Button className={'mr-16'} onClick={() => props.firstStep()} danger outlined>Қайта киритиш</Button>
                    <Button className={'mr-16'} onClick={() => props.previousStep()} outlined>Ортга</Button>
                    <Button className={'mr-16'} outlined>Маълумотларни сақлаш</Button>
                    <Button onClick={() => props.nextStep()} success>Кейинги</Button>
                </Col>
            </Row>
        </StyledStepFourForm>
    );
};

export default StepFourForm;
