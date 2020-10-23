import React, {Component} from "react";
import {formatMoney} from "../../helpers/formatMoney";

import './style.scss';
import PropTypes from "prop-types";

class AsideBlockProduct extends Component {
    static propTypes = {
        children: PropTypes.node,
        innerWidth: PropTypes.number,
        tabIndex: PropTypes.number,
        callback: PropTypes.func
    };

    callback = () => {
        this.props.callback && typeof this.props.callback === 'function' && this.props.callback({tabIndex: this.props.tabIndex})
    }

    render() {
        const {price, name} = this.props;
        return (
            <div onClick={this.callback} className="aside-block__product">
                <div className="aside-block__product--name">{name}</div>
                <div className="aside-block__product--price">{formatMoney(price)} ₽</div>
            </div>
        );
    }
}

export default AsideBlockProduct;
