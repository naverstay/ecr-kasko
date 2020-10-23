import React, {Component} from "react";
import Inputmask from "inputmask";
import {Input, Col, Row, Select, Button, DatePicker, Checkbox, Form, Radio} from "antd";
import './style.scss';
import PropTypes from "prop-types";
import moment from 'moment';
import ru from 'moment/locale/ru';
import KaskoOffers from "../kasko-offers";
import {formatMoney} from "../../helpers/formatMoney";
import FormSelect from "../form-select";
import FormInput from "../form-input";

const {Option} = Select;
const {YearPicker} = DatePicker;

moment().locale('ru', ru);

class ServiceCarSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFields: (this.props.step === 1 ? ['carMark'] : []),
            carFound: void 0,
            allowPayment: true,
            showAdditional: false,
            formBusy: false,
            carForTaxi: false,
            carAutoStart: false,
            newCar: true,
            carCredit: false,
            carPrice: 0,
            carPower: 0,
            carPowerRange: '',
            carMileage: 0,
            carRegion: '',
            carMark: '',
            carVIN: '',
            carPTS: '',
            carPTSStart: '',
            carModel: '',
            carMotorSize: '',
            carBodyType: '',
            carMotorType: '',
            carEquipment: '',
            carKaskoDoc: '',
            carKaskoDocStart: '',
            carATS: '',
            carBankName: '',
            carTransmissionType: '',
            carNumber: '',
            carYear: '' + (new Date()).getFullYear(),
            carUsageStart: '',
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
            carBankNameList: [
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
                "1 л.",
                "2 л.",
                "3 л."
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
        allFields: PropTypes.bool,
        innerWidth: PropTypes.number,
        step: PropTypes.number
    };

    formRef = React.createRef();

    formControlCallback = (name, value) => {
        console.log('formControlCallback', name, value);

        if (name in this.state) {
            let obj = {}
            obj[name] = value

            this.setState(obj)
            this.checkReadyState()
        } else {
            console.log('no name in state', name);
        }

        switch (name) {
            case 'carMark':
                this.updateImage(value)
                this.removeActiveField('carMark')
                this.addActiveField('carModel')
                break
            case 'carModel':
                this.removeActiveField('carModel')
                this.addActiveField('carEquipment')
                break
            case 'carEquipment':
                this.removeActiveField('carEquipment')

                if (!this.state.newCar) {
                    this.addActiveField('carYear')
                }
                break
            case 'carYear':
                this.removeActiveField('carYear')
                this.addActiveField('carNumber')
                break
        }
    };

    checkReadyState = () => {
        setTimeout(() => {
            if (this.state.newCar) {
                let allFieldsReady = true
                let checkFields = [
                    //'carATS',
                    'carMark',
                    'carModel',
                    'carEquipment',
                    //'carRegion',
                    //'carPrice',
                    //'carPower',
                    'carYear'
                    //'carUsageStart'
                ]

                for (let i = 0; i < checkFields.length; i++) {
                    const field = checkFields[i];

                    if (!this.state[field]) {
                        allFieldsReady = false
                        break;
                    }
                }

                this.setState({carFound: allFieldsReady, allowPayment: allFieldsReady})
            }
        }, 0)
    };

    removeActiveField = (field) => {
        let fields = this.state.activeFields.slice(0)
        let index = fields.indexOf(field)

        if (index > -1) {
            fields.splice(index, 1);

            this.setState({activeFields: fields})
        }
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

    onCarNumberChange = e => {
        this.setState({carNumber: e.target.value, carFound: void 0})
        this.checkReadyState()
    };

    onFinish = values => {
        this.setState({formBusy: true})

        setTimeout(() => {
            this.setState({formBusy: false, carFound: true})

            this.setState({
                allowPayment: true,
                carATS: 'Noname',
                carMark: 'Hyundai',
                carModel: 'Sonata',
                carEquipment: '2.0 MPI - 6AT',
                carNumber: 'A 123 AA 177',
                carRegion: 'г. Москва',
                carPrice: 1534000,
                carPower: 245,
                carMileage: 24500,
                carYear: '2015',
                carVIN: 'XMCLRDG3A4F044785',
                carPTS: 'ПТС',
                carPTSStart: '20.05.2016',
                carUsageStart: '18.05.2016'
            })
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

    onCarNewChange = e => {
        this.setState({
            newCar: !!e.target.value,
            carNumber: ''
        });
    };

    onCarCreditChange = e => {
        this.setState({
            carCredit: !!e.target.value
        });
    };

    componentDidMount() {
        this.props.allFields && this.setState({showAdditional: true})
    }

    componentDidUpdate() {
        document.querySelectorAll('[data-inputmask]').forEach(function (inp) {
            let mask = {}
            inp.dataset.inputmask.split(',').forEach((m) => {
                let key = m.split(':')[0]
                mask[key] = m.split(':')[1]
            })
            Inputmask(mask).mask(inp);
        })

        document.querySelectorAll('[data-inputmask-date]').forEach(function (inp) {
            Inputmask({
                placeholder: '_',
                showMaskOnHover: false,
                regex: String.raw`^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$`
            }).mask(inp);
        })
    };

    render() {
        const {image, allFields, step, hideOffers, fullCalculation, expanded} = this.props;
        //const dateFormat = "DD.MM.YY"
        let dateFormatMask = "'mask': '99.99.9999', 'showMaskOnHover': 'false'"

        let yearList = []

        for (let y = (new Date()).getFullYear(); y > 1980; y--) {
            yearList.push(y)
        }

        //dateFormatMask = "'regex': '" + String.raw`^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$` + "', 'showMaskOnHover': 'false'"

        //let rx = String.raw`^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$`

        const carNumberMask = "'mask': 'A 999 AA 999'"
        const carVINMask = "'alias': 'vin', 'placeholder': '', 'clearIncomplete': 'false'"

        const carPriceMask = "'alias': 'integer', 'groupSeparator': ' ', 'digitsOptional': true, 'autoGroup': true, 'rightAlign': 'false', 'clearIncomplete': 'true', 'clearMaskOnLostFocus': 'true', 'placeholder': '_'"
        const carPowerMask = "'alias': 'integer', 'groupSeparator': ' ', 'digitsOptional': true, 'autoGroup': true, 'rightAlign': 'false', 'clearMaskOnLostFocus': 'true', 'placeholder': '_'"
        let searchDisabled = !this.state.carNumber.length || this.state.carNumber.indexOf('_') > -1 || this.state.formBusy

        function disabledDate(current) {
            return current && current._isAMomentObject && current.isAfter(new Date());
        }

        const layout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 16
            }
        };

        return (
            <div className="kasko-car-select">
                {expanded ?
                    <>
                        <div className="kasko-car-select__controls radio_v2">
                            <Radio.Group defaultValue={this.state.newCar ? 1 : 0} onChange={this.onCarNewChange}>
                                <Row gutter={20}>
                                    <Col>
                                        <Radio value={1}>Новый</Radio>
                                    </Col>
                                    <Col>
                                        <Radio value={0}>С пробегом</Radio>
                                    </Col>
                                </Row>
                            </Radio.Group>
                        </div>

                        {this.state.newCar ? null :
                            <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                                <Row className="kasko-car-select__controls" gutter={20}>
                                    <Col span={6}>
                                        <Input
                                            data-inputmask={carNumberMask}
                                            className={"w_100p custom_placeholder text_upper" + (this.state.carNumber.length ? "" : " _empty")}
                                            value={this.state.carNumber}
                                            onChange={this.onCarNumberChange} defaultValue=""/>
                                        <div className="float_placeholder">Госномер автомобиля</div>
                                    </Col>
                                    <Col span={6}>
                                        <Button htmlType={searchDisabled ? null : "submit"}
                                                className={"w_100p " + (this.state.carFound !== void 0 ? "btn_grey" :
                                                    this.state.formBusy ? "btn_grey" : "ant-btn-primary")}
                                                disabled={searchDisabled ? 'disabled' : null}>
                                            {this.state.carFound === void 0 ?
                                                this.state.formBusy ?
                                                    <span className={"btn_search"}>Поиск</span> :
                                                    <span className={"btn_text"}>Найти данные ТС</span>
                                                : this.state.carFound ?
                                                    <span className={"btn_text color_green"}>Данные найдены</span> :
                                                    <span className={"btn_text color_red"}>Данные не найдены</span>
                                            }
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        }

                        <Row className="kasko-car-select__controls" gutter={20}>
                            <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                        options={this.state.markList}
                                        className={this.activeClass('carMark')}
                                        placeholder="Марка" controlName={'carMark'}
                                        value={this.state.carMark}/>

                            <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                        options={this.state.modelList}
                                        className={this.activeClass('carModel')}
                                        placeholder="Модель" controlName={'carModel'}
                                        value={this.state.carModel}/>

                            <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                        options={this.state.equipmentList}
                                        className={this.activeClass('carEquipment')}
                                        placeholder="Комплектация" controlName={'carEquipment'}
                                        value={this.state.carEquipment}/>

                            <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                        options={yearList}
                                        className={this.activeClass('carYear')}
                                        disabled={this.state.newCar ? "disabled" : ""}
                                        placeholder="Год выпуска" controlName={'carYear'}
                                        value={this.state.carYear}/>
                        </Row>

                        <Row className="kasko-car-select__controls" gutter={20}>
                            <FormInput span={6} onChangeCallback={this.formControlCallback}
                                       placeholder="VIN"
                                       className={(allFields ? "input-error" : "")}
                                       inputmask={carVINMask}
                                       controlName={'carVIN'} value={''}/>

                            <FormInput span={6} onChangeCallback={this.formControlCallback}
                                       placeholder="ПТС"
                                       className={(allFields ? "input-error" : "")}
                                       controlName={'carPTS'} value={''}/>

                            <FormInput span={6} onChangeCallback={this.formControlCallback}
                                       placeholder="Дата выдачи ПТС"
                                       className={(allFields ? "input-error" : "")}
                                       controlName={'carPTSStart'} value={''}/>
                        </Row>

                        <Row className="kasko-car-select__controls kasko-car-select__controls--price radio_v2 mb_45"
                             gutter={20}>
                            <Col className="kasko-car-select__controls--credit">
                                <Radio.Group
                                    className={"w_100p " + (this.state.showAdditional ? "full_form" : "short_form")}
                                    onChange={this.onCarCreditChange}>
                                    <Row gutter={20}>
                                        <Col>
                                            <Radio disabled={this.state.allowPayment ? null : "disabled"}
                                                   checked={this.state.carCredit ? "checked" : ""} value={1}>В
                                                кредит</Radio>
                                        </Col>
                                        <Col>
                                            <Radio disabled={this.state.allowPayment ? null : "disabled"}
                                                   checked={!this.state.carCredit ? "checked" : ""} value={0}>За
                                                наличные</Radio>
                                        </Col>
                                    </Row>
                                </Radio.Group>
                            </Col>

                            {
                                this.state.carCredit ?
                                    <FormSelect cellClass="align-start" span={6}
                                                onChangeCallback={this.formControlCallback}
                                                options={this.state.carBankNameList}
                                                placeholder="Банк" controlName={'carBankName'}
                                                value={this.state.carBankName}/>
                                    : null
                            }
                        </Row>
                    </>
                    : null
                }
            </div>
        );
    }
}

export default ServiceCarSelect;
