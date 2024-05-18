import { Component } from 'react';
import pages from "../myJson/pages.js";
import '../appStyle/footerStyle.css';

export default class Footer extends Component {
    render(){
        let footer= pages.find(item =>(item.pageName ==="footer"));
        
        return (
             <div id="footer">
                    <h5  id="text1"> {footer.content[0]} </h5>
                    <h5  id="text2"> {footer.content[1]} </h5>
             </div>   
        );
    }

}


