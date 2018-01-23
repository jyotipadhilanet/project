import React, { Component } from 'react';
class Button extends Component
    {
      constructor()
      {
          super();

      }
      render(){
          return (
              <div><button>Hi</button>
              </div>
          )
      }
    };
class Button1 extends Component
{
    constructor()
    {
        super();

    }
    render(){
        return (
            <div><button>Hi1</button>
            </div>
        )
    }
};
class Button23 extends Component
{
    constructor()
    {
        super();

    }
    render(){
        return (
            <div>
                <Button/>
                <Button1/>
            </div>
        )
    }
};
export default Button23;