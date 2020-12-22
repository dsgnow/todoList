const mainInput = document.querySelector('.main__input');
const ul = document.querySelector('ul');
let liElements = document.querySelectorAll('li');
const itemsLeft = document.querySelector('.todoList__itemsLeft--count');
let itemsLeftcount = '';

const changeItemsLeft = () => {
  itemsLeft.textContent = itemsLeftcount;
}

const addTask = (e) => {
    let text = mainInput.value;
    if (e.key === 'Enter' && text !== "") {
        const ul = document.querySelector('.todoList__list');
        const li = document.createElement('li');
        const spanCircle = document.createElement('span');
        const imgCircle = document.createElement('img');
        const p = document.createElement('p');
        const spanDelete = document.createElement('span');
        const imgDelete = document.createElement('img');
        li.classList.add('todoList__elem', 'todoList__elem--active');
        li.setAttribute("draggable", "true");
        spanCircle.classList.add('circle', 'todoList__circle');
        imgCircle.setAttribute('src', 'images/check.svg');
        imgCircle.classList.add('circle__img');
        p.textContent = text;
        spanDelete.classList.add('delete', 'todoList__delete');
        imgDelete.setAttribute('src', 'images/icon-cross.svg');
        imgDelete.classList.add('delete__removeItem');

        ul.appendChild(li);
        li.appendChild(spanCircle);
        spanCircle.appendChild(imgCircle);
        li.appendChild(p);
        li.appendChild(spanDelete);
        spanDelete.appendChild(imgDelete);
        
        document.querySelectorAll('.todoList__delete').forEach(item => item.addEventListener('click', removeTask));
        document.querySelectorAll('.todoList__circle').forEach(item => item.addEventListener('click', completeTask));
        mainInput.value = "";
        liElements = document.querySelectorAll('li');
        itemsLeftcount = liElements.length;
        changeItemsLeft();
      }
}

const removeTask = (e) => {
  e.target.closest('li').classList.toggle("todoList__elem--remove");
    setTimeout(function () {
      e.target.closest('li').remove();
      liElements = document.querySelectorAll('li');
      itemsLeftcount = liElements.length;
      changeItemsLeft();
  }, 800);
}

const completeTask = (e) => {
  e.target.closest('span').classList.toggle("todoList__circle--completed");
  e.target.closest('li').classList.toggle("todoList__elem--completed");
  e.target.firstElementChild.classList.toggle("circle__img--completed");
  e.target.closest('li').classList.toggle("todoList__elem--active");
}

const clearSearchActive = () => {
  document.querySelectorAll('.main__filter p').forEach(p => p.classList.remove("filter--active"));
}

const searchCompleted = (e) => {
  clearSearchActive();
  document.querySelector('.filter__completed').classList.toggle("filter--active");
  let tasks = [...liElements];
  tasks = tasks.filter(li => li.classList.contains("todoList__elem--completed"));
  ul.textContent = '';
  tasks.forEach(li => ul.appendChild(li));
  itemsLeftcount = tasks.length;
  changeItemsLeft();
}

const searchActive = (e) => {
  clearSearchActive();
  document.querySelector('.filter__active').classList.toggle("filter--active");
  let tasks = [...liElements];
  tasks = tasks.filter(li => li.classList.contains("todoList__elem--active"));
  ul.textContent = '';
  tasks.forEach(li => ul.appendChild(li));
  itemsLeftcount = tasks.length;
  changeItemsLeft();
}

const searchAll = (e) => {
  clearSearchActive();
  document.querySelector('.filter__all').classList.toggle("filter--active");
  let tasks = [...liElements];
  ul.textContent = '';
  tasks.forEach(li => ul.appendChild(li));
  itemsLeftcount = tasks.length;
  changeItemsLeft();
}

const clearCompleted = () => {
  searchAll();
  document.querySelectorAll('.todoList__elem--completed').forEach(li => li.remove());
  liElements = document.querySelectorAll('li');
  itemsLeftcount = liElements.length;
  changeItemsLeft();
}

const changeColor = (e) => {
  document.querySelector('html').classList.toggle("html--changeToDark");
  document.querySelector('.background__img').classList.toggle("background__img--changeToDark");
  document.querySelector('.background__img').classList.toggle("background__img--changeToLight");
  document.querySelector('.changeColor__img').classList.toggle("changeColor__img--black");
}


document.querySelectorAll('.todoList__delete').forEach(item => item.addEventListener('click', removeTask));
document.querySelectorAll('.todoList__circle').forEach(item => item.addEventListener('click', completeTask));
mainInput.addEventListener('keypress', addTask);
document.querySelector('.todoList__clearCompleted').addEventListener('click', clearCompleted);
document.querySelector('.filter__completed').addEventListener('click', searchCompleted);
document.querySelector('.filter__all').addEventListener('click', searchAll);
document.querySelector('.filter__active').addEventListener('click', searchActive);
document.querySelector('.main__changeColor').addEventListener('click', changeColor);


//drag and drop
document.addEventListener("drag", function( event ) {

}, false);

document.addEventListener("dragstart", function( event ) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = .9;
}, false);

document.addEventListener("dragend", function( event ) {
    // reset the transparency
    event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function( event ) {
  // prevent default to allow drop
  event.preventDefault();
}, false);

document.addEventListener("dragenter", function( event ) {
  // highlight potential drop target when the draggable element enters it
  if (event.target.classList.contains("todoList__elem") ) {
      event.target.style.background = "hsl(0, 0%, 98%)";
  }

}, false);

document.addEventListener("dragleave", function( event ) {
  // reset background of potential drop target when the draggable element leaves it
  if ( event.target.classList.contains("todoList__elem") ) {
      event.target.style.background = "";
  }

}, false);

document.addEventListener("drop", function( event ) {
  // prevent default action (open as link for some elements)
  let indexEvent = '';
  let indexDragged = '';

  const actualLiElems = [...document.querySelectorAll('li p')];
  
  actualLiElems.forEach(function (actualLiElem, index) {
    if (actualLiElem.textContent == event.target.textContent) {
      indexEvent = index;
    }
    if (actualLiElem.textContent == dragged.textContent) {
      indexDragged = index;
    }
});

  console.log(indexDragged, indexEvent);
  event.preventDefault();
  // move dragged elem to the selected drop target
  if ( event.target.classList.contains("todoList__elem") ) {
      event.target.style.background = "";
      // dragged.parentNode.removeChild( dragged );
      indexDragged>indexEvent?event.target.insertAdjacentElement('beforebegin', dragged):event.target.insertAdjacentElement('afterend', dragged);
      liElements = document.querySelectorAll('li');
  }

}, false);