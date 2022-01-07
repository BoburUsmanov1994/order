import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation} from 'swiper';
import styled from "styled-components";
import classNames from "classnames";
import {isEqual} from "lodash";
import {useHistory} from "react-router-dom";
import "swiper/swiper.min.css";
import arrowPrev from "../../assets/images/icons/arrow-prev.png";
import arrowNext from "../../assets/images/icons/arrow-next.png";

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
      top: 50%;
      transform: translateY(-50%);
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
      top: 50%;
      transform: translateY(-50%);
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
      font-size: 14px;
      color: #A1A1A7;
      cursor: pointer;
      padding: 10px 10px;
      font-weight: 300;
  
      text-align: center;

      &.active {
        font-weight: 700;
        color: #fff;
        background-color: #322A7D;
        border-radius: 30px;
        text-align: center;
        min-width: 175px !important;
        text-align: center;
      }
    }
  }
`;
const Slider = ({
                    items = [], active, setActive = () => {
    },hasLink=true, ...props
                }) => {
    const history = useHistory();
    return (
        <>
        {items.length > 0 && <StyledSlider {...props}>
            <Swiper  slidesPerView={4} spaceBetween={0} navigation={true} className="mySwiper">
                {
                    items && items.map(({_id, name}) => <SwiperSlide
                        className={classNames({active: isEqual(_id, active)})}
                        onDoubleClick={() => hasLink && history.push(`/region/${_id}`)}
                        onClick={() => setActive(_id)}
                        key={_id}>{name}</SwiperSlide>)
                }
            </Swiper>
        </StyledSlider>}
            </>
    );
};

export default Slider;
