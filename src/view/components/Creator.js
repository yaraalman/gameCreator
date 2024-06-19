import { Component } from 'react';
import Header from './Header';
//import userControler from './userControler';
import '../appStyle/main.css';
import '../appStyle/creatorStyle.css';

export default class Creator extends Component {
    constructor(props) {
        super(props);
        this.state = {
          creatorMenu:null
        };
    }

    componentDidMount() {
        const pageName="creator";
        fetch(`http://localhost:3001/menus/${pageName}`)
            .then(response => response.json())
            .then(data => {
                this.setState({creatorMenu:data.menubuttons});
            })
            .catch(error => {
                console.error('Error fetching page data:', error);
            });
    }

    render() {
        const creatorMenu = this.state.creatorMenu;
        const creatorButtons =[];
        if (creatorMenu) {
            for (const button of creatorMenu){
                        creatorButtons.push(
                                            <div className={button.buttonName}>  
                                                <a href={button.url} > 
                                                    <img className="icon" src={button.iconImg} alt="buttonIcon"></img> 
                                                </a >
                                            </div>
                                        );
                    
                }
        }
    return(
        <div className='creatorPage'>
            <Header/>
            <div id="creator">
                    <div className='noCodelist'>
                    </div>

                    <div className='user-no-Code'>    
                    </div>

                    < div className='game'>
                            <div id='gameScreen'>
                            </div>
                            <div className="user-controler">
                                <div id='gameCharacters'>
                                    
                                </div>
                                <div id='menus'>
                                    {creatorButtons}
                                </div>
                            </div>
                    </div>
                    
            </div>
            

        </div>  );
    }

    
}


