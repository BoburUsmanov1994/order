import React from 'react';
import styled from "styled-components";
import {Row,Col} from 'react-grid-system';
import {get} from "lodash";
import Flex from "../flex/Flex";
import teamIcon from "../../assets/images/icons/team.png";
import flagIcon from "../../assets/images/icons/flag.png";
import calendarIcon from "../../assets/images/icons/appointments.png";
import Text from "../text";

const StyledOrderItem = styled.div`
  border: 1px solid #707070;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 15px;
  h2{
    font-size: 24px;
    font-weight: 400;
    color: #707070;
  }
  .hasBorderBottom{
    padding-bottom: 10px;
    border-bottom: 1px solid #DE1010;
  }
  .ml-30{
    margin-left: 45px;
  }
`;
const OrderItem = ({item,...props}) => {
    return (
        <StyledOrderItem {...props}>
            <Row className={'mb-24'}>
                <Col xs={12} >
                   <Flex className={'hasBorderBottom'}> <h2 className={'mr-16'}>Ф.И.Ш.:</h2><h2>Шохида Наджимова Рахимбердиева</h2></Flex>
                </Col>
            </Row>
            <Row>
                <Col xs={4}>
                    <Flex className={'mb-16'}>
                        <img src={teamIcon} className={'mr-16'} alt=""/> <Text>Фуқаролиги</Text>
                    </Flex>
                    <Text className={'ml-30'}>Ўзбекистон Республикаси
                        фуқароси</Text>
                </Col>
                <Col xs={4}>
                    <Flex className={'mb-16'}>
                        <img src={flagIcon} className={'mr-16'} alt=""/> <Text>Миллати</Text>
                    </Flex>
                    <Text className={'ml-30'}>Ўзбек</Text>
                </Col>
                <Col xs={4}>
                    <Flex className={'mb-16'}>
                        <img src={calendarIcon} className={'mr-16'} alt=""/> <Text>Туғилган санаси</Text>
                    </Flex>
                    <Text className={'ml-30'}>Ўзбек</Text>
                </Col>
            </Row>
        </StyledOrderItem>
    );
};

export default OrderItem;
