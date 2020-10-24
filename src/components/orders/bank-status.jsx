import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './bank-status.scss';

class BankStatus extends Component {
    static propTypes = {
        classList: PropTypes.array,
        data: PropTypes.array,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onClick: PropTypes.func
    };

    render() {
        const {
            classList,
            data,
            onMouseEnter,
            onMouseLeave,
            onClick
        } = this.props;

        const className = cn([
            'bank-status',
            ...(classList ? classList : [])
        ]);

        let msgBuilder = (msg) => {
            return (
                msg.map((m, i) => {
                    return (
                        <div key={i} className={'bank-status__msg msg_' + m.author}>
                            <div className='bank-status__msg--text'>{m.text}
                                <div className='bank-status__msg--time'>{m.time}</div>
                            </div>
                        </div>
                    )
                })
            )
        }

        return (
            <div className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
                {data.map((m, i) => {
                    return (
                        <div key={i} className='bank-status__day'>
                            <div className='bank-status__date'>{m.date}</div>
                            {msgBuilder(m.msg)}
                        </div>
                    )
                })}
            </div>
        )
    }
};

export default BankStatus;
