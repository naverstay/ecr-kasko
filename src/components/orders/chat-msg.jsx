import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './order-button.scss';
import OrderButton from "./order-button";

class ChatMsg extends Component {
	constructor(props) {
		super(props)
		this.toggleMsgHandle = this.toggleMsgHandle.bind(this)
		this.state = {msgOpen: false}
	}
	
	static propTypes = {
		classMsg: PropTypes.string,
		msg: PropTypes.object
	}

	toggleMsgHandle() {
		this.setState({msgOpen: !this.state.msgOpen});
	}

	render() {
		const {
			classMsg,
			msg
		} = this.props;

		const msgClassName = cn([
			classMsg,
			{'msg_open': (msg.info && this.state.msgOpen)}
		]);
		
		return (
			<div className={msgClassName} onClick={this.toggleMsgHandle}>
				<div className="chat-msg__row">
					<div className="chat-msg__author">{msg.author}</div>
					<div className="chat-msg__time">{msg.time}</div>
				</div>
				<div className="chat-msg__row">
					<div className="chat-msg__bank">{msg.bank}</div>
					<div className="chat-msg__status">{msg.status}</div>
				</div>
				{(msg.info && this.state.msgOpen) &&
				<>
					<div className="chat-msg__info">
						{msg.info}
					</div>
					<ul className="chat-msg__controls">
						<li className="chat-msg__control">
							<OrderButton text={'К заявке'}/>
						</li>
						<li className="chat-msg__control">
							<OrderButton text={'Открыть заявку'}/>
						</li>
					</ul>
				</>
				}
			</div>
		)
	}
}

export default ChatMsg;
