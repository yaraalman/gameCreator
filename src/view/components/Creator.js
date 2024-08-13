import { Component } from 'react';
import Header from './Header';
import GalleryModal from '../functions/GalleryModal'
import {handleShapeDragStart, handleDragOver, handleShapeDrop , handleResize} from '../functions/ShapeDragAndDrop';
import {handleMediaDragStart, handleMediaDragEnd  }from '../functions/mediaDragAndDrop'
import { onPlay, onPause ,saveGame } from '../functions/gameLogicFunctions';
import '../appStyle/main.css';
import '../appStyle/creatorStyle.css';
//import Rope3D from './Rope3D'
export default class Creator extends Component {
    constructor(props) {
        super(props);
        this.state = {
          //from database
          creatorMenu:null,
          categories:null,
          allMedia:null,
          codeShapes:null,
          conditions:null,
          // page variables
          showModal:0,
          categoryToShow:null,
          gameName:"",
          initialGameCharacters:[],
          gameCharacters:[], 
          shapes:[],
          indexCharacter: null,// displayed character user code
          isPlaying: false ,// start a game 
          conditionInput :false ///if some condition needs an input
        };
    } 

    
    /// start or pause a game
    PlayPauseButton = () => {
        this.setState(prevState => {
            const isPlaying = !prevState.isPlaying;
            return { 
                isPlaying: isPlaying,
                initialGameCharacters: isPlaying ? [...prevState.gameCharacters] : prevState.initialGameCharacters
            };
        }, () => {
            // Callback function to be called after the state is updated
            if (this.state.isPlaying) {
                onPlay(null , this.setState.bind(this)); // Call onPlay with the current state
            } else {   
                onPause(this.setState.bind(this)); // Call onPause with the current state
            }
        });
    };
    ///
    showGallery = (CategoryName) => {
        if (this.state.isPlaying) {
            // Call PlayPauseButton to switch to Pause mode 
            this.PlayPauseButton();
        }
       if (this.state.categories){
            if(CategoryName === 'gameBackgrounds'){
                this.setState({categoryToShow :  this.state.categories.find(category =>category.categoryName === 'gameBackgrounds')});
            }else if(CategoryName === 'gameGallery'){
                this.setState({categoryToShow :  this.state.categories.find(category =>category.categoryName ==='characters' )});
            }else{
                this.setState({categoryToShow : this.state.categories.find(category =>category.categoryName === CategoryName)});
            }

            this.setState({ showModal : 1 });
        }   
    };

    handleInputGameNameChange = (e) => {   
        const { value } = e.target;
        this.setState(prevState => ({
          ...prevState,
          gameName: value
        }));
      };

    handleSaveGame = () => {
        if (this.state.isPlaying) {
            // Call PlayPauseButton to switch to Pause mode 
            this.PlayPauseButton();
        }
        this.setState({ 
                initialGameCharacters:[...this.state.gameCharacters] 
            });

        saveGame(this.state.initialGameCharacters, this.state.gameName); // מעביר את השם לפונקציית השמירה
        this.setState({ showModal: 0}); // סגירת ה-modal ואיפוס השם
    }

    closeModal = () => {
        this.setState({ showModal: 0 });
    };
    
    updateGameCharactersAndBackground = (media) => {
        if (this.state.isPlaying) {
            // Call PlayPauseButton to switch to Pause mode 
            this.PlayPauseButton();
        }
        if (media.categoryId === 2){
                const backgroundIndex = this.state.gameCharacters.findIndex( med => med.mediaData.categoryId === 2); //Returns the index of the element that has the last background; if there is no background, it returns -1.
                const gameScreenDiv = document.getElementById('gameScreen');
                    gameScreenDiv.style.backgroundImage = `url(${media.url})`;
                if (backgroundIndex === -1){ // No backgrounds in the array
                    this.setState({ gameCharacters: this.state.gameCharacters.concat({mediaData:media , mediaPos :{x:700 , y:100} ,draggable: 'false' ,display:'block',shapes:[]})});
                }else{//There are backgrounds in the array
                    this.setState(prevState => {
                        // עותק עבור המערך gameCharacters
                        const updatedCharacters = [...prevState.gameCharacters];
                        updatedCharacters[backgroundIndex]= {mediaData:media , mediaPos :{x:700 , y:100},draggable: 'false' ,display:'block'  , shapes:[]};
                        return { gameCharacters: updatedCharacters , initialGameCharacters : updatedCharacters};
                    });
                }
         }else {// if the media is not a background insert to the gameCaracters 
            this.setState({ gameCharacters: this.state.gameCharacters.concat({mediaData:media , mediaPos :{x:700 , y:100} ,draggable: 'true' ,display:'block' , shapes:[]})});
         }
    };
    
    deleteCharacter = (index) => {
        ////Handling displayed character and shapes when deleting a character from the array of characters 
        if ( this.state.indexCharacter !== null){
            if (this.state.gameCharacters.length <=1 ){ 
                this.setState({indexCharacter : null ,shapes : []});
            }else if(this.state.indexCharacter > index){
                let newInd = this.state.indexCharacter - 1;
                this.setState({indexCharacter : newInd});
            }else if(this.state.indexCharacter === index){
                if(index === this.state.gameCharacters.length-1){
                    let newInd = this.state.indexCharacter - 1;
                    this.setState({indexCharacter : newInd , shapes : this.state.gameCharacters[newInd].shapes}); 
                }else{
                    let newInd = this.state.indexCharacter + 1;
                    this.setState({shapes : this.state.gameCharacters[newInd].shapes});
                }
            }
        }
        // delete character 
        const updatedCharacters = [...this.state.gameCharacters];
        updatedCharacters.splice(index, 1);
        this.setState({ gameCharacters: updatedCharacters});

    }

    /// Presenting code shapes according the chosen character 
    displayShapesForCharacter = (newIndex)=> {
        if (this.state.indexCharacter !== null &&  this.state.indexCharacter !== newIndex ){
            this.setState(prevState => {
                const updatedCharacters = [...prevState.gameCharacters];
                const character = updatedCharacters[this.state.indexCharacter];
                character.shapes = this.state.shapes ;
                updatedCharacters[this.state.indexCharacter] = character;
                return { gameCharacters: updatedCharacters };
            });
            
            this.setState({indexCharacter: newIndex , shapes : this.state.gameCharacters[newIndex].shapes});

            
        }else{
            this.setState({ indexCharacter: newIndex , shapes : this.state.gameCharacters[newIndex].shapes});
        }
    }

    ///delete a shape
    deleteShape = (index) => {
        if (this.state.isPlaying) {
            // Call PlayPauseButton to switch to Pause mode 
            this.PlayPauseButton();
        }
        const updatedShapes = [...this.state.shapes];
        updatedShapes.splice(index, 1);
        this.setState({ shapes: updatedShapes });
    }

    componentDidMount() {
        const pageName="creatorPage";
        const selectedGame = localStorage.getItem('selectedGame');

        fetch(`http://localhost:3001/creator/${pageName}`)
            .then(response => response.json())
            .then(data => {
                this.setState({creatorMenu:data.menubuttons , categories:data.categories ,allMedia:data.allMedia , codeShapes:data.codeShapes , conditions: data.conditions});
            })
            .catch(error => {
                console.error('Error fetching page data:', error);
            });

            const handleKeyDown = (e) => {
                if (this.state.isPlaying) {
                    onPlay(e, this.setState.bind(this)); // העברת setState function
                }
            };
            
            if (selectedGame) {
                const gameId = JSON.parse(selectedGame);
                fetch(`http://localhost:3001/getGame/${gameId}`)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({
                            gameCharacters: data.initialGameCharacters,
                            initialGameCharacters: data.initialGameCharacters,
                            gameName:data.gameName
                            
                        });
                        // נקה את localStorage
                        localStorage.removeItem('selectedGame');
                    })
                    .catch(error => {
                        console.error('Error fetching game details:', error);
                    });
            }

            window.addEventListener('keydown', handleKeyDown);
            this.handleKeyDown = handleKeyDown;


    }
    
    componentWillUnmount() {
        //  remove the event listener
        if (this.handleKeyDown) {
          window.removeEventListener('keydown', this.handleKeyDown);
        }
      }
    render() {
        /// Updates from the database
        const creatorMenu = this.state.creatorMenu;
        const codeShapes = this.state.codeShapes;
        
        // page variables
        let gameCharacters = this.state.gameCharacters;
        let userShapes = this.state.shapes ; 

        // The character displaying its shapes.
        let  displayedCharacter = "";
        if( this.state.indexCharacter !== null && this.state.indexCharacter >= 0 && this.state.gameCharacters[this.state.indexCharacter].mediaData.categoryId !== 2){
            displayedCharacter = (
                <img 
                    className='displayedCharacter' 
                    src={this.state.gameCharacters[this.state.indexCharacter].mediaData.url} 
                    alt={this.state.gameCharacters[this.state.indexCharacter].mediaData.mediaName}
                    draggable='false'
                /> );
        }

        // buttons of the modal    
        const creatorButtons =[];
        if (creatorMenu) {
            creatorButtons.push( 
                <button onClick={this.PlayPauseButton}>
                    {this.state.isPlaying ? 'Pause' : 'Play'}
                </button>   
            );
            for (const button of creatorMenu){
                if(button.inputName === 'saveButton'){
                    creatorButtons.push( 
                        <button onClick={ () => {
                                    if (this.state.isPlaying) {
                                        // Call PlayPauseButton to switch to Pause mode
                                        this.PlayPauseButton();
                                    }
                                    const { gameName } = this.state;
                                    if (gameName) {
                                        saveGame(this.state.gameCharacters, gameName);
                                    } else {
                                        this.setState({ showModal: 2 });
                                    }}
                        }>
                              <img 
                                className="icon" 
                                src={button.iconUrl} 
                                alt="buttonIcon"
                            ></img> 
                        </button>   
                    );
                }else{
                    creatorButtons.push(
                        <button id={button.inputName} onClick={() => this.showGallery(button.inputName)}>
                            <img 
                                className="icon" 
                                src={button.iconUrl} 
                                alt="buttonIcon"
                            ></img> 
                        </button >
                    );
                }
                
            }
        } 

        /// Display of Characters in the game screen 
        let gameElements = [];
        gameCharacters.forEach((character , index) => {
           
            if(character.mediaData.categoryId !== 2){
                if(character.mediaData.categoryId === 7){ //varables
                    gameElements.push(
                        <div className='variable-display' 
                            style={{ 
                                position: 'absolute',
                                top: character.mediaPos.y,
                                left: character.mediaPos.x,
                                display: character.display || 'block', 
                                }}
                            draggable = {character.draggable} 
                            onDragStart={(e) => this.state.isPlaying ? null : handleMediaDragStart(e, character, index, 'gameScreen')}
                        >
                            
                            <span  draggable ='false'>{character.mediaData.variableName}: {character.mediaData.initialValue}</span>
                        </div>
                    );
                }else if(character.mediaData.categoryId === 6){ //grids
                    gameElements.push(   
                        <div className='grid-container' 
                            style={{ 
                                position: 'absolute', 
                                top: character.mediaPos.y, 
                                left: character.mediaPos.x,
                                gridTemplateColumns: `repeat(${character.mediaData.columns}, 1fr)`, 
                                gridTemplateRows: `repeat(${character.mediaData.rows}, 1fr)` 
                            }}
                            draggable = {character.draggable} 
                            onDragStart={(e) => this.state.isPlaying ? null : handleMediaDragStart(e, character, index, 'gameScreen')}
                        >
                            {Array.from({ length: character.mediaData.columns * character.mediaData.rows }).map((_, gridIndex) => (
                                <div key={gridIndex}  draggable ='false' className='grid-item'></div>
                            ))}
                        </div>
                    );
                }else{
                    gameElements.push(
                        <div className='characters' 
                            style={{ position:'absolute', top:character.mediaPos.y, left:character.mediaPos.x}}
                        >
                            <img  
                                src={character.mediaData.url} 
                                alt={character.mediaData.mediaName}
                                draggable={character.draggable}
                                style={{display:character.display}}
                                onDragStart={(e) => this.state.isPlaying ? null : handleMediaDragStart(e, character, index, 'gameScreen')} 
                            />
                        </div>);
                } 
               
            }
            
        });
        
        
        /// Display of user no code shapes 
        let displayUserShapes = []; 

        const handleshapeInputChange = (e, index) => {
            const value = e.target.value;
            
            this.setState(prevState => {
                // Clone the shapes array and update the specific shape's inputValue
                const updatedShapes = [...prevState.shapes];
                updatedShapes[index] = {
                    ...updatedShapes[index],
                    inputValue: value,
                };

                // Clone the gameCharacters array and update the shapes of the displayedCharacter
                const updatedCharacters = [...prevState.gameCharacters];
                updatedCharacters[prevState.indexCharacter].shapes = updatedShapes;
                 
                console.log(updatedCharacters);
                //// If the value of e is a condition of type 'collisions' 
                let conditionInput;
                if (value === 'collisions'){
                    conditionInput= true;
                }
                else{
                    conditionInput= false;
                }
                // Update the state with the modified shapes and gameCharacters
                return { 
                    ...prevState, 
                    shapes: updatedShapes,
                    gameCharacters: updatedCharacters, 
                    conditionInput: conditionInput
                };
            });
        };
        
        userShapes.forEach((shape, index) => {
            const codeShape = codeShapes.find(item => item.shapeId === shape.shapeId);
            const { inputType } = codeShape || {}; 

            displayUserShapes.push(
                <div
                    style={{ position: 'absolute', top: shape.position.y, left: shape.position.x }}
                >
                    <span className='delete' onClick={() => this.deleteShape(index)}> X </span>
                    {inputType === 'condition' ? (
                        <select
                            value={shape.inputValue || ""}
                            className='shapeInput'
                            onChange={(e) => handleshapeInputChange(e, index)}
                        >
                            <option value="" disabled>Select condition</option>
                            {this.state.conditions.map(condition => (
                                <option key={condition.conditionId} value={condition.conditionName}>
                                    {condition.conditionName}
                                </option>
                            ))}
                        </select>
                    ) : inputType === 'int' ? (
                        <input
                            className='shapeInput'
                            type="number"
                            placeholder="Enter number"
                            value={shape.inputValue || ""}
                            style={{ position: 'absolute' }} 
                            onChange={(e) => handleshapeInputChange(e, index)}
                        />
                    ) : inputType === 'variable' ? (
                        <select
                            value={shape.inputValue || ""}
                            className='shapeInput'
                            onChange={(e) => handleshapeInputChange(e, index)}
                        >
                            <option value="" disabled>Select variable</option>
                            {this.state.gameCharacters
                                .filter(Character => Character.mediaData.categoryId === 7)
                                .map(Character => (
                                    <option key={Character.conditionId} value={Character.mediaData.variableName}>
                                        {Character.mediaData.variableName}
                                    </option>
                                ))}
                        </select>
                    ) : null }
                    {this.state.conditionInput ? (
                        <select
                            value={shape.inputValue || ""}
                            className='shapeInput'
                            onChange={(e)=>{
                                const value = e.target.value;
                                                    
                                this.setState(prevState => {
                                // Clone the shapes array and update the specific shape's inputValue
                                    const updatedShapes = [...prevState.shapes];
                                    updatedShapes[index] = {
                                        ...updatedShapes[index],
                                        conditionInput: value,
                                    };
                    
                                    // Clone the gameCharacters array and update the shapes of the displayedCharacter
                                    const updatedCharacters = [...prevState.gameCharacters];
                                    updatedCharacters[prevState.indexCharacter].shapes = updatedShapes;
                                
                                    // Update the state with the modified shapes and gameCharacters
                                    return { 
                                        ...prevState, 
                                        shapes: updatedShapes,
                                        gameCharacters: updatedCharacters, 
                                        ////  init the conditionInput
                                        conditionInput: false,
                                    };
                                });
                            }
                               
                            }   
                        >
                            <option value="" disabled>Select variable</option>
                            {this.state.gameCharacters
                                .filter(Character => Character.mediaData.categoryId !== 7)
                                .map((Character , index) => (
                                    <option key={Character.conditionId} value={index} >
                                        {Character.mediaData.mediaName}
                                    </option>
                            ))}
                        </select>
                        ) : null
                    }
                    <img 
                        className='userShapes' 
                        src={codeShapes.find(item => item.shapeId === shape.shapeId).url} 
                        alt={codeShapes.find(item => item.shapeId === shape.shapeId).shapeName}
                        style={{width: shape.size.width, height: shape.size.height}}
                        draggable='true'
                        onDragStart={(e) => handleShapeDragStart(e, index, shape, 'user-no-Code')}   
                    />
                    <div
                        className="resizer"
                        style={{right: -shape.size.width, bottom: -shape.size.height + 15}}
                        onMouseDown={(e) => handleResize(e, shape, this.setState.bind(this), index)}
                        draggable='false'
                    ></div>
                </div>
            );
        })
          
        if(codeShapes){
            return(
                <div className='creatorPage'>
                    <Header/>
                    <div id="creator">
                        <div className='noCodelist'>
                                    {codeShapes.map(shape => (
                                        <img 
                                            className ='shapeList' 
                                            src={shape.url} 
                                            alt={shape.shapeName}
                                            draggable="true"
                                            onDragStart={(e) => handleShapeDragStart(e,-1, shape ,'noCodelist')}
                                         />
                                    ))} 
                        </div>
                        <div id='user-no-Code' onDragOver={handleDragOver} onDrop={(e) => handleShapeDrop(e, this.setState.bind(this),this.state)}>  
                            {displayedCharacter}
                            {displayUserShapes}
                        </div>
                        < div className='game'>
                                <div id='gameScreen' onDragOver={handleDragOver} onDrop={(e) => handleMediaDragEnd (e, this.setState.bind(this))}>  
                                    {gameElements}
                                </div>
                                <div className="user-controler">
                                    <div id='gameCharacters'>
                                            {gameCharacters.map((character, index) => (
                                                     character.mediaData.categoryId !== 2 && (
                                                            <div className='characters'>
                                                                <span className='delete' onClick={() => this.deleteCharacter(index)}> X </span>
                                                                {character.mediaData.categoryId === 7 ? (
                                                                    <div
                                                                        onClick={() => this.displayShapesForCharacter(index)}
                                                                        style={{ background: index === this.state.indexCharacter ? 'lightblue' : 'none', cursor: 'pointer' }}
                                                                    >
                                                                        {character.mediaData.variableName}
                                                                    </div>
                                                                ) : (
                                                                    <img 
                                                                        src={character.mediaData.url}  
                                                                        onClick={() => this.displayShapesForCharacter(index)}
                                                                        alt={character.mediaData.mediaName}
                                                                        draggable={false}
                                                                        style={{ background: index === this.state.indexCharacter ? 'lightblue' : 'none', cursor: 'pointer' }}
                                                                    />
                                                                )}
                                                            </div>
                                                        )
                                             ))}  
                                    </div>
                                    <div id='galleryButtons'>
                                        {creatorButtons}
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className='gallery'>
                        {   
                            this.state.showModal === 1 && (
                            <GalleryModal
                                closeModal={this.closeModal}
                                showModal= {this.showGallery}
                                updateGameCharactersAndBackground = {this.updateGameCharactersAndBackground}
                                allMedia = {this.state.allMedia}
                                categories = {this.state.categories}
                                openCategory = {this.state.categoryToShow}
                                setState = {this.setState.bind(this)}
                                
                            />
                        )}
                    </div> 
                    <div className="gameNameModal">
                        {this.state.showModal === 2 && (
                                <div className="modal">
                                    <div className="nameModal-content">
                                        <h2>Enter Game Name</h2>
                                        <input
                                            type="text"
                                            value={this.state.gameName}
                                            onChange={this.handleInputGameNameChange}
                                        />
                                        <button className="button" onClick={this.handleSaveGame}>Save Game</button>
                                        <button className="button" onClick={this.closeModal}>Cancel</button>
                                    </div>
                                </div>
                        )}
                    </div>     
                </div>
                
                );
            
        }
    }

    
}


