import {includes} from "lodash";

const addDetectClick =  ({setOpen,classNames = []}) => {
    window.addEventListener("click", (e) => {
        if (!classNames.some(className => e.target.classList.contains(className))) {
            setOpen(false);
        }
    });
}
const removeDetectClick = () => {
    window.removeEventListener('click',addDetectClick,false);
}

const hasAccess = (items = [], can = '') => {
    let access = false;
    can = can.split(' ');
    items = items.map(({name}) => name);
    can.map(item => {
        if (includes(items, item)) {
            access = true;
        }
    })
    return access;
}

function getPosition(el) {
    let xPosition = 0;
    let yPosition = 0;

    xPosition = el.layerX;
    yPosition = el.layerY;

    return {
        x: xPosition,
        y: yPosition
    };
}

export {
    addDetectClick,
    removeDetectClick,
    hasAccess,
    getPosition
}