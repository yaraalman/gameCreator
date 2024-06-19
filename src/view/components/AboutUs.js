import { Component } from 'react';

import'../appStyle/main.css';
import'../appStyle/aboutUsStyle.css';
import Header from './Header';

export default class AboutUs  extends Component {

  constructor(props) {
    super(props);
    this.state = {
        aboutUsPage:{},
        aboutUsImg :{}
    };
}

componentDidMount() {
    const pageName="aboutUsPage";

    fetch(`http://localhost:3001/text/${pageName}`)
        .then(response => response.json())
        .then(data => {
            this.setState({aboutUsPage:data.page , aboutUsImg:data.aboutUsImg});
        })
        .catch(error => {
            console.error('Error fetching page data:', error);
        });
  }

  render(){
        const aboutUsPage=this.state.aboutUsPage;
        const aboutUsImg =this.state.aboutUsImg;
      
        let text =[];

        if (aboutUsPage && aboutUsPage.content){

          for (let i=0; i< aboutUsPage.content.length; i++){
            if (i===2){
              text.push(
                <h3 >  
                    {aboutUsPage.content[i]}
                </h3>
              );
            }else{
                text.push(
                <p >  
                  {aboutUsPage.content[i]}
                </p>
            );
            };
          }
        }
        if (aboutUsImg){
          return (
            
            <div id='aboutUsPage' >
              <Header />
              <img className={aboutUsImg.mediaName} src={aboutUsImg.url} alt={aboutUsImg.mediaName}/>
              <h1 > {aboutUsPage.title} </h1>
              <div className='text-container'>
                {text}  
              </div>
                            
            </div>
          );
        }
      
  }

}
