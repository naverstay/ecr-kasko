import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './table-header-button.scss';

class TableHeaderButton extends Component {
	static propTypes = {
		classList: PropTypes.array,
		label: PropTypes.string,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		onClick: PropTypes.func
	};
	
	render() {
		const {
			classList,
			label,
			onMouseEnter,
			onMouseLeave,
			onClick
		} = this.props;

		const className = cn([
			...(classList ? classList : []),
			'orders-table__header-btn'
		]);
		
		return (
			<div className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
				{label}
			</div>
		);
	}
};

export default TableHeaderButton;
