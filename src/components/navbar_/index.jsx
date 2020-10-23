import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Sidebar from './nSidebar';

//import Topbar from './topbar';


class Navbar extends Component {
    static propTypes = {
        innerWidth: PropTypes.number
    };

    state = {width: window.innerWidth};

    render() {
        return <Sidebar {...this.props}/>;
    }
}

export default Navbar;
