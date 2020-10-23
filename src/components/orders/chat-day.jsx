import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './order-button.scss';
import ChatMsg from "./chat-msg";

class ChatDay extends Component {
    constructor(props) {
        super(props)
        this.toggleDayHandle = this.toggleDayHandle.bind(this)
        this.state = {dayOpen: true}
    }

    static propTypes = {
        msg: PropTypes.array,
        count: PropTypes.string,
        date: PropTypes.string,
        classCaption: PropTypes.string,
        classDay: PropTypes.string
    }

    toggleDayHandle() {
        this.setState({dayOpen: !this.state.dayOpen});
    }

    render() {
        const {
            msg,
            count,
            date,
            classDay,
            classCaption
        } = this.props;

        const dayClassName = cn([
            classDay,
            {'day_open': (count && this.state.dayOpen)}
        ]);

        return (
            <div className={dayClassName}>
                <div className={classCaption} onClick={this.toggleDayHandle}>
                    {count && <span className="chat-counter">{count}</span>}
                    <span className="chat-name">{date}</span>
                </div>

                {(count && this.state.dayOpen) && msg.map((m, i) => {
                    const classMsg = cn([
                        'chat-msg',
                        'status_' + m.statusColor,
                        m.opacity ? 'msg_opacity' : ''
                    ]);

                    return (
                        <ChatMsg key={i} classMsg={classMsg} msg={m}/>
                    )
                })}
            </div>
        )
    }
}

export default ChatDay;
