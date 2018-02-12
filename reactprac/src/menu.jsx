import React, { Component } from 'react';
import Modal from 'react-modal'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import Dropdown from 'react-dropdown'

//import { Prompt}from 'react-router-dom';
//import Dropdown from 'react-simple-dropdown'
//import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-context-menu' ;
const options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
    {
        type: 'group', name: 'group1', items: [
        { value: 'three', label: 'Three' },
        { value: 'four', label: 'Four' }
    ]
    },
    {
        type: 'group', name: 'group2', items: [
        { value: 'five', label: 'Five' },
        { value: 'six', label: 'Six' }
    ]
    }
]






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
     handleClick=(e, data)=>{
        console.log(data);
    }

    render(){
        return(
            <div>
                const defaultOption = options[0]
                <Dropdown options={options} onChange={this._onSelect}  placeholder="Select an option" />


                <ContextMenuTrigger id="some_unique_identifier">
                    <div className="well">Right click to see the menu</div>




                    <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Dropdown Example
                            <span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <li><a href="#">HTML</a></li>
                            <li><a href="#">CSS</a></li>
                            <li><a href="#">JavaScript</a></li>
                        </ul>
                    </div>

                    <input type="text" value={this.state.name} onChange={this.onInputChanged}/>
                    <button onClick={this.toggleModal} disabled={this.state.name.length?false:true} type="submit" >Submit</button>

                    <Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal}>
                        <div>
                            <button onClick={this.toggleModal}>Hide model</button>
                            <p>{this.state.name}</p>
                        </div>
                    </Modal>

                </ContextMenuTrigger>

                <ContextMenu id="some_unique_identifier">
                    <MenuItem data={"some_data1"} onClick={this.handleClick}>
                        ContextMenu Item 1
                    </MenuItem>
                    <MenuItem data={"some_data2"} onClick={this.handleClick}>
                        ContextMenu Item 2
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem data={"some_data3"} onClick={this.handleClick}>
                        ContextMenu Item 3
                    </MenuItem>
                </ContextMenu>
            </div>
        )
    }
}


export default ModelEx;