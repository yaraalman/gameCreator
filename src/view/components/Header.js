import { Component } from 'react';

import media from '../myJson/media';
import menus from '../myJson/menus';
import buttons from '../myJson/buttons'; 

import '../appStyle/main.css';
import '../appStyle/headerStyle.css';


export default class Header extends Component {
    render(){
        let headrButons =[];
        let logoImg = media.find(myMedia =>(myMedia.mediaName ==="logo"));  
        let cloudImg = media.find(myMedia =>(myMedia.mediaName ==="cloud2")); 
        let turtleImg = media.find(myMedia =>(myMedia.mediaName ==="turtle"));  
        let profilIcon = media.find(myMedia =>(myMedia.mediaName ==="profilIcon"));
        let headerMenu = menus.find(menu => (menu.menuName === "headerMenu"));

        for (const button of buttons){
                if(headerMenu.buttons.includes(button.buttonId)){
                    headrButons.push(
                                        <li className='{button.buttonName}'>  
                                            <a href={button.url} > 
                                                <img className="icon" src={button.iconImg} alt="buttonIcon"></img>
                                                {button.text}
                                            </a >
                                        </li>
                                    )
                }
          }

        return(
                <div id="header"  > 
              
                    <img className={logoImg.mediaName} src={logoImg.url} alt={logoImg.mediaName}/>
                    <ul>
                            {headrButons}
                    </ul>
                    <img className={cloudImg.mediaName} src={cloudImg.url} alt={cloudImg.mediaName}/>
                    <img className={turtleImg.mediaName} src={turtleImg.url} alt={turtleImg.mediaName}/>
                    <img className={profilIcon.mediaName} src={profilIcon.url} alt={profilIcon.mediaName}/>
                
                </div>
        );

    }

}

