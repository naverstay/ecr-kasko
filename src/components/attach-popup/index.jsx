import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";
import {Col, Row, Input, Button, Form, Checkbox, Select} from "antd";
import ClientQuestionnaire from "../client-questionnaire";

const {Option} = Select;

class AttachPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formBusy: false,
            manualPriceCheck: false,
            insurancePrice: '30 000 ₽',
            salesManagerName: '',
            credSpecName: '',
            clientLastName: '',
            clientPhone: '',
            salesManagerList: [
                'Ларин К. О.',
                'Резник Д. М.',
                'Иванов В. П.'
            ],
            credSpecList: [
                'Константинопольский Константин',
                'Константинопольский супер',
                'Константинопольский мега'
            ]
        };
    }

    static propTypes = {
        children: PropTypes.node,
        popupCloseFunc: PropTypes.func,
        innerWidth: PropTypes.number
    };

    formRef = React.createRef();

    onFinish = values => {
        this.setState({formBusy: true})

        setTimeout(() => {
            this.setState({formBusy: false, SMSSent: true})

            typeof this.props.popupCloseFunc === 'function' && this.props.popupCloseFunc()
        }, 200)
    };

    onReset = () => {
        this.formRef.current.resetFields();
    };

    onFill = () => {
        this.formRef.current.setFieldsValue({
            note: 'Hello world!',
            gender: 'male'
        });
    };

    toggleSMSSent = () => {
        this.setState({SMSSent: !this.state.SMSSent})
    }

    onSMSCodeChange = e => {
        this.setState({SMSCode: e.target.value})

        if (('' + e.target.value).length === 4) {
            window.location = '/kasko_done'
        }
    };

    onInsuranceCompNameChange = value => {
        this.setState({salesManagerName: value})
        //this.checkReadyState()
    };

    onInsuranceTaxNameChange = value => {
        this.setState({credSpecName: value})
        //this.checkReadyState()
    };

    onInsurancePriceChange = e => {
        this.setState({insurancePrice: e.target.value})
    };

    onManualPriceToggle = e => {
        this.setState({manualPriceCheck: !this.state.manualPriceCheck})
    };

    onClientLastNameChange = e => {
        this.setState({clientLastName: e.target.value})
    };

    onClientPhoneChange = e => {
        this.setState({clientPhone: e.target.value})
    };

    render() {
        const {popupCloseFunc, subtitle} = this.props;
        //const clientPhoneMask = "'mask': '[+7] (999)-999-99-99', 'showMaskOnHover': 'false'"

        let formDisabled = !this.state.salesManagerName.length || !this.state.credSpecName.length || !this.state.insurancePrice.length || this.state.formBusy

        return (
            <div className="kaskotax-popup attach-popup">
                <div className="kaskotax-popup__close" onClick={popupCloseFunc}/>
                <div className={"kaskotax-popup__title" + (subtitle && subtitle.length ? ' mb_10' : '')}>Загрузить и
                    распознать документы
                </div>
                {(subtitle && subtitle.length) ? <div className="kaskotax-popup__subtitle">{subtitle}</div> : null}

                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                    <div className="kaskotax-popup__form attach">
                        <div className={"kasko-car-select__controls ant-row-center align_center"}>
                            <Checkbox checked={this.state.useOCR ? "checked" : null}
                                      onChange={this.onUseOCRChange}>Не распознавать документы</Checkbox>
                        </div>
                        <ClientQuestionnaire credit={true}/>
                    </div>

                    <Row className="kasko-car-select__controls ant-row-center mb_0" gutter={20}>
                        <Col span={5}>
                            <Button htmlType={formDisabled ? null : "submit"}
                                    className={"w_100p ant-btn btn_green"}>Отправить</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default AttachPopup;
