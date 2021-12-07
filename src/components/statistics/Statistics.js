import React from 'react';
import {Line} from 'rc-progress';
import styled from "styled-components";
import Flex from "../flex/Flex";
import Radio from "../elements/radio";
import {get,head,round} from "lodash";

const StyledStatistics = styled.div`
  .statistics {
    &__top {
      margin-bottom: 15px;
      display: flex;
      align-items: flex-end;

      .left {
        height: 60px;
        width: 30%;
        border: 1px dashed #FD79A8;
        border-top-left-radius: 30px;
        border-bottom-color: transparent;
        border-right-color: transparent;
        margin-top: 30px;
      }

      .right {
        height: 60px;
        width: 30%;
        border: 1px dashed #FD79A8;
        border-top-right-radius: 30px;
        border-bottom-color: transparent;
        border-left-color: transparent;
        margin-top: 30px;
      }

      .center {
        width: 40%;
        min-height: 80px;
        background-color: #F78FB3;
        border-radius: 12px;
        margin-bottom: 20px;
        padding: 0 3px;

        .dashed {
          background-color: #FFF0F5;
          min-height: 80px;
          border: 1px dashed #FD79A8;
          border-radius: 12px;
          display: flex;
          padding: 15px;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          .title {
            font-weight: 600;
            font-size: 16px;
            color: #4B4279;
            margin-bottom: 5px;
          }

          .count {
            color: #DF0A56;
            font-size: 26px;
            font-weight: 600;

            span {
              font-size: 16px;
              margin-left: 5px;
            }
          }
        }
      }
    }

    &__center {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;

      &_item {
        &:first-child {
          h2 {
            padding-left: 15px;
          }

          h2, p {
            text-align: left;
          }
        }

        &:last-child {
          h2 {
            padding-right: 25px;
          }

          h2, p {
            text-align: right;
          }
        }

        h2 {
          font-size: 16px;
          font-weight: 500;
          color: #4B4279;
          text-align: center;
        }

        p {
          text-align: center;
          font-size: 13px;
          color: #817C9B;
          padding: 0 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    &__bottom {
      padding-top: 20px;
      padding-bottom: 0;
    }
  }
`;
const Statistics = ({data = {},...props}) => {
    return (
        <StyledStatistics {...props}>
            <div className="statistics__top">
                <div className="left"></div>
                <div className="center">
                    <div className="dashed">
                        <div className="title">
                            {get(head(get(data,'statistics')),'allper','-')}
                        </div>
                        <div className="count">
                            {get(head(get(data,'statistics')),'countall','-')}
                        </div>
                    </div>
                </div>
                <div className="right"></div>
            </div>
            <div className="statistics__center">
                <div className="statistics__center_item" style= {{width: `${round((get(head(get(data,'statistics')),'countviolent',0)*100/(get(head(get(data,'statistics')),'countviolent',0)+get(head(get(data,'statistics')),'countvictim',0)+get(head(get(data,'statistics')),'countcriminalcasecount',0)+get(head(get(data,'statistics')),'administrativeworkcount',0))),2)}%`}}>
                    <h2>{get(head(get(data,'statistics')),'countviolent','-')}</h2>
                    <p>{get(head(get(data,'statistics')),'countviolentname','-')}</p>
                </div>
                <div className="statistics__center_item" style={{width: `${round((get(head(get(data,'statistics')),'countvictim',0)*100/(get(head(get(data,'statistics')),'countviolent',0)+get(head(get(data,'statistics')),'countvictim',0)+get(head(get(data,'statistics')),'countcriminalcasecount',0)+get(head(get(data,'statistics')),'administrativeworkcount',0))),2)}%`}}>
                    <h2>{get(head(get(data,'statistics')),'countvictim','-')}</h2>
                    <p>{get(head(get(data,'statistics')),'countvictimname','-')}</p>
                </div>
                <div className="statistics__center_item" style={{width: `${round((get(head(get(data,'statistics')),'countcriminalcasecount',0)*100/(get(head(get(data,'statistics')),'countviolent',0)+get(head(get(data,'statistics')),'countvictim',0)+get(head(get(data,'statistics')),'countcriminalcasecount',0)+get(head(get(data,'statistics')),'administrativeworkcount',0))),2)}%`}}>
                    <h2>{get(head(get(data,'statistics')),'countcriminalcasecount','-')}</h2>
                    <p>{get(head(get(data,'statistics')),'countcriminalcase','-')}</p>
                </div>
                <div className="statistics__center_item" style={{width: `${round((get(head(get(data,'statistics')),'administrativeworkcount',0)*100/(get(head(get(data,'statistics')),'countviolent',0)+get(head(get(data,'statistics')),'countvictim',0)+get(head(get(data,'statistics')),'countcriminalcasecount',0)+get(head(get(data,'statistics')),'administrativeworkcount',0))),2)}%`}}>
                    <h2>{get(head(get(data,'statistics')),'administrativeworkcount','-')}</h2>
                    <p>{get(head(get(data,'statistics')),'administrativework','-')}</p>
                </div>
            </div>
            <Line percent={[round((get(head(get(data,'statistics')),'countviolent',0)*100/(get(head(get(data,'statistics')),'countviolent',0)+get(head(get(data,'statistics')),'countvictim',0)+get(head(get(data,'statistics')),'countcriminalcasecount',0)+get(head(get(data,'statistics')),'administrativeworkcount',0))),2), round((get(head(get(data,'statistics')),'countvictim',0)*100/(get(head(get(data,'statistics')),'countviolent',0)+get(head(get(data,'statistics')),'countvictim',0)+get(head(get(data,'statistics')),'countcriminalcasecount',0)+get(head(get(data,'statistics')),'administrativeworkcount',0))),2), round((get(head(get(data,'statistics')),'countcriminalcasecount',0)*100/(get(head(get(data,'statistics')),'countviolent',0)+get(head(get(data,'statistics')),'countvictim',0)+get(head(get(data,'statistics')),'countcriminalcasecount',0)+get(head(get(data,'statistics')),'administrativeworkcount',0))),2), round((get(head(get(data,'statistics')),'administrativeworkcount',0)*100/(get(head(get(data,'statistics')),'countviolent',0)+get(head(get(data,'statistics')),'countvictim',0)+get(head(get(data,'statistics')),'countcriminalcasecount',0)+get(head(get(data,'statistics')),'administrativeworkcount',0))),2)]} strokeWidth="2.5"
                  strokeColor={["#F02727", "#55EFC4", "#F99600", "#0058FF"]}/>
            <div className="statistics__bottom">
                <Flex justify={'center'}>
                    <Radio label={get(head(get(data,'statistics')),'countviolentname','-')} danger className={'mr-16'}/>
                    <Radio label={get(head(get(data,'statistics')),'countvictimname','-')} success  className={'mr-16'}/>
                    <Radio label={get(head(get(data,'statistics')),'countcriminalcase','-')} warning className={'mr-16'}/>
                    <Radio label={get(head(get(data,'statistics')),'administrativework','-')} primary />
                </Flex>
            </div>
        </StyledStatistics>
    );
};

export default Statistics;
