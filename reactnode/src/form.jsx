import React, { Component } from 'react';
import './boot.css';
import './App.css';
const axios=require('axios');
class Form extends React.Component{
    constructor(){
        super();
        this.state={
            name:'',
            surname:'',
            pass:'',
            email:'',
            mob:'',
            emer:'',
            addr:'',
            city:'',
            state:'',
            zip:'',
        }
        this.submitData=this.submitData.bind(this);
        this.redir=this.redir.bind(this);

    }

    redir(){
     this.props.history.push('/login');
    }

    submitData(){
        this.setState({
            name:document.getElementById('name').value,
            surname:document.getElementById('surname').value,
            pass:document.getElementById('pass').value,
            email:document.getElementById('email').value,
            mob:document.getElementById('mob').value,
            emer:document.getElementById('emer').value,
            addr:document.getElementById('addr').value,
            city:document.getElementById('city').value,
            state:document.getElementById('state').value,
            zip:document.getElementById('zip').value,
        });

        console.log("state",this.state);
        axios.post(
            'http://localhost:5000/savedata',
            {
                name:this.state.name,
                surname:this.state.surname,
                pass:this.state.pass,
                email:this.state.email,
                mob:this.state.mob,
                emer:this.state.emer,
                addr:this.state.addr,
                city:this.state.city,
                state:this.state.state,
                zip:this.state.zip
            })
            .then((res)=>{
                console.log("Response",res.data)
            })
            .catch((e)=>{
                console.log("Error is="+e);
            });
    };
    render(){
        return(
                <form onSubmit={(event)=>{event.preventDefault();}}>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <center><h3><u><b><i>Student Information</i></b></u></h3></center>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-5">
                           Name  <input type="text" className="form-control" ref="name" id="name" placeholder="Name"/>
                        </div>
                        <div className="form-group col-md-5">
                           Sur Name <input type="text" className="form-control" ref="surname" id="surname" placeholder="Surname"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            Password<input type="password" className="form-control" ref="pass" id="pass" placeholder="Password"/>
                        </div>
                        <div className="form-group col-md-5">
                        Email <input type="email" className="form-control" ref="email" id="email" placeholder="Email"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            Mobile number<input type="text" className="form-control" ref="mob" id="mob" placeholder="Mobile no."/>
                        </div>
                        <div className="form-group col-md-5">
                            Emergency contact <input type="text" className="form-control" ref="emer" id="emer" placeholder="Emergency content"/>
                        </div>
                    </div>
                    <div className="form-row">
                     Address   <input type="text" className="form-control" ref="addr" id="addr" placeholder="1234..."/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-5">
                          City <input type="text" className="form-control" ref="city" id="city" placeholder="city"/>
                        </div>
                        <div className="form-group col-md-4">
                            State <input type="text" className="form-control" ref="state" id="state" placeholder="state"/>
                        </div>
                        <div className="form-group col-md-3">
                            Zip <input type="text" className="form-control" ref="zip" id="zip" placeholder="zip"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-5">
                        </div>
                        <div className="form-group">
                         <button type="submit" className="btn btn-primary" onClick={this.submitData}>Submit</button>
                            <a href="#" onClick={this.redir}>Already User</a>
                        </div>
                    </div>
                </form>
        )}
}
export default Form;