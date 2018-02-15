import React, { Component } from 'react';
import './App.css';
const axios=require('axios');
const toastr=require('toastr');
class App extends Component {
    constructor(){
        super();
        this.state= {
            data1: [],
            mystate:'',
            stateData: [],
            citydata: [],
            newData:[],
            numreco:3,
            page:'',
            searchdata:[],

            disdata:[],
            name: '',
            last: '',
            email: '',
            state: '',
            city: '',
            IDInfo: '',
            isEditing: false,
            Deleteid:'',
            Upadteteid:'',

            isSearch:false,
            edtname:'',
            edtlast:'',
            edtemail:'',
            edtcity:'',
            edtstate:'',
            len:'',
            paginate:'',
            pageArr:[]
        }
    }

    componentWillMount(){
        this.initial();
        this.statefetch();
    }
    initial=()=>{
        axios.get('http://localhost:5000/fetchdata').then((sucess)=>{
            this.setState({data1:sucess.data},()=>{
                this.fetlimit(1);
            })
        }).catch((err)=>{
            console.log(err);
        })
    }

    sort=(e)=>{
        var key=e.target.id;
        console.log(key);
        var myData = [].concat(this.state.disdata)
            .sort((a, b) => a[key] > b[key]);

        this.setState({
            disdata:myData
        })
        console.log('sorted : ',this.state.disdata);
    }

    dsort=(e)=>{
        var key=e.target.id;
        console.log(key);
        var myData = [].concat(this.state.disdata)
            .sort((a, b) => a[key] < b[key]);

        this.setState({
            disdata:myData
        })
        console.log('sorted : ',this.state.disdata);
    }

    fetlimit=(e)=>{
        var last=e*this.state.numreco;
        var start=last-this.state.numreco;
        this.state.disdata=this.state.data1.slice(start,last);
        this.setState({disdata:this.state.data1.slice(start,last)});
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

    cityfetchU=()=>{
        axios.get('http://localhost:5000/cityfetch/'+document.getElementById('ustate').value).then((sucess)=>{
            this.setState({citydata:sucess.data})
            console.log(this.state.citydata)
            this.setState({edtcity:''})
        }).catch((err)=>{
            console.log(err);
        })
    }

    search=(e)=>{
      var data=e.target.value
        if(e.target.value.length!=0) {
           this.setState({isSearch:true})
            this.state.searchdata = []
            console.log(data)
            this.state.data1.map((v, i) => {
                if (v.name.includes(data) || v.last.includes(data) || v.last.includes(data) || v.email.includes(data) || v.state.includes(data) || v.city.includes(data)) {
                    this.state.searchdata.push(v)
                }
            })
            console.log(this.state.searchdata)
        }
        else
        {
            this.setState({isSearch:false})
        }
    }
    searchp=(e)=>{
        var data=e.target.value
        if(e.target.value.length!=0) {
            this.setState({isSearch:true})
            this.state.searchdata = []
            console.log(data)
            this.state.disdata.map((v, i) => {
                if (v.name.includes(data) || v.last.includes(data) || v.last.includes(data) || v.email.includes(data) || v.state.includes(data) || v.city.includes(data)) {
                    this.state.searchdata.push(v)
                }
            })
            console.log(this.state.searchdata)
        }
        else
        {
            this.setState({isSearch:false})
        }
    }


    delData=()=> {
        axios.post('http://localhost:5000/del', {
            id: this.state.Deleteid
        }).then((sucess) => {




            console.log('after delete data is=',sucess.data);
            var info=this.state.data1.splice(sucess.data,1)
            this.setState({data1:this.state.data1})
            console.log(this.state.data1)







            toastr.info('<div className="styleInfo"><h1><i>Deleted successfully</i></h1></div>');

            this.setState({len:sucess.data.length})
            console.log(this.state.len)
            this.fetlimit(1);
        }).catch((err) => {
            console.log("error is=", err);
        });
        this.setState({Deleteid:''})
       }

       edtInfo=(e)=>{
        this.setState({IDInfo:e})
           axios.post('http://localhost:5000/fetchid', {
               id: e
           }).then((sucess) => {
               console.log(sucess.data);
              document.getElementById("uname").value=sucess.data.name,
                  document.getElementById("ulast").value=sucess.data.last,
                  document.getElementById("uemail").value=sucess.data.email,
                  document.getElementById("ucity").value=sucess.data.city,
                  document.getElementById("ustate").value=sucess.data.state

               this.setState({edtname:sucess.data.name,edtlast:sucess.data.last,edtemail:sucess.data.email,edtstate:sucess.data.state,edtcity:sucess.data.city})
               console.log(this.state)
           }).catch((err) => {
               console.log("error is=", err);
           });
       }

    upadteData=(name,last,email,state,city)=>{
        console.log('upadted data =',name,last,email,state,city);
        axios.post('http://localhost:5000/upd',{
            _id:this.state.IDInfo,
            name:name,
            last:last,
            email:email,
            state:state,
            city:city
        }).then((sucess)=>{

          console.log('after back from update=',sucess.data)
          console.log(this.state.IDInfo)

           var index= this.state.data1.findIndex(x=>x._id===this.state.IDInfo)
           // console.log(index)
            var mydata=this.state.data1.filter((d)=>d._id!==this.state.IDInfo);
            console.log('after filter',mydata)
            mydata.splice(index,0,sucess.data);
            console.log('correct data',mydata)



            this.setState({isEditing: false,edtname:'',edtlast:'',edtemail:'',edtstate:'',edtcity:'',IDInfo:''})
            this.setState({data1:mydata},()=>{
                this.fetlimit(1)})
        }).catch((err)=>{
            console.log("error is=",err);
        });
    }

    submitData=(name,last,email,state,city)=>{
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("email").value))
        {
                document.getElementById("name").value="",
                document.getElementById("last").value="",
                document.getElementById("email").value="",
                document.getElementById("city").value="",
                document.getElementById("state").value="",
                axios.post(
                    'http://localhost:5000/savedata',
                    {
                        name:name,
                        last:last,
                        email:email,
                        state:state,
                        city:city,
                    }
                )
                    .then((res)=>{
                       console.log(res.data)
                        this.state.data1.unshift(res.data)
                        this.setState({data1:this.state.data1})
                        console.log(this.state.data1)
                        this.fetlimit(1);
                    })
                    .catch((e)=>{
                        console.log("Error is="+e);
                    });
        }
        else {
            alert("please enter valid email id")
        }

    };

    handleCityChange=(e)=>{
        this.setState({
            edtcity:e.target.selectedOptions[0].value
        })
    }

    numrec=(e)=>{
        this.setState({numreco:e.target.options[e.target.selectedIndex].value},()=>{
            this.fetlimit(1);
        })
    }


    render(){
        var len=this.state.data1.length;
        var paginate=Math.ceil(this.state.data1.length/this.state.numreco)
        var pageArr=[]
        for(let i=1;i<=paginate;i++){
           pageArr.push(i);
        }
        console.log(len,paginate,pageArr)

        return(
            <div>
                <div className="modal fade" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Employee Information</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={(event)=>{event.preventDefault();}}>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            First Name :-<input type="text" ref="name" id="name" placeholder="Name" className="form-control is-valid"  onchange={(e)=>this.setState({ name: e.target.value })}    />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            Last Name :- <input type="text" ref="last"  id="last" placeholder="Last name" className="form-control is-valid" onchange={(e)=>this.setState({ last: e.target.value })}   />
                                        </div>
                                    </div>


                                    <div className="form-row">
                                        <div className="form-group col-md-12" onClick={this.cityfetch} onchange={(e)=>this.setState({ state: e.target.value })} >
                                            State
                                            <select id="state" className="form-control is-valid" >
                                                <option>Select State</option>
                                                {
                                                    this.state.stateData.map((v,i)=>{
                                                        return (<option key={v._id} value={v.name} >{v.name}</option>)
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            City
                                            <select id="city" className="form-control is-valid"   onchange={(e)=>this.setState({ city: e.target.value })}  >
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
                                        <div className="form-group col-md-12">
                                            Email <input type="email" ref="email" id="email" placeholder="Email" className="form-control is-valid" onchange={(e)=>this.setState({ email: e.target.value })}    />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={()=>{
                                    this.submitData(
                                        document.getElementById("name").value,
                                        document.getElementById("last").value,
                                        document.getElementById("email").value,
                                        document.getElementById("state").value,
                                        document.getElementById("city").value
                                    )}}>Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>




                <div class="modal fade" id="mydel">
                    <div class="modal-dialog">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h4 class="modal-title">Employee Information</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div class="modal-body">
                             R u sure u want to delete a record??
                            </div>
                            <div class="modal-footer">
                                <button type="submit" className="btn btn-primary"  data-dismiss="modal" onClick={()=>{this.delData()}}> Yes</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">No</button>
                            </div>
                        </div>
                    </div>
                </div>




                <div class="modal fade" id="myedit">
                    <div class="modal-dialog">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h4 class="modal-title">Employee Information</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div class="modal-body">
                                <form onSubmit={(event)=>{event.preventDefault();}}>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            First Name :-<input type="text" className="form-control" defaultValue={this.state.edtname}   id="uname" ref="uname"placeholder="Name" class="form-control is-valid"  />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            Last Name :- <input type="text"   className="form-control" defaultValue={this.state.edtlast} ref="ulast" id="ulast" placeholder="Last name" class="form-control is-valid"/>
                                        </div>
                                    </div>


                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            State
                                            <select className="form-control is-valid" onClick={this.cityfetchU} defaultValue={this.state.edtstate}  id="ustate">
                                                {
                                                    this.state.stateData.map((v,i)=>{
                                                        var sel=(this.state.edtstate===v.name)?"selected":''
                                                        return (<option key={v._id} defaultValue={v.name} selected={sel}>{v.name}</option>)
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            City
                                            <select className="form-control is-valid" value={this.state.edtcity} onChange={this.handleCityChange} id="ucity">
                                                <option>{(this.state.edtcity)?this.state.edtcity:'select city'}</option>
                                                {
                                                    this.state.citydata.map((v,i)=>{
                                                        return ( (v.name===this.state.edtcity)?'':<option key={v._id} value={v.name} >{v.name}</option>)
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            Email <input type="email" className="form-control" ref="uemail" id="uemail" placeholder="Email" defaultValue={this.state.edtemail}  class="form-control is-valid"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button className="btn btn-primary" data-dismiss="modal" onClick={()=>{this.upadteData(
                                    document.getElementById("uname").value,
                                    document.getElementById("ulast").value,
                                    document.getElementById("uemail").value,
                                    document.getElementById("ustate").value,
                                    document.getElementById("ucity").value
                                )}} >submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>






                <div>
                    <div className="form-row">
                        <div className="form-group col-md-2" >
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                            + Add Employee
                        </button>
                        </div>

                        <div className="form-group col-md-2" >
                            <input type="text" className="form-control is-valid" onChange={this.searchp} placeholder="search on particular page"/>
                        </div>
                        <div className="form-group col-md-1" >
                                <span className="btn btnsrch insearch"><i class="fa fa-search"></i></span>
                        </div>


                        <div className="form-group col-md-2" >
                           <input type="text" className="form-control is-valid" onChange={this.search} placeholder="search All" />
                        </div>
                        <div className="form-group col-md-1" >
                            <span className="btn btnsrch insearch"><i class="fa fa-search"></i></span>
                        </div>

                        <div className="form-group col-md-1" >
                          <select className="form-control is-valid" onChange={this.numrec} id="numrecord">
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                            </select>
                        </div>

                        <div className="form-group col-md-3" >
                            {  pageArr.map((v,i)=>{
                                return  <button type="button" className="btn btn-primary" onClick={()=>this.fetlimit(v)} value={v}>{v}</button>
                            })
                                }
                        </div>
                    </div>




                    <table className="table table-striped">
                        <tbody>
                        <tr><th>First Name  <a id="name" onClick={this.sort}>&#9650;</a>
                            <a id="name" onClick={this.dsort}>&#9660;</a>
                            </th>
                            <th>Last Name  <a id="last" onClick={this.sort}>&#9650;</a>
                                <a id="last" onClick={this.dsort}>&#9660;</a>
                            </th><th>email
                                <a id="email" onClick={this.sort}>&#9650;</a>
                                <a id="email" onClick={this.dsort}>&#9660;</a>
                            </th><th>State <a id="state" onClick={this.sort}>&#9650;</a>
                                <a id="state" onClick={this.dsort}>&#9660;</a>
                            </th><th>City
                                <a id="city" onClick={this.sort}>&#9650;</a>
                                <a id="city" onClick={this.dsort}>&#9660;</a>
                            </th><th>Action</th></tr>
                        {
                            (this.state.isSearch)?
                                this.state.searchdata.map((v,i)=>{
                                    return (
                                        <tr>
                                            <td>{v.name}</td>
                                            <td>{v.last}</td>
                                            <td>{v.email}</td>
                                            <td>{v.state}</td>
                                            <td>{v.city}</td>
                                            <td><button className="btn btn-info btnEdit" onClick={()=>{this.edtInfo(v._id)}}   data-toggle="modal" data-target="#myedit"><i className="fa fa-pencil"></i></button>
                                                <button className="btn btn-danger" onClick={()=> {this.setState({Deleteid: v._id})}} data-toggle="modal" data-target="#mydel"><i class="fa fa-trash"></i></button> </td>
                                        </tr>
                                    )
                                })
                                :
                                this.state.disdata.map((v,i)=>{
                                    return (
                                        <tr>
                                            <td>{v.name}</td>
                                            <td>{v.last}</td>
                                            <td>{v.email}</td>
                                            <td>{v.state}</td>
                                            <td>{v.city}</td>
                                            <td><button className="btn btn-info btnEdit" onClick={()=>{this.edtInfo(v._id)}}   data-toggle="modal" data-target="#myedit"><i className="fa fa-pencil"></i></button>
                                                <button className="btn btn-danger" onClick={()=> {this.setState({Deleteid: v._id})}} data-toggle="modal" data-target="#mydel"><i class="fa fa-trash"></i></button> </td>
                                        </tr>
                                    )
                                })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )}
}
export default App;