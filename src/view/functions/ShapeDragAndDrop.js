
// DragAndDropUtils.js

// Function to handle when dragging of a shape starts
export const handleShapeDragStart = (e, index, shape, sourceDiv) => {
  // Store shape data, source div, and index in the dataTransfer object for later use in drop
  e.dataTransfer.setData("shape", JSON.stringify(shape));
  e.dataTransfer.setData("sourceDiv", JSON.stringify(sourceDiv));
  e.dataTransfer.setData("index", JSON.stringify(index));
};

// Function to allow dragging over an element
export const handleDragOver = (e) => {
  e.preventDefault(); // Prevent default behavior to allow proper drag-and-drop functionality
};

// Function to handle when a shape is dropped
export const handleShapeDrop = (e, setStateFunction, state) => {
  // Retrieve stored data from dataTransfer
  const sourceDiv = JSON.parse(e.dataTransfer.getData("sourceDiv"));
  const index = JSON.parse(e.dataTransfer.getData("index"));
  const shape = JSON.parse(e.dataTransfer.getData("shape"));

  // If the sourceDiv is not "noCodelist" or "user-no-Code", do nothing
  if (sourceDiv !== "noCodelist" && sourceDiv !== "user-no-Code") {
    return;
  }

  // Check if the game is in Play mode, and if so, switch it to Pause mode
  if (state.isPlaying) { 
    setStateFunction({ isPlaying: false });
  }

  // Check if shapes exist and if the index of the character is valid
  if (state.shapes && state.indexCharacter !== null) {
    
    // Function to calculate the level of the shape (z-index) based on overlap
    const calculateLevel = (newShape, shapes) => {
      let maxLevel = 0;
      shapes.forEach((shape) => {
        // Check if shapes overlap
        const isOverlapping = !(
          newShape.position.x >= shape.position.x + shape.size.width ||
          newShape.position.x + newShape.size.width <= shape.position.x ||
          newShape.position.y >= shape.position.y + shape.size.height ||
          newShape.position.y + newShape.size.height <= shape.position.y
        );

        if (isOverlapping) { // If they overlap, increment the level
          maxLevel = Math.max(maxLevel, shape.level + 1);
        }
      });
      return maxLevel;
    };

    // If the shape is from "noCodelist"
    if (sourceDiv === "noCodelist") {
      // Set the position and size of the new shape
      const position = {
        x: e.clientX,
        y: e.clientY,
      };
      const size = {
        width: 80,
        height: 80,
      };

      // Create the new shape object
      const newShape = { shapeId: shape.shapeId, position, size, inputValue: null, conditionInput: null };

      // Update the state with the new shape
      setStateFunction((prevState) => {
        let updatedShapes = [...prevState.shapes, newShape];
        
        // Set level for each shape
        updatedShapes.forEach((shape, i) => {
          shape.level = calculateLevel(shape, updatedShapes.slice(0, i));
        });
        
        // Sort shapes by position (for display purposes)
        updatedShapes.sort((a, b) => {
          if (a.position.y === b.position.y) {
            return a.position.x - b.position.x;
          }
          return a.position.y - b.position.y;
        });
        
        // Update the shapes in the gameCharacters array
        const updatedCharacters = [...prevState.gameCharacters];
        updatedCharacters[prevState.indexCharacter].shapes = updatedShapes;

        return { shapes: updatedShapes, gameCharacters: updatedCharacters };
      });
    } else {
      // If the source is from "user-no-Code" div, calculate new position within bounds
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

      // Check if the shape is within bounds
      if (posX > 0 && posX < maxXPos - 40 && posY > 0 && posY < maxYPos - 40) {
        newPosition = {
          x: posX + divXY.x,
          y: posY + divXY.y,
        };
      } else {
        let x = posX;
        let y = posY;

        // Adjust position if it is out of bounds
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

      // Update the state with the new position
      setStateFunction((prevState) => {
        const updatedShapes = [...prevState.shapes];
        updatedShapes[index].position = newPosition;
        
        // Set level for each shape
        updatedShapes.forEach((shape, i) => {
          shape.level = calculateLevel(shape, updatedShapes.slice(0, i));
        });
        
        // Sort shapes by position
        updatedShapes.sort((a, b) => {
          if (a.position.y === b.position.y) {
            return a.position.x - b.position.x;
          }
          return a.position.y - b.position.y;
        });

        // Update the shapes in the gameCharacters array
        const updatedCharacters = [...prevState.gameCharacters];
        updatedCharacters[prevState.indexCharacter].shapes = updatedShapes;

        return { shapes: updatedShapes, gameCharacters: updatedCharacters };
      });
    }
  }
};

// Function to handle resizing of a shape while keeping the aspect ratio
export const handleResize = (e, shape, setStateFunction, index) => {
  const startWidth = shape.size.width;
  const startHeight = shape.size.height;
  const startX = e.clientX;

  // Function to handle mouse movement and resize the shape
  const onMouseMove = (event) => {
    const deltaX = event.clientX - startX;
    const newWidth = startWidth + deltaX;
    const newHeight = (newWidth / startWidth) * startHeight; // Keep original width-to-height ratio

    const newSize = {
      width: newWidth,
      height: newHeight
    };
    
    // Update shape size in state
    setStateFunction(prevState => {
      const updatedShapes = [...prevState.shapes];
      updatedShapes[index].size = newSize;
      return { shapes: updatedShapes };
    });
  };

  // Stop resizing on mouse up
  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  // Start listening for mouse movement and mouse up events
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};
