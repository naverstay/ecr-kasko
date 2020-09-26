import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './order-button.scss';

class OrderButton extends Component {
	static propTypes = {
		classList: PropTypes.array,
		clickFunc: PropTypes.func,
		text: PropTypes.string
	};

	clickHandler = () => {
		console.log('clickHandler', typeof this.props.clickFunc);
		if (typeof this.props.clickFunc === 'function') {
			this.props.clickFunc()
		}
	}
	
	render() {
		const {
			classList,
			text
		} = this.props;
		
		const className = cn([
			'order-button',
			...(classList ? classList : [])
		]);
		
		return (
			<div className={className}>
				{text}
			</div>
		)
	}
}

export default OrderButton;
