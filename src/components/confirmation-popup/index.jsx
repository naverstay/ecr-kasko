import React, {Component} from "react";
import {Row, Col, Button} from "antd";

import './style.scss';
import PropTypes from "prop-types";
import ReactComment from "../../helpers/reactComment";

class ConfirmationPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formBusy: false
        };
    }

    static propTypes = {
        children: PropTypes.node,
        popupCloseFunc: PropTypes.func
    };

    onPopupCancel = () => {
        typeof this.props.popupCloseFunc === 'function' && this.props.popupCloseFunc(false)
    }

    onPopupSubmit = () => {
        typeof this.props.popupCloseFunc === 'function' && this.props.popupCloseFunc(true)
    }

    render() {
        let {popupCloseFunc, confirm, attention, title, noBtn, yesBtn} = this.props;

        return (
            <div className="calculation-popup __confirm">
                <ReactComment text='"ecr-kasko/src/components/confirmation-popup/index.jsx"'/>

                <div className="calculation-popup__close" onClick={popupCloseFunc}/>

                <div className="calculation-popup__caption text_center"
                     dangerouslySetInnerHTML={{__html: `${title}`}}/>

                <Row className="kasko-car-select__controls ant-row-center" gutter={20}>
                    {confirm ?
                        <>
                            <Col className={"text_center"} style={{lineHeight: '60px'}} span={4}>
                                <div onClick={() => this.onPopupCancel()}
                                     className={"gl_link fz_15" + (attention ? ' btn-action' : ' btn_green')}>
                                    <span>{noBtn || 'Нет'}</span></div>
                            </Col>
                            <Col span={8}>
                                <Button onClick={() => this.onPopupSubmit()}
                                        className={"btn_middle ant-btn-primary"}
                                >{yesBtn || 'Да'}</Button>
                            </Col>
                            <Col span={4}/>
                        </>
                        :
                        <Col span={8}>
                            <Button onClick={() => this.onPopupSubmit()}
                                    className={"ant-btn-primary btn_middle"}
                            >{yesBtn || 'Да'}</Button>
                        </Col>
                    }
                </Row>
            </div>
        );
    }
}

export default ConfirmationPopup;
