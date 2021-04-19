const FIELD = document.querySelector(".field")
const MODULES = document.querySelector(".modules")
let isDragging = false;


MODULES.addEventListener('click', event=>{
    let target = event.target.closest('.card')
    

    let image =target.querySelector('img').getAttribute('src')
    addModuleOnField(image)
})

FIELD.addEventListener("mousedown",event=>{

    let dragElement = event.target.closest('.draggable');
    if (!dragElement) return;

    event.preventDefault();

    dragElement.ondragstart = function() {
      return false;
     };
    
    let coords, shiftX, shiftY;
    startDrag(dragElement, event.clientX, event.clientY);


    function startDrag(element, clientX, clientY) {
    if(isDragging) {
      return;
    }

    isDragging = true;

    FIELD.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    element.style.position = 'fixed';

    moveAt(clientX, clientY);
  };

    function onMouseMove(event){
    moveAt(event.clientX, event.clientY);
    }

    function onMouseUp(event) {
        finishDrag();
    };

    function finishDrag() {
    if(!isDragging) {
      return;
    }

    isDragging = false;

    dragElement.style.top = parseInt(dragElement.style.top) + pageYOffset + 'px';
    dragElement.style.position = 'absolute';

    FIELD.removeEventListener('mousemove', onMouseMove);
    dragElement.removeEventListener('mouseup', onMouseUp);
  }

  function moveAt(clientX, clientY) {
    
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;
    

    if(newY<FIELD.getBoundingClientRect().top){
        newY=FIELD.getBoundingClientRect().top
    }
    if(newY>FIELD.getBoundingClientRect().bottom-dragElement.getBoundingClientRect().height){
        newY=FIELD.getBoundingClientRect().bottom-dragElement.getBoundingClientRect().height;
    }

    if (newX < FIELD.getBoundingClientRect().left) newX = FIELD.getBoundingClientRect().left;

    if (newX > FIELD.getBoundingClientRect().right - dragElement.offsetWidth) {
      newX = FIELD.getBoundingClientRect().right - dragElement.offsetWidth;
    }

    dragElement.style.left = newX + 'px';
    dragElement.style.top = newY + 'px';
  }

})

function addModuleOnField(img){
    const element=`
    <div class="draggable"><img src="${img}"></div>
    `
    FIELD.insertAdjacentHTML('beforeend',element)
}


