import React, {Component} from "react";
import {Col, Row} from "antd";

import './style.scss';
import PropTypes from "prop-types";

class PopupOverlay extends Component {
    static propTypes = {
        children: PropTypes.node,
        innerWidth: PropTypes.number
    };

    render() {
        const {children, span, popupClass} = this.props;
        return (
            <div className="popup-overlay">
                <Row gutter={20} className="ant-row-center">
                    <Col span={span || 8} className={popupClass || ''}>
                        {children}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PopupOverlay;
