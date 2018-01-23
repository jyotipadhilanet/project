import React, { Component } from 'react';
class Errorhandler extends Component{
    constructor(){
        super();
        this.state={
            isError:false
        }
    }
    componentDidCatch(err,info){
        this.setState({isError:true});
        console.log(err);
        console.log(info);
    }

    render(){
        if(this.state.isError){
            return( <div>Error</div> )
        }
        return( <div>{this.props.children}</div> )
}
}
export default Errorhandler;



