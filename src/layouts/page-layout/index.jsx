import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Navbar from "../../components/navbar";

// DEPRICATED *** remove to the report layout

class PageLayout extends Component {
    static propTypes = {
        children: PropTypes.node,
        innerWidth: PropTypes.number
    };

    render() {
        const {children} = this.props;
        return <>
            <div className='page__layout'>
                <div className='page__content _kasko'>{children}</div>
            </div>
            <Navbar/>
        </>;
    }
}

export default PageLayout;
