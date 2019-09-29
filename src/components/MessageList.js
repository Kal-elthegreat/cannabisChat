import React from 'react'

const DUMMY_DATA = [
    {
        senderId : 'klew5',
        text : 'Hey, how is it going?'
    },
    {
        senderId : 'noelle6',
        text : 'Great! How about you?'
    },
    {
        senderId : 'klew5',
        text : 'Good to hear! Im cooling it.'
    }
]

class MessageList extends React.Component {
    render () {
    return (
        <div className="message-list">
            {DUMMY_DATA.map((message,index) => {
                return (
                    <div key={index} className="message">
                    <div className="message-username"> {message.senderId} </div>
                    <div className="message-text"> {message.text} </div>
                    </div>
                )
            })}
        </div>
    );
    }
}
export default MessageList;