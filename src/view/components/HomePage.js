import { Component } from 'react';
import media from '../myJson/media';
import buttons from'../myJson/buttons.js';
import menus from'../myJson/menus.js';

import '../appStyle/main.css';
import '../appStyle/homeStyle.css';

export default class HomePage extends Component {
   
    render(){
        let homeButtons =[];
        let homeMenu = menus.find(myMenu=> myMenu.menuName === "homeMenu")
        let homeImg = media.find(myMedia =>(myMedia.mediaName ==="homeBackground"));
        
        for (const button of buttons){
                if(homeMenu.buttons.includes(button.buttonId)){
                    homeButtons.push(
                                <div className='Buttons' id={button.buttonName}>  
                                    <a href={button.url} > 
                                        <img className="icon" src={button.iconImg} alt="buttonIcon"/>
                                        {button.text}
                                    </a >
                                </div>
                            );
                }
          }
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