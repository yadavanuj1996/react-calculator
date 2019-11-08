import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import { createStore } from "redux";
import { connect } from "react-redux";
import { Provider } from "react-redux";


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expression: "0" };
    this.handleClick = this.handleClick.bind(this);
    this.showResults = this.showResults.bind(this);
    this.handleKeyPress=this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnMount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
   handleKeyPress(event) {
    switch (event.keyCode) {
      case 48:
      case 96:
        this.raiseHandleClickOnKeyType("zero");
        break;
      case 49:
      case 97:
        this.raiseHandleClickOnKeyType("one");
        break;
      case 50:  
      case 98:
        this.raiseHandleClickOnKeyType("two");
        break;
      case 51:  
      case 99:
        this.raiseHandleClickOnKeyType("three");
        break;
      case 52:  
      case 100:
        this.raiseHandleClickOnKeyType("four");
        break;
      case 53:  
      case 101:
        this.raiseHandleClickOnKeyType("five");
        break;
      case 54:  
      case 102:
        this.raiseHandleClickOnKeyType("six");
        break;
      case 55:  
      case 103:
        this.raiseHandleClickOnKeyType("seven");
        break;
      case 56:
      case 104:
        this.raiseHandleClickOnKeyType("eight");
        break;
      case 57:  
      case 105:
        this.raiseHandleClickOnKeyType("nine");
        break;
      case 13: 
      case 187:
        this.raiseHandleClickOnKeyType("equals");
        break;
      case 107:  
        this.raiseHandleClickOnKeyType("add");
        break;
      case 109:  
      case 189:
        this.raiseHandleClickOnKeyType("subtract");
        break;
      case 106:
      case 88:
        this.raiseHandleClickOnKeyType("multiply");
        break;
      case 111:  
      case 191:
        this.raiseHandleClickOnKeyType("divide");
        break;
      case 110:  
      case 190:
        this.raiseHandleClickOnKeyType("decimal");
        break;
      case 8:
        this.raiseHandleClickOnKeyType("backspace");
        break;
      case 46:
        this.raiseHandleClickOnKeyType("clear");
        break;
    }
  }
  raiseHandleClickOnKeyType(id){
    let keyboardPressFakeEvent={target:{id: id}}
    this.handleClick(keyboardPressFakeEvent);
  }
  
  handleClick(event) {
    let clickedButton = document.getElementById(event.target.id).innerHTML;
     document.getElementById(event.target.id).classList.add("button-press-effect");
     let eventElementId=event.target.id;
     setTimeout(function(){
      document.getElementById(eventElementId).classList.remove("button-press-effect");
     },300);
    switch (clickedButton.toString()) {
      case "AC":
        this.setState({ expression: "0" });
        return;
      case "⌫":
        if(this.state.expression.length===1){
           this.setState({expression: '0'});
        }
        else{
          this.setState({
          expression: this.state.expression.substring(
            0,
            this.state.expression.length - 1
          )
        });
        
        }
        return;
      case "=":
        this.showResults();
        return;
      case ".":
        // if decimal does not has preciding number
        if(/[^\d]/.test(this.state.expression.slice(-1))){
          return ;
        }

        // if expression contains no arithmetic symbol +,-,/,x
        if (!/(?=[\-\+\x\/])/i.test(this.state.expression)) {
          if (/\d+\.\d*$/g.test(this.state.expression)) return;
        }
        // if expression contains one or more than one arithmetic symbol +,-,/,x
        else if (/([\+\-\/\x]\d+\.\d*$)/g.test(this.state.expression)) {
          return;
        }
        break;
      case "x":
      case "/":
      case "+":
        if (this.isInputCharacterSymbol(this.state.expression.slice(-1))) {
          let reducingFactor = 1;
          if (
            this.isInputCharacterSymbol(this.state.expression.slice(-2, -1))
          ) {
            reducingFactor++;
          }

          this.setState({
            expression: `${this.state.expression.slice(
              0,
              this.state.expression.length - reducingFactor
            )}${clickedButton}`
          });
          return;
          
        }
        break;
        case "-":
        if (this.state.expression.slice(-2)==='--') {
          this.setState({
            expression: `${this.state.expression.slice(
              0,
              this.state.expression.length - 1
            )}${clickedButton}`
          });
          return;
          
        }
        break;
    }

    if (
      this.state.expression == '0' &&
      !this.isInputCharacterSymbol(clickedButton)
    )
      this.setState({ expression: `${clickedButton}` });
    else
      this.setState({ expression: `${this.state.expression}${clickedButton}` });
  }
  isInputCharacterSymbol(inputChar) {
    return /[\+\-\x\/.]/.test(inputChar);
  }
  showResults() {
    this.evaluateExpression();
    this.props.submitExpression(this.state.expression);
  }
  evaluateExpression() {
    var numRegExp = /(\d+[\.]\d+)|(\d+)/g;
    var symbolsRegExp = /[\+\-\x\/]{1,2}/g;
    var regString = this.state.expression;

    var numbers = regString.match(numRegExp);
    var symbols = regString.match(symbolsRegExp);

    if (symbols === null || symbols.length == 0 || !(symbols.length+1===numbers.length)) return;

    for (let i = 0; i < symbols.length; i++) {
      let multiplyingFactor = 1;
      if (
        symbols[i].length === 2 &&
        (symbols[i].slice(0, 1) === "/" || symbols[i].slice(0, 1) === "x")
      ) {
        symbols[i] = symbols[i].slice(0, 1);
        multiplyingFactor = -1;
      }

      if (symbols[i] === "/") {
        symbols.splice(i, 1);
        let firstNo = parseFloat(numbers.splice(i, 1));
        let secondNo = parseFloat(numbers[i]);
        numbers[i] = (firstNo / secondNo) * multiplyingFactor;
        i--;
      } else if (symbols[i] === "x") {
        symbols.splice(i, 1);
        let firstNo = parseFloat(numbers.splice(i, 1));
        let secondNo = parseFloat(numbers[i]);
        numbers[i] = firstNo * secondNo * multiplyingFactor;
        i--;
      }
    }

    for (let i = 0; i < symbols.length; i++) {
      let multiplyingFactor = 1;
      if (
        symbols[i].length === 2 &&
        (symbols[i].slice(0, 1) === "+" || symbols[i].slice(0, 1) === "-")
      ) {
        symbols[i] = symbols[i].slice(0, 1);
        multiplyingFactor = -1;
      }

      if (symbols[i] === "+") {
        symbols.splice(i, 1);
        let firstNo = parseFloat(numbers.splice(i, 1));
        let secondNo = parseFloat(numbers[i]);
        numbers[i] = firstNo + secondNo * multiplyingFactor;
        i--;
      } else if (symbols[i] === "-") {
        symbols.splice(i, 1);
        let firstNo = parseFloat(numbers.splice(i, 1));
        let secondNo = parseFloat(numbers[i]);
        numbers[i] = firstNo - secondNo * multiplyingFactor;
        i--;
      }
    }

    this.setState({ expression: `${parseFloat(numbers[0].toFixed(4))}` }); // parseFloat is used for trailing zeroes
  }

  render() {
    return (
      <CalcNumbers
        expression={this.state.expression}
        handleClick={this.handleClick}
      />      
    );
  }
}
class CalcNumbers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="calcInnerStartDiv" className="row w-100 justify-content-center calcInnerStartDiv-theme">
        <CalcTopElements
          expression={this.props.expression}
          handleClick={this.props.handleClick}
        />
        <CalcMiddleElements handleClick={this.props.handleClick} />
        <CalcBottomElements handleClick={this.props.handleClick} />
      </div>
    );
  }
}

class CalcTopElements extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row w-100 ">
        <div
          id="display"
          className="row w-100 justify-content-end align-items-center theme-display"
        >
          {this.props.expression}
        </div>
        <div
          className="text-center theme-bg-color w-50 calc-btn-height  calc-btn-border calc-content-layout"
          id="clear"
          onClick={this.props.handleClick}
        >
          AC
        </div>
        <div
          className="text-center theme-bg-color w-25 calc-btn-height  calc-btn-border calc-content-layout"
          id="backspace"
          onClick={this.props.handleClick}
        >
          &#9003;
        </div>
        <div
          className="text-center theme-bg-color w-25 calc-btn-height  calc-btn-border calc-content-layout"
          id="divide"
          onClick={this.props.handleClick}
        >
          /
        </div>
      </div>
    );
  }
}
class CalcMiddleElements extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let digits = [
      { 7: "seven" },
      { 8: "eight" },
      { 9: "nine" },
      { x: "multiply" },
      { 4: "four" },
      { 5: "five" },
      { 6: "six" },
      { "-": "subtract" },
      { 1: "one" },
      { 2: "two" },
      { 3: "three" },
      { "+": "add" }
    ];
    let digitDiv = digits.map(element => {
      return (
        <div
          className="text-center theme-bg-color w-25 calc-btn-height  calc-btn-border calc-content-layout"
          id={`${element[Object.keys(element)[0]]}`}
          onClick={this.props.handleClick}
        >
          {Object.keys(element)[0]}
        </div>
      );
    });
    return (
      <div className="row justify-content-center w-100">{digitDiv}</div>
    );
  }
}
class CalcBottomElements extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row w-100 ">
        <div
          className="text-center theme-bg-color w-50 calc-btn-height  calc-btn-border calc-content-layout"
          id="zero"
          onClick={this.props.handleClick}
        >
          0
        </div>
        <div
          className="text-center theme-bg-color w-25 calc-btn-height  calc-btn-border calc-content-layout"
          id="decimal"
          onClick={this.props.handleClick}
        >
          .
        </div>
        <div
          className="text-center theme-bg-color w-25 calc-btn-height  calc-btn-border calc-content-layout"
          id="equals"
          onClick={this.props.handleClick}
        >
          =
        </div>
      </div>
    );
  }
}


//Redux Code
//Action Creator
const addExpression = expression => {
  return {
    type: "expressionCalculation",
    expression: expression
  };
};
const DEFAULT_STATE = { expression: "0", result: 0 };
const reducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "expressionCalculation") {
    return { expression: "1", result: 1 };
  } else {
    return DEFAULT_STATE;
  }
};



const store=createStore(reducer);

const mapStateToProps = state => {
  return { reduxValue: state };
};

const mapDispatchToProps = dispatch => {
  return {
    submitExpression: expression => {
      dispatch(addExpression(expression));
    }
  };
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculator);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}
ReactDOM.render(<AppWrapper />, document.getElementById("keypad"));


class ThemeButton extends React.Component {
  constructor(props) {
    super(props);
  }
  themeChange(){
    document.getElementById("keypad").classList.remove("keypad-theme");
              document.getElementById("calcInnerStartDiv").classList.remove("calcInnerStartDiv-theme");
    document.getElementById("display").classList.remove("theme-display");
    document.getElementById("display").classList.add("theme-2-display");
    
    
     document.getElementById("calc").classList.remove("theme-calc-width");
     document.getElementById("calc").classList.add("theme-2-calc-width");
    
    
    document.getElementsByTagName("BODY")[0].classList.remove("theme-1-body-background");
    document.getElementsByTagName("BODY")[0].classList.add("theme-2-body-background");
   ["zero","one","two","three","four","five","six","seven","eight","nine","multiply","add","subtract","divide","equals","decimal","clear","backspace"].map((element)=>{
     document.getElementById(element).classList.remove("theme-bg-color");
     document.getElementById(element).classList.add("theme-2-bg-color");
     document.getElementById(element).classList.remove("calc-btn-height");
     document.getElementById(element).classList.add("theme-2-calc-btn-height");
     document.getElementById(element).classList.remove("calc-btn-border");
     document.getElementById(element).classList.add("theme-2-calc-btn-border");
     
     
   });
    
  }
  render() {
    return (
        <button onClick={this.themeChange} class="col col-8 " id="button-theme">Change Theme</button>
    );
  }
}

ReactDOM.render(<ThemeButton />, document.getElementById("theme-btn-holder"));
