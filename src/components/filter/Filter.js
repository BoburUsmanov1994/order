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
  z-index: 99;
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
      width: 450px;
      min-height: 25vh;
      background-color: #fff;
      border-radius: 15px;
      padding: 30px;
      position: relative;

      h2 {
        text-align: center;
        margin-bottom: 25px;
      }
    }
  }
`;
const Filter = ({
                    open = false, setOpen = () => {
        }, onSubmit = () => {
        }, ...props
                }) => {
        const {register, handleSubmit, formState: {errors}, setValue, getValues, control} = useForm();

        return (
            <>{open &&
            <StyledFilter {...props} onSubmit={handleSubmit(onSubmit)}>
                <div className="filter__content">
                    <X className={'filter__close'} size={36} onClick={() => setOpen(false)}/>
                    <h2>Филтрлар</h2>
                    <Row className={'mb-16'}>
                        <Col xs={12}>
                            <FormSelect defaultValue={null} options={[]}
                                        setValue={setValue} Controller={Controller} control={control}
                                        name={'regiId'} placeholder={'Вилоятни танланг'}/>

                        </Col>
                    </Row>
                    <Row className={'mb-16'}>
                        <Col xs={12}>
                            <FormSelect defaultValue={null} options={[]}
                                        setValue={setValue} Controller={Controller} control={control}
                                        name={'distId'} placeholder={'Туманни танланг'}/>

                        </Col>
                    </Row>
                    <Row className={'mb-16'}>
                        <Col xs={12}>
                            <FormSelect defaultValue={null} options={[]}
                                        setValue={setValue} Controller={Controller} control={control}
                                        name={'mfyId'} placeholder={'Маҳаллани танланг'}/>

                        </Col>
                    </Row>
                    <Row className={'mb-16'}>
                        <Col xs={12}>
                            <FormSelect defaultValue={null} options={[]}
                                        setValue={setValue} Controller={Controller} control={control}
                                        name={'orderstatus'} placeholder={'Order status'}/>

                        </Col>
                    </Row>
                    <Row className={'mb-16'}>
                        <Col xs={12}>
                            <FormSelect defaultValue={null} options={[]}
                                        setValue={setValue} Controller={Controller} control={control}
                                        name={'basisorder'} placeholder={'Basis status'}/>

                        </Col>
                    </Row>
                    <Row className={'mb-16'}>
                        <Col xs={12}>
                            <FormSelect defaultValue={null} options={[]}
                                        setValue={setValue} Controller={Controller} control={control}
                                        name={'basistermination'} placeholder={'Basis termination'}/>

                        </Col>
                    </Row>
                    <Row className={'mb-16'}>
                        <Col xs={12}>
                            <FormSelect defaultValue={null} options={[]}
                                        setValue={setValue} Controller={Controller} control={control}
                                        name={'orederresults'} placeholder={'Order results'}/>

                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className={'text-center mt-16'}>
                            <Button type={'submit'} success>Саралаш</Button>
                        </Col>
                    </Row>
                </div>
            </StyledFilter>}
            </>
        );
    }
;

export default Filter;
