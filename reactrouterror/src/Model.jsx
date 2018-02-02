import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css'
class ModelEx extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            isActive:false

        }
    }
    onInputChanged=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    toggleModal=()=>{
        this.setState({
            isActive:!this.state.isActive
        })
    }
    render(){
        return(
            <section>
                <input type="text" value={this.state.name} onChange={this.onInputChanged}/>
                <button onClick={this.toggleModal} disabled={this.state.name.length?false:true} type="submit" >Submit</button>

                <Modal  isOpen={this.state.isActive} onRequestClose={this.toggleModal}>
                    <div>
                        <button onClick={this.toggleModal}>Hide model</button>
                        <p>{this.state.name}</p>
                    </div>
                </Modal>
            </section>
        )
    }
}

export default ModelEx;




