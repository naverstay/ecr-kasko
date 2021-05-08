import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";
import FormSelect from "../form-select";
import SelectFilter from "../select-filter";
import {Row, Col, Button} from "antd";

class MobileFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dealerName: '',
            ksoList: [
                '1',
                '2',
                '3',
                '4'
            ],
            mopList: [
                'Тестовый пользователь',
                'Рогов Петр',
                'DEMO',
                'DEMO 2'
            ],
            statusList: [
                'Заявка одобрена',
                'Назначена сделка',
                'Кредитный расчет',
                'Отправлена в банк'
            ],
            dealerList: [
                'ДЦ Дружба',
                'ДЦ Маргарита-Тест',
                'Автоград Тюмень KIA',
                'Inchcape JLR Центр',
                'ДЦ Дружба 2',
                'ДЦ Маргарита-Тест 2',
                'Автоград Тюмень KIA 2',
                'Inchcape JLR Центр 2',
                'ДЦ Дружба 3',
                'ДЦ Маргарита-Тест 3',
                'Автоград Тюмень KIA 3',
                'Inchcape JLR Центр 3',
                'ДЦ Дружба 4',
                'ДЦ Маргарита-Тест 4',
                'Автоград Тюмень KIA 4',
                'Inchcape JLR Центр 4',
                'ДЦ Дружба 5',
                'ДЦ Маргарита-Тест 5',
                'Автоград Тюмень KIA 5',
                'Inchcape JLR Центр 5'
            ]
        };
    }

    static propTypes = {
        children: PropTypes.node,
        onOfferSelect: PropTypes.func,
        innerWidth: PropTypes.number
    };

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {

        return (
            <>
                <Row className="kasko-car-select__controls mt-20" gutter={20}>
                    <Col span={24}>
                        <SelectFilter tip={'Вы можете выбрать вручную максимум 30 ДЦ или нажать на пункт “Выбрать все”'}
                                      name={"Дилеры"} nameShort={"Дилер"} selectAll={'Выбрать все'}
                                      options={this.state.dealerList}/>
                    </Col>
                </Row>
                <Row className="kasko-car-select__controls mt-20" gutter={20}>
                    <Col span={24}>
                        <SelectFilter tip={'Вы можете выбрать КСО вручную или нажать на пункт “Все”'}
                                      name={"КСО"} nameShort={"КСО"} selectAll={'Все'}
                                      options={this.state.ksoList}/>
                    </Col>
                </Row>
                <Row className="kasko-car-select__controls mt-20" gutter={20}>
                    <Col span={24}>
                        <SelectFilter tip={'Вы можете выбрать МОП вручную или нажать на пункт “Все”'}
                                      name={"МОП"} nameShort={"МОП"} selectAll={'Все'}
                                      options={this.state.mopList}/>
                    </Col>
                </Row>
                <Row className="kasko-car-select__controls mt-20" gutter={20}>
                    <Col span={24}>
                        <SelectFilter tip={'Вы можете выбрать МОП вручную или нажать на пункт “Все”'}
                                      name={"Статусы"} nameShort={"Статус"} selectAll={'Все'}
                                      options={this.state.statusList}/>
                    </Col>
                </Row>
                <Row className="kasko-car-select__controls mt-20" gutter={20}>
                    <Col span={24}>
                        <Button className={"w_100p ant-btn-primary"}>Применить</Button>
                    </Col>
                </Row>
            </>
        );
    }
}

export default MobileFilters;
