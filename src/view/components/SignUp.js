import { Component } from 'react';

import pages from "../myJson/pages.js";
import media from '../myJson/media';
import inputs from '../myJson/inputs.js';
import forms from '../myJson/forms.js';
import buttons from '../myJson/buttons.js';
import Header from './Header';


import '../appStyle/main.css';
import '../appStyle/signUpStyle.css';

export default class SignUp extends Component {
    render(){
        let signUpPage = pages.find(page =>(page.pageName ==="singUpPage"));
        let signUpform =forms.find(item =>(item.formName ==="SignUpForm"));
        let signUpImg = media.find(img =>(img.mediaName ==="signUpImg" ));

        const thisPageform =[];
        for (const item of inputs){
            if(signUpform.inputs.includes(item.inputId)){
                if(item.inputId===2){
                    thisPageform.push(
                        <div id={item.inputName}>
                            <input className='inputFild' type={item.type} id={item.inputId} placeholder={item.content}/>
                        </div>    
                        );
                }
                else{
                    thisPageform.push(
                        <div id={item.inputName}>
                            <img className="formIcon" src={item.iconUrl} alt="inputIcon"/>
                            <input className='inputFild' type={item.type} id={item.inputId} placeholder={item.content}/>
                        </div>    
                        );
                    }
            }
        }

        for (const button of buttons){
            if(signUpform.buttons.includes(button.buttonId)) 
                if (button.buttonId === -1){
                    thisPageform.push(<input  id={button.buttonName} type="submit" value="Sign Up"/>);
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
            <div className="signUpPage">
                <Header />
                <img className={signUpImg.mediaName} src={signUpImg.url} alt={signUpImg.mediaName}/>
                <h1 > {signUpPage.title}</h1>
                <div>
                    <div id={signUpform.formName}>
                        {thisPageform}
                    </div>
                </div>
            </div>
        );
    }

}