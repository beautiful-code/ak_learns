var React = require('react');
var ReactDOM = require('react-dom');

var Rebase = require('re-base');
var base = Rebase.createClass('https://blinding-inferno-6681.firebaseio.com/');

var NewTodo = React.createClass({
  createTodo : function(event) {
    event.preventDefault();
    var todo = {
      status: "incomplete",
      desc: this.refs.desc.value
    };
    console.log("Going to add" + this.refs.desc.value);
    this.props.createTodo(todo);
    this.refs.newTodoForm.reset();
  },
  render : function() {
    return (
      <form onSubmit={this.createTodo} ref="newTodoForm">
        <input type="text" placeholder="Enter Todos" ref="desc" />
      </form>
    );
  }
});

var Todo = React.createClass({
  isChecked : function() {
    if(this.props.details.status === "complete")
      return true;
    else
      return false;
  },
  render : function() {
    return(
     <tr>
       <td>
         <div className="checkbox-circle">
           <input type="checkbox" checked = {this.isChecked} />
          </div>
       </td>
       <td>{this.props.details.desc} </td>
     </tr>
  );
  }
});

var TodoList = React.createClass({
  renderTodo : function(key) {
    return <Todo key={key} details={this.props.state.todos[key]} />
  },
  render : function() {
    return(
      <table className="table table-hover">
        <tbody>
          {Object.keys(this.props.state.todos).map(this.renderTodo)}
        </tbody>
      </table>
    );
  }
});

var App = React.createClass({
  getInitialState() {
    return {
      todos : {}
    }
  },
  componentDidMount : function() {
    base.syncState('/todos', {
      context : this,
      state : 'todos'
    });
  },
  createTodo : function(todo) {
    var timestamp = (new Date()).getTime();
    this.state.todos['todo'+timestamp] = todo;
    this.setState({todos : this.state.todos});
  },
  markAsComplete : function(key) {
    this.state.todos[key].status = "complete";
    this.setState({todos : this.state.todos[key]});
  },
    render : function() {
    return (
      <div className="container">
        <h2>Todoist</h2>
        <NewTodo createTodo={this.createTodo} />
        <TodoList state={this.state}/>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.querySelector('#main'));
