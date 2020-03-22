//adds cell grids
function makeGrid(){
  for(let index = 0; index < 64; index = index + 1) {
      const addGrid = $('<div class ="cell"></div>');
    
      $('.grid')
        .append(addGrid);
     }
  }
  
  makeGrid()
  

  //adds color palette
  function makePalette() {
   const PALETTE = [
     'red',
     'blue',
     'green',
     'purple',
     'orange',
     'pink',
     'white',
     'black'
   
   ]
   
    for (let index = 0; index < PALETTE.length; index = index + 1) {

     // access the color
     const palleteColor = PALETTE[index];
     const addPalette =  $('.palette');
     const button = $('<button>');
     
     button.css('background-color',palleteColor)
     addPalette.append(button);
    
    } 
   }
   

  makePalette();
  

  // Activates color when clicked
  
  function onPaletteClick () {
    
    //add & remove 'active' class//
    $('.palette .active').removeClass('active');
    $(this).addClass('active');
  
  }

  //add active class on first button//
  $('.palette button').first().addClass('active');

  $('.palette button').click(onPaletteClick);
  
  
  

  /* Attaches active color pallete when grid cell is clicked and removes color when clicked
   if  active color and cell color are the same  */
  

  function onGridClick() 
  {
    let activeColor = $('.palette .active').css('background-color');
    let cellColor = $(this).css('background-color');
    
    if (activeColor === cellColor) {
     
      $(this).css('background-color','');
    }
      else 
        {
         $(this).css('background-color',activeColor)
        }
         
  }
  
  $('.grid .cell').click(onGridClick);


  // Clears all cells when clicked

  function onClearClick() {

    let clearCells = $('.grid .cell').css('background-color', '')

  }
  
  $('.controls .clear').click(onClearClick);

// Fills all empty cells with active color when clicked

  function onFillAllClick() {

    let activeColor = $('.palette .active').css('background-color');

     $('.grid .cell').css('background-color', activeColor);
  }

  $('.controls .fill').click(onFillAllClick);



  //Fill all empty cells with active color when clicked //

  function onFillEmptyClick() {
 
    let activeColor = $('.palette .active').css('background-color');
    let allCells = $('.cell');
  
    for (let index = 0; index < allCells.length; index = index + 1) {
      
      let cell = allCells[index];

      if ($(cell).css('background-color') == 'rgba(0, 0, 0, 0)') {
      
          $(cell).css('background-color', activeColor);
   
      }
    }
  }

  $('.controls .fill-empty').click(onFillEmptyClick);
  


  //Add color input css

  $('main').prepend('<section class ="add-color-input"></section>')
  $('.add-color-input')
  .css('width','100px')
  .css('margin-right' , '2rem')


  $('.add-color-input')
  .append('<div class = "color-input"><input type="text" placeholder = "color name" id = "input-box"><button id = "new-color-button" >Add Color</button>')

  $('#input-box')
  .css('width','100px')
  .css('height','20px')
  .css('border','solid 2px black')
  .css('font-size','15px')
  .css('text-align','center')
  .css('padding','10px')

  $('#new-color-button')
  .css('margin-top','.5rem')
  .css('margin-left','1.2rem')
  .css('font-family','sans-serif')
  .css('font-size','10px')
  .css('font-weight','bold')
  .css('padding','5px')
  .css('border','solid 1.5px black')
  .css('cursor','pointer')
  
  //add color input selector

  $('.color-input button').click(function () {

    const input = $('.color-input input');
    const value = input.val()
    const addPalette =  $('.palette');
    const button = $('<button>');
  
   if (value !== '') {

      button.css('background-color',value)
      addPalette.append(button);

      $('.palette button').click(onPaletteClick);
      input.val('')

   }

   else {
    input.val('')
    
   }
    
     
})

  
