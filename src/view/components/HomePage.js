import { Component } from 'react';

import '../appStyle/main.css';
import '../appStyle/homeStyle.css';

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            homeMenu: null,
            homeImg:null,
        };
    }

    componentDidMount() {
        const pageName="homePage";
        fetch(`http://localhost:3001/menus/${pageName}`)

            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ homeMenu:data.menubuttons , homeImg:data.homeImg});
            })
            .catch(error => {
                console.error('Error fetching page data:', error);
            });
    }

    render() {
        const homeMenu  = this.state.homeMenu;
        const homeImg  = this.state.homeImg;

        let homeButtons = []; 
       if (homeMenu){
            for (const button of homeMenu) {
                    homeButtons.push(
                        <div className='Buttons' >
                            <a href={button.url} >
                                <img className="icon" src={button.iconImg} alt="buttonIcon"/>
                                <h5 className="button-text" id= {button.buttonName}> {button.text} </h5>
                            </a >
                        </div>
                    );
            }
        }
        //
        if (homeImg){
                return (
                    <div className="homePage">  
                    <img className={homeImg.mediaName} src={homeImg.url} alt={homeImg.mediaName}/>   
                        <div className="list">
                            {homeButtons}
                        </div>
                    </div>  
                );
            
        
        }
    }
}