import React from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import avatarLogo from "../../assets/images/avatar.png";
import Title from "../title";
import Text from "../text";
import Flex from "../flex/Flex";
import {User,Mail,Phone,Globe,UserCheck,Calendar} from "react-feather";
import moment from "moment";

const StyledProfileInfo = styled.div`
  .imgbox{
    width: 35px;
    margin-top: 5px;
  }
  
  .profile {
    
    &__logo {
      position: relative;

      & > img {
        width: 100px !important;
        height: 100px !important;
        border-radius: 50%;
        object-fit: cover;
      }
     
      .change__logo {
        position: absolute;
        height: 25px;
        width: 25px;
        left: 65px;
        bottom: 0px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.16);
        z-index: 9;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
`;
const ProfileInfo = ({createdAt='-',role='-',status='-',avatar = avatarLogo,name="Admin",position="Катта инспектор",email="admin@gmail.com",phone="+998909566888",site="www.mvd.uz", ...props}) => {
    return (
        <StyledProfileInfo {...props}>
            <Row align={'center'}>
                <Col xs={4}>
                    <Row align={'center'}>
                        <Col xs={3}>
                            <div className="profile__logo">
                                <User size={48}/>
                                {/*<span className="change__logo">*/}
                                {/*    <img src={camera} alt=""/>*/}
                                {/*</span>*/}
                            </div>
                        </Col>
                        <Col xs={9}>
                            <Title className={'mb-8'}>{name}</Title>
                            <Text>Лавозими: {position}</Text>
                        </Col>
                    </Row>
                </Col>
                <Col xs={4}>
                    <Row align={'center '} className={'mb-8'}>
                        <Col xs={4}>
                          <Flex align={'center'}><div className="imgbox"><Mail  size={16}/></div><Text>Email:</Text></Flex>
                        </Col>
                        <Col xs={8}>
                            <Text>{email}</Text>
                        </Col>
                    </Row>
                    <Row align={'center'} className={'mb-8'}>
                        <Col xs={4}>
                            <Flex align={'center'}><div className="imgbox"><Phone size={16} /></div><Text>Телефон:</Text></Flex>
                        </Col>
                        <Col xs={8}>
                            <Text>{phone}</Text>
                        </Col>
                    </Row>
                    <Row align={'center'} >
                        <Col xs={4}>
                            <Flex align={'center'}><div className="imgbox"><Globe size={16} /></div><Text>Сайт:</Text></Flex>
                        </Col>
                        <Col xs={8}>
                            <Text>{site}</Text>
                        </Col>
                    </Row>
                </Col>
                <Col xs={4}>
                    <Row align={'center '} className={'mb-8'}>
                        <Col xs={4}>
                            <Flex align={'center'}><div className="imgbox"><UserCheck size={16}/></div><Text>Status:</Text></Flex>
                        </Col>
                        <Col xs={8}>
                            <Text>{status}</Text>
                        </Col>
                    </Row>
                    <Row align={'center'} className={'mb-8'}>
                        <Col xs={4}>
                            <Flex align={'center'}><div className="imgbox"><UserCheck size={16}/></div><Text>Role:</Text></Flex>
                        </Col>
                        <Col xs={8}>
                            <Text>{role}</Text>
                        </Col>
                    </Row>
                    <Row align={'center'} >
                        <Col xs={4}>
                            <Flex align={'center'}><div className="imgbox"><Calendar  size={16}/></div><Text>Created:</Text></Flex>
                        </Col>
                        <Col xs={8}>
                            <Text>{moment(createdAt).format('DD-MM-YYYY')}</Text>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} className={'mt-24 '}>
                    <hr/>
                </Col>
            </Row>
        </StyledProfileInfo>
    );
};

export default ProfileInfo;
