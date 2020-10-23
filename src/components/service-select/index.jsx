import React, {Component} from "react";
import {Col, Row, Button, Radio, Slider, Input, Tooltip} from "antd";
import './style.scss';
import PropTypes from "prop-types";
import moment from 'moment';
import ru from 'moment/locale/ru';
import KaskoOffers from "../kasko-offers";
import {Link} from "react-router-dom";
import {Switch, Checkbox} from "antd";
import CalculationPopup from "../calculation-popup";
import {formatMoney} from "../../helpers/formatMoney";
//import pluralFromArray from "../../helpers/pluralFromArray";
import CalculationOffers from "../calculation-offers";
import PaymentSwitch from "../payment-switch";
import DriverCount from "../driver-count";
import KaskoCarSelect from "../kasko-car-select";
import PopupOverlay from "../popup-overlay";
import ServicePopup from "../service-popup";
import ServiceOffers from "../service-offers";

moment().locale('ru', ru);

class ServiceSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carFound: void 0,
            fullCalculation: this.props.osago || (this.props.step === 2),
            showCalculationOffers: this.props.step > 1,
            showCarOptions: false,
            showParams: false,
            openParams: this.props.step === 3,
            SMSSent: true,
            calculationPopupOpened: false,
            formBusy: false,
            hasFranchise: this.props.step > 1,
            franchiseVal: 0,
            carCredit: true,
            carMark: '',
            carPrice: 0,
            carModel: '',
            SMSCode: '',
            carEquipment: '',
            carNumber: '',
            carYear: '',
            franchise: [
                10000,
                15000,
                30000,
                40000,
                50000,
                70000,
                100000
            ],
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
            showPayment: this.props.step === 1,
            showCompare: false,
            availablePayment: false,
            showMoreDamages: false,
            paramsChanged: true,
            selectedOffers: [],
            activeOffers: this.props.step === 2 ? [1] : []
        };
    }

    static propTypes = {
        children: PropTypes.node,
        type: PropTypes.any,
        innerWidth: PropTypes.number
    };

    imageCallback = (img) => {
        this.setState({carImage: img})
    }

    updateSelectedOffer = (company, offers) => {
        let offerList = this.state.selectedOffers;
        let compare = true;

        let companyOffers = offerList.find((c) => c.company === company)

        if (companyOffers) {
            for (let o in offers) {
                if (offers.hasOwnProperty(o)) {
                    let offer = offers[o]

                    if (offer) {
                        companyOffers.offers.push(o)
                    } else {
                        const index = companyOffers.offers.indexOf(o + '');
                        if (index > -1) {
                            companyOffers.offers.splice(index, 1);
                        }

                        if (!companyOffers.offers.length) {
                            for (let i = 0; i < offerList.length; i++) {
                                if (offerList[i].company === company) {
                                    offerList.splice(i, 1)
                                }

                            }
                        }
                    }
                }
            }

        } else {
            let arr = []

            for (let o in offers) {
                if (offers.hasOwnProperty(o)) {
                    let offer = offers[o]

                    if (offer) {
                        arr.push(o)
                    }
                }
            }

            offerList.push({company: company, offers: arr})
        }

        if (offerList.length === 1) {
            if (offerList[0].offers.length === 1) {
                compare = false
            }
        }

        this.setState({
            selectedOffers: offerList,
            showPayment: true,
            showCompare: offerList.length > 1 && compare,
            availablePayment: offerList.length > 0
        })
    }

    updatePaymentState = (value) => {
        console.log('updatePaymentState', value);
        if (this.state.showCalculationOffers) {
            this.setState({
                showCalculationOffers: true,
                showPayment: value
            })
        }

        if (this.props.osago) {
            this.setState({
                activeOffers: [1]
            })
        }

        this.toggleCalculationPopup()

        this.toggleCalculationOffers()
    }

    onSMSCodeChange = e => {
        this.setState({SMSCode: e.target.value})

        if (('' + e.target.value).length === 4) {
            window.location = '/service_done'
        }
    };

    onCalculationTypeChange = (checked) => {
        this.setState({
            fullCalculation: (this.props.step === 2) || checked
        })
    }

    addToCredit = () => {
        console.log('addToCredit', this.state.showCarOptions);
        //this.setState({showCarOptions: !this.state.showCarOptions})
    }

    toggleCarOptions = () => {
        console.log('toggleCarOptions', this.state.showCarOptions);
        this.setState({showCarOptions: !this.state.showCarOptions})
    }

    toggleCalculationPopup = () => {
        this.setState({fullCalculation: true})
        this.setState({calculationPopupOpened: !this.state.calculationPopupOpened})
        document.body.classList.toggle('no-overflow', !this.state.calculationPopupOpened)
    }

    toggleShowParams = () => {
        this.state.showCalculationOffers && this.setState({openParams: !this.state.openParams})
    }

    toggleSMSSent = () => {
        this.setState({SMSSent: !this.state.SMSSent})
    }

    calculationButtonText = () => {
        return (this.state.showPayment || (this.props.step === 2) || (this.props.osago && this.state.activeOffers.length)) ? 'Анкета ' + (this.props.osago ? 'ОСАГО' : 'КАСКО') + ' заполните 0 полей' : this.state.fullCalculation ? (this.props.osago ? 'Для расчета заполните 20 полей' : 'Для окончательного расчета заполните 20 полей') : 'Для расчета заполните  10 полей'
    }

    offersUpdate = (offer) => {
        let activeOffers = this.state.activeOffers

        if (offer.active) {
            activeOffers.push(offer.id)
        } else {
            const index = activeOffers.indexOf(offer.id);
            if (index > -1) {
                activeOffers.splice(index, 1);
            }
        }

        this.setState({
            activeOffers: activeOffers
            //paramsChanged: true
        });

        setTimeout(() => {
            console.log('offersUpdate', offer, this.state.activeOffers);
        }, 10)

    };

    toggleCalculationOffers = e => {
        if (this.state.paramsChanged) {
            this.setState({
                fullCalculation: true,
                showCalculationOffers: true,
                openParams: false
                //paramsChanged: false
            });
        }
    };

    onDamagesChange = (checkedValues) => {
        this.setState({
            //paramsChanged: true
        })
    }

    onShowMoreDamagesChange = (checkedValues) => {
        this.setState({
            showMoreDamages: !this.state.showMoreDamages
        })
    }

    onPeriodChange = (e) => {
        this.setState({
            //paramsChanged: true
        })
    }

    onFranchiseChange = e => {
        this.setState({
            //paramsChanged: true,
            hasFranchise: e.target.value > 0
        });
    };

    onFranchiseValueChange = val => {
        this.setState({
            franchiseVal: val
        })
    };

    onFranchiseTooltip = value => {
        //console.log('onFranchiseTooltip', value);

        return null // formatMoney(scaleValue(value, [0, 100], [this.state.franchise[0], this.state.franchise[this.state.franchise.length - 1]]))
    };

    onCarCreditChange = e => {
        this.setState({
            //paramsChanged: true,
            carCredit: !!e.target.value
        });
    };

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({behavior: "smooth"});
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        const {step, osago, popup} = this.props;
        let {image} = this.props;

        //const periodPlurals = ['месяц', 'месяца', 'месяцев'];
        const periodOptions = [12, 9, 6, 3];
        const damageOptions = ['Ущерб', 'Полная гибель', 'Угон', 'Шины/Диски', 'ЛКП', 'Стекла', 'Фары', 'Бамперы и зеркала'];
        const franchise = this.state.franchise;

        let franchiseSteps = {
            //10000 : '10 000',
            //15000 : '15 000',
            //30000 : '30 000',
            //40000 : '40 000',
            //50000 : '50 000',
            //70000 : '70 000',
            //100000: '100 000'
        }

        const optionsFixtures = [
            'эвакуация',
            'юридическая помощь',
            'аварийный комиссар',
            'подвоз бензина',
            'вскрытие автомобиля',
            'запуск автомобиля',
            'трезвый водитель',
            'выездной шиномонтаж'
        ]

        let calculationOfferList = [
            {
                name: 'Продленная гарантия',
                dealer: 'ВЭР',
                offers: [
                    {
                        name: 'Обычный',
                        franchise: 10000,
                        price: 41450,
                        period: '2 года',
                        payment: 'Наличные',
                        recipient: 'ООО ВЭР',
                        recipientInfo: 'ООО ВЭР длинное описание',
                        options: optionsFixtures
                    }
                ]
            },
            {
                name: 'Ассистанс',
                dealer: 'Ультра24',
                offers: [
                    {
                        name: 'Необычный',
                        franchise: 10000,
                        price: 30450,
                        period: '3 года',
                        payment: 'Наличные',
                        recipient: 'ИП Иванов',
                        recipientInfo: 'ИП Иванов длинное описание',
                        options: optionsFixtures
                    }
                ]
            }
        ]

        if (step === 3) {
            if (image !== false) {
                image = "Hyundai"
            }
        }

        franchise.forEach((f, i) => {
            const index = i === 0 ? 0 : i === franchise.length - 1 ? 100 : parseInt(i * (100 / ((franchise.length - 1) || 1)))

            franchiseSteps[index] = {
                label: <span
                    className={"kasko-car-select__franchise--label" + (index === this.state.franchiseVal ? " active" : "")}>{(i ? '' : 'до ') + formatMoney(f)}</span>
            }
        })

        let dealerOffers = <>
            <div onClick={() => {
                this.state.showCalculationOffers && this.toggleShowParams()
            }}
                 className={"kasko-car-select__caption" + (this.state.showCalculationOffers ? (this.state.openParams ? " expanded" : " collapsed") : "")}
            >Дополнительные продукты дилера
            </div>

            {!this.state.showCalculationOffers || this.state.openParams ?
                <>
                    <KaskoOffers onOfferSelect={this.offersUpdate} credit={true} slider={true} offersList={[
                        {
                            name: 'Продленная гарантия',
                            price: 11498,
                            prefix: '',
                            suffix: '₽'
                        },
                        {
                            name: 'Шоколад',
                            price: 10410,
                            prefix: '',
                            suffix: '₽'
                        },
                        {
                            name: 'Карта РАТ',
                            price: 10420,
                            prefix: '',
                            suffix: '₽'
                        },
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
                            price: 10420,
                            prefix: '',
                            suffix: '₽'
                        },
                        {
                            name: '123',
                            price: 10430,
                            prefix: '',
                            suffix: '₽'
                        }
                    ]}/>

                    <Row gutter={20}
                         className={"kasko-car-select__controls" + (this.state.showCalculationOffers ? " mb_30" : "")}>
                        <Col span={3}/>
                        <Col span={6}>
                            <div onClick={() => {
                                this.addToCredit()
                            }}
                                 className={"ant-btn btn_green fz_14 w_100p" + (this.state.activeOffers.length ? "" : " disabled")}
                            >Добавить в кредит
                            </div>
                        </Col>
                        <Col span={6}>
                            <div onClick={() => this.toggleCalculationPopup()}
                                 className={"ant-btn ant-btn-primary btn_middle w_100p" + (this.state.activeOffers.length ? "" : " disabled")}
                            >Заполнить анкету
                            </div>
                        </Col>
                    </Row>
                </>
                : null
            }
        </>

        return (
            <>
                <div className="kasko-car-select">
                    <h1 className="kasko-main__title"><span>Сервис меню</span></h1>

                    {popup ? null :
                        <div className="kasko-car-select__controls">
                            <span onClick={this.toggleCarOptions}
                                  className={"gl_link color_black kasko-car-select__controls--toggle " + (this.state.showCarOptions ? 'expanded' : 'collapsed')}>Автомобиль</span>
                        </div>
                    }

                    {this.state.showCarOptions ?
                        <KaskoCarSelect imageCallback={this.imageCallback} fill={true} step={step} image={image}/>
                        :
                        image === false ? null :
                            <div className="kasko-car-select__image">
                                <img src={'./cars/' + image + '.png'} alt=""/>
                            </div>
                    }

                    {step === 3 ? null : dealerOffers}

                    {this.state.showCalculationOffers ?
                        <>
                            <ServiceOffers allowCheck={true}
                                           completed={step === 3}
                                           waiting={step === 2} selectedOffer={this.updateSelectedOffer}
                                           offersList={calculationOfferList}/>

                            <Row gutter={20} className={"kasko-car-select__controls ant-row-center align_center"}>
                                {(step === 2) ?
                                    <>
                                        <>
                                            <Col span={6} className="text_left">
                                                <Tooltip overlayClassName="tooltip_v1" placement="bottomLeft"
                                                         title="Отменить операцию и вернуться к расчету">
                                                    <Link to="/" className={"ant-btn btn_green fz_14 w_100p"}>Вернуться
                                                        к расчету</Link>
                                                </Tooltip>
                                            </Col>
                                            <Col span={3}/>
                                        </>
                                        {
                                            this.state.SMSSent ?
                                                <>
                                                    <Col span={6}
                                                         className="text_center">
                                                        <div className="offer-select__sms">
                                                            <Input maxLength={4}
                                                                   className={"w_100p custom_placeholder" + (this.state.SMSCode.length ? "" : " _empty")}
                                                                   onChange={this.onSMSCodeChange}
                                                                   defaultValue=""/>
                                                            <div className="float_placeholder">Код подтверждения</div>
                                                            <div className="gl_link"
                                                                 onClick={this.toggleSMSSent}>Отправить код повторно
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col span={9}
                                                         className="kasko-car-select__controls--group-w text_left">
                                                        <p>
                                                            Попросите клиента продиктовать код, <br/>
                                                            который был отправлен ему <br/>
                                                            на мобильный телефон
                                                        </p>
                                                    </Col>
                                                </>
                                                :
                                                <>
                                                    <Col span={6}
                                                         className="text_center">
                                                        <Button htmlType="submit"
                                                                className={"ant-btn-primary btn_middle"}
                                                                onClick={this.toggleSMSSent}
                                                        >Оплатить в кассу</Button>
                                                    </Col>
                                                    <Col span={9}
                                                         className="text_right">
                                                        <div className={"gl_link"}>Отправить ссылку повторно</div>
                                                    </Col>
                                                </>
                                        }
                                    </>
                                    : null
                                }
                            </Row>

                            {(step === void 0) ?
                                <Row gutter={20} className="kasko-car-select__controls">
                                    <Col span={9}/>
                                    <Col span={6}>
                                        <a href={this.state.availablePayment ? ("/service_payment") : "#"}
                                           className={"ant-btn ant-btn-primary btn_middle" + ((this.state.availablePayment) ? "" : " disabled")}>{'Оплатить в кассу'}</a>
                                    </Col>
                                    <Col span={6}>
                                        <PaymentSwitch allowPayment={this.state.availablePayment} paymentStep={0}/>
                                    </Col>
                                </Row>
                                : null
                            }
                        </>
                        : null
                    }

                    {step === 3 ? dealerOffers : null}
                </div>

                <div ref={(el) => {
                    this.messagesEnd = el
                }}/>

                {this.state.calculationPopupOpened ?
                    <PopupOverlay span={16}>
                        <ServicePopup popupCallback={this.updatePaymentState} osago={osago} step={step}
                                      allFields={false}
                                      fullCalculation={this.state.showCalculationOffers || this.state.fullCalculation}
                                      popupCloseFunc={this.toggleCalculationPopup}/>
                    </PopupOverlay>
                    : null
                }
            </>
        );
    }
}

export default ServiceSelect;
