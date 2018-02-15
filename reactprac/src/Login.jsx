import React, { Component } from 'react';
import './App.css'
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
        this.props.history.push('/crud');
    }
    gmaillog(){

        sessionStorage.setItem('type','gmail');
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
                    sessionStorage.setItem('user',document.getElementById('name').value);
                    sessionStorage.setItem('type','gmailnot');
                    console.log(sessionStorage.getItem('user'))
                    this.redir();
                }
                else{
                    alert("Unsuccessful login plz try again");
                }
            })
            .catch((e)=>{
                console.log("Error is="+e);
                alert("Unsuccessful login plz try again");
            });
    }

    render(){
        return(
            <div className="back">
                <form  onSubmit={(e)=>{
                    e.preventDefault();
                }}>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                        </div>
                        <div className="form-group col-md-4">
                            <img src="data:image/png;base64,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"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                        </div>
                        <div className="form-group col-md-4">
                            Name  <input type="text" className="form-control" ref="name" id="name" placeholder="Name"/>
                        </div>
                        <div className="form-group col-md-5">
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                        </div>
                        <div className="form-group col-md-4">
                            Password<input type="password" className="form-control" ref="pass" id="pass" placeholder="Password"/>
                        </div>
                        <div className="form-group col-md-5">
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.submitData}>Login</button>
                        <button type="button" className="btn btn-primary" onClick={this.nuser}>New User</button>
                        <a href="http://localhost:5000/auth/google" onClick={this.gmaillog}> <img src="data:image/jpeg;base64,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" height="40px" width="50px" /></a>

                    </div>
                </form>
            </div>
        )
    }
}
export default Login;