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
import DriverLicense from "../driver-license";

const {Option} = Select;

class DriverInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFields: [],
            clientWholeName: 'Константинопольский Константин Константинопольский',
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
            driverBirthday: '12.12.1912',
            driverRegistrationStart: '',
            driverLicenseDepartment: '',
            driverLicenseID: '',
            driverLicenseNumber: '',
            driverPrevLicenseStart: '',
            driverPrevLicenseID: '',
            driverPrevLicenseNumber: '',
            driverChildrenCount: '',
            driverOSAGOInsurant: true,
            showExtraOptions: false,
            insurantDriverLicFirst: true,
            driverOSAGOOwner: true,
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
        driverInfoUpdate: PropTypes.func,
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
                case 'clientWholeName':
                    this.setState({clientWholeName: value})
                    break;
                case 'driverBirthday':
                    this.setState({driverBirthday: value})
                    break;
                case 'carForTaxi':
                    this.setState({carForTaxi: value})
                    break;
                case 'driverOSAGOInsurant':
                    this.setState({driverOSAGOInsurant: value})
                    break;
            }
        }

        let obj = {};
        obj[name] = value;
        this.props.driverInfoUpdate(obj);
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
        let {fullCalculation, allFields, expanded, osago, wholeName, showAddBlock, driverInfoUpdate} = this.props
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

        //if (showAddBlock) {
        //	drivers.push(drivers.length)
        //}

        return (
            <div className="driver-info">
                <ReactComment text='"ecr-kasko/src/components/driver-info/index.jsx"'/>
                {
                    (expanded && drivers.length) ? drivers.map((d, di) => {
                        return (
                            <div key={di}>
                                {
                                    <div key={di} className="driver-info__item">
                                        <Row className="kasko-car-select__controls ant-row-center mb_30 mt_-50"
                                             gutter={20}>
                                            <Col span={3}/>
                                            <FormCheckbox onChangeCallback={this.formControlCallback}
                                                          text="Собственник"
                                                          disabled={'disabled'}
                                                          className="checkbox_middle check_v3"
                                                          value={1}
                                                          controlName={'driverOSAGOOwner'}
                                                          checked={this.state.driverOSAGOOwner}/>

                                            <FormCheckbox onChangeCallback={this.formControlCallback}
                                                          text="Водитель"
                                                          className="checkbox_middle check_v3"
                                                          value={0}
                                                          controlName={'driverOSAGOInsurant'}
                                                          checked={this.state.driverOSAGOInsurant}/>
                                            <Col span={3}/>
                                        </Row>

                                        <Row className="kasko-car-select__controls mb_0" gutter={20}>
                                            <Col span={3}/>
                                            <Col span={18}>
                                                <div className="driver-info__caption">Личная информация</div>
                                            </Col>
                                        </Row>

                                        <Row className="kasko-car-select__controls" gutter={20}>
                                            <Col span={3}/>

                                            {wholeName ?
                                                <FormInput span={18} onChangeCallback={this.formControlCallback}
                                                           placeholder="Фамилия, Имя, Отчество"
                                                           controlName={'clientWholeName'}
                                                           value={this.state.clientWholeName}/>
                                                :
                                                <>
                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder="Фамилия" controlName={'driverLastName'}
                                                               value={''}/>

                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder="Имя" controlName={'driverFirstName'}
                                                               value={''}/>

                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder="Отчество" controlName={'driverFarthersName'}
                                                               value={''}/>
                                                </>
                                            }
                                        </Row>

                                        {this.state.showExtraOptions ?
                                            <Radio.Group className={"w_100p "} defaultValue={0}>
                                                <Row className="kasko-car-select__controls" gutter={20}>
                                                    <Col span={3}/>
                                                    <Col>
                                                        <Radio value={0}>Мужской</Radio>
                                                    </Col>
                                                    <Col>
                                                        <Radio value={1}>Женский</Radio>
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

                                        <Row className="kasko-car-select__controls mb_60" gutter={20}>
                                            <Col span={3}/>
                                            <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                       placeholder="Дата рождения" controlName={'driverBirthday'}
                                                       value={this.state.driverBirthday}/>

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
                                            <Col span={18}>
                                                <div className="driver-info__caption">Контакты</div>
                                            </Col>
                                        </Row>

                                        <Row
                                            className={"kasko-car-select__controls mb_60"}
                                            gutter={20}>
                                            <Col span={3}/>
                                            <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                       placeholder="Мобильный телефон"
                                                       controlName={'driverPhone'} value={this.state.driverPhone}/>

                                            <FormInput span={12} onChangeCallback={this.formControlCallback}
                                                       placeholder="Емейл"
                                                       controlName={'driverEmail'} value={this.state.driverEmail}/>
                                        </Row>

                                        {
                                            fullCalculation ?
                                                <>
                                                    <Row className="kasko-car-select__controls mb_0" gutter={20}>
                                                        <Col span={3}/>
                                                        <Col span={12}>
                                                            <div className="driver-info__caption">Паспорт</div>
                                                        </Col>
                                                    </Row>

                                                    <Row className="kasko-car-select__controls" gutter={20}>
                                                        <Col span={3}/>

                                                        <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                                   inputmask={clientLicenseIDMask}
                                                                   placeholder="Серия, номер"
                                                                   controlName={'driverPassport'}
                                                                   value={this.state.driverPassport}/>

                                                        <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                                   inputmask={clientLicenseIDMask}
                                                                   placeholder="Дата выдачи"
                                                                   controlName={'driverPassportStart'}
                                                                   value={this.state.driverPassportStart}/>

                                                        <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                                   inputmask={clientLicenseNumberMask}
                                                                   placeholder="Код подразделения"
                                                                   controlName={'driverPassportDepID'}
                                                                   value={this.state.driverPassportDepID}/>

                                                    </Row>

                                                    <Row className="kasko-car-select__controls mb_60" gutter={20}>
                                                        <Col span={3}/>

                                                        <FormInput span={18} onChangeCallback={this.formControlCallback}
                                                                   placeholder="Кем выдан"
                                                                   controlName={'driverPassportDepartment'}
                                                                   value={this.state.driverPassportDepartment}/>
                                                    </Row>

                                                    <Row className="kasko-car-select__controls mb_0" gutter={20}>
                                                        <Col span={3}/>
                                                        <Col span={12}>
                                                            <div className="driver-info__caption">Адрес регистрации
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row className="kasko-car-select__controls" gutter={20}>
                                                        <Col span={3}/>
                                                        <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                                   placeholder="Индекс"
                                                                   controlName={'driverAddressPostCode'}
                                                                   value={''}/>
                                                    </Row>

                                                    <Row className="kasko-car-select__controls mb_60" gutter={20}>
                                                        <Col span={3}/>

                                                        <FormInput span={18} onChangeCallback={this.formControlCallback}
                                                                   placeholder="Адрес" controlName={'driverAddress'}
                                                                   value={''}/>

                                                    </Row>
                                                </>
                                                : null
                                        }

                                        {this.state.driverLicensePrev ?
                                            <Row className="kasko-car-select__controls" gutter={20}>
                                                <Col span={3}>
                                                    <Input data-inputmask={driverLicenseIDMask}
                                                           className={"w_100p custom_placeholder " + ((this.state.driverPrevLicenseID + '').length ? "" : " _empty")}
                                                           value={this.state.driverPrevLicenseID}
                                                           onChange={this.onDriverPrevLicenseIDChange} defaultValue=""/>
                                                    <div className="float_placeholder">Серия</div>
                                                </Col>
                                                <Col span={3}>
                                                    <Input data-inputmask={driverLicenseNumberMask}
                                                           className={"w_100p custom_placeholder " + ((this.state.driverPrevLicenseNumber + '').length ? "" : " _empty")}
                                                           value={this.state.driverPrevLicenseNumber}
                                                           onChange={this.onDriverLicenseNumberPrevChange}
                                                           defaultValue=""/>
                                                    <div className="float_placeholder">Номер</div>
                                                </Col>
                                                <Col span={6}>
                                                    <Input data-inputmask={dateFormatMask}
                                                           className={"w_100p custom_placeholder " + ((this.state.driverPrevLicenseStart + '').length ? "" : " _empty")}
                                                           value={this.state.driverPrevLicenseStart}
                                                           onChange={this.onDriverPrevLicenseStartChange}
                                                           defaultValue=""/>
                                                    <div className="float_placeholder">Дата выдачи</div>
                                                </Col>
                                            </Row> : null
                                        }

                                        {this.state.driverOSAGOInsurant ?
                                            <>
                                                <Row
                                                    className="kasko-car-select__controls mb_0"
                                                    gutter={20}>
                                                    <Col span={3}/>
                                                    <Col span={12}>
                                                        <div
                                                            className="driver-info__caption">Водительское удостоверение
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <DriverLicense/>
                                            </>
                                            : null
                                        }

                                    </div>
                                }
                            </div>
                        )
                    }) : null
                }
            </div>
        );
    }
}

export default DriverInfo;
