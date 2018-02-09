import React, { Component } from 'react';
import './App.css';
const axios=require('axios');
class Form extends React.Component{
    constructor(){
        super();
        this.state={
            mystate:'',
            stateData: [],
            citydata: [],
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
    }
    componentWillMount(){
        this.statefetch();
    }

    redir=()=>{
        this.props.history.push('/login');
    }

    statefetch=()=>{
        axios.get('http://localhost:5000/statefetch').then((sucess)=>{
            this.setState({stateData:sucess.data})
        }).catch((err)=>{
            console.log(err);
        })
    }

    cityfetch=()=>{
        axios.get('http://localhost:5000/cityfetch/'+document.getElementById('state').value).then((sucess)=>{
            this.setState({citydata:sucess.data})
            console.log(this.state.citydata)
        }).catch((err)=>{
            console.log(err);
        })
    }


    submitData=()=>{
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
                    <div className="form-group col-md-6">
                        Name  <input type="text" className="form-control" ref="name" id="name" placeholder="Name" class="form-control is-valid"  />
                    </div>
                    <div className="form-group col-md-6">
                        Sur Name <input type="text" className="form-control" ref="surname" id="surname" placeholder="Surname" class="form-control is-valid"/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        Password<input type="password" className="form-control" ref="pass" id="pass" placeholder="Password" class="form-control is-valid"/>
                    </div>
                    <div className="form-group col-md-6">
                        Email <input type="email" className="form-control" ref="email" id="email" placeholder="Email" class="form-control is-valid"/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        Mobile number<input type="number" className="form-control" ref="mob" id="mob" placeholder="Mobile no." class="form-control is-valid"/>
                    </div>
                    <div className="form-group col-md-6">
                        Emergency contact <input type="number" className="form-control" ref="emer" id="emer" placeholder="Emergency content" class="form-control is-valid"/>
                    </div>
                </div>
                <div className="form-row">
                    Address   <textarea className="form-control is-valid" ref="addr" id="addr" placeholder="1234..."></textarea>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-5" onClick={this.cityfetch}>
                        State
                        <select id="state" className="form-control is-valid">
                            <option>Select State</option>
                            {
                                this.state.stateData.map((v,i)=>{
                                    return (<option key={v._id} value={v.name}>{v.name}</option>)
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group col-md-5">
                        City
                        <select id="city" className="form-control is-valid"  >
                            <option>Select city</option>
                            {
                                this.state.citydata.map((v,i)=>{
                                    return (<option key={v._id} value={v.name}>{v.name}</option>)
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        Zip <input type="text" className="form-control" ref="zip" id="zip" placeholder="zip" class="form-control is-valid"/>
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