import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

class Calculator extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <CalcNumbers/>
    );
  }
}
class CalcNumbers extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let digits=[{7:"seven"},{8:"eight"},{9:"nine"},{x: "multiply"},{4:"four"},{5:"five"},{6:"six"},{"-": "minus"},{1: "one"},{2:"two"},{3:"three"},{"+": "minus"}];
    let digitDiv=digits.map((element)=>{
      return(
        <div className="text-center theme-bg-color w-25 calc-btn-height  calc-btn-border calc-content-layout" id={`${element[Object.keys(element)[0]]}`}>
          {Object.keys(element)[0]}
        </div>
      );
    });
    return (
      <div className="row w-100 justify-content-center">
      <CalcTopElements/>
      {digitDiv}
      <CalcBottomElements/>
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
      <div class="row w-100 ">  
         <div className="text-center theme-bg-color w-50 calc-btn-height  calc-btn-border calc-content-layout" id="zero">
          0
        </div>
        <div className="text-center theme-bg-color w-25 calc-btn-height  calc-btn-border calc-content-layout" id="decimal">
          .
        </div>
        <div className="text-center theme-bg-color w-25 calc-btn-height  calc-btn-border calc-content-layout" id="equals">
          =
        </div>
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
      <div class="row w-100 ">  
         <div className="text-center theme-bg-color w-50 calc-btn-height  calc-btn-border calc-content-layout" id="zero">
          AC
        </div>
        <div className="text-center theme-bg-color w-25 calc-btn-height  calc-btn-border calc-content-layout" id="decimal">
          &#9003;
        </div>
        <div className="text-center theme-bg-color w-25 calc-btn-height  calc-btn-border calc-content-layout" id="equals">
          /
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator/>,document.getElementById("keypad"));