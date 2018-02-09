import React, { Component } from 'react';
class Home extends Component{

    constructor() {
        super();
        this.state = {
            data:['https://www.vnsgu.ac.in/slide/4.jpg','https://www.vnsgu.ac.in/slide/1.jpg','https://www.vnsgu.ac.in/slide/7.jpg','https://www.vnsgu.ac.in/slide/5.jpg','https://www.vnsgu.ac.in/slide/6.jpg',
                'https://www.vnsgu.ac.in/slide/4.jpg','https://www.vnsgu.ac.in/slide/8.jpg','https://www.vnsgu.ac.in/slide/2.jpg','https://www.vnsgu.ac.in/slide/2.jpg'],
            imgsrc:'',
            cnt:0
        };
        this.changeContent = this.changeContent.bind(this);
    }
    changeContent() {
        if(this.state.cnt<(this.state.data.length-1)){
            this.setState({imgsrc:this.state.data[this.state.cnt]});
            this.setState({cnt:this.state.cnt+1})
        }
        else if(this.state.cnt==(this.state.data.length-1)){
            this.state.imgsrc=this.state.data[this.state.cnt];
            this.setState({cnt:0})
        }
    }
    render(){
        return(
            <div >
                <div className="timeout" >
                    {
                        setTimeout(this.changeContent,3000)
                    } </div><div>
                <img src={this.state.imgsrc} height="360px" width="1400px"/>
                <p className="linkk">FROM VICE CHANCELLOR's DESK</p>
                <div className="leftpic"> <img  src="https://www.vnsgu.ac.in/img/vc_desk.jpg" height="100px" width="200px" /> </div>
                <div><b>Greetings.</b><br/>Our great nation faces great challenges.
                    The greatest challenge among these is the one to train the young citizen who are to be on the forefront in facing these challenges.
                    The mammoth task that faces this university is to ensure that quality education is available to the youth, that comprise of historical high proportion of the global demographic distribution.
                    Demographic dividend for an ancient as well as evergreen civilization and nation depends on large scaled competence. Competence is created in institutions of education with excellence. Hence, untiring pursuit of excellence is the mantra of the University as it...<br/>
                    Read More… </div>
            </div>
            </div>
        )
    }
}
export default Home;