// Inserted objects in array

let allTodos;

let pendingTodos, completedTodos, expiredTodos; 

//Takes Todo input and returns element on the page

function createElementFromTodo(todo) {
    // builds an element and returns it
   divTodoElement = $('<div class = "todo"></div>');
    
   titleDateElement = $('<h3>').html(`<span class ="title">${todo.title}</span><span class ="due-date">${todo.dueDate}</span>`);
   
   descriptionElement = $('<pre>').text(`${todo.description}`);

   footerElement = $('<footer class="actions"></footer>')


  footerElement.html('<button class="action complete">Complete</button><button class="action delete">Delete</button>')
   
  

   divTodoElement.append(titleDateElement,descriptionElement,footerElement)



   return divTodoElement.data('todo',todo);

}

//Loops over allTodos and appends the return from createElementFromTodo to appropriate column

function renderTodos() {

// Empties each of the columns which match main conten

 $('main .content').empty();


// Runs a loop for each todo and appends the result of Create ElementFromTodo to the appropriate column 

   pendingTodos.forEach(function(todos){
     
   $('.pending-todos').append(createElementFromTodo(todos).dueDatedata('todo',todo))

   });
   
   completedTodos.forEach(function(todos){

   $('.completed-todos').append(createElementFromTodo(todos).dueDatedata('todo',todo))

   });


   expiredTodos.forEach(function(todos){
   $('.expired-todos').append(createElementFromTodo(todos).dueDatedata('todo',todo))

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

  storeData()
  splitTodos()
  renderTodos()

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

  const todoElement = $(this).closest(".todo");
  todoElement.data("todo").isComplete = true 
  
  todoElement.slideUp(function(){

    storeData()
    splitTodos()
    renderTodos();

    })

})

//Compares the date and current date of todo 

function isCurrent(todo) {

  const todoDueDate = new Date(todo.dueDate);
  const now = new Date();

  return now < todoDueDate;

}
//Splits Todos to into their distict parts  

function splitTodos(){
 
  pendingTodos = allTodos.filter(function(todo) {
    
// Todo is not complete and current date is not past due date 
    return (todo.isComplete === false) && (isCurrent(todo) === true); 

  })
// Todo is complete 
  completedTodos = allTodos.filter(function(todo) {
    
    return todo.isComplete;
  })
//Todo is not complete and current date is past the due date
  expiredTodos = allTodos.filter(function(todo){
   
    return (todo.isComplete === false) && (isCurrent(todo) === false)

  })
}

function storeDate(){
 
  localStorage.setItem('allTodos', JSON.stringify(allTodos))
  
}

function retrieveData(){

  allTodos =  JSON.parse(localStorage.getItem('allTodos')) ||  fetchDefaultTodos();
}


function fetchDefaultTodos() {
  
  let o = new Date;
    
  return o.setDate(o.getDate()+1),
  
  [{title:"Open the left drawer",dueDate:o.toLocaleString(),description:"Click on the left below the icons to expand the left drawer\n\nWhen you're done, click complete on this todo.",isComplete:!1},
  
  {title:"Make a new Todo",dueDate:o.toLocaleString(),description:"Click the plus symbol\n\nThen, fill out the form that pops up and click CREATE",isComplete:!1},{title:"Make an expired Todo",dueDate:o.toLocaleString(),description:"Click the plus symbol\n\nThen, fill out the form that pops up and click CREATE\n\nMake sure to use a date in the past!",isComplete:!1},
  
  {title:"Clear completed or expired Todos",dueDate:o.toLocaleString(),description:"The checkmark and sweep symbols are for clearing completed or expired todos, respectively.\n\nUse them now.",isComplete:!1}]

}

retrieveData()
splitTodos()
renderTodos()