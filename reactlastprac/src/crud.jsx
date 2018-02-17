import React, { Component } from 'react';
const axios=require('axios')
class Crud extends Component{
   constructor() {
       super()
       this.state = {
           alldata: [],
           disData: [],
           stateData: [],
           cityData: [],
           searchData: [],
           hobyArr: [],
           isSearch: false,
           isEditing: false,
           deleteId: '',
           editId: '',
           numrec: 3,

           sname: '',
           age: '',
           contact: '',
           gender: '',
           email: '',
           hobbies: '',
           state: '',
           city: '',
           password: '',
           photo: '',
           photo1: ''

       }
   }
   componentWillMount(){
       this.statefetch();
      this.initial();
   }

   initial=()=>{
       console.log("Initial data")
       axios.get('http://localhost:5000/fetchdata').then((success)=>{
          this.setState({alldata:success.data},()=>{
              this.fetlimit(1);
          })
       }).catch((err)=>{
           console.log(err)
       })
   }


    clearData=()=>{
        this.setState({isEditing:false})
        this.setState({sname:'',age:'', contact: '', gender: '', email: '',hobbies: '', state: '', city: '', password: '', photo: '', photo1: ''})
        document.getElementById('password').value=''
    }



   fetlimit=(e)=>{
       var last=e*this.state.numrec;
       var start=last-this.state.numrec;
       this.state.disData=this.state.alldata.slice(start,last)
       this.setState({disdata:this.state.alldata.slice(start,last)});
   }

    changeNum=(e)=>{
        this.setState({numrec:e.target.options[e.target.selectedIndex].value},()=>{
            this.fetlimit(1);
        })
    }
    hobyArr=(e)=>{
           this.state.hobyArr.push(e.target.value)
           this.setState({hobbies:this.state.hobyArr.join(",")})
           console.log(this.state.hobyArr)
           console.log(this.state.hobbies)
    }

    deldata=()=>{
       console.log(this.state.deleteId)
       axios.post('http://localhost:5000/del',{
           id:this.state.deleteId
       }).then((sucess)=>{
           var mydata=this.state.alldata.filter((d)=>d._id!==sucess.data._id);
           this.setState({alldata:mydata})
           console.log('after filter',mydata)
           this.fetlimit(1)
       }).catch((err)=>{
           console.log(err)
       })
    }

    statefetch=()=>{
       console.log("in state")
        axios.get('http://localhost:5000/statefetch').then((sucess)=>{
            console.log("after state")
            console.log(sucess.data)
            this.setState({stateData:sucess.data})
        }).catch((err)=>{
            console.log(err);
        })
    }

    cityfetch=()=>{
       this.state.city=''
       this.state.cityData=[]
        axios.post('http://localhost:5000/cityfetch/'+document.getElementById('state').value).then((sucess)=>{
            this.setState({cityData:sucess.data})
            console.log(this.state.cityData)
        }).catch((err)=>{
            console.log(err);
        })
    }

    sort=(e)=>{
        var key=e.target.id
        console.log(e.target.id)
       var mydata=[].concat(this.state.disData).sort((a,b)=>a[key] > b[key])
        this.setState({disData:mydata})
        console.log(this.state.disData)
    }

    dsort=(e)=>{
        var key=e.target.id
        console.log(e.target.id)
        var mydata=[].concat(this.state.disData).sort((a,b)=>a[key] < b[key])
        this.setState({disData:mydata})
        console.log(this.state.disData)
    }


    search=(e)=>{
        var arr=[]
        var data=e.target.value
        if(e.target.value.length>0){
            this.setState({isSearch:true})
           this.state.alldata.map((val,i)=>{
                if(val.sname.includes(data) ||  val.age.includes(data) || val.contact.includes(data) || val.gender.includes(data) ||
                    val.email.includes(data) || val.state.includes(data) || val.city.includes(data) || val.hobbies.includes(data))
                arr.push(val)
           })
            this.setState({searchData:arr})
        }
        else{
            this.setState({isSearch:false})
        }
    }

    insertData=()=>{
       const d=new FormData();
        console.log("in insert photo -",this.state.photo);
        axios.post(
            'http://localhost:5000/insert',
            {
                sname:this.state.sname,
                age:this.state.age,
                contact:this.state.contact,
                password:this.state.password,
                gender:this.state.gender,
                email:this.state.email,
                hobbies:this.state.hobyArr,
                state:this.state.state,
                city:this.state.city,
                photo:this.state.photo1,
                flag:1
        })
            .then((res)=>{
                this.state.alldata.unshift(res.data)
                this.setState({alldata:this.state.alldata})
                console.log(this.state.data1)

                this.fetlimit(1);
            })
            .catch((e)=>{
                console.log("Error is="+e);
            });
    }

    upadteData=()=>{
        axios.post('http://localhost:5000/upd',{
            id:this.state.editId,
            age:this.state.age,
            password:this.state.password,
            gender:this.state.gender,
            sname:this.state.sname,
            state:this.state.state,
            city:this.state.city,
            email:this.state.email,
            photo:this.state.photo1,
            contact:this.state.contact,
            hobbies:this.state.hobbies
        }).then((sucess)=>{

            console.log('after back from update=',sucess.data)
            this.clearData()
            var index= this.state.alldata.findIndex(x=>x._id===this.state.editId)
            console.log(index)

            var mydata=this.state.alldata.filter((d)=>d._id!==this.state.editId);
            console.log('after filter',mydata)

            mydata.splice(index,0,sucess.data);
            console.log('correct data',mydata)
            this.setState({alldata:mydata},()=>{
                this.fetlimit(1)})
        }).catch((err)=>{
            console.log("error is=",err);
        });
    }

    edtInfo=(e)=>{
       this.setState({isEditing:true})
        this.setState({editId:e})
        axios.post(
            'http://localhost:5000/fetchid',
            {
                id:e
            }).then((res)=>{
           this.setState({sname:res.data[0].sname,age:res.data[0].age,gender:res.data[0].gender,email:res.data[0].email,hobbies:res.data[0].hobbies,city:res.data[0].city,state:res.data[0].state,photo:res.data[0].photo,contact:res.data[0].contact})
          console.log(this.state)
       })
            .catch((e)=>{
                console.log("Error is="+e);
            });
}

    setFile=(e)=>{
            e.preventDefault();
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    photo:file,
                    photo1: reader.result
                });
            };
            reader.readAsDataURL(file);
           console.log(`File Upload : ${this.state.photo}`);
        }

    render(){
        var len=this.state.alldata.length;
        var paginate=Math.ceil(this.state.alldata.length/this.state.numrec)
        var pageArr=[]
        for(let i=1;i<=paginate;i++){
            pageArr.push(i);
        }
        console.log(len,paginate,pageArr)
        console.log(this.state.cityData)
        return(
            <div>
            <div className="modal fade" id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Student Information</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={(event)=>{event.preventDefault();}} encType="multipart/form-data">
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                            Student Name :-<input type="text" ref="name" id="name" placeholder="Name" className="form-control is-valid" value={this.state.sname} onChange={(e) => {
                                            this.setState({sname: e.target.value})
                                        }}    />

                                    </div>
                                    <div className="form-group col-md-6">
                                        Password :- <input type="password" ref="password"  id="password" placeholder="password" className="form-control is-valid" onChange={(e)=>{this.setState({password:e.target.value})}}     />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        Age :- <input type="text" ref="age"  id="age" placeholder="age" className="form-control is-valid" value={this.state.age}  onChange={(e)=>{this.setState({age:e.target.value})}}    />
                                    </div>
                                </div>


                                <div class="form-check form-check-inline">
                                    <div className="form-group col-md-12">
                                        Hobbies :-    <input type="checkbox" name="hby"  onChange={this.hobyArr}  class="form-check-input" value="Dance" checked={(this.state.hobbies.includes("dance") || this.state.hobbies.includes("Dance") )?"checked":"" }  />dance
                                                      <input type="checkbox" name="hby" onChange={this.hobyArr} class="form-check-input" value="Sing" checked={(this.state.hobbies.includes("Sing"))?"checked":"" }/>Sing
                                                      <input type="checkbox" name="hby" onChange={this.hobyArr} class="form-check-input" value="Study" checked={(this.state.hobbies.includes("Study"))?"checked":"" }/>Study
                                     </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        Image :-
                                        {(this.state.isEditing)?  <img src={this.state.photo} height="100px" width="200px" /> :""}
                                        <input type="file" ref="img"  id="img" placeholder="image" className="form-control is-valid"  onChange={this.setFile}   />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                    gender :-
                                        <label class="radio-inline">
                                            <input type="radio" ref="gender"  id="gender" name="gender" onChange={(e)=>this.setState({gender:e.target.value})} value="male" checked={(this.state.gender=="male")?"checked" :""}    />male
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" ref="gender"  id="gender" name="gender" onChange={(e)=>this.setState({gender:e.target.value})} value="Female" checked={(this.state.gender=="Female")?"checked" :""}     />Female
                                        </label>

                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6" >
                                        State
                                        <select id="state" className="form-control is-valid" value={this.state.state} onClick={this.cityfetch}  onChange={(e)=>this.setState({state:e.target.options[e.target.selectedIndex].value})}  >
                                            <option>Select State</option>
                                            {
                                                this.state.stateData.map((v,i)=>{
                                                  return (<option key={v._id} value={v.name}>{v.name}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        City
                                        <select id="city" className="form-control is-valid" onChange={(e)=>this.setState({city:e.target.options[e.target.selectedIndex].value})} >
                                            <option>{(this.state.city)?this.state.city:'select city'}</option>
                                            {
                                                this.state.cityData.map((v,i)=>{
                                                    return ((v.name===this.state.city)?'':<option key={v._id} value={v.name} >{v.name}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>


                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        Email <input type="email" ref="email" id="email" placeholder="Email" value={this.state.email} className="form-control is-valid"   onChange={(e)=>{this.setState({email:e.target.value})}}     />
                                    </div>
                                    <div className="form-group col-md-6">
                                        Contact no. <input type="text" ref="cont" id="cont" placeholder="contact" className="form-control is-valid"  value={this.state.contact}  onChange={(e)=>{this.setState({contact:e.target.value})}}      />
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            {(this.state.isEditing)? <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.upadteData}>Update</button>:
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.insertData}>Submit</button> }
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.clearData}>Close</button>
                        </div>
                    </div>
                </div>
            </div>








                <div className="modal fade" id="mydel">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Student Information</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body">
                                Sure U want to delete??
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={this.deldata} className="btn btn-info" data-dismiss="modal">Yes</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">No</button>
                            </div>
                        </div>
                    </div>
                </div>






                    <div className="form-row">
                        <div className="form-group col-md-2" >
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" onClick={this.clearData}>
                                + Add Student
                            </button>
                        </div>
                        <div className="form-group col-md-3" >
                            <input type="text" className="form-control is-valid" onChange={this.search} placeholder="search All" />
                        </div>

                        <div className="form-group col-md-2" >
                            <select className="form-control is-valid" id="numrecord" onChange={this.changeNum}>
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                        <div className="form-group col-md-3" >
                            {
                                pageArr.map((v,i)=>{
                                    return <button className="btn btn-primary" type="button" value={v} onClick={()=>{this.fetlimit(v)}}>{v}</button>
                                })
                            }
                        </div>
                    </div>

                <table className="table table-striped">
                 <tbody>
                    <tr>
                        <th>Name <a id="sname" onClick={this.sort}>&#9650;</a>
                            <a id="sname" onClick={this.dsort}>&#9660;</a></th>
                        <th>Age<a id="age" onClick={this.sort}>&#9650;</a>
                            <a id="age" onClick={this.dsort}>&#9660;</a></th>
                        <th>Contact<a id="contact" onClick={this.sort}>&#9650;</a>
                            <a id="contact" onClick={this.dsort}>&#9660;</a></th>
                        <th>Gender<a id="gender" onClick={this.sort}>&#9650;</a>
                            <a id="gender" onClick={this.dsort}>&#9660;</a></th>
                        <th>Email <a id="email" onClick={this.sort}>&#9650;</a>
                            <a id="email" onClick={this.dsort}>&#9660;</a></th>
                        <th>State <a id="state" onClick={this.sort}>&#9650;</a>
                            <a id="state" onClick={this.dsort}>&#9660;</a> </th>
                        <th>City <a id="city" onClick={this.sort}>&#9650;</a>
                            <a id="city" onClick={this.dsort}>&#9660;</a></th>
                        <th>Hobbies <a id="hobbies" onClick={this.sort}>&#9650;</a>
                            <a id="hobbies" onClick={this.dsort}>&#9660;</a></th>
                        <th>photo</th>
                        <th>Action</th>
                    </tr>
                    {
                        (this.state.isSearch)?
                            this.state.searchData.map((val,i)=>{
                                return(
                                    <tr>
                                        <td>{val.sname}</td>
                                        <td>{val.age}</td>
                                        <td>{val.contact}</td>
                                        <td>{val.gender}</td>
                                        <td>{val.email}</td>
                                        <td>{val.state}</td>
                                        <td>{val.city}</td>
                                        <td>{val.hobbies}</td>
                                        <td><img src={val.photo} height="70px" width="100px" /></td>
                                        <td><button id="myModal" onClick={()=> this.edtInfo(val._id)
                                        } data-toggle="modal" data-target="#myModal"      className="btn btn-info"><i className="fa fa-pencil"></i></button> <button id="mydel" className="btn btn-danger" onClick={()=>this.setState({deleteId:val._id})} data-toggle="modal" data-target="#mydel" ><i className="fa fa-trash"></i></button>  </td>
                                    </tr>
                                )
                            })
                      : this.state.disData.map((val,i)=>{
                           return(
                               <tr>
                                   <td>{val.sname}</td>
                                   <td>{val.age}</td>
                                   <td>{val.contact}</td>
                                   <td>{val.gender}</td>
                                   <td>{val.email}</td>
                                   <td>{val.state}</td>
                                   <td>{val.city}</td>
                                   <td>{val.hobbies}</td>
                                   <td><img src={val.photo} height="70px" width="100px" /></td>
                                   <td><button id="myModal" onClick={()=>{this.edtInfo(val._id)}
                                   } data-toggle="modal" data-target="#myModal"   className="btn btn-info"><i className="fa fa-pencil"></i></button> <button id="mydel" className="btn btn-danger" onClick={()=>{this.setState({deleteId:val._id})}} data-toggle="modal" data-target="#mydel" ><i className="fa fa-trash"></i></button>  </td>
                               </tr>
                           )
                       })
                    }
                 </tbody>
                </table>
            </div>
    )
    }
}
export default Crud;