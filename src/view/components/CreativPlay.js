import { Component } from 'react';
import Header from './Header';
import '../appStyle/main.css';



export default class CreativPlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
           games:[]
        };
    }
    handleGameClick = (gameId) => {
        localStorage.setItem('selectedGame', JSON.stringify(gameId));
        window.location.href = '/creatorPage';
    }

    componentDidMount() {
        const userId = 1; // User ID שאתה רוצה למשוך משחקים אליו
        fetch(`http://localhost:3001/creativPlay/${userId}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ games: data.games });
            })
            .catch(error => {
                console.error('Error fetching games:', error);
            });
    }
 
    render(){
        const games = this.state.games;
        console.log(this.state.games);
         
            return(
                <div>
                    <Header />
                    <div className="games-grid">
                        {this.state.games.map(game => (
                            <div key={game.gameId} className="game-card" onClick={() => this.handleGameClick(game.gameId)}>
                                <h1>{game.gameName}</h1>
                            </div>
                        ))}
                    </div>
                </div>   
            )
        }

    
}
