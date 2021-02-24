import React, {Component} from "react";
import {Col, Row, Button, Radio, Slider, Input, Tooltip} from "antd";
import './style.scss';
import PropTypes from "prop-types";
import moment from 'moment';
import ru from 'moment/locale/ru';
import KaskoOffers from "../kasko-offers";
import {Link} from "react-router-dom";
import {formatMoney} from "../../helpers/formatMoney";
import PaymentSwitch from "../payment-switch";
import PopupOverlay from "../popup-overlay";
import ServicePopup from "../service-popup";
import ServiceOffers from "../service-offers";

moment().locale('ru', ru);

class TabService extends Component {
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
        tabCallback: PropTypes.func,
        innerWidth: PropTypes.number
    };

    imageCallback = (img) => {
        this.setState({carImage: img})
    }

    updateSelectedOffer = (company, offers) => {
        console.log('updateSelectedOffer', company, offers);

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

        typeof this.props.tabCallback === 'function' && this.props.tabCallback({productCount: offerList.length})
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
            this.nextStep(3)
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

    nextStep = (step) => {
        console.log('nextStep', step);

        typeof this.props.tabCallback === 'function' && this.props.tabCallback({newStep: step})
    }

    toggleSMSSent = () => {
        this.setState({SMSSent: !this.state.SMSSent})
    }

    calculationButtonText = () => {
        return (this.state.showPayment || (this.props.step === 2) || (this.props.osago && this.state.activeOffers.length)) ? 'Анкета ' + (this.props.osago ? 'е-ОСАГО' : 'е-КАСКО') + ' заполните 0 полей' : this.state.fullCalculation ? (this.props.osago ? 'Для расчета заполните 20 полей' : 'Для окончательного расчета заполните 20 полей') : 'Для расчета заполните  10 полей'
    }

    offersUpdate = (offer) => {
        console.log('offersUpdate', offer);
        let activeOffers = this.state.activeOffers

        if (offer.active) {
            if (activeOffers.indexOf(offer.id) === -1) activeOffers.push(offer.id)
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

            typeof this.props.tabCallback === 'function' && this.props.tabCallback({productCount: this.state.activeOffers.length})
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

    scrollToBottom = () => {
        // window.scrollTo(0, 0); //this.messagesEnd.scrollIntoView({behavior: "smooth"});
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        //this.scrollToBottom();
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
                        dealerFee: 1800,
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
                        dealerFee: 3000,
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
                    <KaskoOffers opened={[0, 1, 2, 3, 4]} noCollapse={true} onOfferSelect={this.offersUpdate}
                                 credit={true} slider={true} offersList={[
                        {
                            name: 'Ассистанс',
                            price: '15400',
                            dealerFee: 'от 540 ₽',
                            collapse: true,
                            opened: true,
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
                            name: 'Продленная гарантия',
                            price: 11498,
                            dealerFee: 'от 540 ₽',
                            collapse: true,
                            opened: true,
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
                            prefix: '',
                            suffix: '₽'
                        },
                        {
                            name: 'Шоколад',
                            price: 10410,
                            dealerFee: 'от 540 ₽',
                            collapse: true,
                            opened: true,
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
                            prefix: '',
                            suffix: '₽'
                        },
                        {
                            name: 'Чечевица',
                            price: 10420,
                            dealerFee: 'от 540 ₽',
                            collapse: true,
                            opened: true,
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
                            prefix: '',
                            suffix: '₽'
                        },
                        {
                            name: 'Карта РАТ',
                            price: 10420,
                            dealerFee: 'от 540 ₽',
                            collapse: true,
                            opened: true,
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
                            prefix: '',
                            suffix: '₽'
                        }
                    ]}/>

                    <Row gutter={20}
                         className={"kasko-car-select__controls ant-row-center" + (this.state.showCalculationOffers ? " mb_30" : "")}>
                        <Col span={6}>
                            <Button onClick={() => this.toggleCalculationPopup()}
                                    disabled={this.state.activeOffers.length ? null : "disabled"}
                                    className={"ant-btn ant-btn-primary btn_middle w_100p"}
                            >Оформить</Button>
                        </Col>
                    </Row>
                </>
                : null
            }
        </>

        return (
            <>
                <div className="kasko-car-select">
                    {dealerOffers}

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
                                                <Row gutter={20}
                                                     className={"kasko-car-select__extra"}>
                                                    <Col className="">
                                                        <Tooltip overlayClassName="tooltip_v1"
                                                                 placement="top"
                                                                 title="Отказ клиента">
                                                            <Button
                                                                className={"ant-btn ant-btn-sm btn-cancel"}>
                                                                <span className={"i-close"}/></Button>
                                                        </Tooltip>
                                                    </Col>
                                                    {/*<Col className="">*/}
                                                    {/*    <Tooltip overlayClassName="tooltip_v1"*/}
                                                    {/*             placement="top"*/}
                                                    {/*             title="Сохранить расчет">*/}
                                                    {/*        <Button*/}
                                                    {/*            className={"ant-btn ant-btn-sm btn-action"}>*/}
                                                    {/*            <span className={"i-save"}/></Button>*/}
                                                    {/*    </Tooltip>*/}
                                                    {/*</Col>*/}
                                                </Row>
                                                {/*<Tooltip overlayClassName="tooltip_v1" placement="bottomLeft"*/}
                                                {/*         title="Отменить операцию и вернуться к расчету">*/}
                                                {/*    <Button onClick={() => {*/}
                                                {/*        this.nextStep(void 0)*/}
                                                {/*    }} className={"ant-btn btn_green fz_14 w_100p"}*/}
                                                {/*    >Вернуться к расчету</Button>*/}
                                                {/*</Tooltip>*/}
                                            </Col>
                                            <Col span={3}/>
                                        </>
                                        {
                                            this.state.SMSSent ?
                                                <>
                                                    <Col span={8}
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
                                                    <Col span={8}
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

                            {(step === void 0 || step === 1) ?
                                <Row gutter={20} className="kasko-car-select__controls">
                                    <Col span={9}/>
                                    <Col span={6}>
                                        <div onClick={() => {
                                            this.state.availablePayment && this.nextStep(2)
                                        }}
                                             className={"ant-btn ant-btn-primary btn_middle w_100p" + ((this.state.availablePayment) ? "" : " disabled")}>{'Оплатить в кассу'}</div>
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

export default TabService;
