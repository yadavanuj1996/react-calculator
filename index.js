import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.state={expression:'0'};
    this.handleClick=this.handleClick.bind(this);
  }
  handleClick(event){
    let clickedButton=document.getElementById(event.target.id).innerHTML;
    this.state.expression=`${this.state.expression}${clickedButton}`;
  }
  render(){
    return(
      <CalcNumbers handleClick={this.handleClick}/>
    );
  }
}
class CalcNumbers extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
   
    return (
      <div className="row w-100 justify-content-center">
      <CalcTopElements handleClick={this.props.handleClick}/>
      <CalcMiddleElements handleClick={this.props.handleClick}/>
      <CalcBottomElements handleClick={this.props.handleClick}/>
      </div>
    );
  }
}

class CalcTopElements extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="row w-100 ">  
         <div className="text-center theme-bg-color w-50 calc-btn-height  calc-btn-border calc-content-layout" id="clear" onClick={this.props.handleClick}>
          AC
        </div>
        <div className="text-center theme-bg-color w-25 calc-btn-height  calc-btn-border calc-content-layout" id="backspace" onClick={this.props.handleClick}>
          &#9003;
        </div>
        <div className="text-center theme-bg-color w-25 calc-btn-height  calc-btn-border calc-content-layout" id="divide" onClick={this.props.handleClick}>
          /
        </div>
      </div>
    );
  }
}
class CalcMiddleElements extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
     let digits=[{7:"seven"},{8:"eight"},{9:"nine"},{x: "multiply"},{4:"four"},{5:"five"},{6:"six"},{"-": "subtract"},{1: "one"},{2:"two"},{3:"three"},{"+": "add"}];
    let digitDiv=digits.map((element)=>{
      return(
        <div className="text-center theme-bg-color w-25 calc-btn-height  calc-btn-border calc-content-layout" id={`${element[Object.keys(element)[0]]}`} onClick={this.props.handleClick}>
          {Object.keys(element)[0]}
        </div>
      );
    });
    return (
      <div className="row justify-content-center w-100 h-100"> 
           {digitDiv}
      </div>
    );
  }
}
class CalcBottomElements extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="row w-100 ">  
         <div className="text-center theme-bg-color w-50 calc-btn-height  calc-btn-border calc-content-layout" id="zero" onClick={this.props.handleClick}>
          0
        </div>
        <div className="text-center theme-bg-color w-25 calc-btn-height  calc-btn-border calc-content-layout" id="decimal" onClick={this.props.handleClick}>
          .
        </div>
        <div className="text-center theme-bg-color w-25 calc-btn-height  calc-btn-border calc-content-layout" id="equals" onClick={this.props.handleClick}> 
          =
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator/>,document.getElementById("keypad"));