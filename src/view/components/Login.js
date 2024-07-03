import { Component } from 'react';

import Header from './Header';

import '../appStyle/main.css';
import '../appStyle/loginStyle.css';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginPage:null,
            loginImg :null,
            formInputs:null,
            formButtons:null
        };
    }
    
    componentDidMount() {
        const pageName="loginPage";
    
        fetch(`http://localhost:3001/form/${pageName}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({loginPage:data.page , loginImg:data.Imgs[0] , formInputs:data.formInputs, formButtons:data.formButtons});

            })
            .catch(error => {
                console.error('Error fetching page data:', error);
            });
      }
    

    render(){

        const loginPage= this.state.loginPage;
        const loginImg = this.state.loginImg;
        const formInputs= this.state.formInputs;
        const formButtons= this.state.formButtons;
        console.log(loginPage);
        const thisPageform =[];
       if(formInputs && formButtons){
            for (const item of formInputs){
                    thisPageform.push(
                                    <div>
                                        <img className="formIcon" src={item.iconUrl} alt="inputIcon"/>
                                        <input className='inputFild' type={item.type} id={item.inputId} placeholder={item.text}/>
                                    </div>    
                                    )
                
            }
            for (const button of formButtons){ 
                    if (button.inputType === "submit"){
                        thisPageform.push(<input className="Buttons" id={button.inputName} type="submit" value="Login"/>);
                    }
                    else{
                        thisPageform.push(
                            <div className="Buttons" id={button.inputName}>  
                                <a href={button.url} > 
                                    <img className="icon" src={button.iconUrl} alt="buttonIcon"></img>
                                    <h5 className="button-text" >{button.text}</h5>
                                </a >
                            </div>
                            )
                        }
            }
        }
        if (loginPage && loginImg)   {
            return (
                <div className="loginPage">
                    <Header />
                    <img className={loginImg.mediaName} src={loginImg.url} alt={loginImg.mediaName}/>
                    <h1 className='title'> {loginPage.title}</h1>
                    <div id="LoginForm">
                        {thisPageform}
                    </div>    
                </div>

                );
            }

    }

}