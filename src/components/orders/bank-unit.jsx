import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './bank-unit.scss';

class BankUnit extends Component {
	static propTypes = {
		classList: PropTypes.array,
		programmeName: PropTypes.string,
		bankName: PropTypes.string,
		price: PropTypes.string,
		fee: PropTypes.string,
		status: PropTypes.string,
		statusColor: PropTypes.string,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		onClick: PropTypes.func
	};
	
	render() {
		const {
			classList,
			bankName,
			programmeName,
			price,
			fee,
			status,
			statusColor,
			onMouseEnter,
			onMouseLeave,
			onClick
		} = this.props;

		const className = cn([
			'bank-unit',
			...(classList ? classList : [])
		]);

		const classStatus = cn([
			'bank-unit__status',
			statusColor
		]);
		
		return (
			<div className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
				<div className="bank-unit__cell cell_size-1">
					<div className="bank-unit__name">{bankName}</div>
					<div className="bank-unit__programme">{programmeName}</div>
				</div>
				<div className="bank-unit__cell cell_size-2">
					<div className="bank-unit__price">{price}</div>
					<div className="bank-unit__fee">{fee}</div>
				</div>
				<div className="bank-unit__cell cell_size-3">
					{
						(statusColor && status && <div className={classStatus}>{status}</div>)
					}
				</div>
				<div className="bank-unit__cell cell_size-4">
					<div className="bank-unit__chat"/>
				</div>
			</div>
		)
	}
};

export default BankUnit;
