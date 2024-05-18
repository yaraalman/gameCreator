import { Component } from 'react';
import Header from './Header';

export default class NoPage  extends Component {
    render(){
        
        return (
            <div id='noPage' style={{width: '100%', height: '453px'}}>
                <Header />
                <h1> NO PAGE 404</h1>
            </div>
        );
    }

}