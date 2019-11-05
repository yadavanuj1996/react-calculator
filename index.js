import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import {createStore} from 'redux';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';

class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.state={expression:'0'};
    this.handleClick=this.handleClick.bind(this);
    this.showResults=this.showResults.bind(this);
  }
  handleClick(event){
    let clickedButton=document.getElementById(event.target.id).innerHTML;
    switch(clickedButton.toString()){
      case 'AC': this.setState({expression: '0'});return;
      case '⌫':  this.setState({expression: this.state.expression.substring(0,this.state.expression.length-1) });
                return;
      case '=': this.showResults();
                return;
    }
    if(this.state.expression==0)
      this.setState({expression: `${clickedButton}`});
    else
      this.setState({expression: `${this.state.expression}${clickedButton}`});
  }
  showResults(){
    this.props.submitExpression(this.state.expression); 
    setTimeout(()=>{
      console.log(this.props);
      this.setState({expression: `${this.props.reduxValue.result}`});
    },100);
   
  }
  render(){
    return(
      <CalcNumbers expression={this.state.expression} handleClick={this.handleClick}/>
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
      <CalcTopElements expression={this.props.expression} handleClick={this.props.handleClick}/>
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
         <div id="display" className="row w-100 justify-content-end align-items-center">{this.props.expression}</div>
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

//ReactDOM.render(<Calculator/>,document.getElementById("keypad"));

//Redux Code
//Action Creator
const addExpression=(expression)=>{
  return {
    type: 'expressionCalculation',
    expression: expression
  }
}
const DEFAULT_STATE={expression:'0',result: 0};
const reducer=(state=DEFAULT_STATE,action)=>{
  if(action.type==="expressionCalculation"){
    return {expression:'1',result: 1};
  }
  else{
    return DEFAULT_STATE;
  }

};

const store=createStore(reducer);


const mapStateToProps = (state) => {
  return {reduxValue: state}
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitExpression: (expression) => {
      dispatch(addExpression(expression))
    }
  }
};


const Container = connect(mapStateToProps, mapDispatchToProps)(Calculator);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
	      <Container/>
      </Provider>
    );
  }
};
ReactDOM.render(<AppWrapper/>,document.getElementById("keypad"));