import React, { Component } from 'react';
class All extends Component
{
    constructor()
    {
        super();

        this.state={
            id:"",
            nm:"",
            sirnm:"",
            isEditing:false,
            data:
                [
                    {
                        id:0,
                        name:"jyoti",
                        sta:false,
                        sirname:"padhi"
                    },
                    {
                        id:1,
                        name:"jyoti1",
                        sta:false,
                        sirname:"padhi1"
                    },
                    {
                        id:2,
                        name:"jyoti2",
                        sta:false,
                        sirname:"padhi2"
                    },
                    {
                        id:3,
                        name:"jyoti3",
                        sta:false,
                        sirname:"padhi3"
                    },
                    {
                        id:4,
                        name:"jyoti4",
                        sta:false,
                        sirname:"padhi4"
                    },
                ]
        };
        this.setNameF=this.setNameF.bind(this);
        this.setSirName=this.setSirName.bind(this);
        this.submitData=this.submitData.bind(this);
        this.getIdInfor=this.getIdInfor.bind(this);
        this.getEditInfo=this.getEditInfo.bind(this);

    };
    setNameF(e)
    {
        e.target.style.color="RED";
        this.setState({nm:e.target.value},()=> console.log(this.state.nm));
        this.setState((prev)=>console.log(prev.nm))
    }
    getIdInfor(e){
        let data=this.state.data;
       this.state.data.splice(e,1);
       this.setState({data:data})
    }
    getEditInfo(e){
        var datas=this.state.data;
        var data=datas[e];
        this.refs.mySirnm.value=data['sirname'];
        this.refs.myName.value=data['name'];
        this.setState({isEditing:true})
        this.setState({id:e})
    }
    setSirName(e)
    {
        this.setState({sirnm:e.target.value});
    }
    submitData() {
        var chk=this.state.isEditing;
        if(chk===true)
        {
            var id=this.state.id;
            var datas=this.state.data;
            var data=datas[id];
            console.log(data+"  "+datas+"   "+id);

            for(let i=0;i<this.state.data.length;i++) {
                if (this.state.data[i].id === id) {
                    this.state.data[i].sirname = this.refs.mySirnm.value;
                    this.state.data[i].name = this.refs.myName.value;
                }
            }
            this.setState({data: datas})
            this.setState({isEditing: false})
            console.log(this.state.data);
        }
       else if(chk===false){
        var info = {
            id: this.state.data.length,
            name: this.state.nm,
            sta: false,
            sirname: this.state.sirnm
        }
        this.state.data.push(info)
        this.setState({name:""});
        this.setState({sirname:""});
       }
        this.refs.mySirnm.value="";
        this.refs.myName.value="";
    }
     render()
     {
         return (
             <div>
                 <Header/>
                 Name:- <input type="text" ref="myName" onChange={this.setNameF}/>
                 Sir Name:- <input type="text" ref="mySirnm" onChange={this.setSirName}/>
                 <button type="submit" disabled={this.state.nm.length?false:true}  onClick={this.submitData}>Submit</button>

                 <table border="1">
                     <tbody>
                     <tr>
                         <td>Id</td>
                         <td>Name</td>
                         <td>Sir Name</td>
                         <td>Action</td>
                     </tr>
                     {
                         this.state.data.map((v, i) => {
                         return <Disp data={v} key={i} del={this.getIdInfor} edt={this.getEditInfo}/>
                     })
                     }
                     </tbody>
                 </table>
             </div>
         )
     }
}
class Disp extends Component{
    render(){
        return (
           <tr>
               <td>{this.props.data.id}</td>
               <td>{this.props.data.name}</td>
               <td>{this.props.data.sirname}</td>
               <td><button onClick={()=>this.props.edt(this.props.data.id)} >Edit</button><button onClick={()=>this.props.del(this.props.data.id)}>Delete</button> </td>
           </tr>
        )
    }
}
class Header extends Component{
    render(){
        return <h1>Hello Friends</h1>
    }
}

export default All;