
// DragAndDropUtils.js
export const handleShapeDragStart = (e,index, shape , sourceDiv) => {
  e.dataTransfer.setData("shape", JSON.stringify(shape));
  e.dataTransfer.setData("sourceDiv", JSON.stringify(sourceDiv));
  e.dataTransfer.setData("index", JSON.stringify(index));

};

export const handleDragOver = (e) => {
  e.preventDefault();   // מבטל את ההתנגדות של הדפדפן ומאפשר לגרירה להתבצע כראוי
};

export const handleShapeDrop = (e, setStateFunction, state) => {
  const sourceDiv = JSON.parse(e.dataTransfer.getData("sourceDiv"));
  const index = JSON.parse(e.dataTransfer.getData("index"));
  const shape = JSON.parse(e.dataTransfer.getData("shape"));
  
  // Check if the game is in Play mode and switch to Pause mode
  if (state.isPlaying) { 
    setStateFunction({ isPlaying: false });
  }
  //
  // Perform action only if shapes and indexCharacter exist
  if (state.shapes && state.indexCharacter !== null){
      const calculateLevel = (newShape, shapes) => {
      let maxLevel = 0;
      shapes.forEach((shape) => {
        const isOverlapping = !(
          newShape.position.x >= shape.position.x + shape.size.width ||
          newShape.position.x + newShape.size.width <= shape.position.x ||
          newShape.position.y >= shape.position.y + shape.size.height ||
          newShape.position.y + newShape.size.height <= shape.position.y
        );

        if (isOverlapping) {// חופפים 
          maxLevel = Math.max(maxLevel, shape.level + 1);
        }
      });
      return maxLevel;
    };

    if (sourceDiv === "noCodelist") {
      
      const position = {
        x: e.clientX,
        y: e.clientY,
      };
      const size = {
        width: 80,
        height: 80,
      };

      const newShape = { shapeId: shape.shapeId, position, size ,inputValue:null};

      setStateFunction((prevState) => {
        let updatedShapes = [...prevState.shapes, newShape];
        updatedShapes.forEach((shape, i) => {
          shape.level = calculateLevel(shape, updatedShapes.slice(0, i));
        });
        updatedShapes.sort((a, b) => {
          if (a.position.y === b.position.y) {
            
            return a.position.x - b.position.x; 
          }
          return a.position.y - b.position.y;
        });
        
        const updatedCharacters = [...prevState.gameCharacters];
        updatedCharacters[prevState.indexCharacter].shapes = updatedShapes;
        return { shapes: updatedShapes, gameCharacters: updatedCharacters };
      });
    } else {
      const divXY = {
        x: document.getElementById(sourceDiv).offsetLeft,
        y: document.getElementById(sourceDiv).offsetTop,
      };

      const posX = e.clientX - divXY.x;
      const posY = e.clientY - divXY.y;

      const divRect = document.getElementById(sourceDiv).getBoundingClientRect();

      const maxXPos = divRect.width;
      const maxYPos = divRect.height;
      let newPosition = {};

      if (posX > 0 && posX < maxXPos - 40 && posY > 0 && posY < maxYPos - 40) {
        newPosition = {
          x: posX + divXY.x,
          y: posY + divXY.y,
        };
      } else {
        let x = posX;
        let y = posY;

        if (posX <= 0) {
          x = 1;
        } else if (posX > maxXPos - 40) {
          x = maxXPos - 40;
        }

        if (posY <= 0) {
          y = 1;
        } else if (posY > maxYPos - 40) {
          y = maxYPos - 40;
        }

        newPosition = {
          x: x + divXY.x,
          y: y + divXY.y,
        };
      }

      setStateFunction((prevState) => {
        const updatedShapes = [...prevState.shapes];
        updatedShapes[index].position = newPosition;
        updatedShapes.forEach((shape, i) => {
          shape.level = calculateLevel(shape, updatedShapes.slice(0, i));
        });
        updatedShapes.sort((a, b) => {
          if (a.position.y === b.position.y) {
            return a.position.x - b.position.x;
          }
          return a.position.y - b.position.y;
        });

        const updatedCharacters = [...prevState.gameCharacters];
        updatedCharacters[prevState.indexCharacter].shapes = updatedShapes;

        return { shapes: updatedShapes, gameCharacters: updatedCharacters };
      });
    }
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