var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var History = ReactRouter.History;

var Rebase = require('re-base');
var base = Rebase.createClass('https://bc-chat-room.firebaseio.com/');

var chatRoomStyle = {
  border: '1px solid black',
  height: '200px',
  overflow: 'scroll'
};
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
var UpdateScroll = function (){
  var element = document.querySelector("#scrollableChatList");
  element.scrollTop = element.scrollHeight;
};

setInterval(function() {
  var element = document.querySelector("#scrollableChatList");
  element.scrollTop = element.scrollHeight;
}, 100);

var MessageForm = React.createClass({
  sendMessage : function(event) {
    event.preventDefault();
    var timeStamp = (new Date()).getTime();
    var message = {
      desc : this.refs.message.value,
      userId : this.props.params.userId,
      sentTime : timeStamp
    };
    this.props.sendMessage(message);
    this.refs.messageForm.reset();
  },
  render : function() {
    return(
      <form onSubmit={this.sendMessage} ref="messageForm">
        <input type="text" ref="message" style={{width: '75%', height: '40px'}} placeholder="Stay Connected with your Network, Start Chatting..."/>
        <input type="submit" style={{width: '15%', height: '40px'}}/>
      </form>
    );
  }
});

var Message = React.createClass({
  render : function() {
   var sentDate = new Date(parseInt(this.props.message.sentTime));
   var month = sentDate.getMonth();
   var date = sentDate.getDate();
   var year = sentDate.getFullYear();
   var hours = sentDate.getHours();
   var minutes = sentDate.getMinutes();
    return(
      <p>
        <b>{this.props.message.userId}: </b> {hours}:{minutes} <br />
        <i className="pull-right">{monthNames[month]}, {date} {year}</i>
        {this.props.message.desc}
      </p>
    );
  }
});
var ChatRoom = React.createClass({
  renderMessage : function(key) {
    return <Message key={key} message={this.props.messages[key]} />
  },
  render : function() {
    return (
      <div style={{margin: '15px'}}>
        <h5>Chat Room</h5>
        <div style={chatRoomStyle} id="scrollableChatList">
          {Object.keys(this.props.messages).map(this.renderMessage)}
        </div>
        <MessageForm params={this.props.params} sendMessage={this.props.sendMessage} />
      </div>
    );
  }
});

var User = React.createClass({
  render : function() {
    return(
      <li>{this.props.details.name}</li>
    );
  }
});

var UsersList = React.createClass({
  renderUser : function(key) {
    return <User key={key} details={this.props.users[key]} />
    },
  render : function() {
    return(
      <div>
      <ul>
      {Object.keys(this.props.users).map(this.renderUser)}
      </ul>
      </div>
    );
  }
});

var TicTacToe = React.createClass({
  render : function() {
    return (
      <div className="col-xs-9">TIC TAC TOE</div>
    );
  }
});

var Players = React.createClass({
  render : function() {
    return (
      <div className="col-xs-3">Players</div>
    );
 }
});

var GameDome = React.createClass({
  getInitialState : function() {
    return {
      game_dome: {
        tic_tac_toe : {},
        players : {}
      }
    };
  },
  componentDidMount : function() {
    base.syncState('/game_dome',{
      context : this,
      state : 'game_dome'
    });
  },
  render : function() {
    return (
      <div style={{height : "300px", border : '1px solid black'} } className="row">
        <TicTacToe />
        <Players players={this.state.players} />
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState : function() {
    return {
      chat_db: {
        users: {},
        messages :{}
      }
    };
  },
  componentDidMount : function() {
    base.syncState('/',{
      context : this,
      state : 'chat_db'
    });
  },
  sendMessage : function(message) {
    this.state.chat_db.messages['message'+message.sentTime] = message;
    this.setState({chat_db : this.state.chat_db});
  },
  render : function() {
    return (
      <div className="container">
      <div className="row">
        <h3>BC's Chat Room: </h3>
        <div className="col-xs-9">
          <GameDome />
          <ChatRoom messages={this.state.chat_db.messages} sendMessage={this.sendMessage} params={this.props.params} />
        </div>
        <div className="col-xs-3">
          <UsersList users={this.state.chat_db.users} />
        </div>
      </div>
      </div>

    );
  }
});

var UserRegistration = React.createClass({
  mixins : [History],
  getInitialState : function() {
    return {
      users : {}
    };
  },
  componentDidMount : function() {
    base.syncState('/users', {
      context : this,
      state : 'users'
    });
  },
  goToChatRoom : function(event) {
    event.preventDefault();
    var user = {
      name : this.refs.userId.value,
      status : "active"
    };
    var timestamp = (new Date()).getTime();
    var userId = this.refs.userId.value;
    this.history.pushState(null, '/users/'+userId);
    this.state.users['user'+timestamp] = user;
    this.setState({users : this.state.users });
  },
  render : function() {
    return (
      <form onSubmit={this.goToChatRoom} >
        <h2>Enter your Name</h2>
        <input type="text" ref="userId" placeholder="Your Name....!" required />
        <input type="Submit" />
      </form>
    );
  }
});

var NotFound = React.createClass({
  render : function() {
    return <h1>Not Found !</h1>
  }
});

var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={UserRegistration} />
    <Route path="/users/:userId" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));

