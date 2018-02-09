import React, { Component } from 'react';
import './App.css';
import './boot.css';
const axios=require('axios');

class App extends Component {
    constructor(){
        super();
        this.state= {
            data1: [],
            mydata1: [],
            mydata3: [],
            mystate:'',
            stateData: [],
            citydata: [],
            name: '',
            last: '',
            email: '',
            state: '',
            city: '',
            IDInfo: '',
            isEditing: false
        }

        this.initial=this.initial.bind(this);
        this.submitData=this.submitData.bind(this);
        this.sendLimit2=this.sendLimit2.bind(this);
        this.editData=this.editData.bind(this);
        this.delData=this.delData.bind(this);
        this.upadteData=this.upadteData.bind(this);
        this.statefetch=this.statefetch.bind(this);
        this.cityfetch=this.cityfetch.bind(this);
        this.sortData=this.sortData.bind(this);
    }
    componentWillMount(){
        this.initial();
        this.statefetch();
    }
    initial(){
        axios.get('http://localhost:5000/fetchdata').then((sucess)=>{
            this.setState({data1:sucess.data})
        }).catch((err)=>{
            console.log(err);
        })
    }

    /*  sendLimit1(){
        console.log(1);
        axios.get('http://localhost:5000/fetch/1').then((sucess)=>{
            this.setState({data1:sucess.data})
            console.log(this.state.data1)
        }).catch((err)=>{
            console.log(err);
        })
    } */

    sendLimit2(){
        console.log(2);
        axios.get('http://localhost:5000/fetch/2').then((sucess)=>{
            this.setState({data1:sucess.data})
            console.log(this.state.data1)
        }).catch((err)=>{
            console.log(err);
        })
    }
  /*  sendLimit3(){
        console.log(3);
        axios.get('http://localhost:5000/fetch/3').then((sucess)=>{
            this.setState({data1:sucess.data})
            console.log(this.state.data1)
        }).catch((err)=>{
            console.log(err);
        })
    } */


   sortData(){
       axios.get('http://localhost:5000/sortfetch').then((sucess)=>{
           this.setState({data1:sucess.data})
       }).catch((err)=>{
           console.log(err);
       })
   }

    statefetch(){
        axios.get('http://localhost:5000/statefetch').then((sucess)=>{
            this.setState({stateData:sucess.data})
        }).catch((err)=>{
            console.log(err);
        })
    }

    cityfetch(){
        axios.get('http://localhost:5000/cityfetch/'+document.getElementById('state').value).then((sucess)=>{
            this.setState({citydata:sucess.data})
             console.log(this.state.citydata)
        }).catch((err)=>{
            console.log(err);
        })
    }

    delData(e){
        console.log(e);
        axios.post('http://localhost:5000/del',{
            id:e
        }).then((sucess)=>{
            console.log(sucess.data);
            this.setState({data1:sucess.data})
        }).catch((err)=>{
            console.log("error is=",err);
        });
    }
    editData(e) {
        console.log(e)
        this.setState({isEditing: true, IDInfo: e});
    }

    upadteData(e,name,last,email,state,city){
        console.log('upadted data =',e,name,last,email,state,city);
        this.setState({isEditing: false, IDInfo:''});
        axios.post('http://localhost:5000/upd',{
            _id:e,
            name:name,
            last:last,
            email:email,
            state:state,
            city:city
        }).then((sucess)=>{
            console.log(sucess.data);
            this.setState({data1:sucess.data})
        }).catch((err)=>{
            console.log("error is=",err);
        });
    }

    submitData(){
        this.setState({
            name:document.getElementById('name').value,
            last:document.getElementById('last').value,
            email:document.getElementById('email').value,
            city:document.getElementById('city').value,
            state:document.getElementById('state').value
        });

        console.log("state",this.state);
        axios.post(
            'http://localhost:5000/savedata',
            {
                name:this.state.name,
                last:this.state.last,
                email:this.state.email,
                state:this.state.state,
                city:this.state.city,
            }
            )
            .then((res)=>{
                this.setState({data1:res.data})
            })
            .catch((e)=>{
                console.log("Error is="+e);
            });
    };

          render(){
          return(
              <div>
                  <form onSubmit={(event)=>{event.preventDefault();}}>
                      <div className="form-row">
                          <div className="form-group col-md-12">
                              <center><h3><u><b><i>Employee Information</i></b></u></h3></center>
                          </div>
                      </div>
                      <div className="form-row">
                          <div className="form-group col-md-5">
                              First Name :-<input type="text" className="form-control" ref="name" id="name" placeholder="Name" class="form-control is-valid"  />
                          </div>
                          <div className="form-group col-md-5">
                              Last Name :- <input type="text" className="form-control" ref="last" id="last" placeholder="Last name" class="form-control is-valid"/>
                          </div>
                      </div>
                      <div className="form-row">
                          <div className="form-group col-md-5" onClick={this.cityfetch}>
                              State
                            <select id="state" className="form-control is-valid"  >
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
                      </div>
                      <div className="form-row">
                          <div className="form-group col-md-5">
                              Email <input type="email" className="form-control" ref="email" id="email" placeholder="Email" class="form-control is-valid"/>
                          </div>
                      </div>
                      <div className="form-row">
                          <div className="form-group col-md-5">
                              <button type="submit" className="btn btn-primary" onClick={this.submitData}>Submit</button>
                          </div>
                          <div className="form-group col-md-5" >
                              <button type="button" className="btn btn-primary" onClick={this.sortData}>Sort</button>
                          </div>
                          <div className="form-group col-md-2" >
                              <button type="button" className="btn btn-primary" onClick={this.initial}>1</button>
                              <button type="button" className="btn btn-primary" onClick={this.sendLimit2}>2</button>
                          </div>
                      </div>
                  </form>
              <div>

                  <table className="table table-striped">
                      <tbody>
                      <tr><th>First Name</th><th>Last Name</th><th>email</th><th>State</th><th>City</th><th>Action</th></tr>
                      {
                          this.state.data1.map((v,i)=>{
                              return <Fetch key={i} info={v} edt={this.editData} del={this.delData} isedt={this.state.isEditing} id={this.state.IDInfo} upd={this.upadteData}/>
                          })
                      }
                      </tbody>
                  </table>
              </div>
              </div>
          )}
}

class Fetch extends Component{
    render(){
        return(
            (this.props.isedt && this.props.id === this.props.info._id) ?
                <tr>
                    <td><input type="text" defaultValue={this.props.info.name}   id="uname" /></td>
                    <td><input type="text" defaultValue={this.props.info.last} id="ulast"  /></td>
                    <td><input type="text" defaultValue={this.props.info.email} id="uemail" /> </td>
                    <td><input type="text" defaultValue={this.props.info.state} id="ustate" /></td>
                    <td><input type="text" defaultValue={this.props.info.city} id="ucity" /></td>
                    <td><button onClick={()=>this.props.upd(this.props.info._id,
                        document.getElementById("uname").value,
                        document.getElementById("ulast").value,
                        document.getElementById("uemail").value,
                        document.getElementById("ustate").value,
                        document.getElementById("ucity").value
                    )} >submit</button><button onClick={()=>this.props.del(this.props.info._id)}>Delete</button> </td>
                </tr>
                :
                <tr>
                    <td>{this.props.info.name}</td>
                    <td>{this.props.info.last}</td>
                    <td>{this.props.info.email}</td>
                    <td>{this.props.info.state}</td>
                    <td>{this.props.info.city}</td>
                    <td><button onClick={()=>this.props.edt(this.props.info._id)}>Edit</button><button onClick={()=>this.props.del(this.props.info._id)}>Delete</button> </td>
                </tr>
        )
    }
}

export default App;