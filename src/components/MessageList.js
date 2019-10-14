import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'

class MessageList extends React.Component {

    // allow messages not to be affected by auto scroll when not near bottom
    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 150 >= node.scrollHeight
    }

    // auto scroll for new message
    componentDidUpdate() {
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this);
            node.scrollTop = node.scrollHeight;
        }
   }
   render () {
       // if user not in a room
        if(!this.props.roomId){
            return(
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>
            )            
        }
        return (
            <div className="message-list">
                {this.props.messages.map((message,index) => {
                    return (
                        <Message key= {index} username= {message.senderId} text = {message.text} />
                    )
                })}
            </div>
        );
    }
}

export default MessageList;