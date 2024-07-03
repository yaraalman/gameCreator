import { Component } from 'react';

import '../appStyle/footerStyle.css';

export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page:null,
        };
    }

    componentDidMount() {
        const pageName="footer";
        fetch(`http://localhost:3001/text/${pageName}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({page:data.page});

            })
            .catch(error => {
                console.error('Error fetching page data:', error);
            });
    }

    render(){
        const page = this.state.page;
        
        if (page){
            const pageContent= JSON.parse(page.content); 
            console.log(pageContent);
            return (
                <div id="footer">
                        <h5 id="text1"> {pageContent[0]} </h5>
                        <h5 id="text2"> {pageContent[1]} </h5>
                </div>   
            );
       }

    }
}


