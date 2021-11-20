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

const hasAccess = (roles = [], can = '') => {
    let access = false;
        if (includes(roles, can)) {
            access = true;
        }
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