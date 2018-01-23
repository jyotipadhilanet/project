import React, { Component } from 'react';
import $ from 'jquery';
class JqEx extends Component{
    constructor(){
        console.log('Constructor!')
        super();
        this.name="jyoti";
        let jyoti="jyoti padhi";
        this.state={
            infor:[]
        }
        this.getName=this.getName.bind(this);
    }
    getName(){
        console.log('Component WILL MOUNTgfsfsdfsdf!')
    }
    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }
    componentDidMount() {
        $.ajax({
            url:'https://jsonplaceholder.typicode.com/users',
            success:(data)=>{
                this.setState({infor:data})
            }
        })
        console.log('Component DID MOUNT!')
    }
    componentWillReceiveProps(newProps) {
        console.log('Component WILL RECIEVE PROPS!')
    }
    shouldComponentUpdate(newProps, newState) {
        return true;
    }
    componentWillUpdate(nextProps, nextState) {
        console.log('Component WILL UPDATE!');
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!')
    }
    componentWillUnmount() {
        console.log('Component WILL UNMOUNT!')
    }

    render(){
        console.log('rendering')
        console.log(this.name)
        console.log(this.getName())
        console.log('my name is=${jyoti}')
        return(
            <div className="my">
            <button onClick={this.getName} >hi</button>
                <h1>Hi I m using Jquery Example in this</h1>
            <ul>
                {this.state.infor.map((v,i)=>
                    {
                       return <li key={i}>{v.name}</li>
                    })
                }
            </ul>
            </div>
        )
    }
}
export default JqEx;
