import React, {Component} from "react";
import {Link} from "react-router-dom";

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

class CarGarage extends Component {
    constructor(props) {
        super(props);
        this.state = {};

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
        const {carList} = this.props;

        console.log('carList', carList);

        return (
            <>
                <ReactComment text='ecr-kasko/src/components/car-garage/index.jsx'/>

                <Row gutter={20}>
                    {
                        carList.map((c) => {
                            return <Col span={12}>
                                <Link to={"/car"} className="kasko-car-select _garage">
                                    <div className="kasko-car-select__description">
                                        <div className="kasko-car-select__controls mb_10">
                                            <span className="gl_link color_black kasko-car-select__controls--toggle">
                                                <span>{c.carMark} {c.carModel}</span>
                                            </span>
                                            <span className={"kasko-car-select__date"}>Дата заявки<br />20.08.19</span>
                                        </div>
                                        <div
                                            className="kasko-car-select__description--price">{c.carYear} г. {c.newCar ? "Новый автомобиль" : "Авто с пробегом"}</div>
                                        <div
                                            className="kasko-car-select__description--price">{formatMoney(c.carPrice)} ₽
                                        </div>
                                    </div>
                                    <div className="kasko-car-select__image"><img src={"./cars/" + c.carMark + ".png"}
                                                                                  alt=""/></div>

                                    <ul className="kasko-car-info__status">
                                        <li className={"kasko-car-info__status--item " + c.options.credit}>Кредит</li>
                                        <li className={"kasko-car-info__status--item " + c.options.osago}>е-ОСАГО</li>
                                        <li className={"kasko-car-info__status--item " + c.options.kasko}>е-КАСКО</li>
                                    </ul>
                                </Link>
                            </Col>
                        })
                    }

                    <Col span={12}>
                        <Link to={'/'} className="kasko-car-select _add">
                            <span>Добавить <br/>автомобиль</span>
                        </Link>
                    </Col>
                </Row>
            </>
        );
    }
}

export default CarGarage;
