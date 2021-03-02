import React, {Component} from "react";
import {Link} from "react-router-dom";

import './style.scss';
import PropTypes from "prop-types";
import KaskoNotice from "../kasko-notice";

class DocsCompleteness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noticeOpened: true
        };
    }

    static propTypes = {
        children: PropTypes.node,
        docList: PropTypes.array,
        status: PropTypes.any
    };

    toggleOpened = () => {
        this.setState({noticeOpened: !this.state.noticeOpened})
    }

    componentDidMount() {

    }

    render() {
        const {docList} = this.props;
        let checkCount = 0;

        let list = docList.map((d, i) => {
            if (d.check) {
                checkCount++;
            }
            return <li key={i} className={d.check ? 'checked' : ''}>{d.name}</li>
        })

        let pacMan = <div className={'docs-completeness__status'}>
            <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <circle r="35" cy="35" cx="35" strokeWidth="70" strokeDasharray={220 * (checkCount / docList.length) + ", 220"}
                            stroke="#228B22" fill="none"/>
                </g>
            </svg>
        </div>

        return (
            <div className="kasko-notice">
                {pacMan}
                <ul className="docs-completeness__list">
                    {list}
                </ul>
            </div>
        );
    }
}

export default DocsCompleteness;
