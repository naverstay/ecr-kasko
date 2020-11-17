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
import ReactComment from "../../helpers/reactComment";

const {Option} = Select;
const {YearPicker} = DatePicker;

moment().locale('ru', ru);

class KaskoCarSelectNew extends Component {
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
            carDiagnosticCardDuration: '',
            carDiagnosticCard: '',
            carRegion: '',
            carMark: '',
            carVIN: '',
            carSTS: '',
            carSTSStart: '',
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
            carUsageLocation: '',
            carNumber: '',
            carYear: '',
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

    onCarKaskoDocStartChange = e => {
        this.setState({carKaskoDocStart: e.target.value})
    };

    onCarForTaxiChange = e => {
        this.setState({carForTaxi: e.target.checked})
    };

    onAutoStartChange = e => {
        this.setState({carAutoStart: e.target.checked})
    };

    onFinish = values => {
        this.setState({formBusy: true})

        setTimeout(() => {
            this.setState({formBusy: false, carFound: true})

            if (this.state.carFound) {
                this.setState({
                    allowPayment: true,
                    carATS: 'Noname',
                    carMark: 'Hyundai',
                    carModel: 'Sonata',
                    carEquipment: '2.0 MPI - 6AT',
                    carNumber: 'A 123 AA 177',
                    carRegion: 'г. Москва',
                    carDiagnosticCard: 'qwerty123',
                    carDiagnosticCardDuration: '18.05.2021',
                    carPrice: 1534000,
                    carPower: 245,
                    carMileage: 24500,
                    carYear: '2015',
                    carUsageStart: '18.05.2020'
                })
            }
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
                <ReactComment text='"ecr-kasko/src/components/kasko-car-select-new/index.jsx"'/>

                {expanded ?
                    <>
                        <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                            <Row className="kasko-car-select__controls radio_v2" gutter={20}>
                                <Col span={3}/>
                                <Col className={'kasko-car-select__controls--newcar'}>
                                    <Radio.Group defaultValue={this.state.newCar ? 1 : 0}
                                                 onChange={this.onCarNewChange}>
                                        <Row gutter={20}>
                                            <Col>
                                                <Radio value={1}>Новый</Radio>
                                            </Col>
                                            <Col>
                                                <Radio value={0}>С пробегом</Radio>
                                            </Col>
                                        </Row>
                                    </Radio.Group>
                                </Col>

                                {this.state.newCar ? null :
                                    <>
                                        <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                   placeholder="Госномер автомобиля"
                                                   inputmask={carNumberMask}
                                                   controlName={'carNumber'} value={''}/>

                                        <Col span={6}>
                                            <Button htmlType={searchDisabled ? null : "submit"}
                                                    className={"w_100p " + (this.state.carFound !== void 0 ? "btn_grey" : this.state.formBusy ? "btn_grey" : "ant-btn-primary")}
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
                                    </>
                                }
                            </Row>
                        </Form>

                        <Row className="kasko-car-select__controls" gutter={20}>
                            <Col span={3}/>

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
                        </Row>

                        <Row className="kasko-car-select__controls" gutter={20}>
                            <Col span={3}/>
                            <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                        options={yearList}
                                        className={this.activeClass('carYear')}
                                        disabled={this.state.newCar ? "disabled" : ""}
                                        placeholder="Год выпуска" controlName={'carYear'}
                                        value={this.state.carYear}/>
                            <FormInput span={6} onChangeCallback={this.formControlCallback}
                                       placeholder="Мощность"
                                       inputmask={carPowerMask}
                                       controlName={'carPower'} value={''}/>
                            <FormInput span={6} onChangeCallback={this.formControlCallback}
                                       placeholder="VIN"
                                       className={(allFields ? "input-error" : "")}
                                       inputmask={carVINMask}
                                       controlName={'carVIN'} value={''}/>
                        </Row>

                        {this.state.newCar ?
                            <Row className="kasko-car-select__controls" gutter={20}>
                                <Col span={3}/>
                                <FormInput span={6} onChangeCallback={this.formControlCallback}
                                           placeholder="Серия, номер ПТС"
                                           className={(allFields ? "input-error" : "")}
                                           controlName={'carPTS'} value={''}/>

                                <FormInput span={6} onChangeCallback={this.formControlCallback}
                                           placeholder="Дата выдачи ПТС"
                                           className={(allFields ? "input-error" : "")}
                                           controlName={'carPTSStart'} value={''}/>
                            </Row>
                            :
                            <Row className="kasko-car-select__controls" gutter={20}>
                                <Col span={3}/>
                                <FormInput span={6} onChangeCallback={this.formControlCallback}
                                           placeholder="Серия, номер СТС"
                                           className={(allFields ? "input-error" : "")}
                                           controlName={'carSTS'} value={''}/>

                                <FormInput span={6} onChangeCallback={this.formControlCallback}
                                           placeholder="Дата выдачи СТС"
                                           className={(allFields ? "input-error" : "")}
                                           controlName={'carSTSStart'} value={''}/>
                            </Row>
                        }

                        <Row className="kasko-car-select__controls" gutter={20}>
                            <Col span={3}/>
                            <FormInput span={6} onChangeCallback={this.formControlCallback}
                                       placeholder="Диагностическая карта"
                                       inputmask={carNumberMask}
                                       controlName={'carDiagnosticCard'} value={''}/>

                            <FormInput span={6} onChangeCallback={this.formControlCallback}
                                       placeholder={"Срок действия"}
                                       inputmask={dateFormatMask}
                                       controlName={'carDiagnosticCardDuration'} value={''}/>
                        </Row>

                        <Row className="kasko-car-select__controls" gutter={20}>
                            <Col span={3}/>

                            <FormInput span={12} onChangeCallback={this.formControlCallback}
                                       placeholder={"Город использования автомобиля"}
                                       controlName={'carUsageLocation'} value={''}/>
                        </Row>

                        {/*<Row className="kasko-car-select__controls" gutter={20}>*/}
                        {/*	<Col span={3}/>*/}
                        {/*	<FormInput span={6} onChangeCallback={this.formControlCallback}*/}
                        {/*			   placeholder="Регион эксплуатации"*/}
                        {/*			   inputmask={carNumberMask}*/}
                        {/*			   controlName={'carRegion'} value={''}/>*/}

                        {/*	<FormInput span={6} onChangeCallback={this.formControlCallback}*/}
                        {/*			   placeholder={"Дата начала \n эксплуатации"}*/}
                        {/*			   inputmask={dateFormatMask}*/}
                        {/*			   controlName={'carUsageStart'} value={''}/>*/}

                        {/*	<FormSelect span={6} onChangeCallback={this.formControlCallback}*/}
                        {/*				options={this.state.carPowerList}*/}
                        {/*				placeholder="Мощность двигателя" controlName={'carPowerRange'}*/}
                        {/*				value={this.state.carYear}/>*/}
                        {/*</Row>*/}

                        {/*<Row className="kasko-car-select__controls" gutter={20}>*/}
                        {/*	<FormInput span={6} onChangeCallback={this.formControlCallback}*/}
                        {/*			   placeholder="Пробег, км"*/}
                        {/*			   inputmask={carPowerMask}*/}
                        {/*			   controlName={'carMileage'} value={''}/>*/}

                        {/*	<FormInput span={6} onChangeCallback={this.formControlCallback}*/}
                        {/*			   placeholder="Стоимость, ₽"*/}
                        {/*			   inputmask={carPriceMask}*/}
                        {/*			   controlName={'carPrice'} value={''}/>*/}
                        {/*	*/}
                        {/*	<Col className="checkbox_middle check_v3">*/}
                        {/*		<Row gutter={20}>*/}
                        {/*			<Col>*/}
                        {/*				<Checkbox checked={this.state.carForTaxi ? "checked" : null}*/}
                        {/*						  onChange={this.onCarForTaxiChange}>Такси</Checkbox>*/}
                        {/*			</Col>*/}

                        {/*			{*/}
                        {/*				fullCalculation ?*/}
                        {/*					<Col>*/}
                        {/*						<Checkbox className={allFields ? "wrapper-error" : ""} checked={this.state.carAutoStart ? "checked" : null}*/}
                        {/*								  onChange={this.onAutoStartChange}>Автозапуск</Checkbox>*/}
                        {/*					</Col>*/}
                        {/*					: null*/}
                        {/*			}*/}
                        {/*		</Row>*/}
                        {/*	</Col>*/}
                        {/*</Row>*/}

                        {fullCalculation ?
                            <>
                                <Row className="kasko-car-select__controls" gutter={20}>
                                    <Col span={3}/>
                                    <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                                options={this.state.carMotorTypeList}
                                                placeholder="Тип двигателя" controlName={'carMotorType'}
                                                value={this.state.carMotorType}/>

                                    <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                                options={this.state.carBodyTypeList}
                                                placeholder="Тип кузова" controlName={'carBodyType'}
                                                value={this.state.carBodyType}/>

                                    <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                                options={this.state.carTransmissionTypeList}
                                                placeholder="Тип КПП" controlName={'carTransmissionType'}
                                                value={this.state.carTransmissionType}/>
                                </Row>

                                <Row className="kasko-car-select__controls" gutter={20}>
                                    <Col span={3}/>

                                    <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                                options={this.state.carMotorSizeList}
                                                placeholder="Объем двигателя" controlName={'carMotorSize'}
                                                value={this.state.carMotorSize}/>

                                    <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                                options={this.state.carATSList}
                                                className={(allFields ? "wrapper-error" : "")}
                                                placeholder="Противоугонная система" controlName={'carATS'}
                                                value={this.state.carATS}/>
                                </Row>
                            </>
                            : null
                        }

                        {/*<Row className="kasko-car-select__controls kasko-car-select__controls--price radio_v2 mb_45"*/}
                        {/*     gutter={20}>*/}
                        {/*    <Col span={3}/>*/}
                        {/*    <Col className="kasko-car-select__controls--credit">*/}
                        {/*        <Radio.Group*/}
                        {/*            className={"w_100p " + (this.state.showAdditional ? "full_form" : "short_form")}*/}
                        {/*            onChange={this.onCarCreditChange}>*/}
                        {/*            <Row gutter={20}>*/}
                        {/*                <Col>*/}
                        {/*                    <Radio disabled={this.state.allowPayment ? null : "disabled"}*/}
                        {/*                           checked={this.state.carCredit ? "checked" : ""} value={1}>В*/}
                        {/*                        кредит</Radio>*/}
                        {/*                </Col>*/}
                        {/*                <Col>*/}
                        {/*                    <Radio disabled={this.state.allowPayment ? null : "disabled"}*/}
                        {/*                           checked={!this.state.carCredit ? "checked" : ""} value={0}>За*/}
                        {/*                        наличные</Radio>*/}
                        {/*                </Col>*/}
                        {/*            </Row>*/}
                        {/*        </Radio.Group>*/}
                        {/*    </Col>*/}

                        {/*    {this.state.carCredit ?*/}
                        {/*        <FormSelect span={6} onChangeCallback={this.formControlCallback}*/}
                        {/*                    options={this.state.carBankNameList}*/}
                        {/*                    placeholder="Банк" controlName={'carBankName'}*/}
                        {/*                    value={this.state.carBankName}/>*/}
                        {/*        : null*/}
                        {/*    }*/}
                        {/*</Row>*/}
                    </>
                    : null
                }

                {fullCalculation ?
                    <Row className="kasko-car-select__controls mb_55" gutter={20}>
                        <Col span={3}/>

                        <FormInput span={6} onChangeCallback={this.formControlCallback}
                                   placeholder={"Номер действующего \n полиса КАСКО"}
                                   controlName={'carKaskoDoc'} value={(this.state.carKaskoDoc)}/>

                        <FormInput span={6} onChangeCallback={this.formControlCallback}
                                   inputmask={dateFormatMask}
                                   placeholder={"Дата начала действия \n нового полиса КАСКО"}
                                   controlName={'carKaskoDocStart'} value={(this.state.carKaskoDocStart)}/>

                    </Row>
                    : null
                }
                {/*{*/}
                {/*	allFields ?*/}
                {/*	""*/}
                {/*	: */}
                {/*	<div className={"kasko-car-select__image" + (step === 1 && !this.state.allowPayment ? " _inactive" : "")}>*/}
                {/*		<img src={image || 'car-1-s.png'} alt=""/>*/}
                {/*	</div>*/}
                {/*}*/}

                {(!this.state.formBusy && this.state.carFound && !hideOffers) ?
                    <KaskoOffers offersList={[
                        {
                            name: 'Кредит',
                            price: 12400,
                            prefix: 'от',
                            suffix: '₽/мес'
                        },
                        {
                            name: 'ОСАГО',
                            price: 10410,
                            prefix: 'от',
                            suffix: '₽'
                        },
                        {
                            name: 'КАСКО',
                            price: 10420,
                            prefix: 'от',
                            suffix: '₽'
                        },
                        {
                            name: 'GAP',
                            price: 10430,
                            prefix: 'от',
                            suffix: '₽'
                        }
                    ]}/>
                    : null}

            </div>
        );
    }
}

export default KaskoCarSelectNew;
