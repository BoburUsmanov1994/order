import React, {useState} from 'react';
import styled from "styled-components";
import {findIndex, includes, slice} from "lodash";
import CustomCheckbox from "../elements/checkbox";

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
    const handleChange = (e, id) => {
        if (e.target.checked) {
            if (!includes(activeItems, id)) {
                setActiveItems(prev => [...prev, id])
            }
        }
        if (!e.target.checked) {
            const index = findIndex(activeItems, item => item == id);
            if (includes(activeItems, id)) {
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
                        items && items.map(({id, name}) => <CustomCheckbox className={'dropdown__checkbox'} key={id}
                                                                           handleChange={(e) => handleChange(e, id)}
                                                                           label={name}
                                                                           defaultChecked={includes(activeItems, id)}/>)
                    }

                </div>}
            </div>
        </StyledDropdown>
    );
};

export default Dropdown;
