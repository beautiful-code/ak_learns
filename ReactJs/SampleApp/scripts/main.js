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
  componentDidMount : function() {
    setInterval(function() {
      var element = document.querySelector("#scrollableChatList");
      element.scrollTop = element.scrollHeight;
    }, 100);
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

var TicTacToeElement = React.createClass({
  render : function() {
    return(
      <span>Yo!</span>
    )
  }
});
var TicTacToe = React.createClass({
  render : function() {
    return (
      <div className="col-xs-9">
        <h3>TIC TAC TOE</h3>
        <table className="table" style={{width: 'initial', margin: 'auto'}} >
          <tbody>
            <tr>
              <td style={{width: '25px', borderRight: '1px solid black', borderTop: '0px solid #ddd', borderBottom: '1px solid black'}}><TicTacToeElement /></td>
              <td style={{width: '25px', borderRight: '1px solid black', borderTop: '0px solid #ddd', borderBottom: '1px solid black'}}><TicTacToeElement /></td>
              <td style={{width: '25px', borderTop: '0px solid #ddd', borderBottom: '1px solid black'}}><TicTacToeElement /></td>
            </tr>
            <tr>
              <td style={{width: '25px', borderRight: '1px solid black', borderBottom: '1px solid black'}}><TicTacToeElement /></td>
              <td style={{width: '25px', borderRight: '1px solid black', borderBottom: '1px solid black'}}><TicTacToeElement /></td>
              <td style={{width: '25px', borderBottom: '1px solid black'}}><TicTacToeElement /></td>
            </tr>
            <tr>
              <td style={{width: '25px', borderRight: '1px solid black'}}><TicTacToeElement /></td>
              <td style={{width: '25px', borderRight: '1px solid black'}}><TicTacToeElement /></td>
              <td style={{width: '25px'}}><TicTacToeElement /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

var Player = React.createClass({
  render : function() {
    return(
      <li>
      {( this.props.details.name == "N/A" ? <span>Waiting</span> : <span>{this.props.details.name}</span> )}
      </li>
    )
  }
});
var Players = React.createClass({
  joinGame : function(e) {
    e.preventDefault();
    console.log("joing the game");
    if(this.props.players.player1.name == "N/A")
      this.props.joinGameAsPlayer1(this.props.params.userId);
    else if(this.props.players.player2.name == "N/A")
      this.props.joinGameAsPlayer2(this.props.params.userId)
  },
  renderUser : function(key) {
    return <Player key={key} details={this.props.players[key]} />
  },
  render : function() {
    var x = false;
    if((this.props.players.player1.name == "N/A" || this.props.players.player2.name == "N/A") && (this.props.players.player1.name != this.props.params.userId && this.props.players.player2.name != this.props.params.userId))
      x = true;

    return (
      <div className="col-xs-3">
        <h4>Players</h4>
        {( !x ? <ul>{Object.keys(this.props.players).map(this.renderUser)}</ul> : <form onSubmit={this.joinGame} ><button onCLick={this.joinGame}>Join</button> </form>)}
      </div>
    );
  }
});

var GameDome = React.createClass({
  render : function() {
    return (
      <div style={{height : "300px", border : '1px solid black'} } className="row">
        <TicTacToe />
        <Players players={this.props.game_dome.players} params={this.props.params} joinGameAsPlayer1={this.props.joinGameAsPlayer1} joinGameAsPlayer2={this.props.joinGameAsPlayer2}/>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState : function() {
    return {
      chat_db: {
        users: {},
        messages :{},
        game_dome: {
          tic_tac_toe : {},
          players : {
            player1: { name: "N/A", turn: false },
            player2: { name: "N/A", turn: false }
          }
        }
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
  joinGameAsPlayer1 : function(userId) {
    this.state.chat_db.game_dome.players.player1['name'] =  userId;
    this.state.chat_db.game_dome.players.player1['turn'] =  false;
    this.setState({chat_db : this.state.chat_db});
  },
  joinGameAsPlayer2 : function(userId) {
    this.state.chat_db.game_dome.players.player2['name'] =  userId;
    this.state.chat_db.game_dome.players.player2['turn'] =  false;
    this.setState({chat_db : this.state.chat_db});
  },
  goBack : function(e) {
    console.log("logout");
    if(this.props.params.userId == this.state.chat_db.game_dome.players.player1.name)
      {
        this.state.chat_db.game_dome.players.player1.name = "N/A";
        this.setState({chat_db: this.state.chat_db});
      }
      else if(this.props.params.userId == this.state.chat_db.game_dome.players.player2.name)
        {
          this.state.chat_db.game_dome.players.player2.name = "N/A";
          this.setState({chat_db: this.state.chat_db});
        }
    this.props.history.pushState(null, '/');
  },
  render : function() {
    return (
      <div className="container">
      <div className="row">
        <h3>BC's Chat Room: </h3>
        <div className="col-xs-9">
          <GameDome game_dome={this.state.chat_db.game_dome} params={this.props.params} joinGameAsPlayer1={this.joinGameAsPlayer1} joinGameAsPlayer2={this.joinGameAsPlayer2} />
          <ChatRoom messages={this.state.chat_db.messages} sendMessage={this.sendMessage} params={this.props.params} />
        </div>
        <div className="col-xs-3">
          <form onSubmit={this.goBack}>
            <button onClick={this.goBack}>Log Out</button>
          </form>
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

