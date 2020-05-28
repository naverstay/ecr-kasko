import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class TableOrderRow extends Component {
	constructor(props) {
		super(props)
		this.toggleInfoHandle = this.toggleInfoHandle.bind(this)
		this.state = { rowOpen: false }
	}

	static propTypes = {
		classList: PropTypes.array,
		children: PropTypes.node,
	};

	toggleInfoHandle() {
		this.setState({rowOpen: !this.state.rowOpen});
	}
	
	render() {
		const {
			classList
		} = this.props;
		
		const className = cn([
			...(classList ? classList : []),
			'orders-table__row',
			{ open: this.state.rowOpen }
		]);

		let childrengarden = React.Children.map(this.props.children, child =>
			React.cloneElement(child, {
				toggleInfoHandle: this.toggleInfoHandle
			})
		);
		
		return (
			<div className={className}>
				<div className="orders-table__row-overlay-top"/>
				{childrengarden}
			</div>
		);
	} 
}

export default TableOrderRow;
