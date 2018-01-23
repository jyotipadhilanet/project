import React, { Component } from 'react';
class Calc extends Component{
    constructor()
    {
        super();
        this.add=this.add.bind(this);
        this.sub=this.sub.bind(this);
        this.mul=this.mul.bind(this);
        this.div=this.div.bind(this);
        this.sq=this.sq.bind(this);
    }
    add(){
        var no1=this.refs.no1.value;
        var no2=this.refs.no2.value;
        var tot= Number(no1)+Number(no2);
        this.refs.tot.value=tot;
    }
    sub(){
        var no1=this.refs.no1.value;
        var no2=this.refs.no2.value;
        var tot= Number(no1)-Number(no2);
        this.refs.tot.value=tot;
    }
    mul(){
        var no1=this.refs.no1.value;
        var no2=this.refs.no2.value;
        var tot= Number(no1)*Number(no2);
        this.refs.tot.value=tot;
    }
    div(){
        var no1=this.refs.no1.value;
        var no2=this.refs.no2.value;
        var tot= Number(no1)/Number(no2);
        this.refs.tot.value=tot;
    }
    sq(){
        var no1=this.refs.no1.value;
        var tot= Number(no1)*Number(no1);
        this.refs.tot.value=tot;
    }
    render(){
        return(
            <div><h1> Calculator</h1><br/>
                Enter 1st number<input type="text" ref="no1" /> <br/>
                Enter 2nd number<input type="text" ref="no2" /> <br/>
                <button onClick={this.add}>+</button>
                <button onClick={this.sub}>-</button>
                <button onClick={this.mul}>*</button>
                <button onClick={this.div}>/</button>
                <button onClick={this.sq}>^</button><br/>
                Your Total<input type="text" ref="tot" /> <br/>

            </div>
        )
}
}
export default Calc;
