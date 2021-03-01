import React, {Component} from "react";
import Inputmask from "inputmask";
import {Input, Col, Row, Select, Button, Checkbox, Form, Radio} from "antd";
import './style.scss';
import PropTypes from "prop-types";
import dayjs from 'dayjs';
import FormInput from "../form-input";

const {Option} = Select;

dayjs().locale('ru');

class PersonalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFields: (this.props.step === 1 ? ['carMark'] : []),
            clientWholeName: '',
            clientLastName: '',
            clientFirstName: '',
            clientFarthersName: '',
            clientPhone: ''
        };

        this.state['carYear'] = this.props.fill ? '2015' : this.state.newCar ? '' + (new Date()).getFullYear() : ''
    }

    static propTypes = {
        children: PropTypes.node,
        allFields: PropTypes.bool,
        innerWidth: PropTypes.number,
        imageCallback: PropTypes.func,
        step: PropTypes.number
    };

    formRef = React.createRef();

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

    componentDidMount() {
        this.props.allFields && this.setState({showAdditional: true, newCar: false})
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

    updateImage = (img) => {
        if (this.props.imageCallback && this.state.carFound) this.props.imageCallback(img)
    };

    render() {
        const {wholeName} = this.props;

        return (
            <div className="kasko-car-select">
                <Row className="kasko-car-select__controls" gutter={20}>
                    <Col span={3}/>
                    {wholeName ?
                        <FormInput span={18} onChangeCallback={this.formControlCallback}
                                   placeholder="Фамилия, Имя, Отчество" controlName={'clientWholeName'} value={''}/>
                        :
                        <>
                            <FormInput span={6} onChangeCallback={this.formControlCallback}
                                       placeholder="Фамилия" controlName={'clientLastName'} value={''}/>

                            <FormInput span={6} onChangeCallback={this.formControlCallback}
                                       placeholder="Имя" controlName={'clientFirstName'} value={''}/>

                            <FormInput span={6} onChangeCallback={this.formControlCallback}
                                       placeholder="Отчество" controlName={'clientFarthersName'} value={''}/>
                        </>
                    }
                </Row>
                <Row className="kasko-car-select__controls" gutter={20}>
                    <Col span={3}/>
                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                               placeholder={"Телефон"} controlName={'clientPhone'} value={''}/>
                </Row>
            </div>
        );
    }
}

export default PersonalForm;
