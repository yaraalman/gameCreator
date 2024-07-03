import { Component } from 'react';
import Header from './Header';
import GalleryModal from './GalleryModal'
import { handleDragStart, handleDragOver, handleDrop } from './ShapeDragAndDrop';

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
          shapes:[]
        };
    }
 ///
    showModal = (CategoryName) => {
       if (this.state.categories){
        console.log(CategoryName);
            if(CategoryName === 'gameBackgrounds'){
                this.setState({categoryToShow :  this.state.categories.find(category =>category.categoryName === 'gameBackgrounds')});
                console.log(this.state.categoryToShow);
            }else if(CategoryName === 'gameGallery'){
                this.setState({categoryToShow :  this.state.categories.find(category =>category.categoryName ==='characters' )});
            }else{
                this.setState({categoryToShow : this.state.categories.find(category =>category.categoryName === CategoryName)});
            }

            this.setState({ showGallery : true });
             console.log(this.state.showGallery);
        }

        
    }; 

    closeModal = () => {
        this.setState({ showGallery: false });
    };
    
    updateGameCharactersAndBackground = (media) => {
        if (media.categoryId === 2 ){
                const gameScreenDiv = document.getElementById('gameScreen');
                gameScreenDiv.style.backgroundImage = `url(${media.url})`;
               
        }

        this.setState({ gameCharacters: this.state.gameCharacters.concat(media)});
        
    };
    
    deleteCharacter = (index) => {
        const updatedCharacters = [...this.state.gameCharacters];
        updatedCharacters.splice(index, 1);
        this.setState({ gameCharacters: updatedCharacters });
      }
      
    componentDidMount() {
        const pageName="creatorPage";
        fetch(`http://localhost:3001/creator/${pageName}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.allMedia);
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
        let userSHapes = this.state.shapes ;   

        // buttons of the modal    
        const creatorButtons =[];

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
                                            onDragStart={(e) => handleDragStart(e, shape)}
                                         />
                                    ))} 
                               
                        </div>
                        <div className='user-no-Code' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, this.setState.bind(this))}>   
                            {userSHapes.map((shape, index) => (
                                <div
                                    
                                    style={{ position: 'absolute', top: shape.offsetY, left: shape.offsetX }}
                                >
                                    <img className='userShapes' src={shape.url} alt={shape.shapeName} />
                                </div>
                            ))}
                        </div>

                        < div className='game'>
                                <div id='gameScreen'>
                                         { gameCharacters.map((character,index) => (
                                             character.categoryId !==2 && 
                                             <div className='characters'>
                                                <img src={character.url} alt={character.mediaName} />
                                             </div>
                                          ))}          
                                </div>

                                <div className="user-controler">
                                    <div id='gameCharacters'>
                                          { gameCharacters.map((character,index) => (
                                             character.categoryId !==2 && 
                                             <div className='characters'>
                                                <span className="delete" onClick={() => this.deleteCharacter(index)}> X </span>
                                                <img src={character.url} alt={character.mediaName} />
                                             </div>
                                          ))}               
                                    </div>
                                    <div id='modalButtons'>
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
                                    updateGameCharactersAndBackground = {this. updateGameCharactersAndBackground}
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


