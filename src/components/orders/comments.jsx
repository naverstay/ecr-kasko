import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './comments.scss';

class Comments extends Component {
	static propTypes = {
		classList: PropTypes.array,
		msg: PropTypes.array,
		title: PropTypes.string,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		onClick: PropTypes.func
	};
	
	render() {
		const {
			classList,
			title,
			msg,
			onMouseEnter,
			onMouseLeave,
			onClick
		} = this.props;

		const className = cn([
			...(classList ? classList : []),
			'comments-holder'
		]);
		
		return (
			<div className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
				<div className="comments-title">
					{title}
				</div>
				<div className="comments-content">
					{msg.map((m) => {
						return (
							<div className="comments-msg">
								<div className="comments-msg__author">
									{m.author}
								</div>
								<div className="comments-msg__date">
									{m.date.map((d) => {
										return <span>{d}</span>
									})}
								</div>
								<div className="comments-msg__text">
									{m.text}
								</div>
							</div>
						)
					})}
				</div>
				<div className="comments-form">
					<textarea className='comments-form__text'
							  placeholder="Комментарий для внутреннего использования"></textarea>
					<button className='comments-form__btn'>OK</button>
				</div>
			</div>
		);
	}
};

export default Comments;
