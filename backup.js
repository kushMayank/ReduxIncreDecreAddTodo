import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore, bindActionCreators } from 'redux'
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
            console.log("input value",input.value);
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
        <span>{this.props.name.map((item,index)=>{
          return(
            <div><li>
              <span>{item}</span></li>
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
// export default addNameAction = text =>({ type: 'name', text });

// Reducer
function counter(state = { count: 0 , name: ['peoplelink']}, action) {
  const count = state.count;
  const name=  state.name;
  switch (action.type) {
    case 'increase':
      return Object.assign({}, state, { count: count + 1});
    case 'decrease':
      return Object.assign({}, state,{count: count - 1});
    case 'name':
      console.log("name======>",name);
      return  Object.assign({},state, { name: [...state.name,action.text] });
    default:
      return state
  }
}

// Store
const store = createStore(counter);

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count,
    name: state.name
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: ()=> dispatch(increaseAction),
    onDecreaseClick: ()=> dispatch(decreaseAction)
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
