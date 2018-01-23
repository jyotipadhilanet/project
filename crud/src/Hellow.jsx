import React, { Component } from 'react';

class Label1 extends Component{
    render(){
        return <div><h1>Hello WORLD</h1></div>
    }
};
class Label2 extends Component{
    render(){
        return <div><h1>Hello WORLD data</h1></div>
    }
};
class Label extends Component{
    render(){
        return (
            <div>
            <Label1/>
            <Label2/>
            </div>
        )
    }
};
export default Label;