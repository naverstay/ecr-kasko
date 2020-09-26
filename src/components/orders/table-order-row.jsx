import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {Checkbox} from "antd";
import TableCell from "./table-cell";

class TableOrderRow extends Component {
	constructor(props) {
		super(props)
		this.toggleInfoHandle = this.toggleInfoHandle.bind(this)
		this.toggleRowChecked = this.toggleRowChecked.bind(this)
		this.state = { rowOpen: false, rowChecked: false }
	}

	static propTypes = {
		index: PropTypes.number,
		classList: PropTypes.array,
		children: PropTypes.node,
		rowCheckCallback: PropTypes.func,
	};

	toggleInfoHandle() {
		this.setState({rowOpen: !this.state.rowOpen});
	}
	
	toggleRowChecked(e) {
		const checked = e.target.checked
		this.setState({rowChecked: checked});
		
		if (typeof this.props.rowCheckCallback === 'function') {
			let row = {id: this.props.index, checked: checked}
			this.props.rowCheckCallback(row)
		}
	}
	
	render() {
		const {
			classList
		} = this.props;
		
		const className = cn([
			...(classList ? classList : []),
			'orders-table__row',
			{checked: this.state.rowChecked},
			{open: this.state.rowOpen }
		]);

		let kindergarden = React.Children.map(this.props.children, child =>
			React.cloneElement(child, {
				toggleInfoHandle: this.toggleInfoHandle
			})
		);
		
		return (
			<div className={className}>
				<div className="orders-table__row-overlay-top"/>
				<div className="orders-table__cell cell_size-1 check_v3">
					<Checkbox onChange={this.toggleRowChecked}/>
				</div>
				{kindergarden}
			</div>
		);
	} 
}

export default TableOrderRow;
