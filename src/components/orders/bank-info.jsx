import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './bank-info.scss';
import BankTip from "./bank-tip";

class BankInfo extends Component {
    static propTypes = {
        classList: PropTypes.array,
        data: PropTypes.array,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onClick: PropTypes.func
    };

    render() {
        const {
            msg
        } = this.props;

        return (
            <div className={'bank-info'}>
                <div className={'bank-info__caption fw_b'}>{msg.text}</div>
                <div className="bank-info__block">
                    <div className={'fw_b'}>{msg.orderInfo.bankStatus}</div>
                    <p>{msg.orderInfo.bankReason}</p>

                    {msg.orderInfo.bankTips.map((tip, i) => {
                        return <BankTip tip={tip} key={i}/>
                    })}
                </div>
            </div>
        )
    }
};

export default BankInfo;
