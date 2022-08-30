const screenWidth = 960;
let boxArray = [];

//paneId can come with or no # sign
const drawPane = function(paneId, xBoxes) {
  //maximum 100 boxes in row due to efficiency
  xBoxes = Math.min( xBoxes, 100 ); 

  //error if no pane, 
  const pane = document.querySelector( '#' + paneId.replace('#')); 
  if( !pane ) { console.error('NO PANE DIV!'); return; }


  const boxSize = Math.floor( screenWidth / xBoxes );
  for( let i=0; i< Math.pow(xBoxes, 2); i++ ) {
    boxArray.push( createBoxNode(boxSize) );
  }

  pane.append(...boxArray);
}

const createBoxNode = function (boxSize) {
  const box = document.createElement('div');
  box.setAttribute( 'class', 'pane-box');
  box.setAttribute( 'style', `width: ${boxSize}px; height: ${boxSize}px;` );
  //box.addEventListener();
  
  return box;
}

drawPane( 'touchpane', 16);