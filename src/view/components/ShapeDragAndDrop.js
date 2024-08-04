
// DragAndDropUtils.js
export const handleShapeDragStart = (e,index, shape , sourceDiv) => {
  e.dataTransfer.setData("shape", JSON.stringify(shape));
  e.dataTransfer.setData("sourceDiv", JSON.stringify(sourceDiv));
  e.dataTransfer.setData("index", JSON.stringify(index));
};

export const handleDragOver = (e) => {
  e.preventDefault();   // מבטל את ההתנגדות של הדפדפן ומאפשר לגרירה להתבצע כראוי
};

export const handleShapeDrop = (e, setStateFunction ) => {
  const sourceDiv = JSON.parse(e.dataTransfer.getData("sourceDiv"));
  const index = JSON.parse(e.dataTransfer.getData("index"));
 
 
  if (sourceDiv ==="noCodelist"){
          const shape = JSON.parse(e.dataTransfer.getData("shape"));
          const positon = {
            x: e.clientX,
            y: e.clientY,
          };
          const size = {
            width: 80,
            height:80 
          };

          const newShape = {shapeData:shape ,position:positon ,size:size};

          setStateFunction(prevState => ({
            shapes: [...prevState.shapes, newShape]
          }));
  }else{
          const divXY= {
                        x: document.getElementById(sourceDiv).offsetLeft ,
                        y :document.getElementById(sourceDiv).offsetTop
                      }

          const posX = e.clientX - divXY.x;
          const posY = e.clientY - divXY.y;
      
          // Ensure the character does not exceed the boundaries of the gameScreen
          const divRect = document.getElementById(sourceDiv).getBoundingClientRect();
          
          const maxXPos = divRect.width;
          const maxYPos = divRect.height;
          let newPosition = {};  
      
          //Character at boundaries
          if (posX > 0 && posX < maxXPos-40 && posY > 0 && posY < maxYPos-40) {
              newPosition = {
                  x: posX + divXY.x,
                  y: posY + divXY.y,
              };
      
            // Handle cases where X or Y are out of bounds
          } else {
              let x= posX; 
              let y= posY;
      
              //Character's X is too large || less than 0 
              if (posX <= 0){
                  x= 1 ; //posX Minimum boundary?
              }else if (posX > maxXPos-40  ){
                  x= maxXPos-40 ; //posX Maximum boundary
              }
      
              //Character's Y is too large || less than 0
              if (posY <= 0){
                  y= 1 ; //posY Minimum boundary
              }else if (posY > maxYPos-40){
                  y= maxYPos-40 ; //posY Maximum boundary
              }
      
              newPosition = { 
                  x: x + divXY.x,
                  y: y + divXY.y,
              };
            
          } 
          setStateFunction(prevState => {
              const updatedShapes = [...prevState.shapes];
              updatedShapes[index].position = newPosition;
              return { shapes: updatedShapes };
            });
     }
};

   
export const handleResize = (e ,shape, setStateFunction , index) => {
  const startWidth = shape.size.width;
  const startHeight = shape.size.height;
  const startX = e.clientX;
  //const startY = e.clientY;

  const onMouseMove = (event) => {
      const deltaX = event.clientX - startX;
      const newWidth = startWidth + deltaX;
      const newHeight = (newWidth / startWidth) * startHeight; // שמירה על יחס הרוחב והגובה המקוריים

      const newSize = {
          width: newWidth,
          height: newHeight
      };
      
      setStateFunction(prevState => {
        const updatedShapes = [...prevState.shapes];
        updatedShapes[index].size = newSize;
        return { shapes: updatedShapes };
        });
  };

  const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};