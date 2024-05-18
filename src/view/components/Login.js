/*<input type="text" id="inputName" name="name" placeholder="הזן את השם שלך">/*/
import { Component } from 'react';

import pages from "../myJson/pages.js";
import media from '../myJson/media';
import inputs from '../myJson/inputs.js';
import forms from '../myJson/forms.js';
import buttons from '../myJson/buttons.js';
import Header from './Header';



import '../appStyle/main.css';
import '../appStyle/loginStyle.css';

export default class Login extends Component {
    render(){
        let loginPage = pages.find(page =>(page.pageName ==="loginPage"));
        let loginform =forms.find(item =>(item.formName ==="LoginForm"));
        let loginImg = media.find(img =>(img.mediaName ==="loginImg"));

        const thisPageform =[];

        for (const item of inputs){
            if(loginform.inputs.includes(item.inputId)){
                thisPageform.push(
                                <div>
                                    <img className="formIcon" src={item.iconUrl} alt="inputIcon"/>
                                    <input className='inputFild' type={item.type} id={item.inputId} placeholder={item.content}/>
                                </div>    
                                )
            }
        }
        for (const button of buttons){
            if(loginform.buttons.includes(button.buttonId)) 
                if (button.buttonId === -1){
                    thisPageform.push(<input  id={button.buttonName} type="submit" value="Login"/>);
                }
                else{
                    thisPageform.push(
                        <div  id={button.buttonName}>  
                            <a href={button.url} > 
                                <img className="icon" src={button.iconImg} alt="buttonIcon"></img>
                                {button.text}
                            </a >
                        </div>
                        )
                    }
        }
        
    return (
        <div className="loginPage">
            <Header />
            <img className={loginImg.mediaName} src={loginImg.url} alt={loginImg.mediaName}/>
            <h1 className='title'> {loginPage.title}</h1>

            <div id={loginform.formName}>
                {thisPageform}
            </div>    
        </div>

        );
    }

}