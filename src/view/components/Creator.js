import { Component } from 'react';
import Header from './Header';
import GalleryModal from './GalleryModal'
import {handleShapeDragStart, handleDragOver, handleShapeDrop , handleResize} from './ShapeDragAndDrop';
import {handleMediaDragStart, handleMediaDragEnd  }from './mediaDragAndDrop'
import '../appStyle/main.css';
import '../appStyle/creatorStyle.css';

export default class Creator extends Component {
    constructor(props) {
        super(props);
        this.state = {
          //from database
          creatorMenu:null,
          categories:null,
          allMedia:null,
          codeShapes:null,
          // page variables
          showGallery:false,
          categoryToShow:null,
          gameCharacters:[],
          shapes:[],
          indexCharacter: null,// displayed character 
          isPlaying: false // start a game 
        };
    } 
    /// start or pause a game
    PlayPauseButton = () => {
        this.setState({ isPlaying : !this.state.isPlaying });// מתחלף בין הפעלה להשהייה  
        if (this.state.isPlaying) {
        console.log("playing");//onPause(); // קריאה לפונקציה כשמצב השהייה
        } else {
        console.log("in pause");// onPlay(); // קריאה לפונקציה כשמצב הפעלה
        }
       
    };
    ///
    showModal = (CategoryName) => {
       if (this.state.categories){
        console.log(CategoryName);
            if(CategoryName === 'gameBackgrounds'){
                this.setState({categoryToShow :  this.state.categories.find(category =>category.categoryName === 'gameBackgrounds')});
            }else if(CategoryName === 'gameGallery'){
                this.setState({categoryToShow :  this.state.categories.find(category =>category.categoryName ==='characters' )});
            }else{
                this.setState({categoryToShow : this.state.categories.find(category =>category.categoryName === CategoryName)});
            }

            this.setState({ showGallery : true });
        }   
    }; 

    closeModal = () => {
        this.setState({ showGallery: false });
    };
    
    updateGameCharactersAndBackground = (media) => {
        if (media.categoryId === 2){
                const backgroundIndex = this.state.gameCharacters.findIndex( med => med.mediaData.categoryId === 2); //Returns the index of the element that has the last background; if there is no background, it returns -1.
                const gameScreenDiv = document.getElementById('gameScreen');
                    gameScreenDiv.style.backgroundImage = `url(${media.url})`;
                if (backgroundIndex === -1){ // No backgrounds in the array
                    this.setState({ gameCharacters: this.state.gameCharacters.concat({mediaData:media , mediaPos :{x:700 , y:100} , shapes:[]})});
                }else{//There are backgrounds in the array
                    this.setState(prevState => {
                        // עותק עבור המערך gameCharacters
                        const updatedCharacters = [...prevState.gameCharacters];
                        updatedCharacters[backgroundIndex]= {mediaData:media , mediaPos :{x:700 , y:100} , shapes:[]};
                        return { gameCharacters: updatedCharacters };
                    });
                }
         }else {// if the media is not a background insert to the gameCaracters 
            this.setState({ gameCharacters: this.state.gameCharacters.concat({mediaData:media , mediaPos :{x:700 , y:100} , shapes:[]})});
         }
             
        console.log(this.state.gameCharacters);
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
        console.log(" delete Shape is on ");
        const updatedShapes = [...this.state.shapes];
        updatedShapes.splice(index, 1);
        this.setState({ shapes: updatedShapes });
    }

    componentDidMount() {
        const pageName="creatorPage";
        fetch(`http://localhost:3001/creator/${pageName}`)
            .then(response => response.json())
            .then(data => {
                this.setState({creatorMenu:data.menubuttons , categories:data.categories ,allMedia:data.allMedia , codeShapes:data.codeShapes});
            })
            .catch(error => {
                console.error('Error fetching page data:', error);
            });
        }
    render() {
        /// Updates from the database
        const creatorMenu = this.state.creatorMenu;
        const codeShapes = this.state.codeShapes;

        // page variables
        let gameCharacters = this.state.gameCharacters;
        let userShapes = this.state.shapes ; 
        // buttons of the modal    
        const creatorButtons =[];
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
        
        if (creatorMenu) {
            for (const button of creatorMenu){
                        creatorButtons.push(
                                        <button id={button.inputName} onClick={() => this.showModal(button.inputName)}>
                                            <img 
                                                className="icon" 
                                                src={button.iconUrl} 
                                                alt="buttonIcon"
                                            ></img> 
                                        </button >
                                        );
                    
                }
        } 

        if(codeShapes){
            return(
                <div className='creatorPage'>
                    <Header/>
                    <div id="creator">
                        <div className='noCodelist'>
                            
                                    { codeShapes.map(shape => (
                                        <img 
                                            className ='shapeList' 
                                            src={shape.url} 
                                            alt={shape.shapeName}
                                            draggable="true"
                                            onDragStart={(e) => handleShapeDragStart(e,-1, shape ,'noCodelist')}
                                         />
                                    ))} 
                               
                        </div>
                        <div id='user-no-Code' onDragOver={handleDragOver} onDrop={(e) => handleShapeDrop(e, this.setState.bind(this))}>  
                            {displayedCharacter}
                            {userShapes.map((shape , index) => (
                                <div
                                    style={{ position:'absolute', top:shape.position.y, left:shape.position.x}}
                                >
                                    <span className='delete' onClick={() => this.deleteShape(index)}> X </span>
                                    <img 
                                        className='userShapes' 
                                        src={shape.shapeData.url} 
                                        alt={shape.shapeData.shapeName}
                                        style={{width: shape.size.width, height: shape.size.height}}
                                        draggable='true'
                                        onDragStart={(e) =>handleShapeDragStart(e,index, shape ,'user-no-Code')}   
                                    />
                                    <div
                                        className="resizer"
                                        style={{right: -shape.size.width, bottom: -shape.size.height+15}}
                                        onMouseDown={(e) => handleResize(e, shape, this.setState.bind(this), index)}
                                    ></div>
                                </div>
                            ))}
                        </div>
                        < div className='game'>
                                <div id='gameScreen' onDragOver={handleDragOver} onDrop={(e) => handleMediaDragEnd (e, this.setState.bind(this))}>
                                        {gameCharacters.map((character , index) => (
                                             character.mediaData.categoryId !==2 && 
                                             <div className='characters' 
                                                  style={{ position:'absolute', top:character.mediaPos.y, left:character.mediaPos.x}}
                                             >
                                                <img  
                                                    src={character.mediaData.url} 
                                                    alt={character.mediaData.mediaName}
                                                    draggable='true'
                                                    onDragStart={(e) =>handleMediaDragStart(e,character ,index,'gameScreen')} 
                                                />
                                             </div>
                                          ))}     
                                        <button onClick={this.PlayPauseButton}>
                                            {this.state.isPlaying ? 'Pause' : 'Play'}
                                        </button>     
                                </div>
                                <div className="user-controler">
                                    <div id='gameCharacters'>
                                          { gameCharacters.map((character,index) => (
                                             character.mediaData.categoryId !==2 && 
                                             <div className='characters' >
                                                <span className='delete' onClick={() => this.deleteCharacter(index)}> X </span>
                                                <img 
                                                    src={character.mediaData.url}  
                                                    onClick={() => this.displayShapesForCharacter(index)}
                                                    alt={character.mediaData.mediaName}
                                                    style={{ background: index === this.state.indexCharacter ? 'lightblue' : 'none', cursor: 'pointer' }}
                                                    />

                                             </div>
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
                            this.state.showGallery && (
                            <GalleryModal
                                closeModal={this.closeModal}
                                showModal= {this.showModal}
                                updateGameCharactersAndBackground = {this.updateGameCharactersAndBackground}
                                allMedia = {this.state.allMedia}
                                categories = {this.state.categories}
                                openCategory = {this.state.categoryToShow}
                                
                            />
                        )}
                    </div>   
                </div>
                
                );
            
        }
    }

    
}


