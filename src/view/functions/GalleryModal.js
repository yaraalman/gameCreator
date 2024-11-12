import React from 'react';
import '../appStyle/modal.css';

const galleryModal = ({ closeModal , showModal , updateGameCharactersAndBackground , allMedia, categories , openCategory , setState}) => {
   
   
    const categoriesDiv = [];
    if(openCategory.categoryId !== 2 ){// If the category is a game background, do not display the other categories.
        categoriesDiv.push(
            <div className='categories' >
                     { categories.map(category => (category.categoryId !== 2 && 
                       <button className ='categorybutton' onClick={() => showModal(category.categoryName)}>
                         <img className ='categoryImg' src={category.categoryImg} alt={category.categoryName}  />
                       </button>
                    ))}  
            </div>
        );
    }
    const variableInput =[];
    if (openCategory.categoryId === 7) { // variable input 
        variableInput.push(
            <div className='variableInput' >
                <input className='inputFild' type='text' id='variableName' placeholder="Please enter a name for the new variable:" />
                <input className='inputFild' type='text' id='initialValue' placeholder="Please enter the initial value:" />
                <button id='addButton' onClick={() => {
                    const variableName = document.getElementById('variableName').value;
                    const initialValue = document.getElementById('initialValue').value;
                    if (!variableName || !initialValue) {
                        return;
                    }
                    const gameScreenDiv = document.getElementById('gameScreen');
                    const gameScreenRect = gameScreenDiv.getBoundingClientRect();
                    // "Creating a new character variable with an initial value."
                    const newVariableCharacter = {
                        mediaData: { mediaId: -1 ,categoryId:7, variableName: variableName, initialValue: initialValue },
                        mediaPos: {x:10 , y:10},
                        draggable: 'true',
                        display: 'block',
                        shapes: []
                    };
                    setState(prevState => ({
                        gameCharacters: prevState.gameCharacters.concat(newVariableCharacter)
                    }));
                }}>
                    Add
                </button>
            </div>
        );
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => closeModal()}> X   </span>
                {categoriesDiv}      
                <div id="gallery" >
                        { allMedia.map(media => (
                            media.categoryId === openCategory.categoryId && openCategory.categoryId !==7 &&
                            <button className='buttonGalleryImg' onClick={() => updateGameCharactersAndBackground(media)}>
                                <img className ='galleryImg' src={media.url} alt={media.mediaName} />
                            </button>
                            
                        ))}   
                        {variableInput}    
                </div>
                

            </div>    
        </div>
  );
};

export default  galleryModal ;