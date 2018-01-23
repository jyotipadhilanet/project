import React, { Component } from 'react';
import Errorh from './Errorhandler'
class App extends Component
{
    render(){
        return(
        <div>
            <h1>This is example of Error Handling</h1>
            <Errorh>
               <He/>
            </Errorh>
            <Footer/>
        </div>)
    }
}

class He extends Component{
    constructor(){
        super();
              throw new Error("error here");
    }
    render(){
       return (<h1>This is example of Header</h1>)
            }
            }

class Footer extends Component{
    render(){
        return  <h1>This is example of footer</h1>
    }
}

export default App;