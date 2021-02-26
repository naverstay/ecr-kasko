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
import DriverLicense from "../driver-license";

const {Option} = Select;

class TrustedInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFields: [],
            clientLicenseDepartment: '',
            clientAddress: '',
            clientFlat: '',
            clientPostCode: '',
            clientRegistrationStart: '',
            clientLicenseStart: '',
            clientLicenseDepID: '',
            clientLicenseID: '',
            clientLicenseNumber: '',
            driverPassport: '',
            driverPassportStart: '',
            driverAnotherDocument: '',
            driverAnotherDocumentStart: '',
            driverAnotherDocumentDepartment: '',
            driverPassportDepID: '',
            driverPassportDepartment: '',
            driverBirthLocation: '',
            driverAddress: '',
            driverAddressPostCode: '',
            nonChangedPassportApproval: false,
            driverLicensePrev: false,
            driverProgenyNess: false,
            driverLastName: '',
            driverFirstName: '',
            driverFarthersName: '',
            driverPhone: '',
            driverEmail: '',
            driverLicenseStart: '',
            driverExperienceStart: '',
            driverLicenseFirst: '',
            driverBirthday: '',
            driverRegistrationStart: '',
            driverLicenseDepartment: '',
            driverLicenseID: '',
            driverLicenseNumber: '',
            driverPrevLicenseStart: '',
            driverPrevLicenseID: '',
            driverPrevLicenseNumber: '',
            driverChildrenCount: '',
            showExtraOptions: false,
            driverOSAGOInsurant: false,
            driverInsuranceAdd: true,
            driverOSAGOOwner: false,
            driverCitizenRF: true,
            sameAsRealAddress: true,
            driverCount: 1,
            clientFlatType: '',
            driverSecondDocType: '',
            driverFamilyStatus: '',
            driverFamilyStatusList: [
                "Женат/Замужем",
                "Холост",
                "В разводе",
                "Вдовец"
            ],
            clientFlatTypeList: [
                "Дом",
                "Квартира"
            ],
            driverSecondDocTypeList: [
                "Водительское удостоверение",
                "Военный билет"
            ]
        };
    }

    static propTypes = {
        children: PropTypes.node,
        removeCallback: PropTypes.func,
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

    driverInfoSave = (value) => {
        if ('calculationSave' in this.props) this.props.calculationSave(value)
    };

    onDriverPrevLicenseIDChange = e => {
        this.setState({driverPrevLicenseID: e.target.value})
    };

    onDriverLicenseNumberPrevChange = e => {
        this.setState({driverPrevLicenseNumber: e.target.value})
    };

    onDriverPrevLicenseStartChange = e => {
        this.setState({driverPrevLicenseStart: e.target.value})
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

    toggleExtraOptions = () => {
        this.setState({showExtraOptions: !this.state.showExtraOptions})
    }

    formControlCallback = (name, value) => {
        console.log('formControlCallback', name, value);

        if (name in this.state) {
            let obj = {}
            obj[name] = value

            this.setState(obj)
        } else {
            switch (name) {
                case 'carForTaxi':
                    this.setState({carForTaxi: value})
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
        let {fullCalculation, allFields, expanded, osago, wholeName, showAddBlock, index, disabled} = this.props
        //const dateFormat = "DD.MM.YY"
        const dateFormatMask = "'mask': '99.99.9999', 'showMaskOnHover': 'false'"
        const driverPhoneMask = "'mask': '[+7] (999)-999-99-99', 'showMaskOnHover': 'false'"
        const driverEmailMask = "'alias': 'email', 'showMaskOnHover': 'false'"
        const driverLicenseIDMask = "'mask': '99 99', 'showMaskOnHover': 'false'"
        const driverLicenseNumberMask = "'mask': '999999', 'showMaskOnHover': 'false'"

        const clientLicenseIDMask = "'mask': '99 99', 'showMaskOnHover': 'false'"
        const clientLicenseNumberMask = "'mask': '999999', 'showMaskOnHover': 'false'"

        let drivers = []

        for (let drv = 0; drv < this.state.driverCount; drv++) {
            drivers.push(drv)
        }

        console.log('index', index);

        //if (showAddBlock) {
        //	drivers.push(drivers.length)
        //}

        return (
            <div className="driver-info">
                <div className="driver-info__item">
                    <Row className="kasko-car-select__controls mb_0" gutter={20}>
                        <Col span={3}/>
                        <Col span={6}>
                            <div className="driver-info__caption">Водитель {index > 0 ? '#' + index : ''}</div>
                        </Col>

                        {disabled ? null :
                            <Col span={6}>
                                <div onClick={this.props.removeCallback} className="driver-info__remove m_0 gl_link"/>
                            </Col>
                        }
                    </Row>

                    <Row className="kasko-car-select__controls" gutter={20}>
                        <Col span={3}/>

                        {wholeName ?
                            <FormInput span={18} onChangeCallback={this.formControlCallback}
                                       placeholder="Фамилия, Имя, Отчество" controlName={'clientWholeName'} disabled={disabled ? 'disabled' : null} value={disabled ? 'Константинопольский Константин Константинопольский' : ''}/>
                            :
                            <>
                                <FormInput span={6} onChangeCallback={this.formControlCallback}
                                           placeholder="Фамилия" controlName={'driverLastName'} value={''}/>

                                <FormInput span={6} onChangeCallback={this.formControlCallback}
                                           placeholder="Имя" controlName={'driverFirstName'} value={''}/>

                                <FormInput span={6} onChangeCallback={this.formControlCallback}
                                           placeholder="Отчество" controlName={'driverFarthersName'} value={''}/>
                            </>
                        }
                    </Row>

                    {this.state.showExtraOptions ?
                        <Radio.Group className={"w_100p "} defaultValue={0}>
                            <Row className="kasko-car-select__controls" gutter={20}>
                                <Col span={3}/>
                                <Col>
                                    <Radio disabled={disabled ? 'disabled' : null} value={0}>Мужской</Radio>
                                </Col>
                                <Col>
                                    <Radio disabled={disabled ? 'disabled' : null} value={1}>Женский</Radio>
                                </Col>
                                <Col className={"ant-col-mla"}>
                                    <div className="gl_link fz_12"
                                         onClick={this.toggleExtraOptions}>Скрыть
                                    </div>
                                </Col>
                                <Col span={3}/>
                            </Row>
                        </Radio.Group> : null
                    }

                    <Row className="kasko-car-select__controls mb_30" gutter={20}>
                        <Col span={3}/>
                        <FormInput span={6} onChangeCallback={this.formControlCallback}
                                   disabled={disabled ? 'disabled' : null}
                                   placeholder="Дата рождения" controlName={'driverBirthday'} value={disabled ? '12.12.1912' : ''}/>
                        {/*<FormInput span={6} onChangeCallback={this.formControlCallback}*/}
                        {/*           placeholder="Мобильный телефон"*/}
                        {/*           controlName={'driverPhone'} value={this.state.driverPhone}/>*/}

                        {!this.state.showExtraOptions ?
                            <Col className={"ant-col-mla"}>
                                <div className="gl_link fz_12 clr_gray"
                                     onClick={this.toggleExtraOptions}>Подробнее
                                </div>
                            </Col> : null
                        }

                        <Col span={3}/>
                    </Row>

                    <Row className="kasko-car-select__controls mb_0" gutter={20}>
                        <Col span={3}/>
                        <Col span={12}>
                            <div className="driver-info__caption">Водительское удостоверение</div>
                        </Col>
                    </Row>

                    <DriverLicense disabled={disabled}/>
                </div>
            </div>
        );
    }
}

export default TrustedInfo;
