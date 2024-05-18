import { Component } from 'react';

import pages from "../myJson/pages.js";
import media from '../myJson/media';

import'../appStyle/main.css';
import'../appStyle/aboutUsStyle.css';
import Header from './Header';

export default class AboutUs  extends Component {
    render(){
      let aboutUsPage= pages.find(thisPage =>(thisPage.pageName ==="aboutUsPage"));
      let aboutUsImg = media.find(img =>(img.mediaName ==="aboutUsImg" ));
            let text =[];
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
