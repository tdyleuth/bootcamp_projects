// Inserted objects in array
/*
let allTodos = [
    {title: 'Run a Marathon', dueDate: '02-12-2020',description:'Run a LA marathon', isComplete: false,},

    {title: 'Dentist', dueDate: '02-12-2020',description:'Check and clean teeth', isComplete: true},

    {title: 'Car Maintenence', dueDate: '04-1-2020',description:'Change oil and tires', isComplete: false},

    {title: 'Taxes', dueDate: '05-12-2020',description:'Do your taxes!', isComplete: false}
];
*/

let allTodos;

let pendingTodos, completedTodos, expiredTodos; 

//Creates Todo Element

function createElementFromTodo(todo) {

   return $(`<div class="todo">
   <h3><span class="title">${todo.title}</span>
   <span class="due-date">${todo.dueDate}</span></h3>
   <pre>${todo.description}</pre>
   <footer class="actions">
   ${todo.isComplete
    ?""
    :'<button class="action complete">Complete</button>'}
   <button class="action delete">Delete</button>
   </footer>
   </div>`).data('todo', todo);

}

//Loops over allTodos and appends the return from createElementFromTodo to appropriate column

function renderTodos() {

// Empties each of the columns which match main conten

 $('main .content').empty();


// Runs a loop for each todo and appends the result of Create ElementFromTodo to the appropriate column 

   pendingTodos.forEach(function(todos){
     
   $('.pending-todos').append(createElementFromTodo(todos))

   });
   
   completedTodos.forEach(function(todos){

   $('.completed-todos').append(createElementFromTodo(todos))

   });


   expiredTodos.forEach(function(todos){
   $('.expired-todos').append(createElementFromTodo(todos))

   });

}


//When clicked toggles left drawer to open and close 
$('.left-drawer').click(function(event){
  $(event.target).hasClass("left-drawer")
  $("#app").toggleClass("drawer-open")
})


//When clicked opens New todo element form window
$('.add-todo').click(function(){
  
  $(".modal").addClass("open")
})


//When clicked appends new todo object to beggining of array. Appends to appropriate column

$('.create-todo').click(function(event){

  event.preventDefault();

  let newTodo = createTodoFromForm(event)
  let todoForm = $('.todo-form')

  allTodos.unshift(newTodo);
  todoForm.trigger('reset');

  $(".modal").removeClass("open")

  threeFuncs();

})

//When clicked closes New todo element form window
$('.cancel-create-todo').click(function(){
  $(".modal").removeClass("open")
})

//Creates new Todo object from todo form

function createTodoFromForm() {

  newTodo = {
    title:$('#todo-title').val(),
    dueDate:$('#todo-due-date').val(),
    description:$('#todo-description').val(),
    isComplete:false}

return newTodo;

}

//When clicked marks todo as complete 
 
$('main').on('click', '.action.complete', function () {

  const todo= $(this).closest(".todo");
  const todoObj = todo.data("todo")
  todoObj.isComplete = true
  
  todo.slideUp(function(){
    
    threeFuncs()

    })

})


//When clicked deletes Todo

$('main').on('click', '.action.delete', function() {

   const todo = $(this).closest(".todo");
   const todoObj = todo.data("todo");
   const index = allTodos.indexOf(todoObj)

   allTodos.splice(index, 1);

   todo.slideUp(function(){

    threeFuncs();
   
   })
  
})

//Removes Expired Todos when clicked
$('.remove-expired').click(function(){

  allTodos = allTodos.filter(function(todo){
    
    return isCurrent(todo)
  })

  threeFuncs();

})

//Removes Completed Todos when clicked

$('.remove-completed').click(function(){

  allTodos = allTodos.filter(function(todo){
    
    return !todo.isComplete 
  })

  threeFuncs();

})



//Compares assigned due date of todo and current date

function isCurrent(todo) {

  const todoDueDate = new Date(todo.dueDate);
  const now = new Date();

  return now < todoDueDate;

}
//Splits Todos to into their distict parts  

function splitTodos(){
 
  pendingTodos = allTodos.filter(function(todo) {
    
// Todo is not complete and current date is not past due date 
    return (!todo.isComplete) && (isCurrent(todo)); 

  })
// Todo is complete 
  completedTodos = allTodos.filter(function(todo) {
    
    return todo.isComplete;
  })
//Todo is not complete and current date is past the due date
  expiredTodos = allTodos.filter(function(todo){
   
    return (!todo.isComplete) && (!isCurrent(todo))

  })
}
//Stores todo data and sets them as String 
function storeData(){
 
  localStorage.setItem('allTodos', JSON.stringify(allTodos))
  
}
//Retrieves todo string data and converts back to an object
function retrieveData (){
  
  allTodos = JSON.parse(localStorage.getItem("allTodos")) 
  || fetchDefaultTodos(); 

}

// Contains default Todos 
function fetchDefaultTodos() {


  todoInstructions = [
    {title:'Open Left Drawer',dueDate:'2020/04/01',description:"Click on the left column below icons to toggle left drawer.", isComplete:false},
    
    {title:'Add new Todo ',dueDate:"2020/04/01",description:"Click on Create New todo. When form pops up, fill out and click CREATE.",isComplete:false},

    {title:'Complete and Delete ',dueDate:"2020/04/01",description:"Click COMPLETE to mark as complete Todo, click DELETE to remove Todo.",
    isComplete:false},

    {title:'Clear Completed or Expired Todos ',dueDate:"2020/04/01",description:"Remove completed or expired Todos by clicking appropriate symbol.",
    isComplete:false}
   ]

    return todoInstructions
}

//Toggles between Complete/Incomplete when Todo title is clicked
$('main').on('click', '.title', function () {

  const todo = $(this).closest('.todo');
  const todoObj = todo.data('todo')
  
  let todoStatus = todoObj.isComplete

  ?todoObj.isComplete = false
  :todoObj.isComplete = true
  

  threeFuncs()
  

})

// Clear storage 
function clearStorage(){
  localStorage.clear();
  location.reload();
}

function threeFuncs(){
  
  storeData();
  splitTodos();
  renderTodos();
}

retrieveData()
splitTodos()
renderTodos()