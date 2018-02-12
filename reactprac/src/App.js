import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router, Route, NavLink, Switch,
}from 'react-router-dom';

import Header from './Header'
import Footer from './footer'
import Form from './form'
import ListForm from './ListForm'
import Login from './Login'
import Menu from './menu'
import ReactEx from './ReactStrapEx'
import Home from './Home'
import Crud from  './crud'

const logout=()=>{
    sessionStorage.setItem('user','')
    sessionStorage.setItem('type','')
    this.props.history.push('/login')
}

const gallery=()=>{
    return(
        <div>
        <img src="https://www.vnsgu.ac.in/dept/cs/images/aad3.jpg" height="300px" width="340px"/>
        <img src="https://images.static-collegedunia.com/public/college_data/images/campusimage/1460726643ver10.PNG" height="300px" width="340px"/>
        <img src="https://images.static-collegedunia.com/public/college_data/images/campusimage/1460726643ver2.PNG" height="300px" width="340px"/>
        <img src="https://images.static-collegedunia.com/public/college_data/images/campusimage/1460726643ver6.PNG" height="300px" width="340px"/>

        <img src="https://images.static-collegedunia.com/public/college_data/images/campusimage/1460726643ver7.PNG?tr=w-191,h-144,c-force" height="300px" width="340px"/>
        <img src="https://images.static-collegedunia.com/public/college_data/images/campusimage/1460726643ver5.PNG?tr=w-191,h-144,c-force" height="300px" width="340px"/>
        <img src="https://images.static-collegedunia.com/public/college_data/images/campusimage/1460726643ver4.PNG?tr=w-191,h-144,c-force" height="300px" width="340px"/>
        <img src="https://static-collegedunia.com/public/college_data/images/appImage/25515_VNSGU_NEW.jpg" height="300px" width="340px"/>
        <img src="https://www.vnsgu.ac.in/dept/cs/images/aad3.jpg" height="300px" width="340px"/>
        <img src="https://images.static-collegedunia.com/public/college_data/images/campusimage/1460726643ver10.PNG" height="300px" width="340px"/>
        <img src="https://images.static-collegedunia.com/public/college_data/images/campusimage/1460726643ver2.PNG" height="300px" width="340px"/>
        <img src="https://images.static-collegedunia.com/public/college_data/images/campusimage/1460726643ver6.PNG" height="300px" width="340px"/>
        </div>
)
}

const About=()=>{
    return(
        <div className="container">
        <div className="row">
        <div className="col-sm-4"></div>
        <u> <b><center> <h1>About Page</h1></center></b></u>
    <div className="col-sm-4"></div>
        </div>
        <div className="row">
        <div className="col-sm-6">
        <img src=" https://www.mapsofindia.com/maps/gujarat/surat-city-map.jpg" height="500px" width="550px"/> </div>
        <div className="col-sm-6">
        In consonance with its motto, “Satyam Gyanam Anantam”, <br/> Veer Narmad South Gujarat University has endeavoured to be an institution of excellence in higher education since its existence, keeping in view ... Wikipedia
    Address: Udhana - Magdalla Road, Surat, Gujarat 395007 <br/>
    Phone: 0261 222 7146  <br/>
    Founded: 1965  <br/>
    Total enrollment: 3,500 (2013)  <br/>


    <b><u> Reviews</u></b> <br/>
    Google reviews <br/>
    "Very nice place for any students, people to be stay or study for fix time......" <br/>
    "Very bad quality education....no value at all ...any where.." <br/>
    "It is clean and has all the necessary facilities like drinking water, wifi etc." <br/>
    <a href=""> View all Google reviews</a> <br/>
    </div>
    </div>
    </div>
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
        <div className="list-group ">
        <div className="App-left">
        <NavLink className="list-group-item" exact  activeClassName="list-group-item active" to="/" >Home</NavLink>
        <NavLink className="list-group-item" activeClassName="list-group-item active"  to="/about">About </NavLink>
        <NavLink className="list-group-item" activeClassName="list-group-item active"  to="/login">Login </NavLink>
        <NavLink className="list-group-item" activeClassName="list-group-item active"  to="/content">content </NavLink>
        <NavLink className="list-group-item" activeClassName="list-group-item active"  to="/crud">All Data </NavLink>
        <NavLink className="list-group-item" exact  activeClassName="list-group-item active" to="/gallery" >Gallery</NavLink>
        <NavLink className="list-group-item" activeClassName="list-group-item active" to="/Menu">Menu </NavLink>
        </div>
        </div>
)
}
const LinkVertical=()=>{
    return(
        <div>
        <NavLink  exact  to="/" >Home   |</NavLink>
        <NavLink  to="/about">About |</NavLink>
        <NavLink   to="/login">Login |</NavLink>
        <NavLink  to="/content">content |</NavLink>
        <NavLink to="/gallery">Gallery   |</NavLink>
        <NavLink   to="/Menu">Menu |</NavLink>
         <a className="mustright" href="" onClick={logout}>logout</a>
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

const App=()=>{
    return(
        <div>
        <div className="row header">
        <div className="col-sm-2  ">
        <img src='https://upload.wikimedia.org/wikipedia/commons/3/3b/VNSGU-LOGO.jpg' height='150px' width="220px"/>
        </div>
        <div className="col-sm-10  ">
        <Header/>
        </div>
        </div>
        <Router>
        <div className="row">
        <div className="col-sm-12 link">
        <LinkVertical/>
        </div>
        </div>
        </Router>
        <Router>
        <div className="row">
        <section className="col-sm-2">
        <Links/>
        </section>

        <section className="col-sm-11 content">
        <Switch>
        <Route exact path="/" component={Home}/>
    <Route  path="/about" component={About}/>
    <Route  path="/form" component={Form}/>
    <Route  path="/content" component={Content}/>
    <Route  path="/login" component={Login}/>
    <Route  path="/crud" component={Crud}/>
    <Route path="/list" component={ListForm}/>
    <Route path="/gallery" component={gallery}/>
    <Route path="/Menu" component={Menu} />
    <Route component={notFound}/>
    </Switch>
    </section>
    </div>
    </Router>
    <div className="row">
        <div className="col-sm-12">
        <Footer/>
        </div>
        </div>
        </div>
)
}
export default App;
