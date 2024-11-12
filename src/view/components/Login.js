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
            formButtons:null,
            Email:'',
            Password:'',
            errorMessage:'',

        };
    }
    /*const handleLogout = () => {
    localStorage.removeItem('userDetails');
    // ביצוע כיוונון מחדש לדף ההתחברות או לדף אחר
    window.location.href = '/login';
    }; */
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
    
    
    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;
        
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Store user details in local storage or state
                localStorage.removeItem('userDetails');
                localStorage.setItem('userDetails', JSON.stringify(data.user));
                
                window.location.href = '/creatorPage';
            } else {
                this.setState({ errorMessage: data.message });
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            this.setState({ errorMessage: 'An error occurred. Please try again.' });
        });
    }



    render(){

        const loginPage= this.state.loginPage;
        const loginImg = this.state.loginImg;
        const formInputs= this.state.formInputs;
        const formButtons= this.state.formButtons;

        const thisPageform =[];
       if(formInputs && formButtons){
            for (const item of formInputs){
                    thisPageform.push(
                                    <div>
                                        <img className="formIcon" src={item.iconUrl} alt="inputIcon"/>
                                        <input  className='inputFild' 
                                                name={item.inputName} 
                                                type={item.type} 
                                                id={item.inputId} 
                                                placeholder={item.text}
                                                onChange={this.handleInputChange}
                                        />

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
                    <h1 className='title'> {loginPage.title}   </h1>
                    <form id="LoginForm"  onSubmit={this.handleSubmit}>
                        
                        {thisPageform}
                        {this.state.errorMessage && <p className="error-message">{this.state.errorMessage}</p>}
                    </form>  
                    
                </div>
                 
                );
            }

    }

}