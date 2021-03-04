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
import {formatMoney} from "../../helpers/formatMoney";

const {Option} = Select;

class VehicleAnketa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAnketa: false,
            editMode: false,
            activeFields: [],
            trustedFlat: '',
            trustedWholeName: this.props.disabled ? typeof this.props.wholeName === 'string' ? this.props.wholeName : 'Константинопольский Константин Константинопольский' : '',
            trustedPostCode: '',
            trustedLicenseDepID: '',
            trustedPassport: '',
            trustedPassportStart: '',
            trustedAnotherDocument: '',
            trustedAnotherDocumentStart: '',
            trustedAnotherDocumentDepartment: '',
            trustedPassportDepID: '',
            trustedPassportDateStart: '',
            trustedPassportSeries: '',
            trustedPassportDepartmentCode: '',
            trustedPassportDepartment: '',
            trustedBirthLocation: '',
            trustedAddress: '',
            trustedAddressPostCode: '',
            citizenRF: false,
            nonChangedPassportApproval: false,
            trustedLicensePrev: false,
            trustedProgenyNess: false,
            trustedLastName: '',
            trustedFirstName: '',
            trustedFarthersName: '',
            trustedPhone: '',
            trustedEmail: '',
            trustedLicenseStart: '',
            trustedExperienceStart: '',
            trustedLicenseFirst: '',
            trustedBirthday: '',
            trustedRegistrationStart: '',
            trustedLicenseDepartment: '',
            trustedLicenseID: '',
            trustedLicenseNumber: '',
            trustedPrevLicenseStart: '',
            trustedPrevLicenseID: '',
            trustedPrevLicenseNumber: '',
            trustedChildrenCount: '',
            showExtraOptions: false,
            trustedOSAGOInsurant: false,
            trustedInsuranceAdd: true,
            trustedOSAGOOwner: false,
            trustedCitizenRF: true,
            sameAsRealAddress: true,
            trustedCount: 1,
            trustedFlatType: '',
            trustedSecondDocType: '',
            trustedEmploymentType: '',
            trustedEmploymentTypeList: [
                "Работает / Служит",
                "На пенсии"
            ],
            trustedRelation: '',
            trustedRelationList: [
                "Супруг/Супруга",
                "Отец/Мать",
                "Брат/Сестра"
            ],
            trustedFamilyStatus: '',
            trustedFamilyStatusList: [
                "Женат/Замужем",
                "Холост",
                "В разводе",
                "Вдовец"
            ],
            trustedFlatTypeList: [
                "Дом",
                "Квартира"
            ],
            trustedSecondDocTypeList: [
                "Водительское удостоверение",
                "Военный билет"
            ]
        };
    }

    static propTypes = {
        children: PropTypes.node,
        removeCallback: PropTypes.func,
        fullCalculation: PropTypes.bool,
        disabled: PropTypes.bool,
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

    toggleEditMode = () => {
        this.setState({editMode: !this.state.editMode})
    }

    toggleAnketa = () => {
        this.setState({showAnketa: !this.state.showAnketa})
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
        let {fullCalculation, allFields, date, number, wholeName, status, driver, disabled} = this.props

        return (
            <div className={"docs__frame _car"}>
                <Row className="mb_15" gutter={20}>
                    <Col span={2}/>
                    <Col span={7}>
                        <div className="kasko-car-select__image"><img src={"./cars/Hyundai.png"} alt=""/>
                        </div>
                        <div className="cars__number">
                            <span className="cars__number-letter">{number[0]}</span>
                            <span className="cars__number-digit">{number[1]}</span>
                            <span className="cars__number-letter">{number[2]}</span>
                            <span className="cars__number-region">{number[3]}</span>
                        </div>
                    </Col>

                    <Col span={9}>
                        <div className="kasko-car-select__description">
                            <div className="kasko-car-select__controls mb_10">
                                            <span className="color_black kasko-car-select__controls--toggle">
                                                <span>Hyundai Sonata</span> <span
                                                className="kasko-car-select__controls--equipment">2.0 MPI - 6AT</span>
                                            </span>
                            </div>
                            <div
                                className="kasko-car-select__description--price">2021 г. Новый автомобиль
                            </div>
                            <div
                                className="kasko-car-select__description--price">{formatMoney(1524000)} ₽
                            </div>
                            <ul className="kasko-car-info__status mt_30">
                                <li className={"kasko-car-info__status--item " + status[0]}>Кредит</li>
                                <li className={"kasko-car-info__status--item " + status[1]}>е-ОСАГО</li>
                                <li className={"kasko-car-info__status--item " + status[2]}>е-КАСКО</li>
                            </ul>
                        </div>
                    </Col>

                    <Col span={3}>
                        <div className="text_right">
                            <p className="text1 mt_10">
                                            <span className="color_gray fz_12">Дата покупки<br/>{date}
                                            </span>
                            </p>
                        </div>
                    </Col>

                    <Col span={3}/>
                </Row>

                <div onClick={this.toggleAnketa}
                     className={"docs__frame-expand " + (this.state.showAnketa ? 'expanded' : 'collapsed')}>
                </div>

                {this.state.showAnketa ?
                    <div className={"mt_60"}>
                        <Row className="kasko-car-select__controls mb_0" gutter={20}>
                            <Col span={3}/>
                            <Col span={6}>
                                <div className="driver-info__caption">Личная информация</div>
                            </Col>
                        </Row>

                        <Row className="kasko-car-select__controls" gutter={20}>
                            <Col span={3}/>

                            {wholeName ?
                                <FormInput span={18} onChangeCallback={this.formControlCallback}
                                           placeholder="Фамилия, Имя, Отчество" controlName={'trustedWholeName'}
                                           disabled={this.state.editMode ? null : 'disabled'}
                                           value={this.state.trustedWholeName}/>
                                :
                                <>
                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                               placeholder="Фамилия" controlName={'trustedLastName'}
                                               value={this.state.trustedLastName}/>

                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                               placeholder="Имя" controlName={'trustedFirstName'}
                                               value={this.state.trustedFirstName}/>

                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                               placeholder="Отчество" controlName={'trustedFarthersName'}
                                               value={this.state.trustedFarthersName}/>
                                </>
                            }
                        </Row>

                        <Row className="kasko-car-select__controls mt_60 mb_60 ant-row-center"
                             gutter={20}>

                            <Col className="text_center" span={3}>
                                {this.state.editMode ?
                                    <div className="link_holder">
                                        <div onClick={this.toggleEditMode} className="gl_link">Отмена</div>
                                    </div>
                                    : null}
                            </Col>
                            <Col span={6}>
                                <Button
                                    className={"w_100p " + (this.state.editMode ? "ant-btn-primary" : "btn-action")}
                                    onClick={this.toggleEditMode}
                                >{this.state.editMode ? 'Сохранить' : 'Редактировать'}</Button>
                            </Col>
                            <Col span={3}>

                            </Col>
                        </Row>
                    </div>
                    : null
                }
            </div>
        );
    }
}

export default VehicleAnketa;
