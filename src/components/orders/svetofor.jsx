import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './svetofor.scss';

class Svetofor extends Component {
	static propTypes = {
		classList: PropTypes.array,
		data: PropTypes.array
	}

	render() {
		const {
			classList,
			data
		} = this.props;
		
		const className = cn([
			'svetofor-wrapper',
			...(classList ? classList : [])
		]);

		return (
			<div className={className}>
				{data.map((s) => {
					let cls = cn(['svetofor-item', s.className])
					return (
						<span className={cls}>{s.value || ''}</span>
					)
				})}
			</div>
		)
	}
}

export default Svetofor;
