import React, { Component } from 'react';
import './App.css';
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
        <h1>Home</h1>
    )
}

const About=()=>{
    return(
        <h1>About</h1>
    )
}
class Form extends React.Component {
    constructor(){
        super();
        this.state={
            isChanged:false
        }
    }
    render() {
        return (
            <div>
                <Prompt
                    when={this.state.isChanged}
                    message="Are u sure u want to leave?"
                />
                <input type="text" onChange={()=>{
                    this.setState({
                        isChanged:true
                    });
                }}/>
            </div>
        )
    }
}

const Content=(props)=>{
    return(
        <div>

            <NavLink className="list" exact activeClassName="active" to="/content/city">City</NavLink>
            <NavLink className="list" activeClassName="active" to="/content/sports">Sports</NavLink>
            <Route path="/content(/:contentName)" component={contentDetails}/>
        </div>
    )
}
const contentDetails=(props)=>{
    return(
        <div>{props.match.params.contentName}</div>
    )
}

const NotFound=()=>{
    return(
        <h1>404 - Error..
            Page Not Found</h1>

    )
}

const Links=()=>{
    return(
        <div className="listgroup">
            <NavLink className="list" exact activeClassName="active" to="/">Home</NavLink>
            <NavLink className="list" activeClassName="active" to="/about">About</NavLink>
            <NavLink className="list" activeClassName="active" to="/content">Content</NavLink>
            <NavLink className="list" activeClassName="active" to="/form">Form</NavLink>

        </div>
    )
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
                        <Route path="/about" component={About}/>
                        <Route path="/content" component={Content}/>
                        <Route exact path="/form" component={Form}/>
                        <Route component={NotFound}/>
                    </Switch>
                </section>
            </div>
        </Router>
    )
}

export default App;
