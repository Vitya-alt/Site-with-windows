import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img '),
          windowWidth = document.querySelectorAll('#width'),
          windowHeight = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    function bindActoinToElem(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch(item.nodeName) {
                    case 'SPAN' :
                        state[prop] = i;
                        break;
                    case 'INPUT' :
                        if(item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = 'холодное' : state[prop] = 'теплое';
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if(i === j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT' :
                        state[prop] = item.value;
                        break;
                }

                console.log(state);
            });
        });
    }

    bindActoinToElem('click', windowForm, 'form');
    bindActoinToElem('input', windowHeight, 'height');
    bindActoinToElem('input', windowWidth, 'width');
    bindActoinToElem('change', windowType, 'type');
    bindActoinToElem('change', windowProfile, 'profile');

};

export default changeModalState;