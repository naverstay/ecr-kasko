import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";

class DealerIncome extends Component {
    static propTypes = {
        children: PropTypes.node,
        innerWidth: PropTypes.number
    };

    render() {
        const {income} = this.props;
        return (
            <div className="dealer-income">
                <span>Доход дилера</span>

                <div className="dealer-income__tip"/>
                <div className="dealer-income__popup">
                    <ul>
                        {
                            income.map((c, i) => <li key={i}>
                                <span>{c.text}</span>
                                <span>{c.value}</span>
                            </li>)
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default DealerIncome;
