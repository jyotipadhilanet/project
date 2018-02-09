import React, { Component } from 'react';
import Modal from 'react-modal'
//import Dropdown from 'react-simple-dropdown'
//import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-context-menu' ;

import { Prompt}from 'react-router-dom';



/*class Menu1 extends Component{
    constructor(){
        super();
        //   this.handleClick=this.handleClick.bind(this);
    }
    handleClick(e,data){
        console.log(data);
    }
}


const defaultOption = options[0]
    <Dropdown placeholder="Select an option" />

    class Menu1 extends Component{
        render(){
            return(
                <Dropdown>
                    <DropdownTrigger>Profile</DropdownTrigger>
                    <DropdownContent>
                        <img src="avatar.jpg" /> Username
                        <ul>
                            <li>
                                <a href="/profile">Profile</a>
                            </li>
                            <li>
                                <a href="/favorites">Favorites</a>
                            </li>
                            <li>
                                <a href="/logout">Log Out</a>
                            </li>
                        </ul>
                    </DropdownContent>
                </Dropdown>
            )
        }
    }; */

/*class Prompt extends React.Component{

    constructor(){
        super();
        this.state={
            isChanged:false
        }
        this.change=this.change.bind(this);
    }
    change(){
        this.setState({
            isChanged:true
        });
    };
    render(){
        return(
            <div>
                <b>Registration form</b>
                <Prompt message="r u sure u want to change the file" when={this.state.isChanged}/>
                Name:- <input type="text" name="name" onChange={this.change}/>
            </div>
        )
    }
}  */
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

                <Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal}>
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