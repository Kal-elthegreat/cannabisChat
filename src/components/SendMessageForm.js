import React from 'react'
class SendMessageForm extends React.Component {

    constructor (){
        super()
        this.state = {
            message: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.message);

    }

    render () {
        return(
            <form 
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input 
                    onChange={this.handleChange}
                    value = {this.state.message}
                    type="text" placeholder="Type message and press ENTER"/>
            </form>
        )
    }
}


export default SendMessageForm;