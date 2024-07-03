import { Component } from 'react';

import Header from './Header';

import '../appStyle/main.css';
import '../appStyle/signUpStyle.css';

export default class SignUp extends Component {


    constructor(props) {
        super(props);
        this.state = {
            signUpPage:null,
            signUpImg:null,
            formInputs:null,
            formButtons:null
        };
    }

    componentDidMount() {
        const pageName="singUpPage";
    fetch(`http://localhost:3001/form/${pageName}`)

            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({signUpPage:data.page , signUpImg:data.Imgs[0] , formInputs:data.formInputs, formButtons:data.formButtons});
            })
            .catch(error => {
                console.error('Error fetching page data:', error);
            });
    }


    render(){
        const signUpPage = this.state.signUpPage;
        const signUpImg = this.state.signUpImg;
        const formInputs = this.state.formInputs;
        const formButtons = this.state.formButtons;

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
                                    <img className="formIcon" src={item.iconUrl} alt="inputIcon"/>
                                    <input className='inputFild' type={item.type} id={item.inputId} placeholder={item.text}/>
                                </div>    
                                );
                            }
                    
                }
                
            for (const button of formButtons){
                        if (button.inputId === -1){
                            thisPageform.push(<input className="Buttons" id={button.inputName} type="submit" value="Sign Up"/>);
                        }
                        else{
                            thisPageform.push(
                                <div  className="Buttons" id={button.inputName}>  
                                    <a href={button.url} > 
                                        <img className="icon" src={button.iconUrl} alt="buttonIcon"></img>
                                        <h5 className="button-text" id= {button.inputName}>{button.text}</h5>
                                    </a >
                                </div>
                                )
                            }
                }
            }
            console.log(signUpPage , signUpImg);

        if ( signUpPage && signUpImg){
            return (
                <div className="signUpPage">
                    <Header />
                    <img className={signUpImg.mediaName} src={signUpImg.url} alt={signUpImg.mediaName}/>
                    <h1 > {signUpPage.title}</h1>
                    <div>
                        <div id="SignUpForm">
                            {thisPageform}
                        </div>
                    </div>
                </div>
            );
            
        }
    }

}