import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './order-button.scss';
import OrderButton from "./order-button";

class ChatMsg extends Component {
	constructor(props) {
		super(props)
		this.openMsgHandle = this.openMsgHandle.bind(this)
		this.closeMsgHandle = this.closeMsgHandle.bind(this)
		this.state = {msgOpen: false}
	}
	
	static propTypes = {
		classMsg: PropTypes.string,
		msg: PropTypes.object
	}

	openMsgHandle(e) {
		this.setState({msgOpen: true});
	}

	closeMsgHandle(e) {
		e.stopPropagation()
		this.setState({msgOpen: false});
		return false;
	}

	render() {
		const {
			classMsg,
			msg
		} = this.props;

		const msgClassName = cn([
			classMsg,
			{'msg_info': (msg.info && msg.info.length)},
			{'msg_open': (msg.info && this.state.msgOpen)}
		]);
		
		return (
			<div className={msgClassName} onClick={(e) => {this.openMsgHandle(e)}}>
				<div className="chat-msg__row">
					<div className="chat-msg__author status">{msg.author}</div>
					<div className="chat-msg__time">{msg.time}</div>
				</div>
				<div className="chat-msg__row">
					<div className="chat-msg__status">{msg.status}</div>
					<div className="chat-msg__bank">{msg.bank}</div>
				</div>
				{(msg.info && this.state.msgOpen) ?
					<>
						<div className="chat-msg__info">
							{msg.info}
						</div>
						<ul className="chat-msg__controls">
							<li className="chat-msg__control">
								<div className="chat-msg__btn" onClick={(e) => {this.closeMsgHandle(e)}}>Скрыть</div>
							</li>
							<li className="chat-msg__control">
								<div className="chat-msg__btn">К заявке</div>
							</li>
							<li className="chat-msg__control">
								<div className="chat-msg__btn">Открыть заявку</div>
							</li>
						</ul>
					</>
					: null
				}
			</div>
		)
	}
}

export default ChatMsg;
