
let heldValue = null;
let heldOperation = null;
let nextValue = null;

// click handler function when pressing digits

$('.digits button').click (function() {
  
  if (nextValue === null ){
    nextValue = "0";
  }

  nextValue = nextValue + $(this).text();
  
  $('.next-value').text(nextValue);

  updateDisplay();
  

});

// Show value function 

function showValue(location, value) {
  
  if (value === null) {
    $(location).text("")

  }

  else {

    $(location).text(Number(value))
  }

}

// Updates Calculator display when called 

function updateDisplay () {

  showValue('.held-value',heldValue);
  showValue('.next-Value',nextValue);
}

// Resets global variables to null when called

function clearAll () {

 heldValue = null;
 heldOperation = null;
 nextValue = null;

}

// Resets nextValue to null when called
function clearEntry () {

  nextValue = null;
}

// Add, Subtract, Mutiply, Divide functions

function add (x,y) {
  
  return Number(x) + Number(y);

}

function subtract (x,y) {
 
  return Number(x) - Number(y);

}

function multiply (x,y) {

  return Number(x) * Number(y);
}

function divide (x,y) {
  
  return Number(x)/Number(y);
}

// Set operation function

function setHeldOperation (operation) {
   
  
  if (heldOperation !== null){
    heldValue = heldOperation(heldValue,nextValue);

  } else if (nextValue !== null){
    
    heldValue = nextValue;

  }
  
    nextValue = null;  
    heldOperation = operation;
    
}


// Click functions for all buttons

$('.add').click (function() {
   
  setHeldOperation(add);
  $(".next-operation").text('+');
  updateDisplay();
});


$('.subtract').click(function() {
  
  setHeldOperation(subtract);
  $(".next-operation").text('-');
  updateDisplay();

})


$('.multiply').click(function() {

  setHeldOperation(multiply);
  $(".next-operation").html("&times;")
  updateDisplay();
 
})


$('.divide').click(function() {
  setHeldOperation(divide);
  $(".next-operation").text('/');
  updateDisplay();
 
})


$('.equals').click(function() {
    
    setHeldOperation(null);
    $(".next-operation").text("");
    updateDisplay();
   
})


$('.clear-all').click(function() {
  clearAll();
  $('.next-operation').text('')
  updateDisplay();
 
})


$('.clear-entry').click(function() {
  clearEntry();
  updateDisplay();
  
})

