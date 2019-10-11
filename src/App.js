import React from 'react'
import { ChatManager, TokenProvider } from "@pusher/chatkit-client/react-native";
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'

import { tokenUrl, instanceLocator } from './config'

class App extends React.Component {

  constructor () {
    super ();
    this.state = {
      messages : [],
      availableRooms: [],
      currentRooms: [],
      roomId: null,

    }
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
  }
  
  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator,
      userId: 'pish',
      tokenProvider: new TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect()
    .then(currentUser => {
      this.currentUser = currentUser
      this.getRooms();
    })
    .catch(err => {console.log(`Error connecting: ${err}`)})
  }

  getRooms() {
    this.currentUser.getJoinableRooms()
      .then(availableRooms => {
        this.setState({
          availableRooms,
          currentRooms: this.currentUser.rooms
        })
      })
      .catch(err => { console.log(`Error getting joinable rooms: ${err}`) })
  }

  subscribeToRoom(roomId) {

    this.setState({messages:[]})

    this.currentUser.subscribeToRoom({
      roomId,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
    })
    .then(room => {
      this.setState({
        roomId: room.id
      })
      this.getRooms();
    })
    .catch(err => console.log(`Error subscribing to the room: ${err}`))
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId,
    });
  }

  render() {

    return (
      <div className="app">
        <RoomList 
        roomId={this.state.roomId}
        subscribeToRoom={this.subscribeToRoom}
        rooms={[...this.state.availableRooms,...this.state.currentRooms]} />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} /> 
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
