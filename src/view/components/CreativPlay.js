import { Component } from 'react';
import Header from './Header';
import '../appStyle/main.css';
import '../appStyle/creativPlayStyle.css'


export default class CreativPlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
           games:[],
           media:[],
        };
    }
    handleGameClick = (gameId) => {
        localStorage.setItem('selectedGame', JSON.stringify(gameId));
        window.location.href = '/creatorPage';
    }

    componentDidMount() {
        const userId = 0; //admin user id 
        fetch(`http://localhost:3001/creativPlay/${userId}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ games: data.games , media : data.allMedia});
            })
            .catch(error => {
                console.error('Error fetching games:', error);
            });
    }
    gameImg = (elements , gameScreenId)=>{
       
        const gameScreen = document.getElementById(gameScreenId);
        
        if (!gameScreen) {
           console.error("..screen not found");
           return;
       }
       const screenRect = gameScreen.getBoundingClientRect(); 
       
        let gameElements = []; // to present 
        elements.forEach((character , index) => {
           
            if(character.mediaData.categoryId === 2){
                gameScreen.style.backgroundImage = `url(${character.mediaData.url})`;
            }    
            else{
                if(character.mediaData.categoryId === 7){ //variables
                    gameElements.push(
                        <div className='variable-display' 
                            data-id={index}
                            style={{ 
                                position: 'absolute',
                                top: character.mediaPos.y,
                                left: character.mediaPos.x,
                                visibility: 'visible', 
                                draggable : 'false',
                                
                                }}
                            
                           
                        >
                            
                            <span  draggable ='false'>{character.mediaData.variableName}: {character.mediaData.initialValue}</span>
                        </div>
                    );
                }else if(character.mediaData.categoryId === 6){ //grids
                    gameElements.push(   
                        <div className='grid-container' 
                            data-id={index}
                            style={{ 
                                position: 'absolute', 
                                top: character.mediaPos.y ,
                                left: character.mediaPos.x ,
                                gridTemplateColumns: `repeat(${character.mediaData.columns}, 1fr)`, 
                                gridTemplateRows: `repeat(${character.mediaData.rows}, 1fr)` 
                            }}
                            draggable = 'false'
                          
                        >
                            {Array.from({ length: character.mediaData.columns * character.mediaData.rows }).map((_, gridIndex) => (
                                <div key={gridIndex}  draggable ='false' className='grid-item'></div>
                            ))}
                        </div>
                    );
                }else{
                    gameElements.push(
                        <div className='characters' 
                        data-id={index}
                            style={{ 
                                position:'absolute',
                                top: character.mediaPos.y ,
                                left: character.mediaPos.x }}
                        >
                            <img  
                                src={character.mediaData.url} 
                                alt={character.mediaData.mediaName}
                                draggable='false'
                                style= {{visibility: 'visible'}}
        
                            />
                        </div>);
                } 
               
            }
            
        });
         return gameElements;
    };
    render(){
        const games = this.state.games;
       
            return(
                <div>
                    <Header />
                    <div className="games-grid">
                        {games.map(game => (
                            <div  className="game-card" onClick={() => this.handleGameClick(game.gameId)}>
                                <h1>{game.gameName}</h1>
                                <div className="gameImg" id={game.gameId} >  
                                    {this.gameImg(game.gameElements , game.gameId )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>   
            )
        }

    
}
