export const handleMediaDragStart = (e, media ,index , sourceDiv ) => {
    e.dataTransfer.setData("media", JSON.stringify(media));
    e.dataTransfer.setData("sourceDiv", JSON.stringify(sourceDiv));
    e.dataTransfer.setData("index", JSON.stringify(index));
  };

  export const handleMediaDragEnd = ( e, setStateFunction ) => {
    const sourceDiv = JSON.parse(e.dataTransfer.getData("sourceDiv"));
    const index = JSON.parse(e.dataTransfer.getData("index"));
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
    console.log("lala",maxXPos , maxYPos);
    let newPosition = {};  

    //Character at boundaries
    if (posX > 0 && posX < maxXPos && posY > 0 && posY < maxYPos) {
    newPosition = {
      x: posX + divXY.x,
      y: posY + divXY.y,
    };

    // Handle cases where X or Y are out of bounds
    } else {
    let x = posX; 
    let y= posY;

    //Character's X is too large || less than 0 
    if (posX <= 0){
      x=1 + divXY.x ; //posX Minimum boundary?
    }else{
      x= divXY.x + maxXPos-1 ; //posX Maximum boundary
    }

    //Character's Y is too large || less than 0
    if (posY <= 0){
      y= 1 + divXY.x ; //posY Minimum boundary
    }else{
      y= divXY.x + maxYPos -1 ; //posY Maximum boundary
    }

    newPosition = { 
      x: x,
      y: y,
    };

    } 
    setStateFunction(prevState => {
    const updatedgameCharacters = [...prevState.gameCharacters];
    updatedgameCharacters[index].mediaPos = newPosition;
    return { gameCharacters: updatedgameCharacters };
    });
    };

 