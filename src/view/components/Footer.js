import { Component } from 'react';

import '../appStyle/footerStyle.css';

export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pages: {},
        };
    }

    componentDidMount() {
        const pageName="footer";
        fetch(`http://localhost:3001/text/${pageName}`)

            .then(response => response.json())
            .then(data => {
                this.setState({ pages:data});
            })
            .catch(error => {
                console.error('Error fetching page data:', error);
            });
    }

    render(){
        const { pages } = this.state.pages;
        let footer=null;
        if (pages){
         footer= pages.find(item =>(item.pageName ==="footer"));
        
        }

       if (footer){
            return (
                <div id="footer">
                        <h5  id="text1"> {footer.content[0]} </h5>
                        <h5  id="text2"> {footer.content[1]} </h5>
                </div>   
            );
       }

    }
}


