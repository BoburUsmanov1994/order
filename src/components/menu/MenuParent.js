import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {connect, useSelector} from "react-redux";
import arrowDown from "../../assets/images/icons/arrow-down.png";
import clipboardIcon from "../../assets/images/icons/clipboard.svg";
import {get, isEqual} from "lodash";
import Actions from "../../modules/order/Actions";


const StyledMenuParent = styled.div`
  position: relative;
  margin-bottom: 15px;

  .children {
    padding-top: 15px;
    padding-bottom: 15px;

    li {
      a {
        padding-left: ${({theme: {open}}) => isEqual(open,'open') ? '45px' : '30px'};
        text-align: left;

      }
    }
  }

  .arrow {
    position: absolute;
    right: 0px;
    top: 50%;
    display: ${({theme: {open}}) => isEqual(open,'open') ? 'block' : 'none'};
  }

  p {
    background-color: ${({show, theme: {open}}) => show && isEqual(open,'open') ? '#EFEFEF' : 'transparent'};
    padding-left: 30px;
    padding-right: 15px;
    padding-bottom: ${({theme: {open}}) => isEqual(open,'open') ? '10px' : '8px'};
    padding-top: ${({theme: {open}}) => isEqual(open,'open') ? '10px' : '8px'};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    font-size: 14px;

    span {
      display: ${({theme: {open}}) => isEqual(open,'open') ? 'block' : 'none'};
    }
  }

  img {
    margin-right: 15px;
  }
}
@media screen and (max-width:1600px){
  .arrow{
    right: -8px;
  }
  p{
    padding-left: 25px;
}
`;
const MenuParent = ({children, name = '', icon = clipboardIcon, toggleBurger, ...props}) => {
    const [show, setShow] = useState(false);
    const open = useSelector(state => get(state, 'order.open', false));
    useEffect(() => {
        // toggleBurger(show);
    }, [show])
    const setOpen = () => {
        setShow(show => !show);
    }
    return (
        <StyledMenuParent show={show} {...props}>
            <p onClick={setOpen}><img src={icon} alt=""/><span>{name}</span> <img src={arrowDown} className={'arrow'}
                                                                                  alt=""/></p>

            {open && show && <div className="children">
                {children}
            </div>}
        </StyledMenuParent>
    );
};

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleBurger: (toggle) => dispatch({type: Actions.TOGGLE_BURGER.REQUEST, payload: {toggle}})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuParent);
