import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ReportPageMenu from '../../components/ReportPageMenu';
// import Filters from '../../components/filters';

import './style.scss';

class ReportPageLayout extends Component {
	static propTypes = {
		header: PropTypes.node,
		content: PropTypes.node,
		footer: PropTypes.node,
		children: PropTypes.node,
		innerWidth: PropTypes.number,
	};

	render() {
		const {
			header, 
			content,
			footer,
			children,
			isNavFixed,
			innerWidth,
			userWeight,
			pages,
		} = this.props;
		// const filters = innerWidth > 1200 ? <Filters pages={pages} /> : null;

		return (
			<div className='page__layout'>
				{/*filters*/}				
				<div className={cn(['page__content', { 'nav-fixed': isNavFixed }])}>
					<div className='report-page__layout'>
						<div className='report-page__layout__header'>
							<ReportPageMenu pages={pages} userWeight={userWeight}/> 
						</div>
						<div className='report-page__content'>{children || content}</div>
						<div className='report-page__layout__footer'>{footer}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ReportPageLayout;
