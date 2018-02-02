import React, { Component } from 'react';
import './boot.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    Prompt,
    Switch,
    IndexRoute
}from 'react-router-dom';

const Home=()=>{
    return(
        <h1>Home Page</h1>
    )
}
const About=()=>{
    return(
        <h1>About page</h1>
    )
}
const notFound=()=>{
    return(
        <h1>404 - Error..
            Page Not Found</h1>
    )
}
const Links=()=>{
    return(
        <div className="list-group">
            <NavLink className="list-group-item" exact  activeClassName="list-group-item active" to="/" >Home</NavLink>
            <NavLink className="list-group-item" activeClassName="list-group-item active"  to="/about">About</NavLink>
            <NavLink className="list-group-item" activeClassName="list-group-item active"  to="/form" >Form</NavLink>
            <NavLink className="list-group-item" activeClassName="list-group-item active"  to="/content">content</NavLink>
        </div>
    )
}

const Content=()=>{
    return(
    <div className="list-group">
        <NavLink className="list-group-item" exact activeClassName="list-group-item active" to="/content/sports" >Sports</NavLink>
        <NavLink className="list-group-item" activeClassName="list-group-item active" to="/content/city">City</NavLink>
        <Route path="/content/:contentName" component={contentDetail}/>
    </div>
    )
}
const contentDetail=(props)=>{
    return(
        <div>{props.match.params.contentName ? <div><img src={'http://lorempixel.com/400/200/'+props.match.params.contentName+'/1/'}/></div>:null }</div>
    )
}

class Form extends React.Component{
    constructor(){
        super();
        this.state={
            isChanged:false
        }
        this.change=this.change.bind(this);
    }
    change(){
         this.setState({
             isChanged:true
         });
    };
    render(){
        return(
            <div>
                <b>Registration form</b>
                <Prompt message="r u sure u want to change the file" when={this.state.isChanged}/>
                Name:- <input type="text" name="name" onChange={this.change}/>
            </div>
        )
    }
}

const App=()=>{
       return(
           <Router>
               <div className="row">
               <section className="col">
                   <Links/>
               </section>
                <section className="col">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route  path="/about" component={About}/>
                    <Route  path="/form" component={Form}/>
                    <Route  path="/content" component={Content}/>
                    <Route component={notFound}/>
                </Switch>
                </section>
                   </div>
           </Router>
       )
}
export default App;





