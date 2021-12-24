import React from 'react';
import styled from "styled-components";
import {X} from "react-feather";
import FormSelect from "../elements/form-select";
import {Controller, useForm} from "react-hook-form";
import {Col, Row} from "react-grid-system";
import Button from "../button";

const StyledFilter = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;

  .filter {
    &__close {
      position: absolute;
      right: 5px;
      top: 5px;
      cursor: pointer;
    }

    &__content {
      width: 500px;
      min-height: 25vh;
      background-color: #fff;
      border-radius: 15px;
      padding: 30px;
      position: relative;
      overflow-x: hidden;
      .scrollbar{
        max-height: 75vh;
        overflow-y: auto;
        padding-bottom: 20px;
        overflow-x: hidden;
      }

      h2 {
        text-align: center;
        margin-bottom: 25px;
      }
    }
  }
`;
const Filter = ({
                   children, open = false, setOpen = () => {
        }, ...props
                }) => {
        const {register, handleSubmit, setValue, getValues, control} = useForm();
        return (
            <>{open &&
            <StyledFilter {...props} >
                <div className="filter__content">
                    <X className={'filter__close'} size={36} onClick={() => setOpen(false)}/>
                    <h2>Филтрлар</h2>
                    <div className="scrollbar">
                    {children({register, handleSubmit,  setValue, getValues, control})}
                    </div>
                </div>
            </StyledFilter>}
            </>
        );
    }
;

export default Filter;
