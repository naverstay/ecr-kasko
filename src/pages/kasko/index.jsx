import React, {Component} from "react";
import {Button, Checkbox, Col, Row} from "antd";
import AsideBlock from "../../components/aside-block";
import AsideCrumbs from "../../components/aside-crumbs";
import KaskoNotices from "../../components/kasko-notices";
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

class Kasko extends Component {
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
            this.setState({tabIndex: action.tabIndex, newStep: 0, newStatus: null})
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
            1: 'waiting',
            2: 'approved',
            3: 'done',
            4: 'declined',
            6: 'waiting'
        }
        const statusNames = {
            0: 'Расчет',
            1: 'Ожидание',
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
                name: this.state.tabIndex === 2 ? 'Е-ОСАГО' : 'КАСКО',
                status: 'Ожидание оплаты / Ингосстрах',
                time: '9:50'
            })
        }

        if (step === 3) {
            events.push({
                progress: 2,
                name: this.state.tabIndex === 2 ? 'Е-ОСАГО' : 'КАСКО',
                status: 'Выпущено / Ингосстрах',
                time: '9:50'
            });

            if (this.state.tabIndex !== 2) {
                events.push({
                    progress: 1,
                    name: 'КАСКО',
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
                showOffers = 'каско'
                break
            case 2:
                showOffers = 'е-осаго'
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

        let tabStatus = <div className={"kasko-notice__status " + (statusClasses[status])}
        >{statusNames[status] + (this.state.tabIndex === 3 && this.state.productCount ? ' (' + this.state.productCount + ')' : '')}</div>

        if (this.state.tabIndex === 0 && step > 1) {
            tabStatus = <>
                <div className={"kasko-notice__status small " + (statusClasses[status])}>1</div>
                <div className={"kasko-notice__status small " + (statusClasses[status + 1])}>3</div>
            </>
        }

        let carInfo = [];

        for (let i = 0; i < (this.props.dev ? 10 : 1); i++) {
            carInfo.push(<AsideBlock><KaskoCarInfo step={step} notificationCount={step === 2 ? 1 : step === 3 ? 2 : 0}
                                                   carName={step === 1 ? '' : 'Hyundai'}
                                                   carModel={step === 1 ? '' : 'Sonata'} image={this.state.carImage}
                                                   info={step === 1 ? '' : "2020 Новый"}
                                                   price={step === 1 ? '' : "1 534 000 ₽"}/></AsideBlock>)
        }

        console.log('paymentStatus', paymentStatus);

        return (
            <>
                <Row gutter={20} className="kasko-wrapper">
                    {cabinet ?
                        <Col span={4} className="kasko-aside">
                            <AsideCrumbs crumbs={['Главная']}/>
                            <AsideBlock>
                                <KaskoUser firstName={step === 1 ? '' : 'Кирилл'} lastName={step === 1 ? '' : 'Лучкин'}
                                           avatar={step === 1 ? '' : 'users/luchkin.png'}
                                           phone={step > 1 ? "+ 7 (916) 111 11 11" : ""} docs="" trustees=""
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
                        :
                        <Col span={4} className="kasko-aside"/>
                    }

                    <Col span={16} className="kasko-main">
                        {tabs ?
                            <>
                                <CarSelect collapseCarInfo={this.state.carFound}
                                           showCarOptions={(this.state.tabIndex !== null)}
                                           garage={showGarage}
                                           emptyGarage={emptyGarage}
                                           fill={showCar}
                                           addCar={addCar}
                                           imageCallback={this.imageCallback} step={step} image={this.state.carImage}/>

                                {showGarage ? null :
                                    <Tabs selectedIndex={this.state.tabIndex === null ? -1 : this.state.tabIndex}
                                          onSelect={this.updateTab}
                                          className={'kasko-tabs__wrapper' + (this.state.carFound && this.state.tabIndex === null ? ' highlight_tab' : '')}>
                                        <TabList
                                            className={'kasko-tabs__list' + (this.state.carFound ? ' active' : '') + (this.state.tabIndex === null ? '' : ' selected')}>
                                            <Tab className={'kasko-tabs__tab'}>
                                                <div className="kasko-tab__panel-name"><span
                                                    className="kasko-tab__panel-name--text">Кредит</span>
                                                    {this.state.tabIndex === 0 ?
                                                        tabStatus
                                                        //: this.state.carFound ?
                                                        //	<span className="kasko-tab__panel-name--val">от <b>16 450 ₽</b></span>
                                                        : null
                                                    }
                                                </div>
                                            </Tab>
                                            <Tab className={'kasko-tabs__tab'}>
                                                <div className="kasko-tab__panel-name"><span
                                                    className="kasko-tab__panel-name--text"><span>Я</span>&nbsp;<span
                                                    className={"fz_18 i-heart" + ' _red'}/>&nbsp;
                                                    <span>КАСАГО</span></span>
                                                    {this.state.tabIndex === 1 ?
                                                        tabStatus
                                                        //: this.state.carFound ?
                                                        //	<span className="kasko-tab__panel-name--val">от <b>18 450 ₽</b></span>
                                                        : null
                                                    }
                                                </div>
                                            </Tab>
                                            {/*<Tab className={'kasko-tabs__tab'}>*/}
                                            {/*	<div className="kasko-tab__panel-name"><span*/}
                                            {/*		className="kasko-tab__panel-name--text">КАСКО</span>*/}
                                            {/*		{this.state.tabIndex === 1 ?*/}
                                            {/*			tabStatus*/}
                                            {/*			: this.state.carFound ?*/}
                                            {/*				<span className="kasko-tab__panel-name--val">от <b>18 450 ₽</b></span>*/}
                                            {/*				: null*/}
                                            {/*		}*/}
                                            {/*	</div>*/}
                                            {/*</Tab>*/}
                                            <Tab className={'kasko-tabs__tab'}>
                                                <div className="kasko-tab__panel-name"><span
                                                    className="kasko-tab__panel-name--text">Е-ОСАГО</span>
                                                    {this.state.tabIndex === 2 ?
                                                        tabStatus
                                                        //: this.state.carFound ?
                                                        //	<span className="kasko-tab__panel-name--val">от <b>10 450 ₽</b></span>
                                                        : null
                                                    }</div>
                                            </Tab>
                                            <Tab className={'kasko-tabs__tab'}>
                                                <div className="kasko-tab__panel-name"><span
                                                    className="kasko-tab__panel-name--text">Сервис меню</span>
                                                    {this.state.tabIndex === 3 ?
                                                        tabStatus
                                                        : this.state.carFound ?
                                                            null
                                                            : null
                                                    }
                                                </div>
                                            </Tab>
                                            <Tab className={'kasko-tabs__tab'}>
                                                <div className="kasko-tab__panel-name"><span
                                                    className="kasko-tab__panel-name--text">POS кредит</span>
                                                    {this.state.tabIndex === 4 ?
                                                        tabStatus
                                                        : this.state.carFound ?
                                                            null
                                                            : null
                                                    }
                                                </div>
                                            </Tab>
                                        </TabList>

                                        <TabPanel className="kasko-tab__panel">
                                            {this.state.tabIndex === null || !this.state.carFound ? null :
                                                <TabCredit tabCallback={this.changeTabState} step={step}
                                                           carPrice={762000 * 2}/>
                                            }
                                        </TabPanel>
                                        <TabPanel className="kasko-tab__panel">
                                            {this.state.tabIndex === null || !this.state.carFound ? null :
                                                <TabOffer tabCallback={this.changeTabState}
                                                          imageCallback={this.imageCallback}
                                                          combo={true}
                                                          step={step} image={this.state.carImage} type={showOffers}/>
                                            }
                                        </TabPanel>
                                        {/*<TabPanel className="kasko-tab__panel">*/}
                                        {/*	{this.state.tabIndex === null || !this.state.carFound ? null :*/}
                                        {/*		<TabOffer tabCallback={this.changeTabState} imageCallback={this.imageCallback}*/}
                                        {/*				  step={step} image={this.state.carImage} type={showOffers}/>*/}
                                        {/*	}*/}
                                        {/*</TabPanel>*/}
                                        <TabPanel className="kasko-tab__panel">
                                            {this.state.tabIndex === null || !this.state.carFound ? null :
                                                <TabOffer tabCallback={this.changeTabState}
                                                          imageCallback={this.imageCallback}
                                                          osago={true}
                                                          eosago={true} combo={true}
                                                          step={step} image={this.state.carImage} type={showOffers}/>
                                            }
                                        </TabPanel>
                                        <TabPanel className="kasko-tab__panel">
                                            {this.state.tabIndex === null || !this.state.carFound ? null :
                                                <TabService step={step} tabCallback={this.changeTabState}/>
                                            }
                                        </TabPanel>
                                        <TabPanel className="kasko-tab__panel">
                                            {this.state.tabIndex === null || !this.state.carFound ? null :
                                                <h2>POS кредит</h2>}
                                        </TabPanel>
                                    </Tabs>
                                }
                            </>
                            :
                            showOffers === false ?
                                <KaskoCarSelect carList={[1]} imageCallback={this.imageCallback} step={step}
                                                image={this.state.carImage}/>
                                :
                                <OfferSelect imageCallback={this.imageCallback} step={step} image={this.state.carImage}
                                             type={showOffers}/>
                        }

                    </Col>

                    {cabinet ?
                        <Col span={4} className="kasko-aside">
                            <Button onClick={this.toggleAuth} className={"ant-btn ant-btn-primary kasko-aside__btn"}>Личный
                                кабинет</Button>

                            {showOffers === false ? null :
                                <AsideBlock>
                                    <KaskoNotices step={step} status={paymentStatus}
                                                  type={showOffers}/>
                                </AsideBlock>
                            }

                            <AsideBlock>
                                <KaskoNotices noticeList={[{title: 'Сегодня, Пон 20.02.19', list: events}]}/>
                            </AsideBlock>
                        </Col>
                        : <Col span={4} className="kasko-aside"/>
                    }

                </Row>

                {!cabinet ?
                    <Row gutter={20} className="kasko-wrapper kasko-wrapper__fixed">
                        <Col span={4} className="kasko-aside">
                            <AsideCrumbs crumbs={['Главная']}/>
                            <AsideBlock>
                                <KaskoUser firstName={(step === 1 || noInfo) ? '' : 'Кирилл'}
                                           lastName={(step === 1 || noInfo) ? '' : 'Лучкин'}
                                           avatar={(step === 1 || noInfo) ? '' : 'users/luchkin.png'}
                                           phone={step > 1 ? "+ 7 (916) 111 11 11" : ""} docs="" trustees=""
                                           autos=''/>
                            </AsideBlock>

                            {showGarage ?
                                <>
                                    {noInfo ?
                                        <>
                                            <AsideBlock>
                                                <KaskoCarInfo step={step} garage={true}
                                                              notificationCount={0}
                                                              carName={''}
                                                              carModel={''}/>
                                            </AsideBlock>
                                        </> :
                                        <>
                                            <AsideBlock>
                                                <KaskoCarInfo step={step} garage={true}
                                                              notificationCount={step === 2 ? 1 : step === 3 ? 2 : 0}
                                                              carName={'Hyundai'}
                                                              carModel={'Sonata'}/>
                                            </AsideBlock>
                                            <AsideBlock>
                                                <KaskoCarInfo step={step} garage={true}
                                                              notificationCount={step === 2 ? 1 : step === 3 ? 2 : 0}
                                                              carName={'Mazda'}
                                                              carModel={'CX5'}/>
                                            </AsideBlock>
                                        </>
                                    }
                                </>
                                :
                                <>
                                    {carInfo}
                                    <AsideBlock>
                                        <KaskoCarInfo step={step} garage={true}
                                                      notificationCount={step === 2 ? 1 : step === 3 ? 2 : 0}
                                                      carName={'Hyundai'}
                                                      carModel={'Sonata'}/>
                                    </AsideBlock>
                                </>
                            }
                        </Col>

                        <Col span={16} className="kasko-main"/>

                        <Col span={4} className="kasko-aside">
                            {showOffers === false ?
                                null
                                :
                                <>
                                    {this.state.tabIndex === 0 ?
                                        <AsideBlock>
                                            <KaskoNotices step={step} credit={true} status={0} type={showOffers}/>
                                        </AsideBlock>
                                        : this.state.tabIndex === 1 ?
                                            <>
                                                <AsideBlock>
                                                    <KaskoNotice step={step}
                                                                 doc='СС 12345678'
                                                                 status={paymentStatus}
                                                                 consult={consultStatus}
                                                                 product='КАСКО' price='41 450 ₽' type={showOffers}/>
                                                </AsideBlock>
                                                <AsideBlock>
                                                    <KaskoNotice step={step}
                                                                 doc='СС 87654321'
                                                                 status={paymentStatus}
                                                                 consult={consultStatus}
                                                                 product='Е-ОСАГО' price='11 450 ₽'
                                                                 type={showOffers}/>
                                                </AsideBlock>
                                            </>
                                            : this.state.tabIndex === 2 ?
                                                <AsideBlock><KaskoNotices osago={true} step={step}
                                                                          showStatus={this.state.showStatus || status === 4}
                                                                          status={paymentStatus}
                                                                          consult={consultStatus}
                                                                          type={showOffers}/></AsideBlock>
                                                : this.state.tabIndex === 3 ?
                                                    <AsideBlock><ServiceNotices step={step}
                                                                                status={paymentStatus}
                                                                                consult={consultStatus}
                                                                                type={showOffers}/></AsideBlock>
                                                    : null
                                    }
                                </>
                            }

                            {this.state.tabIndex === 0 && step === 3 ?
                                <>
                                    <AsideBlockProduct callback={this.changeTabState} price={53719} name='КАСКО'
                                                       tabIndex={1}/>
                                    <AsideBlockProduct callback={this.changeTabState} price={9719} name='Е-ОСАГО'
                                                       tabIndex={1}/>
                                </>
                                : null
                            }

                            <AsideBlock>
                                <KaskoNotices noticeList={[{title: 'Сегодня, Пон 20.02.19', list: events}]}/>
                            </AsideBlock>
                        </Col>
                    </Row>
                    : null}

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

export default Kasko
