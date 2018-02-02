import React, { Component } from 'react';
import './boot.css'
//import  { Redirect } from 'react-router-dom'
//import { browserHistory } from 'react-router-dom'


var axios=require('axios');
class Login extends Component{
    constructor(){
        super();
        this.submitData=this.submitData.bind(this);
        this.redir=this.redir.bind(this);
        this.nuser=this.nuser.bind(this);
    }
    nuser(){
        this.props.history.push('/form');
    }
    redir() {
        this.props.history.push('/list');
    }
    submitData(){
        console.log(document.getElementById('name').value,document.getElementById('pass').value)
        axios.post(
            'http://localhost:5000/login',
            {
                name:document.getElementById('name').value,
                pass:document.getElementById('pass').value
            })
            .then((res)=>{
            var info=res.data.length;
            if(info!==0) {
                alert("successful login");
                this.redir();
            }
            else{alert("Unsuccessful login plz try again");}
            })
            .catch((e)=>{
                console.log("Error is="+e);
                alert("Unsuccessful login plz try again");
            });
    }

   render(){
       return(
           <form onSubmit={(e)=>{
               e.preventDefault();
           }}>
               <div className="form-row">
                   <div className="form-group col-md-12">
                       <center><h3><u><b><i>Student Login</i></b></u></h3></center>
                   </div>
               </div>
               <div className="form-row">
                   <div className="form-group col-md-3">
                   </div>
                   <div className="form-group col-md-6">
                       Name  <input type="text" className="form-control" ref="name" id="name" placeholder="Name"/>
                    </div>
                   <div className="form-group col-md-3">
                   </div>
               </div>
               <div className="form-row">
                   <div className="form-group col-md-3">
                   </div>
                   <div className="form-group col-md-6">
                       Password<input type="password" className="form-control" ref="pass" id="pass" placeholder="Password"/>
                   </div>
                   <div className="form-group col-md-3">
                   </div>
               </div>
               <div className="form-row">

               <div className="form-group col-md-6">
               </div>
                   <button type="submit" className="btn btn-primary" onClick={this.submitData}>Submit</button>
                   <button type="button" className="btn btn-primary" onClick={this.nuser}>New User</button>
               </div>
           </form>
       )
   }
}
export default Login;