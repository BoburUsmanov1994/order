import React, {useState} from 'react';
import styled from "styled-components";
import {findIndex, includes, slice,isEqual,get} from "lodash";
import CustomCheckbox from "../elements/checkbox";
import ApiService from "../../modules/order/ApiService";

const StyledDropdown = styled.div`
  .dropdown {
    display: inline-block;
    position: relative;

    &__btn {
      font-weight: 700;
      color: #7E84A3;
      padding: 10px 30px;
      min-width: 200px;
      text-align: center;
      border-radius: 7px;
      background-color: #EFEFF0;
      cursor: pointer;
    }

    &__box {
      position: absolute;
      width: 125%;
      right: 0;
      z-index: 99;
      border: 1px solid #E6E6E6;
      background-color: #fff;
      padding: 20px 15px;
      border-radius: 10px;
      top: 110%;
    }

    &__checkbox {
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      label {
        color: #7E84A3;
        text-align: left;
        cursor: pointer;
      }
    }
  }
`;
const Dropdown = ({
                      items = [], activeItems = [], setActiveItems = () => {
    }, ...props
                  }) => {
    const [open, setOpen] = useState(false);
    const handleChange = (e, _id) => {
        if (e.target.checked) {
            if (!includes(activeItems, _id)) {
                ApiService.ChangeMessageItemStatus(_id,{...items.find((item) => isEqual(get(item,'_id'),_id)),condition:true});
                setActiveItems(prev => [...prev, _id])
            }
        }
        if (!e.target.checked) {
            const index = findIndex(activeItems, item => item == _id);
            if (includes(activeItems, _id)) {
                ApiService.ChangeMessageItemStatus(_id,{...items.find((item) => isEqual(get(item,'_id'),_id)),condition:false});
                setActiveItems([...slice(activeItems, 0, index), ...slice(activeItems, index + 1, activeItems.length)]);
            }
        }
    }
    return (
        <StyledDropdown {...props}>
            <div className="dropdown">
                <div className="dropdown__btn" onClick={() => setOpen(open => !open)}>График танланг</div>
                {open && <div className="dropdown__box">
                    {
                        items && items.map(({message,condition,_id},index) => <CustomCheckbox className={'dropdown__checkbox'} key={index}
                                                                           handleChange={(e) => handleChange(e, _id)}
                                                                           label={message}
                                                                           defaultChecked={includes(activeItems, _id)}/>)
                    }

                </div>}
            </div>
        </StyledDropdown>
    );
};

export default Dropdown;
