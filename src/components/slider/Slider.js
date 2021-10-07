import React, {useState,useEffect} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation} from 'swiper';
import styled from "styled-components";
import classNames from "classnames";
import {isEqual} from "lodash";
import "swiper/swiper.min.css";
import arrowPrev from "../../assets/images/icons/arrow-prev.png";
import arrowNext from "../../assets/images/icons/arrow-next.png";
import regionsData from "../../mock/regionsData";

SwiperCore.use([Navigation]);
const StyledSlider = styled.div`
  .mySwiper {
    position: unset !important;

    .swiper-button-prev {
      width: 20px;
      height: 20px;
      position: absolute;
      display: inline-block;
      left: -30px;
      z-index: 99;
      top: 12px;
      cursor: pointer;
      background-image: url(${arrowPrev});
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }

    .swiper-button-next {
      width: 20px;
      height: 20px;
      position: absolute;
      display: inline-block;
      right: -10px;
      z-index: 99;
      top: 12px;
      cursor: pointer;
      background-image: url(${arrowNext});
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }

    .swiper-wrapper {
      display: flex;
      align-items: center;
      padding-right: 30px;
    }

    .swiper-slide {
      font-size: 15px;
      color: #A1A1A7;
      cursor: pointer;
      padding: 10px 15px;
      font-weight: 300;

      &.active {
        font-weight: 700;
        color: #fff;
        background-color: #322A7D;
        border-radius: 31px;
        text-align: center;
      }
    }
  }
`;
const Slider = ({
                    items = [], active, setActive = () => {
    }, ...props
                }) => {
    const [regions] = useState(regionsData);
    return (
        <StyledSlider {...props}>
            <Swiper  slidesPerView={5} spaceBetween={0} navigation={true} className="mySwiper">
                {
                    regions && regions.map(({id, name}) => <SwiperSlide
                        className={classNames({active: isEqual(id, active)})} onClick={() => setActive(id)}
                        key={id}>{name}</SwiperSlide>)
                }
            </Swiper>
        </StyledSlider>
    );
};

export default Slider;
