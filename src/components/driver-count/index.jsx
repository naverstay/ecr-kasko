import React, {Component} from "react";
import {Col, Row, Checkbox, Tooltip} from "antd";

import './style.scss';
import PropTypes from "prop-types";
import FormInput from "../form-input";
import FormCheckbox from "../form-checkbox";

class DriverCount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedList: this.props.driverOptions,
            carUsagePurpose: 'Личные',
            indeterminate: true,
            showExtraData: false,
            trailerUsage: false,
            rentUsage: false,
            checkAll: false
        };
    }

    static propTypes = {
        children: PropTypes.node,
        innerWidth: PropTypes.number
    };

    toggleExtraData = e => {
        this.setState({showExtraData: !this.state.showExtraData})
    };

    onDriverOptionsChange = e => {
        let val = e.target.value
        let checkedList = this.state.checkedList.slice(0)

        if (e.target.checked) {
            checkedList.push(val)
        } else {
            const index = checkedList.indexOf(val);
            if (index > -1) {
                checkedList.splice(index, 1);
            }
        }

        this.setState({
            checkedList: checkedList,
            indeterminate: !!checkedList.length && checkedList.length < this.props.driverOptions.length,
            checkAll: false,
            paramsChanged: true
        });
    };

    onCheckAllChange = e => {
        let newChecked = e.target.checked ? this.props.driverOptions : []

        if (e.target.checked) {
            this.setState({
                checkedList: [],
                indeterminate: false,
                checkAll: e.target.checked
            });
        }
    };

    render() {
        const {driverOptions, children, className, extraData, size} = this.props

        return (
            <div className={"w_100p"}>
                <Row gutter={20} className={"kasko-car-select__controls check_v2 __large " + (className || '')}>
                    <Col className={"popup-visible"} span={3}/>
                    <Col className={"mb_0"} span={24}>
                        <Row className={"ant-row-last-right"} gutter={20}>
                            {
                                driverOptions.length ? driverOptions.map((c, i) =>
                                    <Col span={size || ''} key={i}>
                                        <Checkbox
                                            onChange={this.onDriverOptionsChange}
                                            className={'w_100p text_center'}
                                            checked={this.state.checkedList.indexOf(c) > -1}
                                            value={c}>{c}
                                            <span className="driver-count__index">0,95</span>
                                        </Checkbox>
                                    </Col>
                                ) : null
                            }
                            {
                                <Col span={size || ''} key={driverOptions.length}>
                                    <Tooltip overlayClassName="tooltip_v1" placement="top"
                                             title="Неограниченное количество водителей">
                                        <Checkbox
                                            className={'w_100p text_center'}
                                            disabled={'disabled'}
                                            indeterminate={this.state.indeterminate}
                                            checked={this.state.checkAll}
                                            onChange={this.onCheckAllChange}>Мультидрайв</Checkbox>
                                    </Tooltip>
                                </Col>
                            }
                        </Row>
                    </Col>
                </Row>
                <Row gutter={20} className={"kasko-car-select__controls check_v2 __large mb_25 " + (className || '')}>
                    {children}

                    {extraData ?
                        this.state.showExtraData ? null :
                            <Col className="kasko-car-select__additional _inactive ant-col-mla">
                                <div className="gl_link"
                                     onClick={this.toggleExtraData}
                                >Дополнительно
                                </div>
                            </Col>
                        : null
                    }
                </Row>
                {this.state.showExtraData ?
                    <>
                        <Row className="kasko-car-select__controls" gutter={20}>
                            <FormInput span={8} onChangeCallback={this.formControlCallback}
                                       placeholder="Цель использования"
                                       disabled={true}
                                       controlName={'carMileage'} value={this.state.carUsagePurpose}/>
                            <FormCheckbox onChangeCallback={this.formControlCallback}
                                          span={8}
                                          text="Используется прицеп"
                                          className="checkbox_middle check_v3"
                                          value={1}
                                          disabled={true}
                                          controlName={'trailerUsage'}
                                          checked={this.state.trailerUsage}/>
                            <FormCheckbox onChangeCallback={this.formControlCallback}
                                          span={8}
                                          text="Сдается в аренду"
                                          className="checkbox_middle check_v3"
                                          value={1}
                                          disabled={true}
                                          controlName={'rentUsage'}
                                          checked={this.state.rentUsage}/>

                        </Row>
                        <Row className="kasko-car-select__controls mb_40" gutter={20}>
                            <Col className="kasko-car-select__additional _inactive text_right ant-col-mla">
                                <div className="gl_link" onClick={this.toggleExtraData}
                                >Скрыть</div>
                            </Col>
                        </Row>
                    </>
                    : null
                }
            </div>
        );
    }
}

export default DriverCount;
