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
export {
    addDetectClick,
    removeDetectClick
}