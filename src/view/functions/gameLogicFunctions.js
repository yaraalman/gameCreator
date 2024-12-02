export function onPause(setStateFunction) {
  setStateFunction(prevState => {
    // שוכפל את המצב הקודם
    const newGameCharacters = [...prevState.initialGameCharacters].map(character => ({
      ...character,
      draggable: 'true', // הגדרת אפשרות גרירה
      display: 'visible'    // הגדרת תצוגה
    }));

    // אם יש אינדקס שנבחר, עדכן את ה-shapes
    const selectedCharacterShapes = newGameCharacters[prevState.indexCharacter]?.shapes || [];
   
    return {
      ...prevState,
      gameCharacters: newGameCharacters,
      shapes: selectedCharacterShapes,
    };
  });
}


///on variable change 
 
export function onPlay(e , setStateFunction) {
    setStateFunction(prevState => { 
      const gameScreen = document.getElementById('gameScreen');
      const screenRect = gameScreen.getBoundingClientRect();
      const dynamicObject = {}; 
   
    const setDisplay = (index, newDisplay) => {
      setStateFunction(prevState => {
        console.log("new display:",newDisplay);
        const updatedCharacters = [...prevState.gameCharacters];
        updatedCharacters[index].display = newDisplay;
        return {
          ...prevState,
          gameCharacters: updatedCharacters
        };
      });
    };

   
    const handleVariableChange = (variableName, newValue) => {
      console.log("Inside handleVariableChange");
      console.log(dynamicObject);
      setStateFunction(prevState => ({
          gameCharacters: prevState.gameCharacters.map(character => {
              if (character.mediaData.categoryId === 7 && character.mediaData.variableName === variableName) {
                  return {
                      ...character,
                      mediaData: {
                          ...character.mediaData,
                          initialValue: newValue
                      }
                  };
              }
              return character;
          })
      }));
  }; 


       // עבור על כל הדמויות ועדכן את dynamicObject
      prevState.gameCharacters.forEach(character => {
       
        if (character.mediaData.categoryId === 7) {
          dynamicObject[character.mediaData.variableName] = character.mediaData.initialValue;
        }
      });
      console.log(dynamicObject);
     
      const updatedCharacters = prevState.gameCharacters.map((character, index) => {
          const shapes = [...character.shapes];
          let position = { ...character.mediaPos };
          let draggable = { ...character.mediaPos };
          let display = { ...character.mediaPos };
          
          // Call the recursive function to process the shapes
          const generatedCode =  shapesToCode(prevState.codeShapes, shapes, prevState.conditions);
          console.log(generatedCode); 
          console.log( dynamicObject[character.mediaData.variableName]); 
          try {

            eval(generatedCode);
          } catch (error) {
            console.error("Error evaluating generated code:", error);
          }
        

          position.x = Math.max(-10, Math.min(position.x, screenRect.width - 60));
          position.y = Math.max(-10, Math.min(position.y, screenRect.height - 60));

          if (character.mediaData.categoryId === 7) {
            return {
              ...character,
              mediaData: {
                ...character.mediaData,
                initialValue: dynamicObject[character.mediaData.variableName]
              },
              mediaPos: position,
              draggable: draggable,
              
            };
          }
          return {
              ...character,
              mediaPos: position,
              draggable: draggable,
              
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
    shapeCode = shapeCode.replace(/inputValue/g, shape.inputValue);
    const condition = conditions.find(cond => cond.conditionName === shape.inputValue);
    if (condition) {
      shapeCode = shapeCode.replace(/condition/g, condition.conditionTxt);
      if(condition.needsInput){
        shapeCode = shapeCode.replace(/conditionInput/g,shape.conditionInput );
        
      }
    }
    
  } 
  

  // Process nested shapes
  let nestedShapeCode = '';
  let i = 0;

  while (i < remainingShapes.length && remainingShapes[i].level > shape.level) {
    nestedShapeCode += shapesToCode(codeShapes, [remainingShapes[i]], conditions);
    i++;
  }
 
  // Add the nested shapes code to the current shape's code
  if (`${codeShapes.find(item => item.shapeId === shape.shapeId).shapeName}` === "On Click"){
    shapeCode = shapeCode.slice(0, -4) + nestedShapeCode + shapeCode.slice(-4);
  }
  else{shapeCode = shapeCode.slice(0, -1) + nestedShapeCode + shapeCode.slice(-1);}
  
 
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


/*   
   


    const setPosition = (index, newPosition) => {
      setStateFunction(prevState => {
        const updatedCharacters = [...prevState.gameCharacters];
        updatedCharacters[index].mediaPos = newPosition;
        return {
          ...prevState,
          gameCharacters: updatedCharacters
        };
      });
    };
  
    const setDraggable = (index, newDraggable) => {
      console.log("new draggable:",newDraggable);
      setStateFunction(prevState => {
        const updatedCharacters = [...prevState.gameCharacters];
        updatedCharacters[index].draggable = newDraggable;
        return {
          ...prevState,
          gameCharacters: updatedCharacters
        };
      });
    };
  
    const setDisplay = (index, newDisplay) => {
      setStateFunction(prevState => {
        console.log("new display:",newDisplay);
        const updatedCharacters = [...prevState.gameCharacters];
        updatedCharacters[index].display = newDisplay;
        return {
          ...prevState,
          gameCharacters: updatedCharacters
        };
      });
    };
  

*/