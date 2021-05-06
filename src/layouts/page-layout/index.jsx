import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Navbar from "../../components/navbar";

// DEPRICATED *** remove to the report layout

class PageLayout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openedRow: null
        }
    }

    static propTypes = {
        children: PropTypes.node,
        innerWidth: PropTypes.number
    };

    componentDidMount() {
        let prevY = window.scrollY;

        window.addEventListener('scroll', (evt) => {
            let action = (window.scrollY > 50 && window.scrollY - prevY > 0) ? 'add' : 'remove';

            document.getElementById('root').classList[action]('scroll-down');

            prevY = window.scrollY;
        })
    }

    forceCloseOrders = (row) => {
        if (row) {
            this.setState({openedRow: row});
        }
    }

    toggleOrderHandle = (show) => {
        if (!show && this.state.openedRow) {
            this.state.openedRow.setState({rowOpen: false});
        }
        document.getElementById('root').classList[show ? 'add' : 'remove']('open-order');
    }

    render() {
        let kindergarden = React.Children.map(this.props.children, child =>
            React.cloneElement(child, {
                forceCloseOrders: this.forceCloseOrders,
                toggleOrderHandle: this.toggleOrderHandle
            })
        );

        return <>
            <div className='page__layout'>
                <div className='page__content _kasko'>{kindergarden}</div>
            </div>
            <Navbar toggleOrderHandle={this.toggleOrderHandle}/>
        </>;
    }
}

export default PageLayout;
