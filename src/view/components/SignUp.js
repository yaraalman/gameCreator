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
            formButtons:null, 

            formData: {},// To store input values
            errors :{}
            
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

    handleInputChange = (e) => {
        const {name, value } = e.target;
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }));
    }
 
    validateForm = () => {
        let valid = true;
        const errors = {}; // Initialize errors object
        console.log('formData:', this.state.formData);
        // Check for first name and last name
        if (!this.state.formData.firstName || !this.state.formData.lastName) {
            errors.lastName ='First name and last name are required';
            valid = false;
        } else {
            errors.lastName ='';
        }
      
        // Check for email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.state.formData.email || !emailPattern.test(this.state.formData.email)) {
            errors.email = 'Invalid email address';
            valid = false;
        } else {
            errors.email = '';
        }
    
        // Check for password
        if (!this.state.formData.password || this.state.formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
            valid = false;
        } else {
            errors.password = '';
        }
    
        // Check for password and confirm password match
        if (this.state.formData.password !== this.state.formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
            valid = false;
        } else {
            errors.confirmPassword = '';
        }
        console.log('errors:', errors);
        this.setState({ errors });
       
        return valid;
    }; 

    
    handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log("Submit button clicked");
       
         const isValid = this.validateForm();
         console.log(isValid);
        
        if (isValid) {
             const { formData } = this.state;
            fetch('http://localhost:3001/SignUp', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/creatorPage';
                } else {
                    console.error('Sign-up failed:', data.message);
                }
            })
            .catch(error => {
                console.error('Error during sign-up:', error);
            });
        } else {
            console.log(this.state.errors);
            console.error('Validation failed. Please correct the errors and try again.');
        }
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
                                <input className='inputFild' name={item.inputName} type={item.type} id={item.inputId} placeholder={item.text} onChange={this.handleInputChange}/>
                                {this.state.errors[item.inputName] &&
                                    <span className="errorText">{this.state.errors[item.inputName]}</span>
                                }
                            </div>    
                            );
                    }
                    else{
                        thisPageform.push(
                            <div id={item.inputName}>
                                <img className="formIcon" src={item.iconUrl} alt="inputIcon"/>
                                <input className='inputFild'name={item.inputName} type={item.type} id={item.inputId} placeholder={item.text} onChange={this.handleInputChange}/>
                                {this.state.errors[item.inputName] &&
                                    <span className="errorText">{this.state.errors[item.inputName]}</span>
                                }
                            </div>    
                            );
                        }
                
            }
            
            for (const button of formButtons){
                    if (button.inputId === -1){ // submit butoon
                        thisPageform.push(<input className="Buttons" id={button.inputName} type="submit" value="Sign Up"/>);
                    }
                    else{
                        thisPageform.push(
                            <div  className="Buttons" id={button.inputName}>  
                                <a href={button.url} > 
                                    <img className="icon" src={button.iconUrl} alt="buttonIcon"></img>
                                    <h5 className="button-text" id= {button.inputName}>{button.text}</h5>
                                </a>
                            </div>
                            )
                        }
            }
        }
       

        if ( signUpPage && signUpImg){
            return (
                <div className="signUpPage">
                    <Header />
                    <img className={signUpImg.mediaName} src={signUpImg.url} alt={signUpImg.mediaName}/>
                    <h1 > {signUpPage.title}</h1>
                    <div>
                        <form id="SignUpForm" onSubmit={this.handleSubmit}>
                            {thisPageform}
                        </form>
                    </div>

                </div>
            );
            
        }
    }

}