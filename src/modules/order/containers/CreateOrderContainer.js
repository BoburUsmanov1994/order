import React from 'react';
import {Col, Row} from "react-grid-system";
import StepWizard from "react-step-wizard";
import Line from "../../../components/line";
import StepNav from "../../../components/step-nav";
import StepOneForm from "../components/StepOneForm";
import StepTwoForm from "../components/StepTwoForm";
import StepThreeForm from "../components/StepThreeForm";
import StepFourForm from "../components/StepFourForm";

const CreateOrderContainer = (props) => {
    return (
        <>
            <Row>
                <Col xs={12}>
                    <Line>Тазйиқ ва зўравонликдан жабрланган хотин - қизларни ҳисобга олиш ягона статистик карточкаси
                    </Line>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <StepWizard isHashEnabled={true}>
                        <StepOneForm hashKey={"one"}/>
                        <StepTwoForm hashKey={"two"}/>
                        <StepThreeForm hashKey={"three"} />
                        <StepFourForm hashKey={"four"} />
                    </StepWizard>
                </Col>
            </Row>
        </>
    );
};

export default CreateOrderContainer;
