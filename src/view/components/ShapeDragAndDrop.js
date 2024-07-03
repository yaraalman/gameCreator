
// DragAndDropUtils.js
export const handleDragStart = (e, shape) => {
  e.dataTransfer.setData("shape", JSON.stringify(shape));
};

export const handleDragOver = (e) => {
  e.preventDefault();   // מבטל את ההתנגדות של הדפדפן ומאפשר לגרירה להתבצע כראוי
};

export const handleDrop = (e, setStateFunction) => {
  e.preventDefault();
  
  const shape = JSON.parse(e.dataTransfer.getData("shape"));
  const offsetX = e.clientX;
  const offsetY = e.clientY;

  const newShape = { ...shape, offsetX, offsetY };

  setStateFunction(prevState => ({
    shapes: [...prevState.shapes, newShape]
  }));
};
