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
            profilIcon:null
        };
    }

    componentDidMount() {
        const pageName="header";
        fetch(`http://localhost:3001/menus/${pageName}`)
            .then(response => response.json())
            .then(data => {
                this.setState({headerMenu:data.menubuttons, logoImg:data.logoImg , cloudImg:data.cloudImg , turtleImg:data.turtleImg , profilIcon:data.profilIcon});
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
                                            <li className={button.buttonName}>  
                                                <a className="headerLink" href={button.url} > 
                                                    <img className="icon" src={button.iconImg} alt="buttonIcon"></img>
                                                    <span>{button.text}</span>
                                                </a >
                                            </li>
                                        );
                    
                }
        }

        if (logoImg && cloudImg && turtleImg && profilIcon){
            return(
                    <div id="header" > 
                        <img className={logoImg.mediaName} src={logoImg.url} alt={logoImg.mediaName}/>
                        <ul>
                                {headrButons}
                        </ul>
                        <img className={cloudImg.mediaName} src={cloudImg.url} alt={cloudImg.mediaName}/>
                        <img className={turtleImg.mediaName} src={turtleImg.url} alt={turtleImg.mediaName}/>
                        <img className={profilIcon.mediaName} src={profilIcon.url} alt={profilIcon.mediaName}/>
                    
                    </div>
            )
        }

    }
}
