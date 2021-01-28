import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './bank-tip.scss';

class BankTip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInfoBlock: false
        };
    };

    static propTypes = {
        classList: PropTypes.array,
        data: PropTypes.array,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onClick: PropTypes.func
    };

    toggleInfoBlock = () => {
        console.log('toggleInfoBlock', this.state.showInfoBlock);
        this.setState({showInfoBlock: !this.state.showInfoBlock})
    };

    render() {
        const {tip} = this.props;

        return (
            <div className={'bank-tip'}>
                <div onClick={this.toggleInfoBlock} className={'bank-tip__caption fw_b' + (this.state.showInfoBlock ? ' opened' : '')}>{tip.tipName}</div>
                {this.state.showInfoBlock ? <ul>
                    {tip.tipList.map((item, i) => {
                        return (
                            <li className='time_spacer' key={i}>{item}</li>
                        )
                    })}
                </ul> : null}
            </div>
        )
    }
};

export default BankTip;
