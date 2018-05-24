import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore, bindActionCreators, compose, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import {addNameAction} from './xyz.js'
import {map } from 'immutable'

// React component

class Counter extends Component {
  render() {
    let input ="";
  //  const { value, onIncreaseClick } = this.props
    return (
      <div>
        <button onClick={this.props.onDecreaseClick}>Decrease</button>
        <span>{this.props.value}</span>
        <button onClick={this.props.onIncreaseClick}>Increase</button>
        <form onSubmit={ e => {
            e.preventDefault()
            console.log("this.props.toggle",this.props.toggle);
            this.props.dispatch(addNameAction(input.value),function(){
              input.value='';
           }())} }
           >
           <input ref={node => input = node}/>
            <button type="submit">
               Add Name
            </button>
        </form> 
        <ul>
        <span>{ this.props.name.map((item,index)=>{
          return(
            <div> <li onClick={this.props.onToggleClick}>
               
              {

                this.props.toggle?<span><del>{item}</del></span>:<span>{item}</span>

              }
              </li>
            </div>
          )
        })
       }
        </span> 
        </ul>

      </div>
    )
  }
}


//React component
class Todo extends Component{
  render(){
    return(
      <div>
        <button>New Component</button>
      </div>
    )
  }
}



Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
}

// Action

const increaseAction = { type: 'increase' };
const decreaseAction = { type: 'decrease' };
const toggleAction = { type: 'toggle'};
// export default addNameAction = text =>({ type: 'name', text });


// Reducer
function counter(state = { count: 0 , name: ['peoplelink'], toggle: false }, action) {
  const count = state.count;
  const name=  state.name;
  const toggle= state.toggle;
  switch (action.type) {
    case 'increase':
      return Object.assign({}, state, { count: count + 1});
    case 'decrease':
      return Object.assign({}, state, {count: count - 1});
    case 'name':
      console.log("name======>",name);
      return  Object.assign({},state, { name: [...state.name,action.text] });
    case 'toogle':
      return Object.assign({}, state,{toggle: true});
    default:
      return state
  }
}


// Store
const store = createStore(counter,compose(window.__REDUX_DEVTOOLS_EXTENTION__ && window.__REDUX_DEVTOOLS_EXTENTION__()));



// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count,
    name: state.name,
    toggle:state.toggle
  }
}



// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onIncreaseClick: ()=> dispatch(increaseAction),
    onDecreaseClick: ()=> dispatch(decreaseAction),
    onToggleClick: ()=> dispatch(toggleAction)
  }
} 



// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
