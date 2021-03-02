import React, {Component} from "react";
import {Input, Col, Row, Select, Checkbox, Button, Radio} from "antd";
import './style.scss';
import PropTypes from "prop-types";

import InsurancePolicy from "../insurance-policy";
import {Link} from "react-router-dom";
import Inputmask from "inputmask";
import FormInput from "../form-input";
import FormSelect from "../form-select";
import FormCheckbox from "../form-checkbox";
import ReactComment from "../../helpers/reactComment";

const {Option} = Select;

class DriverLicense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            driverLicFirst: true
        };
    }

    static propTypes = {
        prepend: PropTypes.node,
        children: PropTypes.node,
        fullCalculation: PropTypes.bool,
        innerWidth: PropTypes.number
    };

    removeDriver = (index) => {
        let drv = this.state.driverCount

        drv--

        this.setState({driverCount: (drv || 1)})
    };

    addDriver = e => {
        let drv = this.state.driverCount

        drv++

        this.setState({driverCount: (drv)})
    };

    addActiveField = (field) => {
        setTimeout(() => {
            let fields = this.state.activeFields.slice(0)

            if (fields.indexOf(field) < 0) {
                fields.push(field)

                this.setState({activeFields: fields})
            }
        }, 100)
    };

    activeClass = (field) => {
        return (this.state.activeFields.indexOf(field) > -1 ? " control-focused" : "")
    };

    formControlCallback = (name, value) => {
        console.log('formControlCallback', name, value);

        if (name in this.state) {
            let obj = {}
            obj[name] = value

            this.setState(obj)
        } else {
            switch (name) {
                case 'driverLicFirst':
                    this.setState({driverLicFirst: value})
                    break

            }
        }
    };

    componentDidUpdate() {
        document.querySelectorAll('[data-inputmask]').forEach(function (inp) {
            let mask = {}
            inp.dataset.inputmask.split(',').forEach((m) => {
                let key = m.split(':')[0]
                mask[key] = m.split(':')[1]
            })
            Inputmask(mask).mask(inp);
        })
    };

    render() {
        let {prepend, disabled} = this.props

        return (
            <div className="driver-info__block">
                <ReactComment text='"ecr-kasko/src/components/driver-license/index.jsx"'/>

                <Row className="kasko-car-select__controls" gutter={20}>
                    <Col span={3}/>
                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                               disabled={disabled}
                               placeholder="Серия, номер"
                               controlName={'DriverLicNum'}
                               value={''}/>

                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                               disabled={disabled}
                               placeholder="Дата выдачи" controlName={'DriverLicStart'}
                               value={''}/>

                    <FormCheckbox span={4} onChangeCallback={this.formControlCallback}
                                  text="Это первое водительское удостоверение"
                                  className="checkbox_middle check_v6"
                                  value={0} disabled={disabled}
                                  controlName={'driverLicFirst'}
                                  checked={this.state.driverLicFirst}/>
                </Row>

                {prepend ? prepend : null}

                {this.state.driverLicFirst ? null :
                    <Row className="kasko-car-select__controls" gutter={20}>
                        <Col span={3}/>
                        <FormInput span={6} onChangeCallback={this.formControlCallback}
                                   disabled={disabled}
                                   placeholder="Серия, номер предыдущего удостоверения"
                                   controlName={'DriverLicNumFirst'}
                                   value={''}/>

                        <FormInput span={6} onChangeCallback={this.formControlCallback}
                                   placeholder="Дата выдачи первого удостоверения" controlName={'DriverLicFirstStart'}
                                   value={''}/>
                    </Row>
                }
            </div>
        );
    }
}

export default DriverLicense;
