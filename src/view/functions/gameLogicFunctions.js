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
          
          let dynamicVariables = {};

          if (character.mediaData.categoryId === 7) {
            dynamicVariables[character.mediaData.variableName] = character.mediaData.initialValue;
          }
          // Call the recursive function to process the shapes
          const generatedCode = shapesToCode(prevState.codeShapes, shapes, prevState.conditions);
          
          eval(generatedCode); 
//inputValue 

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

function shapesToCode(codeShapes, shapes ,conditions) {
  if (!shapes || shapes.length === 0) {
    return ''; 
  }

  const shape = shapes[0];
  let remainingShapes = shapes.slice(1);

  let shapeCode = `${codeShapes.find(item => item.shapeId === shape.shapeId).code}`;

// Replace "inputValue" with shape.inputValue
if (shape.inputValue) {
  shapeCode = shapeCode.replace(/inputValue/g, shape.inputValue);
}


// Replace "condition" with the corresponding condition text from the conditions array
if (shape.inputValue) {
  const condition = conditions.find(cond => cond.conditionName === shape.inputValue);
  if (condition) {
    shapeCode = shapeCode.replace(/condition/g, condition.conditionTxt);
  }
}

  // מצא את הצורות עם רמה גבוהה יותר שצריכות להיות בתוך הצורה הנוכחית
  const nestedShapes = remainingShapes.filter(s => s.level > shape.level );

  // אם יש צורות נמלצות, הוסף אותן בצורה רקורסיבית
  if (nestedShapes.length > 0) {
    let nestedShapeCode = shapesToCode(codeShapes, nestedShapes);
    // השמת קוד של הצורות הנמלצות בתוך הקוד של הצורה הנוכחית
    shapeCode = shapeCode.slice(0, -1) + nestedShapeCode + shapeCode.slice(-1);
    // הסר את הצורות הנמלצות מהשאר
    remainingShapes = remainingShapes.filter(s => s.level <= shape.level);
  }

  // טיפול בצורות שנותרו והוספתן למחרוזת הסופית
  return shapeCode + '\n' + shapesToCode(codeShapes, remainingShapes);
}

export function  saveGame (initialGameCharacters)  {
  fetch('http://localhost:3001/saveGame', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ initialGameCharacters:[]})
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