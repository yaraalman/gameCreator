import { Component } from 'react';

import Header from './Header';
import pages from "../myJson/pages.js";
import media from '../myJson/media';
import inputs from '../myJson/inputs.js';
import forms from '../myJson/forms.js';
import buttons from '../myJson/buttons.js';

import '../appStyle/main.css';
import '../appStyle/contactUsStyle.css'

export default class ContactUs extends Component {
    render(){
        let contactPage = pages.find(page =>(page.pageName ==="contactUsPage"));
        let contactform =forms.find(item =>(item.formName ==="ContactUsForm"));
        let contactImg = media.find(img =>(img.mediaName ==="contactUsImg" ));

        const thisPageform =[];
        for (const item of inputs){
            if(contactform.inputs.includes(item.inputId)){
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
                            <img className="formIcon" id={item.inputName} src={item.iconUrl} alt="inputIcon"/>
                            <input className='inputFild' type={item.type} id={item.inputId} placeholder={item.content}/>
                        </div>    
                        );
                    }
            }
        }

        for (const button of buttons){
            if(contactform.buttons.includes(button.buttonId)) 
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
            <div id= "contactUsPage">
                <Header />
                <h1 > {contactPage.title}</h1>
                <p>{contactPage.content}</p>
                <img className={contactImg.mediaName} src={contactImg.url} alt={contactImg.mediaName}/>
                <div id={contactform.formName}>
                    {thisPageform} 
                </div>    
            </div>
        );
    }
}

