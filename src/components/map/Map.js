import React, {useState} from 'react';
import styled from "styled-components";
import {isEqual,isNil,get} from "lodash";
import classNames from "classnames";
import {useHistory} from "react-router-dom";
import popupImg from "../../assets/images/popup.png";
import {getPosition} from "../../utils";


const StyledMap = styled.div`
  position: relative;

  svg {
    path:hover {
      cursor: pointer;
      fill: #57B8FF;
    }

    .active {
      fill: #57B8FF !important;
      box-shadow: 0 7px 15px rgba(0,0,0,0.16);
    }

  }

  .popup {
    width: 150px;
    min-height: 100px;
    background-color: #131523;
    position: absolute;
    top: 0px;
    margin-left: -75px;
    left: ${({x,theme:{open}}) => isEqual(open,'open')  ?  x   + 'px' : x + 'px' };
    border-radius: 7px;
    z-index: 9999;
    padding: 15px;
    font-size: 10px;
    color: #fff;

    ul {
      position: relative;
      z-index: 99;

      li {
        margin-bottom: 10px;
        .count{
          margin-left: 5px;
        }
        .circle {
          display: inline-block;
          width: 7px;
          height: 7px;
          border: 1px solid #F02727;
          border-radius: 50%;
          margin-right: 5px;
          &.warning{
            border-color: #EB9B37;
          }
          &.info{
            border-color: #2457F6;
          }
        }
      }
    }

    &:after {
      position: absolute;
      content: "";
      top: 0%;
      left: 75px;
      width: 1px;
      z-index: 9;
      height: ${({y,theme:{open}}) =>  y+ 'px'};
      transform: translateX(-50%);
      border-left: 1px dashed #131522;
    }

    &:before {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid #131522;
      padding: 3px;
      background-color: #131522;
      background-clip: content-box;
      content: "";
      position: absolute;
      top: ${({y,theme:{open}}) => y+ 'px'};
      left: 75px;
      transform: translateX(-50%);
    }

    .bottom {
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;
const Map = ({
                 popup={},nopopup = false,transfer=false, transform = "translate(-333 -759)",viewBox="0 0 1000 652",items=[],active, setActive = () => {
    }, ...props
             }) => {
    const history = useHistory();
    const [coordinate, setCoordinate] = useState({x: 0, y: 0});
    const setActiveSvg = (e, id) => {
        const {x,y} = getPosition(e.nativeEvent)
        setCoordinate({x, y});
        setActive(id)
    }
    return (
        <StyledMap {...coordinate} {...props}>
            {!isNil(active) && !nopopup && <div className="popup">
                <ul>
                    <li><span className={'circle'}></span>Умумий сони <span className={'count'}>{get(popup,'all')}</span></li>
                    <li><span className={'circle warning'}></span>Жабрланганлар  <span className={'count'}>{get(popup,'victims')}</span></li>
                    <li><span className={'circle info'}></span>Айбдорлар   <span className={'count'}>{get(popup,'violents')}</span></li>
                </ul>
                <img src={popupImg} className={'bottom'} alt=""/>
            </div>}
            <svg xmlns="http://www.w3.org/2000/svg" width={'100%'} height={600} viewBox={viewBox}>
                <g transform={transform}>
                    {
                        items && items.map(({_id, pathd, transform}) => {
                                if (transfer) {
                                    return <path key={_id}
                                                 onClick={(e) => setActiveSvg(e, _id)}
                                                 className={classNames({active: isEqual(_id, active)})}
                                                 transform={transform}
                                                 d={pathd}
                                                  fill="#d5d7e3"
                                                 stroke="#fff" strokeLinecap="round"
                                                 strokeLinejoin="round" strokeWidth={2}/>
                                }
                                    return <path key={_id}
                                                 onClick={(e) => setActiveSvg(e, _id)}
                                                 className={classNames({active: isEqual(_id, active)})}
                                                  d={pathd}
                                                 transform="translate(333 739)"
                                                 fill="#d5d7e3"
                                                 stroke="#fff" strokeLinecap="round"
                                                 strokeLinejoin="round" strokeWidth={2} />
                            }
                        )

                    }
                </g>
            </svg>
        </StyledMap>

    );
};

export default Map;
