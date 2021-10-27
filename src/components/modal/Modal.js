import React, {useState} from 'react';
import styled from "styled-components";
import {X} from 'react-feather';

const StyledModal = styled.div`
  min-height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal {
    &_backdrop {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 9;
    }

    &_content {
      position: relative;
      padding: 30px;
      padding-top: 50px;
      background-color: #fff;
      z-index: 99;
      width: 600px;
      border-radius: 10px;
      max-height: 90vh;
      overflow-y: auto;
    }

    &_close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
  }
`;
const Modal = ({children,show = false,setShow=()=>{}, ...props}) => {
    return (
        <>
            { show && <StyledModal {...props}>
                <div className="modal_backdrop" onClick={()=>setShow(false)}></div>
                <div className="modal_content">
                    <X className={'modal_close'} onClick={()=>setShow(false)} size={32}/>
                    {children}
                </div>
            </StyledModal>
            }
        </>
    );
};

export default Modal;
