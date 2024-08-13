export function onPause(setStateFunction) {
  setStateFunction(prevState => {
    prevState.gameCharacters = [...prevState.initialGameCharacters];
    prevState.shapes = prevState.initialGameCharacters[prevState.indexCharacter]?.shapes || [];
    prevState.gameCharacters.forEach((character, ) => {
      let draggable='true';
      let display =  'none';
    });
    return prevState;
  });
}
export function onPlay(e , setStateFunction) {
  setStateFunction(prevState => { 
      const gameScreen = document.getElementById('gameScreen');
      const screenRect = gameScreen.getBoundingClientRect();

      const updatedCharacters = prevState.gameCharacters.map((character, index) => {
          const shapes = [...character.shapes];
          let position = { ...character.mediaPos };
          let draggable = 'false';
          let display = 'block';

          // Call the recursive function to process the shapes
          const generatedCode = shapesToCode(prevState.codeShapes, shapes, prevState.conditions);
          console.log(generatedCode);
          eval(generatedCode); 


          return {
              ...character,
              mediaPos: position,
              draggable: draggable,
              display: display,
          };
      });

      return {
          ...prevState,
          gameCharacters: updatedCharacters,
      };
  });
}
function shapesToCode(codeShapes, shapes, conditions) {
  if (!shapes || shapes.length === 0) {
    return ''; 
  }

  const shape = shapes[0];
  let remainingShapes = shapes.slice(1);
  
  let shapeCode = `${codeShapes.find(item => item.shapeId === shape.shapeId).code}`;
  // Replace "inputValue" with shape.inputValue and "condition" with condition text
  if (shape.inputValue) {
    shapeCode = shapeCode.replace( /inputValue/g, shape.inputValue);
    const condition = conditions.find(cond => cond.conditionName === shape.inputValue);
    if (condition) {
      shapeCode = shapeCode.replace(/condition/g, condition.conditionTxt);
      if(condition.needsInput){
        shapeCode = shapeCode.replace(/conditionInput/g,shape.conditionInput );
        
      }
    }
    
  } 
  console.log("אחרי החלפה",shapeCode)

  // Process nested shapes
  let nestedShapeCode = '';
  let i = 0;

  while (i < remainingShapes.length && remainingShapes[i].level > shape.level) {
    nestedShapeCode += shapesToCode(codeShapes, [remainingShapes[i]], conditions);
    i++;
  }
  
  // Add the nested shapes code to the current shape's code
  shapeCode = shapeCode.slice(0, -1) + nestedShapeCode + shapeCode.slice(-1);
 
  // Continue processing the remaining shapes that have the same or lower level
  const nextRemainingShapes = remainingShapes.slice(i);

  return shapeCode + '\n' + shapesToCode(codeShapes, nextRemainingShapes, conditions);
}

export function  saveGame (initialGameCharacters , gameName )  {
  const userDetails = JSON.parse(localStorage.getItem('userDetails')) || null;

  // אם אין פרטי משתמש, דחה את הבקשה
  if (!userDetails) {
    console.error('No user is logged in');
    return;
  }

  fetch('http://localhost:3001/saveGame', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ initialGameCharacters ,gameName , userDetails})
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to save game characters');
      }
      return response.json();
  })
  .catch(error => {
      console.error('Error saving game characters:', error);
  });
}