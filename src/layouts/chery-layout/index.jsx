import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Navbar from "../../components/navbar";
import CheryHeader from "../../components/chery-header";
import CheryFooter from "../../components/chery-footer";

// DEPRICATED *** remove to the report layout

class CheryLayout extends Component {
	static propTypes = {
		children: PropTypes.node,
		innerWidth: PropTypes.number,
	};

	render() {
		const { children } = this.props;
		return (
			<>
				<CheryHeader />
				<div className='page__layout chery'>
					<div className='page__content _kasko'>{children}</div>
				</div>

				<CheryFooter/>
			</>
		);
	}
}

export default CheryLayout;
