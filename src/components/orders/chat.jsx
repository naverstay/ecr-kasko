import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ChatDay from '../orders/chat-day';

import './chat.scss';

class Chat extends Component {
	static propTypes = {
		classList: PropTypes.array,
		data: PropTypes.array,
		title: PropTypes.string,
		total: PropTypes.string,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		onClick: PropTypes.func
	};
	
	render() {
		const {
			classList,
			title,
			total,
			data,
			onMouseEnter,
			onMouseLeave,
			onClick
		} = this.props;
	
		const className = cn([
			'chat-holder',
			...(classList ? classList : [])
		]);
		
		return (
			<div className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
				<div className="chat-title">
					<div className="chat-title__btn"/>
					<div className="chat-counter">
						{total}
					</div>
					<div className="chat-title__text">
						{title}
					</div>
				</div>
				<div className="chat-search">
					<input className="chat-search__input" type="text" placeholder="Поиск по имени или фамилии"/>
					<button className="chat-search__btn"/>
				</div>
				<div className="chat-scroller">
					{data.map((d, i) => {
						const classDay = cn([
							'chat-day'
						]);

						const classCaption = cn([
							'chat-day__caption',
							(d.count === void 0) ? 'msg-nocount' : ''
						]);
						
						return <ChatDay classDay={classDay} classCaption={classCaption} msg={d.msg} date={d.date} count={d.count} />
					})}
				</div>
			</div>
		)}
};

export default Chat;
