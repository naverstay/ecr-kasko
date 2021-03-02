import React, {Component} from "react";
import {Button, Checkbox, Col, Row} from "antd";
import AsideBlock from "../../components/aside-block";
import AsideCrumbs from "../../components/aside-crumbs";
import KaskoNotices from "../../components/kasko-notices";
import DocsCompleteness from "../../components/docs-completeness";
import KaskoUser from "../../components/kasko-user";
import KaskoCarInfo from "../../components/kasko-car-info";
import KaskoCarSelect from "../../components/kasko-car-select";
import PropTypes from 'prop-types';

import './style.scss';
import OfferSelect from "../../components/offer-select";
import AuthPopup from "../../components/auth-popup";
import PopupOverlay from "../../components/popup-overlay";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import TabCredit from "../../components/tab-credit";
import CarSelect from "../../components/car-select";
import TabService from "../../components/tab-service";
import TabOffer from "../../components/tab-offer";
import ServiceNotices from "../../components/service-notices";
import AsideBlockProduct from "../../components/aside-block-product";
import KaskoNotice from "../../components/kasko-notice";

class Docs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newStep: null,
            newStatus: null,
            tabIndex: null,
            showAuthForm: false,
            productCount: 0,
            updatePaymentState: 0,
            showStatus: false,
            carFound: this.props.dev || this.props.showCar || false,
            carImage: (this.props.showCar || this.props.step !== 1) ? 'Hyundai' : 'car',
            markList: [
                "Hyundai",
                "Mazda",
                "Mercedes-Benz"
            ]
        };
    }

    static propTypes = {
        children: PropTypes.node,
        showOffers: PropTypes.any,
        progress: PropTypes.any,
        innerWidth: PropTypes.number,
        showCar: PropTypes.bool,
        addCar: PropTypes.bool,
        noInfo: PropTypes.bool,
        step: PropTypes.number
    };

    updateTab = (tabIndex) => {
        console.log('tabIndex', tabIndex);
        this.setState({tabIndex: tabIndex, newStep: null, newStatus: null})
    }
    toggleAuth = (img) => {
        this.setState({showAuthForm: !this.state.showAuthForm})
    }

    imageCallback = (img) => {
        this.setState({carImage: img, carFound: true})
    }

    changeTabState = (action) => {
        console.log('changeTabState', action, this.state.newStep);

        if ('tabIndex' in action) {
            this.setState({tabIndex: action.tabIndex, showStatus: false, newStep: 0, newStatus: null})
        }

        if ('newStep' in action) {
            this.setState({newStep: action.newStep, newStatus: null})
        }

        if ('productCount' in action) {
            this.setState({productCount: action.productCount, newStatus: null})
        }

        if ('updatePaymentState' in action) {
            let obj = {
                updatePaymentState: action.updatePaymentState,
                newStatus: null
            }

            if (action.updatePaymentState === 5) {
                obj.newStep = 5
            }

            if (action.updatePaymentState === 0) {
                obj.newStep = 1;
            }

            if (action.updatePaymentState === 1) {
                obj.showStatus = true;
            }

            this.setState(obj);
            console.log('updatePaymentState', this.state.updatePaymentState);
        }

        if ('updatePaymentStatus' in action) {
            let obj = {
                newStatus: action.updatePaymentStatus
            }

            this.setState(obj);
            console.log('updatePaymentStatus', this.state.newStatus);
        }
    }

    render() {
        let {showOffers, noInfo, step, progress, cabinet, tabs, addCar, showGarage, emptyGarage, showCar} = this.props;
        let status = 0

        const statusClasses = {
            0: 'calculation',
            1: 'approved',
            2: 'approved',
            3: 'done',
            4: 'declined',
            6: 'waiting'
        }
        const statusNames = {
            0: 'Расчет',
            1: 'Оплата',
            2: 'Выпущено',
            3: 'Выпущено',
            4: 'Отказ',
            6: 'Консультация'
        }
        const progressNames = {
            0: 'Консультация',
            1: 'Расчет',
            2: 'Оформление',
            3: 'Выпуск',
            4: 'Отказ'
        }

        let events = []

        if (this.state.newStep !== null) {
            step = this.state.newStep
            status = Math.max(0, step - 1)
        }

        if (step === 2) {
            events.push({
                progress: 1,
                name: this.state.tabIndex === 2 ? 'е-ОСАГО' : 'е-КАСКО',
                status: 'Ожидание оплаты / Ингосстрах',
                time: '9:50'
            })
        }

        if (step === 3) {
            events.push({
                progress: 2,
                name: this.state.tabIndex === 2 ? 'е-ОСАГО' : 'е-КАСКО',
                status: 'Выпущено / Ингосстрах',
                time: '9:50'
            });

            if (this.state.tabIndex !== 2) {
                events.push({
                    progress: 1,
                    name: 'е-КАСКО',
                    status: 'Ожидание оплаты / ВСК',
                    time: '9:50'
                });
            }
        }

        switch (this.state.tabIndex) {
            case 0:
                showOffers = 'кредит'
                break
            case 1:
                showOffers = 'е-КАСКО'
                break
            case 2:
                showOffers = 'е-ОСАГО'
                break
            case 3:
                showOffers = 'сервис меню'
                break
        }

        let consultStatus = false;
        let paymentStatus = step === 2 ? 1 : step === 3 ? 3 : step === 5 ? 4 : 0;

        if (this.state.newStatus !== null) {
            consultStatus = this.state.newStatus;
            status = 6;
        }

        let tabStatus = this.state.showStatus ? <div className={"kasko-notice__status " + (statusClasses[status])}
        >{statusNames[status] + (this.state.tabIndex === 3 && this.state.productCount ? ' (' + this.state.productCount + ')' : '')}</div> : null

        if (this.state.tabIndex === 0 && step > 1) {
            tabStatus = <>
                <div className={"kasko-notice__status small " + (statusClasses[status])}>1</div>
                <div className={"kasko-notice__status small " + (statusClasses[status + 1])}>3</div>
            </>
        }

        return (
            <>
                <Row gutter={20} className="kasko-wrapper">
                    <Col span={4} className="kasko-aside">
                        <AsideCrumbs crumbs={['Главная']}/>
                        <AsideBlock>
                            <KaskoUser firstName={'Мария'} lastName={'Константинопольская'}
                                       avatar={'users/masha.jpg'}
                                       phone={"+ 7 (910) 222-12-12"} docs="" trustees=""
                                       autos=''/>
                        </AsideBlock>

                        <AsideBlock>
                            <KaskoCarInfo step={step} notificationCount={step === 2 ? 1 : step === 3 ? 2 : 0}
                                          carName={step === 1 ? '' : 'Hyundai'}
                                          carModel={step === 1 ? '' : 'Sonata'} image={this.state.carImage}
                                          info={step === 1 ? '' : "2020 Новый"}
                                          price={step === 1 ? '' : "1 534 000 ₽"}/>
                        </AsideBlock>
                    </Col>

                    <Col span={16} className="kasko-main">
                        <div className="docs__frame">
                            <Row gutter={20}>
                                <Col span={3}/>

                                <Col span={6}>
                                    <div className="docs__frame-avatar">
                                        <div className="docs__frame-avatar_wrapper">
                                            <img src="users/masha.jpg" alt=""/>
                                        </div>
                                        <label className="docs__frame-avatar_load">
                                            <input className={'hide'} type="file"/>
                                        </label>
                                    </div>
                                </Col>

                                <Col span={9}>
                                    <div className="docs__frame-name">
                                        Константинопольская
                                        Мария Константиновна
                                    </div>
                                    <div className="docs__frame-contact"> +7 (916) 222-22-22</div>
                                    <div className="docs__frame-contact"> konstantinopolskaya@gmail.com</div>
                                </Col>

                                <Col className={'ant-col-mla'} span={3}>
                                    <div className="text_right">
                                        <div className="docs__frame-status _active">Активный</div>
                                        <p className="text1">
                                            <span className="color_gray">Клиент с <br/>20.01.20
                                            </span>
                                        </p>
                                    </div>
                                </Col>
                                <Col span={3}/>
                            </Row>

                            <Row className="mb_15 mt_60" gutter={20}>
                                <Col span={3}/>

                                <Col span={6}>
                                    <div className="docs__frame-load _completed">
                                        <span>Паспорт</span>
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div className="docs__frame-load _completed">
                                        <span>Водительское удостоверение</span>
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div className="docs__frame-load _completed">
                                        <span>СНИЛС</span>
                                    </div>
                                </Col>

                                <Col span={3}/>
                            </Row>

                            <Row className="mb_20" gutter={20}>
                                <Col span={3}/>

                                <Col span={6}>
                                    <div className="docs__frame-load _completed">
                                        <span>ИНН</span>
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
                        </div>
                    </Col>

                    <Col span={4} className="kasko-aside">
                        <AsideBlock>
                            <KaskoNotices noticeList={[{title: 'Понедельник, 20.02.19', list: events}]}/>
                        </AsideBlock>
                        <AsideBlock>
                            <DocsCompleteness docList={[
                                {
                                    name: 'Личная информация',
                                    check: true
                                },
                                {
                                    name: 'Доверенные лица',
                                    check: true
                                },
                                {
                                    name: 'Работа',
                                    check: true
                                },
                                {
                                    name: 'Финансы и собственность',
                                    check: true
                                },
                                {
                                    name: 'Гражданство и статус',
                                    check: true
                                },
                                {
                                    name: 'Подписать документы',
                                    check: false
                                }
                            ]}/>
                        </AsideBlock>
                    </Col>
                </Row>

                {this.state.showAuthForm ?
                    <PopupOverlay span={8}>
                        <AuthPopup popupCloseFunc={this.toggleAuth}/>
                    </PopupOverlay>
                    : null
                }
            </>
        );
    }
}

export default Docs
