import React, { Component } from 'react';
import './App.css'
import Modal from 'react-modal'
var axios=require('axios');

class ListForm extends Component{
    constructor(){
        super();
        this.state={
            IDInfo:'',
            isEditing:false,
            data1:[]
        };
        axios.get('http://localhost:5000/fetch').then((sucess)=>{
            this.setState({data1:sucess.data})
        }).catch((err)=>{
            console.log(err);
        })
    }
    delData=(e)=>{
        console.log(e);
        alert("Are u sure u want to delte"+e);

        axios.post('http://localhost:5000/del',{
            id:e
        }).then((sucess)=>{
            console.log(sucess.data);
            this.setState({data1:sucess.data})
        }).catch((err)=>{
            console.log("error is=",err);
        });
    }
    editData=(e)=> {
        console.log(e)
        this.setState({isEditing: true, IDInfo: e});
    }
    redir=()=>{
        this.props.history.push('/form');
    }

    upadteData=(e,name,surname,email,mob,addr,city)=>{
        console.log(e,name,surname,email,mob,addr,city);
        this.setState({isEditing: false, IDInfo:''});
        axios.post('http://localhost:5000/upd',{
            _id:e,
            name:name,
            surname:surname,
            email:email,
            mob:mob,
            addr:addr,
            city:city
        }).then((sucess)=>{
            console.log(sucess.data);
            this.setState({data1:sucess.data})
        }).catch((err)=>{
            console.log("error is=",err);
        });
    }

    render(){
        return(
            <div>
                <button type="button" className="leftbtn" onClick={this.redir}>Add User</button>
                <table className="table table-striped">
                    <tbody>
                    <tr><th>Name</th><th>SurName</th><th>email</th><th>Mob</th><th>Address</th><th>City</th><th>Action</th></tr>
                    {
                        this.state.data1.map((v,i)=>{
                            return <Fetch key={i} info={v} edt={this.editData} del={this.delData} isedt={this.state.isEditing} id={this.state.IDInfo} upd={this.upadteData}/>
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

class Fetch extends Component{
    render(){
        return(
            (this.props.isedt && this.props.id === this.props.info._id) ?
                <tr>
                    <td><input type="text" defaultValue={this.props.info.name} id="name" /></td>
                    <td><input type="text" defaultValue={this.props.info.surname} id="surname"  /></td>
                    <td><input type="text" defaultValue={this.props.info.email} id="email" /> </td>
                    <td><input type="text" defaultValue={this.props.info.mob} id="mob" /> </td>
                    <td><input type="text" defaultValue={this.props.info.addr} id="addr" /></td>
                    <td><input type="text" defaultValue={this.props.info.city} id="city" /></td>
                    <td><button onClick={()=>this.props.upd(this.props.info._id,
                        document.getElementById("name").value,
                        document.getElementById("surname").value,
                        document.getElementById("email").value,
                        document.getElementById("mob").value,
                        document.getElementById("addr").value,
                        document.getElementById("city").value
                    )} >submit</button><button onClick={()=>this.props.del(this.props.info._id)}>Delete</button> </td>
                </tr>
                :
                <tr>
                    <td>{this.props.info.name}</td>
                    <td>{this.props.info.surname}</td>
                    <td>{this.props.info.email}</td>
                    <td>{this.props.info.mob}</td>
                    <td>{this.props.info.addr}</td>
                    <td>{this.props.info.city}</td>
                    <td><button onClick={()=>this.props.edt(this.props.info._id)} >Edit</button><button onClick={()=>this.props.del(this.props.info._id)}>Delete</button> </td>
                </tr>

        )
    }
}
export default ListForm;