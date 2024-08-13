import { Component } from 'react';

import '../appStyle/main.css';
import '../appStyle/headerStyle.css';


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerMenu:null,
            logoImg:null,
            cloudImg:null,
            turtleImg:null,
            profilIcon:null,
            userDetails: JSON.parse(localStorage.getItem('userDetails')) || null
        };
    }

    componentDidMount() {
        const pageName="header";
        fetch(`http://localhost:3001/menus/${pageName}`)
            .then(response => response.json())
            .then(data => {
                this.setState({headerMenu:data.menubuttons, logoImg:data.Imgs[0] , cloudImg:data.Imgs[1] , turtleImg:data.Imgs[2] , profilIcon:data.Imgs[3]});
            })
            .catch(error => {
                console.error('Error fetching page data:', error);
            });
    }

    render(){

        const headerMenu = this.state.headerMenu;
        const logoImg=this.state.logoImg ;
        const cloudImg=this.state.cloudImg ;
        const turtleImg=this.state.turtleImg ;
        const profilIcon=this.state.profilIcon ;
       

        let headrButons =[];
        
        if (headerMenu) {
            for (const button of headerMenu){
                        headrButons.push(
                                            <li className={button.inputName}>  
                                                <a className="headerLink" href={button.url} > 
                                                    <img className="icon" src={button.iconUrl} alt="buttonIcon"></img>
                                                    <span>{button.text}</span>
                                                </a >
                                            </li>
                                        );
                    
                }
        }

        if (logoImg && cloudImg && turtleImg && profilIcon){
            const userProfileImage = this.state.userDetails && this.state.userDetails.profileImage ? this.state.userDetails.profileImage : profilIcon?.url;
            const userName = this.state.userDetails ? `${this.state.userDetails.firstName} ${this.state.userDetails.lastName}` : "Guest";
            return(
                    <div id="header" > 
                        <a className="headerLink" href="/home" > 
                            <img className={logoImg.mediaName} src={logoImg.url} alt={logoImg.mediaName}/>
                        </a>
                        <ul>
                                {headrButons}
                        </ul>
                        <img className={cloudImg.mediaName} src={cloudImg.url} alt={cloudImg.mediaName}/>
                        <img className={turtleImg.mediaName} src={turtleImg.url} alt={turtleImg.mediaName}/>
                        <div className="profile">
                            <img className={profilIcon.mediaName} src={userProfileImage} alt={profilIcon.mediaName}/>
                            <span className="userName">{userName}</span>
                        </div>
                    </div>
            )
        }

    }
}
