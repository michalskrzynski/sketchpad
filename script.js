const screenWidth = 960;
let currentColor = 'black';

//paneId can come with or no # sign
const drawPane = function(paneId, xBoxes) {
  //maximum 100 boxes in row due to efficiency
  //also not allowing negative or 0
  xBoxes = Math.abs( Math.min( xBoxes, 100 )); 

  //error if no pane, 
  const pane = document.querySelector( '#' + paneId.replace('#')); 
  if( !pane ) { console.error('NO PANE DIV!'); return; }

  
  //removing all existing boxes wrapped by pane-hook
  //pane-hook is created for easiness of boxes removal
  let paneHook = document.querySelector('div#pane-hook');
  if( paneHook ) pane.removeChild( paneHook );

  //creating new pane-hook
  paneHook = document.createElement('div');
  paneHook.setAttribute( 'id', 'pane-hook');
  pane.appendChild( paneHook );

  
  
  //creating boxes
  const boxSize = Math.floor( screenWidth / xBoxes );
  let boxArray = [];
  for( let i=0; i< Math.pow(xBoxes, 2); i++ ) {
    boxArray.push( createBoxNode(boxSize) );
  }

  //and adding to DOM under pane-hook
  paneHook.append(...boxArray);
}



const createBoxNode = function (boxSize) {
  const box = document.createElement('div');
  box.setAttribute( 'class', 'pane-box');
  box.setAttribute( 'style', `width: ${boxSize}px; height: ${boxSize}px;` );
  box.addEventListener('mouseover', (ev) => {
    box.classList.add('mouseover');
  }, false);

  box.addEventListener('mouseout', (ev) => {
    box.classList.remove('mouseover');
  })

  box.addEventListener('click', (ev) => {
    box.style.backgroundColor = currentColor;
  })
  
  return box;
}


/////
///// on page load
/////
drawPane( 'touchpane', 16);


///// button reset
document.querySelector('button#reset').addEventListener('click', () => {
  document.querySelector('#popup').setAttribute( 'style', 'display: flex');
});

///// modal confirm
document.querySelector('button#confirm-reset').addEventListener('click', () => {
  const sideX = document.querySelector('#sideX').value;
  const xNumber = Number( sideX );

  //drawing new pane
  if( xNumber ) drawPane('touchpane', Math.min( 100, xNumber) );

  //closing popup
  document.querySelector('#popup').setAttribute( 'style', 'display: none');
});

///// colorpicker
document.querySelectorAll('.colorbox').forEach( (elem) => { 
  elem.addEventListener('click', (e) => {
    const classes = Array.from( e.currentTarget.classList );
    const colorClass = classes.find( (v) => v.search(/^pick/g) !== -1 );
    currentColor = colorClass.substring(4);
    
    document.querySelector('h4.current-color').style.backgroundColor = currentColor;
  })
});