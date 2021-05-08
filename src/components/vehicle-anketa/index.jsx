import React, {Component} from "react";
import {Input, Col, Row, Select, Checkbox, Button, Radio, Form} from "antd";
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
            carTaxi: false,
            carAutoStart: false,
            trailerUsage: false,
            activeFields: [],
            carYear: '2021',
            carVIN: 'XMCLRDG3A4F044785',
            carPTS: '24 ТХ 205766 ',
            carSTS: '24 ТХ 205766 ',
            carPTSStart: '12.12.2012',
            carSTSStart: '12.12.2012',
            carDiagnosticCard: '',
            carDiagnosticCardStart: '',
            carDiagnosticCardEnd: '',
            carDiagnosticCardDuration: '',
            carBodyType: '',
            carMotorType: '',
            carKaskoDoc: '',
            carKaskoDocStart: '',
            carBankName: 'Совкомбанк',
            carTransmissionType: '',
            carMotorSize: '2,0',
            newCar: false,
            carPrice: '1 524 000 ₽',
            carPower: '200',
            carMileage: '100 000',
            carRegion: 'г. Москва',
            carMark: 'Hyundai',
            carModel: 'Sonata',
            carEquipment: '2.0 MPI - 6AT',
            carATS: 'Noname',
            carNumber: 'A 123 AA 177',
            carUsageStart: '18.05.2015',
            markList: [
                "Hyundai",
                "Mazda"
                //"Mercedes-Benz"
            ],
            modelList: [
                "Sonata",
                "Solaris",
                "CX-5",
                "CX-9"
            ],
            equipmentList: [
                "2.0 MPI - 6AT",
                "Comfort",
                "Sport",
                "Executive",
                "GT S Sports Car"
            ],
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
            carCredit: false,
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
            ],
            carBankNameList: [
                "Совкомбанк",
                "Банк 1",
                "Банк 2"
            ],
            carATSList: [
                "Sheriff",
                "Mangoose",
                "Noname"
            ],
            carPowerList: [
                "100 л.с.",
                "200 л.с.",
                "300 л.с."
            ],
            carTransmissionTypeList: [
                "МКПП",
                "АКПП"
            ],
            carMotorSizeList: [
                "1,0",
                "2,0",
                "3,0"
            ],
            carBodyTypeList: [
                "Седан",
                "Универсал",
                "Ландо",
                "Купе"
            ],
            carMotorTypeList: [
                "Бензин",
                "Дизель",
                "Эко",
                "Гибрид"
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

    onCarCreditChange = e => {
        this.setState({
            carCredit: !!e.target.value
        });
    };

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

    onCarNewChange = e => {
        this.setState({
            newCar: !!e.target.value,
            carYear: '' + (new Date()).getFullYear(),
            carNumber: ''
        });
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
        const carPowerMask = "'alias': 'integer', 'groupSeparator': ' ', 'digitsOptional': true, 'autoGroup': true, 'rightAlign': 'false', 'clearMaskOnLostFocus': 'true', 'placeholder': ''"
        const carNumberMask = "'mask': 'A 999 AA 999'"
        const carPriceMask = "'alias': 'integer', 'groupSeparator': ' ', 'digitsOptional': true, 'autoGroup': true, 'rightAlign': 'false', 'clearIncomplete': 'true', 'clearMaskOnLostFocus': 'true', 'placeholder': ''"
        const dateFormatMask = "'mask': '99.99.9999', 'showMaskOnHover': 'false'";
        const carVINMask = "'alias': 'vin', 'placeholder': '', 'clearIncomplete': 'false'"

        let yearList = []

        for (let y = (new Date()).getFullYear(); y > 1980; y--) {
            yearList.push(y)
        }

        return (
            <div className={"docs__frame _car"}>
                <Row className="mb_15" gutter={20}>
                    <Col span={2}/>
                    <Col span={7}>
                        <div className="kasko-car-select__image"><img src={"./cars/Hyundai.png"} alt=""/>
                        </div>
                        <div className={"cars__number" + (number[1] === '000' ? ' _disabled' : '')}>
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
                        <Row className="mb_60" gutter={20}>
                            <Col span={3}/>

                            <Col span={6}>
                                <div className="docs__frame-load _completed">
                                    <span>ПТС</span>
                                </div>
                            </Col>

                            <Col span={6}>
                                <div className="docs__frame-load _completed">
                                    <span>СТС</span>
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

                        <Row className="kasko-car-select__controls mb_60 w_100p" gutter={20}>
                            <Col span={3}/>
                            <Col span={6}>
                                <Row className="kasko-car-select__controls mb_60 radio_v2" gutter={20}>
                                    <Col className={'mb_0'}>
                                        <Radio.Group defaultValue={1} className={"mt_10 mb_10"}
                                                     onChange={this.onCarNewChange}>
                                            <Radio disabled={this.state.editMode ? null : 'disabled'}
                                                   value={1}>Новый</Radio>
                                        </Radio.Group>
                                    </Col>
                                    <Col className={'mb_0'}>
                                        <Radio.Group defaultValue={1} className={"mt_10 mb_10"}
                                                     onChange={this.onCarCreditChange}>
                                            <Radio disabled={this.state.editMode ? null : 'disabled'} value={1}
                                            >В кредит</Radio>
                                        </Radio.Group>
                                    </Col>
                                </Row>
                            </Col>

                            <FormSelect cellClass="align-start" span={6}
                                        onChangeCallback={this.formControlCallback}
                                        options={this.state.carBankNameList}
                                        disabled={this.state.editMode ? null : 'disabled'}
                                        placeholder="Банк" controlName={'carBankName'}
                                        value={this.state.carBankName}/>
                        </Row>


                        {this.state.editMode ?
                            <Row className="kasko-car-select__controls mb_60" gutter={20}>
                                <Col span={3}/>

                                <FormCheckbox onChangeCallback={this.formControlCallback}
                                              text="Такси"
                                              className="checkbox_middle check_v3"
                                              value={0}
                                              controlName={'carTaxi'}
                                              disabled={this.state.editMode ? null : 'disabled'}
                                              checked={this.state.carTaxi}/>

                                <FormCheckbox onChangeCallback={this.formControlCallback}
                                              text="Автозапуск"
                                              className="checkbox_middle check_v3"
                                              value={0}
                                              controlName={'carAutoStart'}
                                              disabled={this.state.editMode ? null : 'disabled'}
                                              checked={this.state.carAutoStart}/>

                                <FormCheckbox onChangeCallback={this.formControlCallback}
                                              text="Используется прицеп"
                                              className="checkbox_middle check_v3"
                                              value={0}
                                              controlName={'trailerUsage'}
                                              disabled={this.state.editMode ? null : 'disabled'}
                                              checked={this.state.trailerUsage}/>
                            </Row>
                            : null
                        }

                        <Row className="kasko-car-select__controls" gutter={20}>
                            <Col span={3}/>

                            <FormInput span={6} onChangeCallback={this.formControlCallback}
                                       placeholder="Госномер автомобиля"
                                       disabled={this.state.editMode ? null : 'disabled'}
                                       inputmask={carNumberMask}
                                       controlName={'carNumber'} value={this.state.carNumber}/>

                        </Row>

                        <Row className="kasko-car-select__controls" gutter={20}>
                            <Col span={3}/>

                            <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                        options={this.state.markList}
                                        className={this.activeClass('carMark')}
                                        placeholder="Марка" controlName={'carMark'}
                                        disabled={this.state.editMode ? null : 'disabled'}
                                        value={this.state.carMark}/>

                            <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                        options={this.state.modelList}
                                        className={this.activeClass('carModel')}
                                        placeholder="Модель" controlName={'carModel'}
                                        disabled={this.state.editMode ? null : 'disabled'}
                                        value={this.state.carModel}/>

                            <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                        options={this.state.equipmentList}
                                        className={this.activeClass('carEquipment')}
                                        placeholder="Комплектация" controlName={'carEquipment'}
                                        disabled={this.state.editMode ? null : 'disabled'}
                                        value={this.state.carEquipment}/>
                        </Row>

                        <Row className="kasko-car-select__controls mb_60" gutter={20}>
                            <Col span={3}/>

                            <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                        options={yearList}
                                        className={this.activeClass('carYear')}
                                        disabled={this.state.editMode ? null : 'disabled'}
                                        placeholder="Год выпуска" controlName={'carYear'}
                                        value={this.state.carYear}/>

                            <FormInput span={6} onChangeCallback={this.formControlCallback}
                                       placeholder="Стоимость, ₽"
                                       disabled={this.state.editMode ? null : 'disabled'}
                                       inputmask={carPowerMask}
                                       controlName={'carPrice'}
                                       value={this.state.carPrice}/>

                            <FormInput span={6} onChangeCallback={this.formControlCallback}
                                       placeholder="Пробег, км"
                                       disabled={this.state.editMode ? null : 'disabled'}
                                       inputmask={carPowerMask}
                                       controlName={'carMileage'} value={this.state.carMileage}/>
                        </Row>

                        <Row className="kasko-car-select__controls mb_0" gutter={20}>
                            <Col span={3}/>
                            <Col span={6}>
                                <div className="driver-info__caption">Параметры автомобиля</div>
                            </Col>
                        </Row>

                        <Row className="kasko-car-select__controls" gutter={20}>
                            <Col span={3}/>
                            <FormInput span={6}
                                       onChangeCallback={this.formControlCallback}
                                       placeholder="VIN"
                                       disabled={this.state.editMode ? null : 'disabled'}
                                       className={(allFields ? "input-error" : "")}
                                       inputmask={carVINMask}
                                       controlName={'carVIN'}
                                       value={this.state.carVIN}/>

                            <FormInput span={6}
                                       onChangeCallback={this.formControlCallback}
                                       placeholder="Мощность"
                                       disabled={this.state.editMode ? null : 'disabled'}
                                       inputmask={carPowerMask}
                                       controlName={'carPower'}
                                       value={this.state.carPower}/>

                            <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                        options={this.state.carMotorSizeList}
                                        disabled={this.state.editMode ? null : 'disabled'}
                                        placeholder="Объем двигателя" controlName={'carMotorSize'}
                                        value={this.state.carMotorSize}/>
                        </Row>

                        <Row className="kasko-car-select__controls mb_60" gutter={20}>
                            <Col span={3}/>
                            <FormInput span={6}
                                       onChangeCallback={this.formControlCallback}
                                       placeholder="Дата начала эксплуатации"
                                       disabled={this.state.editMode ? null : 'disabled'}
                                       className={(allFields ? "input-error" : "")}
                                       inputmask={carVINMask}
                                       controlName={'carUsageStart'}
                                       value={this.state.carUsageStart}/>

                            <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                        options={this.state.carATSList}
                                        className={(allFields ? "wrapper-error" : "")}
                                        placeholder="Противоугонная система"
                                        disabled={this.state.editMode ? null : 'disabled'}
                                        controlName={'carATS'}
                                        value={this.state.carATS}/>
                        </Row>

                        <Row className="kasko-car-select__controls mb_0" gutter={20}>
                            <Col span={3}/>
                            <Col span={18}>
                                <div className="driver-info__caption">Документы на автомобиль</div>
                            </Col>
                        </Row>

                        <Row className="kasko-car-select__controls" gutter={20}>
                            <Col span={3}/>
                            <FormInput span={6}
                                       onChangeCallback={this.formControlCallback}
                                       placeholder="Серия, номер ПТС"
                                       disabled={this.state.editMode ? null : 'disabled'}
                                       className={(allFields ? "input-error" : "")}
                                       controlName={'carPTS'}
                                       value={this.state.carPTS}/>

                            <FormInput span={6}
                                       onChangeCallback={this.formControlCallback}
                                       placeholder="Дата выдачи ПТС"
                                       disabled={this.state.editMode ? null : 'disabled'}
                                       className={(allFields ? "input-error" : "")}
                                       controlName={'carPTSStart'}
                                       value={this.state.carPTSStart}/>
                        </Row>

                        <Row className="kasko-car-select__controls" gutter={20}>
                            <Col span={3}/>
                            <FormInput span={6}
                                       onChangeCallback={this.formControlCallback}
                                       placeholder="Серия, номер СТС"
                                       disabled={this.state.editMode ? null : 'disabled'}
                                       className={(allFields ? "input-error" : "")}
                                       controlName={'carSTS'}
                                       value={this.state.carSTS}/>

                            <FormInput span={6}
                                       onChangeCallback={this.formControlCallback}
                                       placeholder="Дата выдачи СТС"
                                       disabled={this.state.editMode ? null : 'disabled'}
                                       className={(allFields ? "input-error" : "")}
                                       controlName={'carSTSStart'}
                                       value={this.state.carSTSStart}/>
                        </Row>

                        {this.state.newCar === false ?
                            <Row className="kasko-car-select__controls" gutter={20}>
                                <Col span={3}/>
                                <FormInput span={6}
                                           onChangeCallback={this.formControlCallback}
                                           placeholder="Диагностическая карта"
                                           disabled={this.state.editMode ? null : 'disabled'}
                                           controlName={'carDiagnosticCard'}
                                           value={this.state.carDiagnosticCard}/>

                                {/*<FormInput span={6}*/}
                                {/*           onChangeCallback={this.formControlCallback}*/}
                                {/*           placeholder={"Дата выдачи"}*/}
                                {/*           disabled={this.state.editMode ? null : 'disabled'}*/}
                                {/*           inputmask={dateFormatMask}*/}
                                {/*           controlName={'carDiagnosticCardStart'}*/}
                                {/*           value={this.state.carDiagnosticCardStart}/>*/}

                                <FormInput span={6}
                                           onChangeCallback={this.formControlCallback}
                                           placeholder={"Срок действия"}
                                           disabled={this.state.editMode ? null : 'disabled'}
                                           controlName={'carDiagnosticCardDuration'}
                                           value={this.state.carDiagnosticCardDuration}/>
                            </Row>
                            :
                            null
                        }

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
