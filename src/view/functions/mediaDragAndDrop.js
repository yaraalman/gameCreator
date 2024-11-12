export const handleMediaDragStart = (e, media, index, sourceDiv) => {
  // Store media, sourceDiv, and index in dataTransfer for drag events
  e.dataTransfer.setData("media", JSON.stringify(media));
  e.dataTransfer.setData("sourceDiv", JSON.stringify(sourceDiv));
  e.dataTransfer.setData("index", JSON.stringify(index));
};

export const handleMediaDragEnd = (e, setStateFunction) => {
  // Get sourceDiv and index from the drag event data
  const sourceDiv = JSON.parse(e.dataTransfer.getData("sourceDiv"));
  const index = JSON.parse(e.dataTransfer.getData("index"));

  if (sourceDiv !== "gameScreen") {
    return;
  }
  // Get the position of the div where the media is dropped
  const divElement = document.getElementById(sourceDiv);
  const divXY = {
    x: divElement.offsetLeft,
    y: divElement.offsetTop,
  };

  // Calculate the position of the media relative to the div
  const posX = e.clientX - divXY.x;
  const posY = e.clientY - divXY.y;

  // Get the boundaries of the div that contains the media
  const divRect = divElement.getBoundingClientRect();
  
  // Set maximum X and Y positions so the media (50x50) stays inside the div
  const maxXPos = divRect.width - 60; // Subtract 50 for media width
  const maxYPos = divRect.height - 60; // Subtract 50 for media height

  // Calculate new media position, keeping it inside the div boundaries
  let newPosition = {
    // Ensure X is within the bounds
    x: Math.max(0, Math.min(posX, maxXPos)) ,
    // Ensure Y is within the bounds
    y: Math.max(0, Math.min(posY, maxYPos)) ,
  };

  // Update the state with the new position of the media
  setStateFunction(prevState => {
    const updatedGameCharacters = [...prevState.gameCharacters];
    updatedGameCharacters[index].mediaPos = newPosition;
    return { gameCharacters: updatedGameCharacters };
  });
};
 