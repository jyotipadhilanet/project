import React, { Component } from 'react';
const axios=require('axios')
class Crud extends Component{
   constructor(){
       super()
       this.state={
          alldata:[],
          disData:[],
          stateData:[],
          cityData:[],
          searchData:[],
           isSearch:false,
          deleteId:'',
          editId:'',
          numrec:3
       }
   }
   componentWillMount(){
      this.initial();
       this.statefetch();
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

    deldata=()=>{
       console.log(this.state.deleteId)
       axios.post('http://localhost:5000/del',{
           id:this.state.deleteId
       }).then((sucess)=>{
           console.log(sucess)
           var info=this.state.alldata.splice(sucess.data,1)
           this.setState({alldata:this.state.alldata})
           console.log(this.state.alldata)
           this.fetlimit(1)
       }).catch((err)=>{
           console.log(err)
       })
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
            this.state.citydata=[]
            this.setState({citydata:sucess.data})
            console.log(this.state.citydata)
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
                if(val.sname.includes(data) ||  val.age.includes(data) || val.contact.includes(data) || val.gender.includes(data) || val.email.includes(data) || val.state.includes(data) || val.city.includes(data) || val.hobbies.includes(data))
                arr.push(val)
           })
            this.setState({searchData:arr})
        }
        else{
            this.setState({isSearch:false})
        }
    }





    render(){
        var len=this.state.alldata.length;
        var paginate=Math.ceil(this.state.alldata.length/this.state.numrec)
        var pageArr=[]
        for(let i=1;i<=paginate;i++){
            pageArr.push(i);
        }
        console.log(len,paginate,pageArr)

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
                            <form>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        Student Name :-<input type="text" ref="name" id="name" placeholder="Name" className="form-control is-valid"      />
                                    </div>
                                    <div className="form-group col-md-6">
                                        Password :- <input type="password" ref="password"  id="password" placeholder="age" className="form-control is-valid"    />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        Age :- <input type="text" ref="age"  id="age" placeholder="age" className="form-control is-valid"    />
                                    </div>
                                </div>


                                <div class="form-check form-check-inline">
                                    <div className="form-group col-md-12">
                                        Hobbies :-    <input type="checkbox" class="form-check-input" value="Dance"/>Dance
                                                      <input type="checkbox" class="form-check-input" value="Sing"/>Sing
                                                      <input type="checkbox" class="form-check-input" value="Study"/>Study
                                     </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        Image :- <input type="file" ref="img"  id="img" placeholder="image" className="form-control is-valid"    />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                    gender :-
                                        <label class="radio-inline">
                                            <input type="radio" ref="gender"  id="gender"  />Male
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" ref="gender"  id="gender"  />Female
                                        </label>

                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6" onClick={this.cityfetch} >
                                        State
                                        <select id="state" className="form-control is-valid" >
                                            <option>Select State</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        City
                                        <select id="city" className="form-control is-valid"    >
                                            <option>Select city</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        Email <input type="email" ref="email" id="email" placeholder="Email" className="form-control is-valid"  />
                                    </div>
                                    <div className="form-group col-md-6">
                                        Contact no. <input type="text" ref="cont" id="cont" placeholder="contact" className="form-control is-valid"    />
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
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
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
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
                                        <td><img src="val.photo" height="70px" width="100px" /></td>
                                        <td><button className="btn btn-info"><i className="fa fa-pencil"></i></button> <button id="mydel" className="btn btn-danger" onClick={()=>this.setState({deleteId:val._id})} data-toggle="modal" data-target="#mydel" ><i className="fa fa-trash"></i></button>  </td>
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
                                   <td><img src="val.photo" height="70px" width="100px" /></td>
                                   <td><button className="btn btn-info"><i className="fa fa-pencil"></i></button> <button id="mydel" className="btn btn-danger" onClick={()=>{this.setState({deleteId:val._id})}} data-toggle="modal" data-target="#mydel" ><i className="fa fa-trash"></i></button>  </td>
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