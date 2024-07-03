import { Component } from 'react';

import Header from './Header';

import '../appStyle/main.css';
import '../appStyle/contactUsStyle.css'

export default class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactPage:null,
            contactImg :null,
            formInputs:null,
            formButtons:null
        };
    }
    
    componentDidMount() {
        const pageName="contactUsPage";
        fetch(`http://localhost:3001/form/${pageName}`)
            .then(response => response.json())
            .then(data => {
                this.setState({contactPage:data.page , contactImg:data.Imgs[0] , formInputs:data.formInputs, formButtons:data.formButtons});
            })
            .catch(error => {
                console.error('Error fetching page data:', error);
            });
      }
    
    render(){
        const contactPage= this.state.contactPage;
        const contactImg = this.state.contactImg;
        const formInputs= this.state.formInputs;
        const formButtons= this.state.formButtons;
        const thisPageform =[];
            
        if(formInputs && formButtons){
                for (const item of formInputs){
                      /// last name input without an icon
                        if(item.inputId === 12){
                            thisPageform.push(
                                <div id={item.inputName}>
                                    <input className='inputFild' type={item.type} id={item.inputId} placeholder={item.text}/>
                                </div>    
                                );
                        }
                        else{
                            thisPageform.push(
                                <div id={item.inputName}>
                                    <img className="formIcon" id={item.inputName} src={item.iconUrl} alt="inputIcon"/>
                                    <input className='inputFild' type={item.type} id={item.inputId} placeholder={item.text}/>
                                </div>    
                                );
                            }
                    
                }

                for (const button of formButtons){
                        if (button.inputId === -1){
                            thisPageform.push(<input className="Buttons" id={button.inputName} type="submit" value="send"/>);
                        }
                        else{
                            thisPageform.push(
                                <div className="Buttons" id={button.inputName}>  
                                    <a href={button.url} > 
                                        <img className="icon" src={button.iconUrl} alt="buttonIcon"></img>
                                        <h5 className="button-text" id= {button.inputName}>{button.text}</h5>
                                    </a >
                                </div>
                                )
                            }
                }
        }
        
        if (contactPage && contactImg){
            return (
                <div id= "contactUsPage">
                    <Header/>
                    <img className={contactImg.mediaName} src={contactImg.url} alt={contactImg.mediaName}/>
                    <div id="ContactUsForm">
                        <h1> {contactPage.title} </h1>
                        <p> {contactPage.content} </p>
                            {thisPageform} 
                    </div>    
                </div>
            );
        }
    }
}

