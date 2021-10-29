import React from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import avatarLogo from "../../assets/images/avatar.png";
import camera from "../../assets/images/icons/photo-camera.png"
import Title from "../title";
import Text from "../text";
import Flex from "../flex/Flex";
import mail from "../../assets/images/icons/mail.png";
import tel from "../../assets/images/icons/phone.png";
import globe from "../../assets/images/icons/globe.png";
import {User} from "react-feather";

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
const ProfileInfo = ({avatar = avatarLogo,name="Admin",position="Катта инспектор",email="admin@gmail.com",phone="+998909566888",site="www.mvd.uz", ...props}) => {
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
                <Col xs={8}>
                    <Row align={'center '} className={'mb-8'}>
                        <Col xs={2}>
                          <Flex align={'center'}><div className="imgbox"><img src={mail} className={'img-fluid '} alt=""/></div><Text>Email:</Text></Flex>
                        </Col>
                        <Col xs={10}>
                            <Text>{email}</Text>
                        </Col>
                    </Row>
                    <Row align={'center'} className={'mb-8'}>
                        <Col xs={2}>
                            <Flex align={'center'}><div className="imgbox"><img src={tel} className={'img-fluid '} alt=""/></div><Text>Телефон:</Text></Flex>
                        </Col>
                        <Col xs={10}>
                            <Text>{phone}</Text>
                        </Col>
                    </Row>
                    <Row align={'center'} >
                        <Col xs={2}>
                            <Flex align={'center'}><div className="imgbox"><img src={globe} className={'img-fluid '} alt=""/></div><Text>Сайт:</Text></Flex>
                        </Col>
                        <Col xs={10}>
                            <Text>{site}</Text>
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
