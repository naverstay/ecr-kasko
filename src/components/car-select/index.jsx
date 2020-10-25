import React, {Component} from "react";
import Inputmask from "inputmask";
import {Input, Col, Row, Select, Button, Checkbox, Form, Radio} from "antd";
import './style.scss';
import PropTypes from "prop-types";
import moment from 'moment';
import ru from 'moment/locale/ru';
import KaskoOffers from "../kasko-offers";
import {formatMoney} from "../../helpers/formatMoney";
import FormInput from "../form-input";
import FormSelect from "../form-select";
import searchTree from "../../helpers/searchTree";
import ReactComment from "../../helpers/reactComment";
import FormCheckbox from "../form-checkbox";

const {Option} = Select;
//const {YearPicker} = DatePicker;

moment().locale('ru', ru);

class CarSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFields: (this.props.step === 1 ? ['carMark'] : []),
            carFound: void 0,
            reopen: false,
            showAdditional: false,
            formBusy: false,
            carAutoStart: false,
            carCredit: false,
            carPriceEdit: false,
            showCarOptions: this.props.showCarOptions || false,
            newCar: this.props.fill ? true : null,
            newCarHighlight: false,
            allowPayment: this.props.fill,
            carPrice: this.props.fill ? 1534000 : 0,
            carPower: this.props.fill ? 245 : 0,
            carMileage: this.props.fill ? 245000 : 0,
            carRegion: this.props.fill ? 'г. Москва' : '',
            carMark: this.props.fill ? 'Hyundai' : '',
            carModel: this.props.fill ? 'Sonata' : '',
            carEquipment: this.props.fill ? '2.0 MPI - 6AT' : '',
            carATS: this.props.fill ? 'Noname' : '',
            carNumber: this.props.fill ? 'A 123 AA 177' : '',
            carUsageStart: this.props.fill ? '18.05.2015' : '',
            carTaxi: false,
            carVIN: '',
            carPTS: '',
            carPTSStart: '',
            carSTS: '',
            carSTSStart: '',
            carDiagnosticCard: '',
            carDiagnosticCardEnd: '',
            carMotorSize: '',
            carBodyType: '',
            carMotorType: '',
            carKaskoDoc: '',
            carKaskoDocStart: '',
            carBankName: '',
            carTransmissionType: '',
            engineCapacity: '',
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

        this.state['carYear'] = this.props.fill ? '2015' : this.state.newCar ? '' + (new Date()).getFullYear() : ''

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    static propTypes = {
        children: PropTypes.node,
        allFields: PropTypes.bool,
        innerWidth: PropTypes.number,
        imageCallback: PropTypes.func,
        step: PropTypes.number
    };

    formRef = React.createRef();

    toggleCarOptions = () => {
        this.setState({showCarOptions: !this.state.showCarOptions, reopen: true})
    }

    formControlCallback = (name, value) => {
        if (name in this.state) {
            let obj = {}
            obj[name] = value

            if (name === 'carPrice') {
                obj[name] = parseInt((value + '').replace(/\D/g, ''))
            }

            this.setState(obj)
            !this.state.carPriceEdit && this.checkReadyState()

        } else {
            console.log('no ', name, ' in state', value);
        }

        switch (name) {
            case 'carNumber':
                this.setState({carFound: void 0})
                break
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

                this.setState({
                    carFound: allFieldsReady,
                    allowPayment: allFieldsReady,
                    carPrice: (allFieldsReady ? 1534000 : 0)
                })

                setTimeout(() => {
                    if (allFieldsReady) this.updateImage(this.state.carMark)
                }, 0)
            }
        }, 0)
    };

    toggleAdditionalFields = e => {
        this.setState({showAdditional: !this.state.showAdditional})
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

    onAutoStartChange = e => {
        this.setState({carAutoStart: e.target.checked})
    };

    onFinish = values => {
        this.setState({formBusy: true})

        setTimeout(() => {
            let found = true
            this.setState({formBusy: false, carFound: found})

            if (found) {
                this.setState({
                    allowPayment: true,
                    carATS: 'Noname',
                    carMark: 'Mazda',
                    carModel: 'CX-5',
                    carEquipment: '2.0 MPI - 6AT',
                    carNumber: 'A 123 AA 177',
                    carRegion: 'г. Москва',
                    carPrice: 1534000,
                    carPower: 245,
                    carMileage: 24500,
                    carYear: '2015',
                    engineCapacity: '2999',
                    carVIN: 'XMCLRDG3A4F044785',
                    carUsageStart: '18.05.2020'
                })

                this.updateImage(this.state.carMark)
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
            carPrice: 1524000,
            carYear: '' + (new Date()).getFullYear(),
            carNumber: ''
        });
    };

    onCarCreditChange = e => {
        this.setState({
            carCredit: !!e.target.value
        });
    };

    togglePriceEdit = e => {
        this.setState({
            carPriceEdit: !this.state.carPriceEdit
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

        document.querySelectorAll('[data-inputmask-date]').forEach(function (inp) {
            Inputmask({
                placeholder: '_',
                showMaskOnHover: false,
                regex: String.raw`^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$`
            }).mask(inp);
        })
    };

    updateImage = (img) => {
        if (this.props.imageCallback && this.state.carFound) this.props.imageCallback(img)
    };


    componentDidMount() {
        this.props.allFields && this.setState({showAdditional: true, newCar: false})
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.state.carPriceEdit) {
            if ((event.target.tagName + '').toLowerCase() !== 'input' && !searchTree(this.wrapperRef, event.target)) {
                this.setState({carPriceEdit: false})
            }
        }

        if (this.state.newCar === null) {
            this.setState({newCarHighlight: true})
        }
    }

    render() {
        const {allFields, step, hideOffers, fill, collapseCarInfo} = this.props;
        let {image} = this.props;
        //const dateFormat = "DD.MM.YY"
        let dateFormatMask = "'mask': '99.99.9999', 'showMaskOnHover': 'false'"
        let yearList = []
        let engineCapacityList = ['1996', '2998']

        for (let y = (new Date()).getFullYear(); y > 1980; y--) {
            yearList.push(y)
        }

        let carNonCreditList = [{
            name: 'ОСАГО',
            price: 10456,
            button: 'Рассчитать',
            link: '/osago',
            prefix: 'от',
            suffix: '₽'
        },
            {
                name: 'КАСКО',
                price: 10420,
                button: 'Рассчитать',
                link: '/kasko',
                prefix: 'от',
                suffix: '₽'
            },
            //{
            //	name: 'GAP',
            //	price: 10430,
            //	button: 'Рассчитать',
            //	link: '/gap',
            //	prefix: 'от',
            //	suffix: '₽'
            //},
            {
                name: 'Ассистанс',
                price: '15400',
                collapse: true,
                options: [
                    'эвакуация',
                    'юридическая помощь',
                    'аварийный комиссар',
                    'подвоз бензина',
                    'вскрытие автомобиля',
                    'запуск автомобиля',
                    'трезвый водитель',
                    'выездной шиномонтаж'
                ],
                prefix: 'от',
                suffix: '₽'
            },
            {
                name: 'Шоколад',
                price: 10555,
                collapse: true,
                options: [
                    'эвакуация',
                    'юридическая помощь',
                    'аварийный комиссар',
                    'подвоз бензина',
                    'вскрытие автомобиля',
                    'запуск автомобиля',
                    'трезвый водитель',
                    'выездной шиномонтаж'
                ],
                prefix: 'от',
                suffix: '₽'
            }]

        let carCreditList = [
            {
                name: 'Кредит',
                price: 10432,
                button: 'Рассчитать',
                href: '/credit',
                goto: true,
                prefix: 'от',
                suffix: '₽/мес'
            },
            {
                name: 'ОСАГО',
                price: 10410,
                button: 'Рассчитать',
                href: '/osago',
                goto: true,
                prefix: 'от',
                suffix: '₽'
            },
            {
                name: 'КАСКО',
                price: 10420,
                button: 'Рассчитать',
                href: '/kasko',
                goto: true,
                prefix: 'от',
                suffix: '₽'
            },
            //{
            //	name: 'GAP',
            //	price: 10430,
            //	button: 'Рассчитать',
            //	href: '/gap',
            //	prefix: 'от',
            //	suffix: '₽'
            //},
            {
                name: 'Сервис меню',
                price: 10789,
                button: 'Рассчитать',
                href: '/service',
                goto: true,
                prefix: 'от',
                suffix: '₽'
            },
            {
                name: 'Шоколад',
                price: 10555,
                collapse: true,
                options: [
                    'эвакуация',
                    'юридическая помощь',
                    'аварийный комиссар',
                    'подвоз бензина',
                    'вскрытие автомобиля',
                    'запуск автомобиля',
                    'трезвый водитель',
                    'выездной шиномонтаж'
                ],
                prefix: 'от',
                suffix: '₽'
            }]

        console.log('this.state.activeFields', this.state.activeFields);

        //dateFormatMask = "'regex': '" + String.raw`^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$` + "', 'showMaskOnHover': 'false'"

        //let rx = String.raw`^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$`

        //console.log('dateFormatMask', dateFormatMask, rx);

        const carVINMask = "'alias': 'vin', 'placeholder': '', 'clearIncomplete': 'false'"
        const carNumberMask = "'mask': 'A 999 AA 999'"
        const carPriceMask = "'alias': 'integer', 'groupSeparator': ' ', 'digitsOptional': true, 'autoGroup': true, 'rightAlign': 'false', 'clearIncomplete': 'true', 'clearMaskOnLostFocus': 'true', 'placeholder': '_'"
        const carPowerMask = "'alias': 'integer', 'groupSeparator': ' ', 'digitsOptional': true, 'autoGroup': true, 'rightAlign': 'false', 'clearMaskOnLostFocus': 'true', 'placeholder': '_'"
        let searchDisabled = !this.state.carNumber.length || this.state.carNumber.indexOf('_') > -1 || this.state.formBusy

        if (this.state.carMark) {
            //image = this.state.carMark
        }

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

        //if (this.state.newCar) {
        //	setTimeout(() => {
        //		console.log('setTimeout');
        //		this.onCarYearChange((new Date()).getFullYear())
        //	}, 0)
        //}

        return (
            <div className="kasko-car-select">
                <ReactComment text='"ecr-kasko/src/components/kasko-car-select/index.jsx"'/>

                {!this.state.carFound ?
                    <h1 className="kasko-main__title"><span>Выберите автомобиль</span></h1>
                    :
                    <div className="kasko-car-select__description">
                        <div className="kasko-car-select__description--link gl_link">В архив</div>
                        <div className="kasko-car-select__controls">
							<span onClick={this.toggleCarOptions}
                                  className={"gl_link color_black kasko-car-select__controls--toggle " + (this.state.showCarOptions || !collapseCarInfo ? 'expanded' : 'collapsed')}
                            ><span>Mazda CX-5</span> <span className="kasko-car-select__controls--equipment">2.0 MPI - 6AT</span>
							</span>
                        </div>

                        <Row gutter={20}>
                            <Col span={6} ref={this.setWrapperRef}
                                 className={this.state.carPriceEdit ? "kasko-car-select__description--price-edit" : ""}>
                                {this.state.carPriceEdit ?
                                    <FormInput span={null} onChangeCallback={this.formControlCallback}
                                               placeholder="Стоимость, ₽"
                                               inputmask={carPriceMask}
                                               controlName={'carPrice'} value={this.state.carPrice}/>
                                    : <div onClick={() => {
                                        this.togglePriceEdit(true)
                                    }}
                                           className="kasko-car-select__description--price">{formatMoney(this.state.carPrice)} ₽</div>
                                }
                            </Col>
                        </Row>
                    </div>
                }

                {this.state.showCarOptions || !this.state.carFound || !collapseCarInfo ?
                    <>
                        <div
                            className={"kasko-car-select__controls radio_v2 w_100p" + (this.state.newCarHighlight && this.state.newCar === null ? " highlight_radio" : "")}>
                            <Radio.Group
                                defaultValue={step === 1 ? (this.state.reopen ? (this.state.newCar ? 1 : 0) : null) : this.state.newCar ? 1 : null}
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
                        </div>

                        {this.state.newCar === null || this.state.newCar ? null :
                            <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                                <Row className="kasko-car-select__controls" gutter={20}>
                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                               placeholder="Госномер автомобиля"
                                               inputmask={carNumberMask}
                                               controlName={'carNumber'} value={this.state.carNumber}/>

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

                        {this.state.newCar === null ? null :
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

                                <FormInput span={6} onChangeCallback={this.formControlCallback}
                                           placeholder="Стоимость, ₽"
                                           disabled={this.state.newCar ? "disabled" : ""}
                                           inputmask={carPowerMask}
                                           controlName={'carPrice'} value={this.state.carPrice}/>
                            </Row>
                        }

                        {this.state.showAdditional ?
                            <>
                                <Row className="kasko-car-select__controls" gutter={20}>
                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                               placeholder="Пробег, км"
                                               inputmask={carPowerMask}
                                               controlName={'carMileage'} value={this.state.carMileage}/>

                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                               placeholder="Мощность"
                                               inputmask={carPowerMask}
                                               controlName={'carPower'} value={this.state.carPower}/>

                                    <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                                options={engineCapacityList}
                                                placeholder="Объем двигателя" controlName={'engineCapacity'}
                                                value={this.state.engineCapacity}/>

                                    <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                                options={yearList}
                                                className={this.activeClass('carYear')}
                                                disabled={this.state.newCar ? "disabled" : ""}
                                                placeholder="Год выпуска" controlName={'carYear'}
                                                value={this.state.carYear}/>

                                    {/*<FormInput span={6} onChangeCallback={this.formControlCallback}*/}
                                    {/*		   placeholder="Стоимость, ₽"*/}
                                    {/*		   inputmask={carPriceMask}*/}
                                    {/*		   controlName={'carPrice'} value={''}/>*/}

                                    {/*<FormInput span={6} onChangeCallback={this.formControlCallback}*/}
                                    {/*		   placeholder="Регион эксплуатации"*/}
                                    {/*		   controlName={'carRegion'} value={this.state.carRegion}/>*/}


                                </Row>

                                <Row className="kasko-car-select__controls" gutter={20}>

                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                               placeholder="VIN"
                                               className={(allFields ? "input-error" : "")}
                                               inputmask={carVINMask}
                                               controlName={'carVIN'} value={''}/>

                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                               placeholder="Регион эксплуатации"
                                               controlName={'carRegion'} value={''}/>

                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                               placeholder={"Дата начала \n эксплуатации"}
                                               inputmask={dateFormatMask}
                                               controlName={'carUsageStart'} value={this.state.carUsageStart}/>

                                    <FormCheckbox span={3} onChangeCallback={this.formControlCallback}
                                                  text="Такси"
                                                  className="checkbox_middle check_v3"
                                                  value={0}
                                                  controlName={'carTaxi'}
                                                  checked={this.state.carTaxi}/>

                                    <FormCheckbox span={3} onChangeCallback={this.formControlCallback}
                                                  text="Автозапуск"
                                                  className="checkbox_middle check_v3"
                                                  value={0}
                                                  controlName={'carAutoStart'}
                                                  checked={this.state.carAutoStart}/>

                                </Row>

                                <Row className="kasko-car-select__controls" gutter={20}>
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

                                    <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                                options={this.state.carATSList}
                                                className={(allFields ? "wrapper-error" : "")}
                                                placeholder="Противоугонная система" controlName={'carATS'}
                                                value={this.state.carATS}/>

                                </Row>

                                <Row className="kasko-car-select__controls" gutter={20}>
                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                               placeholder="Серия, номер ПТС"
                                               className={(allFields ? "input-error" : "")}
                                               controlName={'carPTS'} value={''}/>

                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                               placeholder="Дата выдачи ПТС"
                                               className={(allFields ? "input-error" : "")}
                                               controlName={'carPTSStart'} value={''}/>

                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                               placeholder="Серия, номер СТС"
                                               className={(allFields ? "input-error" : "")}
                                               controlName={'carSTS'} value={''}/>

                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                               placeholder="Дата выдачи СТС"
                                               className={(allFields ? "input-error" : "")}
                                               controlName={'carSTSStart'} value={''}/>
                                </Row>

                                <Row className="kasko-car-select__controls" gutter={20}>
                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                               placeholder="Диагностическая карта"
                                               inputmask={carNumberMask}
                                               controlName={'carDiagnosticCard'} value={''}/>

                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                               placeholder={"Срок действия"}
                                               inputmask={dateFormatMask}
                                               controlName={'carDiagnosticCardDuration'} value={''}/>
                                </Row>

                                <Row
                                    className="kasko-car-select__controls kasko-car-select__controls--price radio_v2-2"
                                    gutter={20}>
                                    <Col span={6} className="kasko-car-select__controls--credit">
                                        <Radio.Group
                                            className={"w_100p " + (this.state.showAdditional ? "full_form" : "short_form")}
                                            onChange={this.onCarCreditChange}>
                                            <Row gutter={20}>
                                                <Col span={12}>
                                                    <Radio disabled={this.state.allowPayment ? null : "disabled"}
                                                           checked={this.state.carCredit ? "checked" : ""}
                                                           value={1}>В кредит</Radio>
                                                </Col>
                                                <Col span={12} className={"ant-col-mla"}>
                                                    <Radio disabled={this.state.allowPayment ? null : "disabled"}
                                                           checked={!this.state.carCredit ? "checked" : ""}
                                                           value={0}>За наличные</Radio>
                                                </Col>
                                            </Row>
                                        </Radio.Group>
                                    </Col>

                                    {this.state.carCredit ?
                                        <FormSelect cellClass="align-start" span={6}
                                                    onChangeCallback={this.formControlCallback}
                                                    options={this.state.carBankNameList}
                                                    placeholder="Банк" controlName={'carBankName'}
                                                    value={this.state.carBankName}/>
                                        : <Col span={6} />
                                    }

                                    <Col span={6}
                                         className="kasko-car-select__additional _inactive text_right ant-col-mla">
                                        <div className="gl_link" onClick={this.toggleAdditionalFields}>Скрыть</div>
                                    </Col>

                                </Row>


                                {/*<Row className="kasko-car-select__controls" gutter={20}>*/}
                                {/*	<FormInput span={6} onChangeCallback={this.formControlCallback}*/}
                                {/*			   placeholder="Мощность"*/}
                                {/*			   inputmask={carPowerMask}*/}
                                {/*			   controlName={'carPower'} value={this.state.carPower}/>*/}


                                {/*	<Col span={6} className="checkbox_middle check_v3">*/}
                                {/*		<Checkbox onChange={this.onAutoStartChange}>Автозапуск</Checkbox>*/}
                                {/*	</Col>*/}
                                {/*</Row>*/}
                            </>
                            : null
                        }

                        {this.state.newCar === null ? null :
                            <Row className="kasko-car-select__controls kasko-car-select__controls--price radio_v2"
                                 gutter={20}>
                                {
                                    this.state.showAdditional ? null :
                                        <Col className="kasko-car-select__additional _inactive ant-col-mla">
                                            <div className="gl_link" onClick={this.toggleAdditionalFields}>Дополнительно</div>
                                        </Col>
                                }
                            </Row>
                        }
                    </>
                    : null
                }

                {
                    allFields ? null :
                        <div
                            className={"kasko-car-select__image" + (step === 1 && !this.state.allowPayment ? " _inactive__" : "")}>
                            <img src={'./cars/' + image + '.png'} alt=""/>
                        </div>
                }

                {/*{fill ? null :*/}
                {/*	(!this.state.formBusy && this.state.carFound && !hideOffers) ?*/}
                {/*		<KaskoOffers offersList={this.state.carCredit ? carCreditList : carNonCreditList}/>*/}
                {/*		:*/}
                {/*		<KaskoOffers disabled={true} offersList={[*/}
                {/*				{*/}
                {/*					name: 'Кредит',*/}
                {/*					price: 0,*/}
                {/*					button: 'Рассчитать',*/}
                {/*					prefix: 'от',*/}
                {/*					suffix: '₽/мес'*/}
                {/*				},*/}
                {/*				{*/}
                {/*					name: 'ОСАГО',*/}
                {/*					price: 0,*/}
                {/*					button: 'Рассчитать',*/}
                {/*					prefix: 'от',*/}
                {/*					suffix: '₽'*/}
                {/*				},*/}
                {/*				{*/}
                {/*					name: 'КАСКО',*/}
                {/*					price: 0,*/}
                {/*					button: 'Рассчитать',*/}
                {/*					prefix: 'от',*/}
                {/*					suffix: '₽'*/}
                {/*				},*/}
                {/*				{*/}
                {/*					name: 'GAP',*/}
                {/*					price: 0,*/}
                {/*					button: 'Рассчитать',*/}
                {/*					prefix: 'от',*/}
                {/*					suffix: '₽'*/}
                {/*				}*/}
                {/*			]}/>*/}
                {/*}*/}
            </div>
        );
    }
}

export default CarSelect;
