let todoItems = [];

const todoStorage = localStorage.getItem("todoItems");
const todoListEl =document.querySelector('.todo_list')
if(todoStorage){
    todoItems = [...JSON.parse(todoStorage)];
}



const todoModalEl= document.querySelector('.todo_modal');

const toggleModal = () => {
    todoModalEl.classList.toggle('show'); 
};

todoModalEl.addEventListener('click', (event)=>
{
if(event.target.classList.contains('todo_modal')) toggleModal()
});

const uniqeIdGenarator = () =>{
   return Math.round(Math.random()* 1000 +1);
} 

const addTodoHtml = (todoItem) =>{
    let todoItemHtml = `<li class="todo_item btn ${todoItem.isComplete ? 'complete' : ''}">
    <div class="todo_complete btn" data-id="${todoItem.id}" onclick='toggleTodoComplete(this)'>
    <img src="./img/checked.svg" alt="">
    </div>
    <div class="todo_info">
        <span class="todo_info_title">${todoItem.title}</span>
        <span class="todo_info_desc">${todoItem.desc}</span>
    </div>
    <i data-id=${todoItem.id} class="fa-solid fa-trash-can trash-icon btn" onclick="removeTodo(this)"></i>
</li>`
todoListEl.insertAdjacentHTML('beforeend',todoItemHtml)
}

const saveTodoItemsToLs = () =>{
    localStorage.setItem("todoItems",JSON.stringify(todoItems))
}

const addTodoItems = () => {
    const title = document.querySelector("input[name='title']").value;
    const desc =document.querySelector("textarea[name='desc']").value;


    const addedTodoItem ={id: uniqeIdGenarator(), 
        title,
        desc,
        isComplete:false
    };
    addTodoHtml(addedTodoItem);
 todoItems.push(addedTodoItem);
 saveTodoItemsToLs();
 document.querySelector("#todo_form").reset();

 toggleModal();



};
const toggleTodoComplete = (selectedEl) =>{
const toggleItemIndex = todoItems.findIndex(todo=>todo.id == selectedEl.dataset.id);

if(toggleItemIndex !=-1 ){
    todoItems[toggleItemIndex].isComplete = !todoItems[toggleItemIndex].isComplete;
    selectedEl.parentNode.classList.toggle("complete");
    saveTodoItemsToLs();
}
}
  
        const noneTodoItems = `<li class="non_todos">
    <span class="non-todo-text">There is no Todo</span>
    <img class="Bruno-Mars" src="./img/Doing-Anything-Gif.gif" alt="">
</li>`
    
    

const removeTodo = (removedEl) =>{
const removedItemIndex = todoItems.findIndex(todo => todo.id == removedEl.dataset.id);
if(removedItemIndex != -1){
    todoItems.splice(removedItemIndex,1);
    removedEl.parentNode.remove();
    saveTodoItemsToLs();
    if(todoItems.length ==0){
     todoListEl.innerHTML = `<li class="non_todos">
    <span class="non-todo-text">There is no Todo</span>
    <img class="Bruno-Mars" src="./img/Doing-Anything-Gif.gif" alt="">
</li>`

    }
}
}
const ListTodoItems = () =>{
    if(todoItems.length>0){
        
        todoItems.forEach(todo =>{
            addTodoHtml(todo)
    
        });
    }else{
        todoListEl.insertAdjacentHTML("beforeend",noneTodoItems);
    }
}
ListTodoItems();

ListTodoItems.style