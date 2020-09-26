import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ChatDay from '../orders/chat-day';
import searchTree from "../../helpers/searchTree";
import {Checkbox} from "antd";

import './chat.scss';

class Chat extends Component {
	constructor(props) {
		super(props)
		this.toggleChat = this.toggleChat.bind(this)
		this.state = {
			chatOpen: this.props.open,
			settingsOpen: false,
			searchOpen: false
		}

		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}
	
	static propTypes = {
		classList: PropTypes.array,
		data: PropTypes.array,
		open: PropTypes.bool,
		title: PropTypes.string,
		total: PropTypes.string,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		onClick: PropTypes.func
	};
	
	toggleSettings = () => {
		this.setState({settingsOpen: !this.state.settingsOpen})
	}

	toggleSearch = () => {
		this.setState({searchOpen: !this.state.searchOpen})
	}
	
	toggleChat = () => {
		this.setState({chatOpen: !this.state.chatOpen})
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}
	
	setWrapperRef(node) {
		this.wrapperRef = node;
	}
	
	handleClickOutside(event) {
		if (!event.target.classList.contains('chat-title__settings') && !searchTree(this.wrapperRef, event.target)) {
			this.setState({settingsOpen: false})
		}
	}
	
	render() {
		const {
			title,
			total,
			data,
			onMouseEnter,
			onMouseLeave,
			onClick
		} = this.props;
	
		const className = cn([
			'chat-holder',
			{open: this.state.chatOpen}
		]);
		
		return (
			<>
				<div className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
					<div onClick={this.toggleChat} className="chat-title__show">
						<span className="chat-counter">{total}</span>
					</div>
					<div className="chat-title">
						<div onClick={this.toggleChat} className="chat-title__btn"/>
						<div className="chat-counter">
							{total}
						</div>
						<div className="chat-title__text">
							{title}
						</div>
						<div onClick={this.toggleSettings} className="chat-title__settings"/>
						<div onClick={this.toggleSearch} className="chat-title__search"/>
						{this.state.settingsOpen ? 
							<div ref={this.setWrapperRef} className="chat-title__menu">
								<ul className="chat-title__menu--list">
									<li className="chat-title__menu--item check_v4"><Checkbox>Сортировать по времени</Checkbox></li>
									<li className="chat-title__menu--item check_v4"><Checkbox>Сортировать по прочитанному</Checkbox></li>
									<li className="chat-title__menu--item chat-title__menu--split">Пометить все как прочитанное</li>
									<li className="chat-title__menu--item">Удалить прочитанное</li>
								</ul>
							</div> 
							: null
						}
					</div>
					{this.state.searchOpen ? 
						<div className="chat-search">
							<input className="chat-search__input" type="text" placeholder="Поиск по уведомлениям"/>
						</div>
						: null
					}
					<div className="chat-scroller">
						{data.map((d, i) => {
							const classDay = cn([
								'chat-day'
							]);
	
							const classCaption = cn([
								'chat-day__caption',
								(d.count === void 0) ? 'msg-nocount' : ''
							]);
							
							return <ChatDay key={i} classDay={classDay} classCaption={classCaption} msg={d.msg} date={d.date} count={d.count} />
						})}
					</div>
				</div>
			</>
		)}
};

export default Chat;
