import React, { Component } from 'react';
import Modal from 'react-modal';
class ModelEx extends Component{
    constructor(){
        super();
        this.state={
            vis:false
        }
        this.getmodel=this.getmodel.bind(this);
    }
    getmodel() { this.setState({vis:!this.state.vis})}
    componentWillMount(){
        Modal.setAppElement('body');
    }
    render(){
        return(
            <div>
             <button onclick={this.getmodel}>Show Model</button>
             <Modal isOpen={this.state.vis} onRequestClose={this.getmodel}>
                         <button onclick={this.getmodel}>Hide Model</button>
               Hello from Model
             </Modal>
            </div>
        )
    }
}
export default ModelEx;
