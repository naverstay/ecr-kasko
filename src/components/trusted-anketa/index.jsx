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

class TrustedAnketa extends Component {
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
        let {fullCalculation, allFields, expanded, osago, wholeName, showAddBlock, index, disabled} = this.props

        return (
            <div className="driver-info">
                <div className="driver-info__item">
                    <Row className="kasko-car-select__controls mb_0" gutter={20}>
                        <Col span={3}/>
                        <Col span={18}>
                            <div onClick={this.toggleAnketa}
                                 className={"trusted-anketa__title " + (this.state.showAnketa ? 'expanded' : 'collapsed')}>{wholeName || ''}</div>
                        </Col>
                    </Row>

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

                            <Row className="kasko-car-select__controls" gutter={20}>
                                <Col span={3}/>
                                <FormInput span={6} onChangeCallback={this.formControlCallback}
                                           disabled={this.state.editMode ? null : 'disabled'}
                                           placeholder="Дата рождения" controlName={'trustedBirthday'}
                                           value={disabled ? '12.12.1912' : ''}/>
                                <FormInput span={6} onChangeCallback={this.formControlCallback}
                                           disabled={this.state.editMode ? null : 'disabled'}
                                           placeholder="Мобильный телефон"
                                           controlName={'trustedPhone'} value={this.state.trustedPhone}/>

                                <Col span={3}/>
                            </Row>

                            <Row className="kasko-car-select__controls mb_60" gutter={20}>
                                <Col span={3}/>

                                <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                            disabled={this.state.editMode ? null : 'disabled'}
                                            options={this.state.trustedRelationList}
                                            placeholder="Отношение к клиенту"
                                            controlName={'trustedRelation'}
                                            value={this.state.trustedRelation}/>

                                <FormSelect span={12} onChangeCallback={this.formControlCallback}
                                            disabled={this.state.editMode ? null : 'disabled'}
                                            options={this.state.trustedEmploymentTypeList}
                                            placeholder="Тип занятости"
                                            controlName={'trustedEmploymentType'}
                                            value={this.state.trustedEmploymentType}/>
                            </Row>


                            <Row className="kasko-car-select__controls mb_0" gutter={20}>
                                <Col span={3}/>
                                <Col span={18}>
                                    <div className="driver-info__caption">Паспорт</div>
                                </Col>
                                {/*<FormCheckbox span={6} onChangeCallback={this.formControlCallback}*/}
                                {/*              text="Гражданин РФ"*/}
                                {/*              value={1}*/}
                                {/*              className="check_v6"*/}
                                {/*              controlName={'citizenRF'}*/}
                                {/*              checked={this.state.citizenRF}/>*/}
                            </Row>

                            <Row className="kasko-car-select__controls" gutter={20}>
                                <Col span={3}/>
                                <FormInput span={6} onChangeCallback={this.formControlCallback}
                                           placeholder={"Серия, номер"}
                                           disabled={this.state.editMode ? null : 'disabled'}
                                           controlName={'trustedPassportSeries'}
                                           value={this.state.trustedPassportSeries}/>

                                <FormInput span={6} onChangeCallback={this.formControlCallback}
                                           placeholder={"Дата выдачи"}
                                           disabled={this.state.editMode ? null : 'disabled'}
                                           controlName={'trustedPassportDateStart'}
                                           value={this.state.trustedPassportDateStart}/>

                                <FormInput span={6} onChangeCallback={this.formControlCallback}
                                           placeholder={"Код подразделения"}
                                           disabled={this.state.editMode ? null : 'disabled'}
                                           controlName={'trustedPassportDepartmentCode'}
                                           value={this.state.trustedPassportDepartmentCode}/>
                            </Row>

                            <Row className="kasko-car-select__controls mb_60" gutter={20}>
                                <Col span={3}/>
                                <FormInput span={18} onChangeCallback={this.formControlCallback}
                                           placeholder={"Кем выдан"}
                                           disabled={this.state.editMode ? null : 'disabled'}
                                           controlName={'trustedPassportDepartment'}
                                           value={this.state.trustedPassportDepartment}/>
                            </Row>

                            <Row className="kasko-car-select__controls mb_0" gutter={20}>
                                <Col span={3}/>
                                <Col span={12}>
                                    <div className="driver-info__caption">Адрес регистрации
                                    </div>
                                </Col>
                            </Row>

                            <Row className="kasko-car-select__controls mb_60" gutter={20}>
                                <Col span={3}/>
                                <FormInput span={18} onChangeCallback={this.formControlCallback}
                                           disabled={this.state.editMode ? null : 'disabled'}
                                           placeholder="Адрес"
                                           controlName={'trustedAddress'}
                                           value={this.state.trustedAddress}/>
                            </Row>

                            <Row className="kasko-car-select__controls mb_0" gutter={20}>
                                <Col span={3}/>
                                <Col span={12}>
                                    <div className="driver-info__caption">Водительское удостоверение</div>
                                </Col>
                            </Row>

                            <DriverLicense disabled={!this.state.editMode}/>

                            <Row className="mb_60 mt_60" gutter={20}>
                                <Col span={3}/>

                                <Col span={6}>
                                    <div className="docs__frame-load _completed">
                                        <span>Паспорт</span>
                                    </div>
                                </Col>

                                <Col span={6}>
                                    <label className="docs__frame-load">
                                        <input className={'hide'} type="file"/>
                                        <span>Загрузить документ</span>
                                    </label>
                                </Col>

                                <Col span={3}/>
                            </Row>

                            <Row className="kasko-car-select__controls mt_15 mb_60 ant-row-center"
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
            </div>
        );
    }
}

export default TrustedAnketa;
