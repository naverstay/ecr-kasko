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
import ConfirmationPopup from "../confirmation-popup";
import {formatMoney} from "../../helpers/formatMoney";
import * as Litepicker from 'litepicker';
//import pluralFromArray from "../../helpers/pluralFromArray";
import CalculationOffers from "../calculation-offers";
import PaymentSwitch from "../payment-switch";
import DriverCount from "../driver-count";
import KaskoCarSelect from "../kasko-car-select";
import PopupOverlay from "../popup-overlay";
import FormInput from "../form-input";
import PolicyPopup from "../policy-popup";
import CalculationOffersCombo from "../calculation-offers-combo";
import CalculationOffersEosago from "../calculation-offers-eosago";
import FormCheckbox from "../form-checkbox";

moment().locale('ru', ru);

class TabOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carFound: void 0,
            fullCalculation: this.props.osago || (this.props.step === 2),
            showCalculationOffers: this.props.step > 1,
            showCarOptions: false,
            showParams: false,
            openParams: true,
            singleSelection: true,
            SMSSent: true,
            declinedByProvider: false,
            refusalPopupOpened: false,
            confirmationPopupOpened: false,
            calculationPopupOpened: false,
            policyPopupOpened: false,
            formBusy: false,
            hasFranchise: this.props.step > 1,
            franchiseVal: 0,
            carCredit: true,
            clientEOSAGOAgreement: false,
            carMark: '',
            carPrice: 0,
            carModel: '',
            SMSCode: '',
            carEquipment: '',
            carNumber: '',
            carYear: '',
            carOsagoStart: '',
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
            showPayment: this.props.osago ? this.props.step > 1 : false,
            showCompare: false,
            availableAddCredit: false,
            availableCashier: false,
            availablePayment: false,
            showMoreDamages: false,
            paramsChanged: true,
            selectedOffers: [],
            activeOffers: this.props.step > 1 ? [1] : []
        };
    }

    static propTypes = {
        children: PropTypes.node,
        type: PropTypes.any,
        addCreditCallback: PropTypes.func,
        innerWidth: PropTypes.number
    };

    pickerRef = React.createRef();

    imageCallback = (img) => {
        this.setState({carImage: img})
    }

    updateSelectedOffer = (company, offers, disableCashierPayment) => {
        let offerList = this.state.singleSelection ? [] : this.state.selectedOffers;
        let compare = true;

        let companyOffers = offerList.find((c) => c.company === company)

        console.log('updateSelectedOffer tab', company, offers, disableCashierPayment, companyOffers);

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
            let arr = [];

            for (let o in offers) {
                if (offers.hasOwnProperty(o)) {
                    let offer = offers[o]

                    if (offer) {
                        arr.push(o)
                    }
                }
            }

            if (arr.length) {
                offerList.push({company: company, offers: arr})
            }
        }

        if (this.state.showPayment || this.props.osago) {
            if (offerList.length === 1) {
                if (offerList[0].offers.length === 1) {
                    compare = false
                }
            }

            this.setState({
                selectedOffers: offerList,
                showPayment: true,
                showCompare: offerList.length > 1 && compare,
                availableCashier: !disableCashierPayment,
                availablePayment: offerList.length > 0
            })
        } else {
            this.setState({
                availableAddCredit: offerList.length > 0
            })
        }
    }

    updatePolicyState = () => {
        console.log('updatePolicyState')
        this.togglePolicyPopup()
        this.props.tabCallback({newStep: 3})
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

        typeof this.props.tabCallback === 'function' && this.props.tabCallback({updatePaymentState: 1})
    }

    formControlCallback = (name, value) => {
        console.log('formControlCallback', name, value);

        switch (name) {
            case 'SMSCode':
                this.setState({SMSCode: value});
                if (('' + value).length === 4) {
                    this.nextStep(3)
                }
                break;
            case 'clientEOSAGOAgreement':
                this.setState({clientEOSAGOAgreement: value});
                break;
        }
    };

    toggleCarOptions = () => {
        console.log('toggleCarOptions', this.state.showCarOptions);
        this.setState({showCarOptions: !this.state.showCarOptions})
    }

    addToCredit = () => {
        console.log('addToCredit');
        this.setState({calculationPopupOpened: !this.state.calculationPopupOpened})
        document.body.classList.toggle('no-overflow', !this.state.calculationPopupOpened)
        typeof this.props.addCreditCallback === 'function' && this.props.addCreditCallback()
    }

    toggleClientConfirmationPopup = (rslt) => {
        console.log('toggleClientConfirmationPopup', rslt);
        //this.setState({fullCalculation: true})
        this.setState({confirmationPopupOpened: !this.state.confirmationPopupOpened})
        document.body.classList.toggle('no-overflow', !this.state.confirmationPopupOpened)

        if (rslt === true) {
            this.props.tabCallback({newStep: 3})
        }
    }

    toggleDeclinedByProvider = () => {
        console.log('toggleDeclinedByProvider');
        this.setState({declinedByProvider: !this.state.declinedByProvider})
    }

    toggleClientRefusalPopup = (value) => {
        console.log('toggleClientRefusalPopup', value);
        //this.setState({fullCalculation: true})
        this.setState({refusalPopupOpened: !this.state.refusalPopupOpened})
        document.body.classList.toggle('no-overflow', !this.state.refusalPopupOpened)

        if (value === false) {
            this.setState({refusedByClient: true});

            typeof this.props.tabCallback === 'function' && this.props.tabCallback({updatePaymentState: 4})
        }
    }

    toggleCalculationPopup = () => {
        //this.setState({fullCalculation: true})
        this.setState({calculationPopupOpened: !this.state.calculationPopupOpened})
        document.body.classList.toggle('no-overflow', !this.state.calculationPopupOpened)
    }

    togglePolicyPopup = () => {
        //this.setState({fullCalculation: true})
        this.setState({policyPopupOpened: !this.state.policyPopupOpened})
        document.body.classList.toggle('no-overflow', !this.state.policyPopupOpened)
    }

    toggleShowParams = () => {
        this.state.showCalculationOffers && this.setState({openParams: !this.state.openParams})
    }

    nextStep = (step) => {
        console.log('nextStep', step);

        typeof this.props.tabCallback === 'function' && this.props.tabCallback({newStep: step})
    }

    changeTab = (tab) => {
        console.log('nextStep', tab);

        typeof this.props.tabCallback === 'function' && this.props.tabCallback({tabIndex: tab})
    }

    toggleSMSSent = () => {
        this.setState({SMSSent: !this.state.SMSSent})
    }

    calculationButtonText = () => {
        return (this.state.showPayment || (this.props.step === 2) || (this.props.osago && this.state.activeOffers.length)) ? 'Анкета ' + (this.props.osago ? 'ОСАГО' : 'КАСКО') + ' заполните 0 полей' : this.state.fullCalculation ? (this.props.osago ? 'Для расчета заполните 20 полей' : 'Для окончательного расчета заполните 20 полей') : 'Для предварительного расчета заполните 10 полей'
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

    onKaskoOsagoChange = e => {
        console.log('onKaskoOsagoChange', e);
    };

    scrollToBottom = () => {
        // window.scrollTo(0, 0); //this.messagesEnd.scrollIntoView({behavior: "smooth"});
    }

    initDatePicker() {
        let that = this;
        let dataFormat = 'DD.MM.YYYY';
        this.scrollToBottom();

        let inp = document.getElementById('osago_date_start');

        if (inp && !inp.classList.contains('has_lite_picker')) {
            inp.classList.add('has_lite_picker');

            let lp = new Litepicker({
                element: inp,
                parentEl: inp.parentNode,
                format: dataFormat,
                lang: 'ru-RU',
                minDate: '01.05.2019',
                maxDate: '16.10.2021',
                singleMode: true,
                //autoApply: false,
                dropdowns: {
                    minYear: 2019,
                    maxYear: null,
                    months: false,
                    years: false
                },
                onSelect: function (date) {
                    let dt = moment(date).format(dataFormat);
                    console.log(date, dt);

                    that.setState({carOsagoStart: dt});

                    inp.classList.add('_has-value');
                }
            });

            console.log('init', lp);
        } else {
            console.log('skip', inp);
        }
    }

    componentDidMount() {
        // todo dev
        //this.props.tabCallback({newStep: 2});

        this.initDatePicker();
    }

    componentDidUpdate() {
        //this.scrollToBottom();

        this.initDatePicker();
    }

    render() {
        let {step, osago, popup, combo, eosago} = this.props;
        let {image} = this.props;

        console.log('tab-offer step', step);

        //const periodPlurals = ['месяц', 'месяца', 'месяцев'];
        const dateFormatMask = "'mask': '99.99.9999', 'showMaskOnHover': 'false'";
        const periodOptions = [12, 9, 6, 3];
        const damageOptions = ['Ущерб', 'Полная гибель', 'Угон', 'Шины/Диски', 'ЛКП', 'Стекла', 'Фары', 'Бамперы и зеркала'];
        const insuranceList = ['КАСКО', 'GAP', 'ОСАГО'];
        const franchise = this.state.franchise;

        let calendarBtn = <span className={'input-icon'}><label htmlFor="osago_date_start"
                                                                className={'input-icon__btn i-calendar'}/></span>;

        let comboInsurance = <Checkbox.Group
            defaultValue={insuranceList.map((o, i) => i)}
            onChange={this.onKaskoOsagoChange}>
            <Row gutter={20}>
                {
                    <>
                        {
                            insuranceList.map((c, i) =>
                                <Col key={i}>
                                    <Checkbox
                                        value={i}>{c}</Checkbox>
                                </Col>
                            )
                        }
                    </>
                }
            </Row>
        </Checkbox.Group>

        let driverOptions = [];

        if (step > 1 || this.state.showCalculationOffers) {
            driverOptions = ['Фомин Сергей М.', 'Фомина Алла К.', 'Фомина Марина Ф.']
        }

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
            'Территория страхования: РФ + СНГ',
            'Сбор справок',
            'Эвакуатор',
            'Круглосуточная консультация',
            'Сбор справок',
            'Несчастный случай: 300 000  ₽',
            'ДТП',
            'Пожар',
            'Повреждение отскочившим или упавшим предметом',
            'Стихийное бедствие',
            'Противоправные действия третьих лиц',
            'Действия животных',
            'Провал под грунт',
            'Техногенная авария',
            'Подтопление'
        ]

        let calculationOfferList = [
            {
                logo: './logo/ingosstrakh.png',
                offers: [
                    {
                        name: 'Обычный',
                        franchise: 10000,
                        price: 41450,
                        dealerFee: 4145,
                        options: optionsFixtures
                    },
                    {
                        name: 'Обычный 2',
                        franchise: 10000,
                        price: 51450,
                        dealerFee: 5145,
                        options: optionsFixtures
                    },
                    {
                        name: 'Обычный 3',
                        franchise: 10000,
                        price: 61450,
                        dealerFee: 6145,
                        options: optionsFixtures
                    },
                    {
                        name: '',
                        franchise: 10000,
                        price: 11455,
                        dealerFee: 1146,
                        options: optionsFixtures
                    },
                    {
                        name: 'Обычный 5',
                        franchise: 10000,
                        price: 21450,
                        dealerFee: 2145,
                        options: optionsFixtures
                    },
                    {
                        name: '',
                        franchise: 10000,
                        price: 31450,
                        dealerFee: 3145,
                        options: optionsFixtures
                    }
                ]
            },
            {
                logo: './logo/bck.png',
                offers: [
                    {
                        name: 'Необычный',
                        franchise: 10000,
                        price: 30450,
                        dealerFee: 3045,
                        options: optionsFixtures
                    },
                    {
                        name: 'Необычный 2',
                        franchise: 10000,
                        price: 30450,
                        dealerFee: 3045,
                        options: optionsFixtures
                    },
                    {
                        name: 'Необычный 3',
                        franchise: 10000,
                        price: 30450,
                        dealerFee: 3045,
                        options: optionsFixtures
                    }
                ]
            }
        ]

        let calculationOfferComboList = [
            {
                name: 'Ингосстрах',
                fillColor: '#ff9c2d',
                capLetter: 'И',
                offers: [
                    {
                        name: '',
                        type: 'КАСКО+GAP+ОСАГО',
                        credit: null,
                        megashare: '-7%',
                        price: '52 500',
                        dealerFee: '4 145',
                        options: optionsFixtures
                    },
                    {
                        list: [
                            {
                                name: 'Премиум',
                                type: 'КАСКО',
                                credit: false,
                                price: '51 450',
                                dealerFee: '5 145',
                                options: optionsFixtures
                            },
                            {
                                name: '',
                                type: 'КАСКО',
                                credit: false,
                                price: '31 450',
                                dealerFee: '3 145',
                                options: optionsFixtures
                            },
                            {
                                name: 'Премиум',
                                type: 'КАСКО',
                                credit: true,
                                price: '51 450',
                                dealerFee: '5 145',
                                options: optionsFixtures
                            },
                            {
                                name: 'Обычный 10',
                                type: 'КАСКО',
                                credit: false,
                                price: '31 450',
                                dealerFee: '3 145',
                                options: optionsFixtures
                            },
                            {
                                name: '+Премиум',
                                type: 'КАСКО',
                                credit: true,
                                price: '51 450',
                                dealerFee: '5 145',
                                options: optionsFixtures
                            },
                            {
                                name: 'Обычный 10',
                                type: 'КАСКО',
                                credit: false,
                                price: '31 450',
                                dealerFee: '3 145',
                                options: optionsFixtures
                            }
                        ]
                    },
                    {
                        name: '',
                        type: 'ОСАГО',
                        credit: null,
                        price: '11 450',
                        dealerFee: '1 145',
                        options: optionsFixtures
                    }
                ]
            },
            {
                name: 'ВСК',
                fillColor: '#0067af',
                capLetter: 'В',
                offers: [
                    {
                        name: '',
                        type: 'КАСКО+GAP+ОСАГО',
                        credit: null,
                        price: '30 450',
                        dealerFee: '3 045',
                        options: optionsFixtures
                    },
                    {
                        list: [
                            {
                                name: 'Премиум',
                                type: 'КАСКО',
                                credit: false,
                                price: '51 450',
                                dealerFee: '5 145',
                                options: optionsFixtures
                            },
                            {
                                name: '',
                                type: 'КАСКО',
                                credit: false,
                                price: '31 450',
                                dealerFee: '3 145',
                                options: optionsFixtures
                            },
                            {
                                name: 'Премиум',
                                type: 'КАСКО',
                                credit: true,
                                price: '51 450',
                                dealerFee: '5 145',
                                options: optionsFixtures
                            },
                            {
                                name: 'Обычный 10',
                                type: 'КАСКО',
                                credit: false,
                                price: '31 450',
                                dealerFee: '3 145',
                                options: optionsFixtures
                            },
                            {
                                name: '+Премиум',
                                type: 'КАСКО',
                                credit: true,
                                price: '51 450',
                                dealerFee: '5 145',
                                options: optionsFixtures
                            },
                            {
                                name: 'Обычный 10',
                                type: 'КАСКО',
                                credit: false,
                                price: '31 450',
                                dealerFee: '3 145',
                                options: optionsFixtures
                            }
                        ]
                    },
                    {
                        name: '',
                        type: 'ОСАГО',
                        credit: null,
                        price: '30 450',
                        dealerFee: '3 045',
                        options: optionsFixtures
                    }
                ]
            },
            {
                name: 'МАКС',
                fillColor: '#cc525a',
                capLetter: 'М',
                offers: [
                    {
                        name: '',
                        type: 'КАСКО+GAP+ОСАГО',
                        credit: null,
                        share: 'Экономия 4 500',
                        price: '52 500',
                        dealerFee: '4 145',
                        options: optionsFixtures
                    },
                    {
                        list: [
                            {
                                name: 'Премиум',
                                type: 'КАСКО',
                                credit: false,
                                price: '51 450',
                                dealerFee: '5 145',
                                options: optionsFixtures
                            },
                            {
                                name: '',
                                type: 'КАСКО',
                                credit: false,
                                price: '31 450',
                                dealerFee: '3 145',
                                options: optionsFixtures
                            },
                            {
                                name: 'Премиум',
                                type: 'КАСКО',
                                credit: true,
                                price: '51 450',
                                dealerFee: '5 145',
                                options: optionsFixtures
                            },
                            {
                                name: 'Обычный 10',
                                type: 'КАСКО',
                                credit: false,
                                price: '31 450',
                                dealerFee: '3 145',
                                options: optionsFixtures
                            },
                            {
                                name: '+Премиум',
                                type: 'КАСКО',
                                credit: true,
                                price: '51 450',
                                dealerFee: '5 145',
                                options: optionsFixtures
                            },
                            {
                                name: 'Обычный 10',
                                type: 'КАСКО',
                                credit: false,
                                price: '31 450',
                                dealerFee: '3 145',
                                options: optionsFixtures
                            }
                        ]
                    },
                    {
                        name: '',
                        type: 'ОСАГО',
                        credit: null,
                        price: '30 450',
                        dealerFee: '3 045',
                        options: optionsFixtures
                    }
                ]
            }
        ]

        if (osago) {
            calculationOfferComboList = [
                {
                    name: 'Ингосстрах',
                    fillColor: '#ff9c2d',
                    capLetter: 'И',
                    offers: [
                        {
                            name: '',
                            type: 'ОСАГО',
                            credit: null,
                            document: 'СС 12345678',
                            price: '11 452',
                            dealerFee: '1 145',
                            dateStart: '20.02.19',
                            dateEnd: '19.02.20',
                            disableCashierPayment: true,
                            options: optionsFixtures
                        }
                    ]
                },
                {
                    name: 'ВСК',
                    fillColor: '#0067af',
                    capLetter: 'В',
                    offers: [
                        {
                            name: '',
                            type: 'ОСАГО',
                            document: 'СС 81234567',
                            credit: null,
                            price: '30 450',
                            dealerFee: '3 045',
                            dateStart: '20.02.19',
                            dateEnd: '19.02.20',
                            options: optionsFixtures
                        }
                    ]
                }
            ]
        }

        if ((!osago || step > 2) && step > 1) {
            calculationOfferList = [
                {
                    logo: './logo/ingosstrakh.png',
                    offers: [
                        {
                            name: 'Обычный',
                            franchise: 10000,
                            price: 41450,
                            dealerFee: 4145,
                            dateStart: '20.02.19',
                            dateEnd: '19.02.20',
                            options: optionsFixtures
                        }
                    ]
                }
            ];

            var someOffers = [
                {
                    name: 'Премиум',
                    type: 'КАСКО',
                    payment: 'Наличные',
                    price: 49850,
                    dealerFee: 4985,
                    share: 'Экономия 4 500',
                    dateStart: '20.02.19',
                    dateEnd: '19.02.20',
                    options: optionsFixtures
                },
                {
                    type: 'ОСАГО',
                    payment: 'Наличные',
                    nobill: true,
                    price: 46550,
                    dealerFee: 4655,
                    dateStart: '20.02.19',
                    dateEnd: '19.02.20'
                }
            ];

            calculationOfferComboList = [
                {
                    name: 'Ингосстрах',
                    fillColor: '#ff9c2d',
                    capLetter: 'И',
                    offers: someOffers
                }
            ]
        }

        for (let i = 0; i < calculationOfferComboList.length; i++) {
            let comp = calculationOfferComboList[i];
            let find = this.state.selectedOffers.filter((c) => c.company === i);

            for (let j = 0; j < comp.offers.length; j++) {
                let off = comp.offers[j];
                off.selected = find.length ? !!find[0].offers.filter((o) => {
                    console.log('o.index === j', o, j);
                    return +o === j
                }).length : false
            }

            console.log('comp', comp, find);
        }

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
        });

        let paramsBlock = <>
            {!osago ?
                <>
                    {/*<div className="kasko-car-select__caption">{'Добавить в КАСКО'}</div>*/}

                    <KaskoOffers step={step} active={[0, 1, 4, 5, 6]}
                                 onOfferSelect={this.offersUpdate} credit={true} slider={true}
                                 offersList={[
                                     {
                                         name: 'GAP',
                                         price: 11400,
                                         prefix: '',
                                         plus: true,
                                         suffix: '₽'
                                     },
                                     {
                                         name: 'Несчастный случай',
                                         price: 10410,
                                         prefix: '',
                                         plus: true,
                                         suffix: '₽'
                                     },
                                     {
                                         name: 'Аварийный комиссар',
                                         price: 10420,
                                         prefix: '',
                                         plus: true,
                                         suffix: '₽'
                                     },
                                     {
                                         name: 'Стекла без справок',
                                         price: 10430,
                                         prefix: '',
                                         plus: true,
                                         suffix: '₽'
                                     },
                                     {
                                         name: 'ОСАГО',
                                         price: 10410,
                                         prefix: '',
                                         plus: true,
                                         suffix: '₽'
                                     },
                                     {
                                         name: 'Шоколад',
                                         price: 10420,
                                         prefix: '',
                                         plus: true,
                                         suffix: '₽'
                                     },
                                     {
                                         name: '123',
                                         price: 10430,
                                         prefix: '',
                                         plus: true,
                                         suffix: '₽'
                                     }
                                 ]}/>
                </>
                : null}

            {!osago ? <div onClick={this.toggleShowParams}
                           className={"kasko-car-select__caption" + (this.state.showCalculationOffers ? (this.state.openParams ? " expanded" : " collapsed") : "")}>{'Параметры ' + (eosago ? 'E-ОСАГО' : (combo ? 'страхования' : 'КАСКО'))}</div> :
                <div onClick={this.toggleShowParams}
                     className={"kasko-car-select__caption" + (this.state.showCalculationOffers ? (this.state.openParams ? " expanded" : " collapsed") : "")}>{'Параметры ' + (eosago ? 'E-ОСАГО' : (combo ? 'страхования' : 'ОСАГО'))}</div>
            }

            {(!this.state.showCalculationOffers || this.state.openParams || osago) ?
                <>
                    {!osago ?
                        <>
                            {combo ?
                                <>
                                    {this.state.showCalculationOffers ? null :
                                        <div className="kasko-car-select__controls check_v2 mb_0">{comboInsurance}</div>
                                    }
                                </>
                                :
                                <div className="kasko-car-select__controls radio_v2 wide_group mb_0">
                                    <Radio.Group defaultValue={popup ? 1 : 0} className={"w_100p"}
                                                 onChange={this.onCarCreditChange}>
                                        <Row gutter={20}>
                                            <Col>
                                                <Radio value={1}>В кредит</Radio>
                                            </Col>
                                            <Col>
                                                <Radio value={0}>За наличные</Radio>
                                            </Col>
                                        </Row>
                                    </Radio.Group>
                                </div>
                            }

                            <div className="kasko-car-select__controls radio_v2 wide_group">
                                <Radio.Group defaultValue={this.state.hasFranchise ? 1 : 0}
                                             onChange={this.onFranchiseChange}>
                                    <Row gutter={20}>
                                        <Col>
                                            <Radio value={0}>Без франшизы</Radio>
                                        </Col>
                                        <Col>
                                            <Radio value={1}>Франшиза с 1 случая</Radio>
                                        </Col>
                                        <Col>
                                            <Radio value={2}>Франшиза со 2 случая</Radio>
                                        </Col>

                                        {this.state.hasFranchise ?
                                            <Col className={"kasko-car-select__controls--flex-1"}>
                                                <Slider className="kasko-car-select__franchise"
                                                        step={null}
                                                        tooltipVisible={false}
                                                        tipFormatter={this.onFranchiseTooltip}
                                                        onAfterChange={this.onFranchiseValueChange}
                                                        marks={franchiseSteps}
                                                        defaultValue={franchiseSteps[2]}/>
                                            </Col>
                                            : null
                                        }
                                    </Row>
                                </Radio.Group>
                            </div>

                            <div className="kasko-car-select__controls check_v2 mb_10">
                                <Checkbox.Group defaultValue={damageOptions.map((o, i) => i)}
                                                onChange={this.onDamagesChange}>
                                    <Row gutter={20}>
                                        {
                                            <>
                                                {
                                                    damageOptions.slice(0, (this.state.showMoreDamages ? damageOptions.length : 3)).map((c, i) =>
                                                        <Col key={i}>
                                                            <Checkbox value={i}>{c}</Checkbox>
                                                        </Col>
                                                    )
                                                }
                                                <Col>
                                                    <div className="kasko-offer__more">
                                                        <div onClick={this.onShowMoreDamagesChange}
                                                             className="gl_link">{this.state.showMoreDamages ? "Скрыть" : "Показать еще"}</div>
                                                    </div>
                                                </Col>
                                            </>
                                        }
                                    </Row>
                                </Checkbox.Group>
                            </div>
                        </>
                        : null}

                    {(!osago || this.state.openParams) ?
                        <>
                            {eosago ? null :
                                <div className={"kasko-car-select__caption fz_12"}>Срок действия, месяцы</div>
                            }

                            <Row gutter={20} className="kasko-car-select__controls radio_v3">
                                {eosago ? null :
                                    <Col span={12}>
                                        <Radio.Group defaultValue={periodOptions[0]}
                                                     style={{width: '100%'}}
                                                     onChange={this.onPeriodChange}>
                                            <Row gutter={20}>
                                                {
                                                    periodOptions.map((c, i) => <Col key={i}>
                                                            <Radio value={c}>
                                                    <span
                                                        className="kasko-car-select__period--value">{c}</span>
                                                                {/*<span className="kasko-car-select__period--label">{pluralFromArray(periodPlurals, c)}</span>*/}
                                                            </Radio>
                                                        </Col>
                                                    )
                                                }
                                            </Row>
                                        </Radio.Group>
                                    </Col>
                                }
                                <Col span={6}>
                                    <Row gutter={20}>
                                        <FormInput span={24}
                                                   preInput={calendarBtn}
                                                   onChangeCallback={this.formControlCallback}
                                                   inputmask={dateFormatMask}
                                                   ref={this.pickerRef}
                                                   id="osago_date_start"
                                                   placeholder={"Дата начала действия \n ОСАГО"}
                                                   controlName={'carOsagoStart'}
                                                   value={(this.state.carOsagoStart)}/>
                                    </Row>
                                </Col>
                            </Row>

                            <DriverCount className={this.state.showCalculationOffers && !osago ? "mb_0" : ""}
                                         step={step}
                                         extraData={true}
                                         driverOptions={driverOptions}>
                                {step > 1 || this.state.showCalculationOffers ?
                                    <Col>
                                        <div className="kasko-offer__more">
                                            <span onClick={this.toggleCalculationPopup}
                                                  className="gl_link">Анкета КАСКО</span>
                                        </div>
                                    </Col>
                                    : null}
                            </DriverCount>

                            {this.state.showCalculationOffers ? null :
                                <>
                                    <Row gutter={20}
                                         className={"kasko-car-select__controls mb_45" + (osago ? "" : " ant-row-center")}>
                                        {osago ?
                                            <>
                                                <Col span={3}>
                                                    <Row gutter={20} className={"kasko-car-select__extra"}>
                                                        <Col className="">
                                                            <Tooltip overlayClassName="tooltip_v1" placement="top"
                                                                     title="Отказ клиента">
                                                                <Button className={"ant-btn ant-btn-sm btn-cancel"}
                                                                        onClick={this.toggleClientRefusalPopup}
                                                                ><span className={"i-close"}/></Button>
                                                            </Tooltip>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col span={6}>
                                                    <Button to="/credit_kasko"
                                                            onClick={this.togglePolicyPopup}
                                                            className={"w_100p ant-btn"}
                                                    >Внести полис вручную</Button>
                                                </Col>
                                            </>
                                            :
                                            <Col span={6}>
                                                <Button className={"w_100p ant-btn"}
                                                >Отказ клиента</Button>
                                            </Col>
                                        }
                                        <Col span={9}>
                                            <Button htmlType="submit"
                                                    className={"w_100p" + (((this.state.showPayment || (this.props.step === 2) || (this.props.osago && this.state.activeOffers.length))) ? " btn_green" : " ant-btn-primary")}
                                                    onClick={this.toggleCalculationPopup}>{this.calculationButtonText()}</Button>
                                        </Col>
                                        {osago ? null :
                                            <Col span={6}>
                                                <Button to="/credit_kasko"
                                                        onClick={this.togglePolicyPopup}
                                                        className={"w_100p ant-btn"}
                                                >Внести полис вручную</Button>
                                            </Col>
                                        }
                                    </Row>
                                </>
                            }

                            {/*<div className="kasko-car-select__controls ant-row-center">*/}
                            {/*	<div onClick={this.toggleCalculationOffers} className={"ant-btn ant-btn-primary btn_middle margin" + ((step !== 2 && this.state.paramsChanged) ? "" : " disabled")}>Получить расчет</div>*/}
                            {/*</div>*/}

                        </>
                        : null}
                </>
                : null
            }
        </>

        return (
            <>
                <div className="kasko-car-select">
                    {step === 3 ?
                        <>
                            {combo ?
                                <>
                                    {paramsBlock}

                                    {osago ? null :
                                        <div className="kasko-car-select__controls check_v2">{comboInsurance}</div>
                                    }

                                    <Row gutter={20}>
                                        <Col span={3}/>
                                        <Col span={18}>
                                            <CalculationOffersEosago allowCheck={true}
                                                                     step={step}
                                                                     completed={true}
                                                                     osago={osago}
                                                                     hasSortType={!osago}
                                                                     eosago={true}
                                                                     selectedOffer={this.updateSelectedOffer}
                                                                     offersList={[
                                                                         {
                                                                             name: 'Ингосстрах',
                                                                             fillColor: '#ff9c2d',
                                                                             capLetter: 'И',
                                                                             offers: osago ?
                                                                                 [{
                                                                                     name: 'Обычный',
                                                                                     type: 'ОСАГО',
                                                                                     document: 'СС 12345678',
                                                                                     payment: 'Наличные',
                                                                                     price: 41450,
                                                                                     dealerFee: 4145,
                                                                                     dateStart: '20.02.19',
                                                                                     dateEnd: '19.02.20',
                                                                                     options: optionsFixtures
                                                                                 }]
                                                                                 :
                                                                                 [{
                                                                                     name: 'Премиум',
                                                                                     type: 'КАСКО',
                                                                                     document: 'СС 12345678',
                                                                                     payment: 'Наличные',
                                                                                     price: 41450,
                                                                                     dealerFee: 4145,
                                                                                     share: 'Экономия 4 500',
                                                                                     dateStart: '20.02.19',
                                                                                     dateEnd: '19.02.20',
                                                                                     options: optionsFixtures
                                                                                 },
                                                                                     {
                                                                                         name: 'Обычный',
                                                                                         type: 'ОСАГО',
                                                                                         document: 'СС 87654321',
                                                                                         price: 41450,
                                                                                         dealerFee: 4145,
                                                                                         nobill: true,
                                                                                         dateStart: '20.02.19',
                                                                                         dateEnd: '19.02.20'
                                                                                     }
                                                                                 ]
                                                                         }
                                                                     ]}/>

                                        </Col>
                                    </Row>

                                    {/*<CalculationOffersCombo osago={osago} completed={true}*/}
                                    {/*                        selectedOffer={this.updateSelectedOffer} offersList={[*/}
                                    {/*    {*/}
                                    {/*        name: 'Ингосстрах',*/}
                                    {/*        fillColor: '#ff9c2d',*/}
                                    {/*        capLetter: 'И',*/}
                                    {/*        offers: osago ?*/}
                                    {/*            [{*/}
                                    {/*                name: 'Обычный',*/}
                                    {/*                type: 'ОСАГО',*/}
                                    {/*                document: 'СС 12345678',*/}
                                    {/*                payment: 'Наличные',*/}
                                    {/*                price: 41450,*/}
                                    {/*                dealerFee: 4145,*/}
                                    {/*                dateStart: '20.02.19',*/}
                                    {/*                dateEnd: '19.02.20',*/}
                                    {/*                options: optionsFixtures*/}
                                    {/*            }]*/}
                                    {/*            :*/}
                                    {/*            [{*/}
                                    {/*                name: 'Премиум',*/}
                                    {/*                type: 'КАСКО',*/}
                                    {/*                document: 'СС 12345678',*/}
                                    {/*                payment: 'Наличные',*/}
                                    {/*                price: 41450,*/}
                                    {/*                dealerFee: 4145,*/}
                                    {/*                share: 'Экономия 4 500',*/}
                                    {/*                dateStart: '20.02.19',*/}
                                    {/*                dateEnd: '19.02.20',*/}
                                    {/*                options: optionsFixtures*/}
                                    {/*            },*/}
                                    {/*                {*/}
                                    {/*                    name: 'Обычный',*/}
                                    {/*                    type: 'ОСАГО',*/}
                                    {/*                    document: 'СС 87654321',*/}
                                    {/*                    price: 41450,*/}
                                    {/*                    dealerFee: 4145,*/}
                                    {/*                    nobill: true,*/}
                                    {/*                    dateStart: '20.02.19',*/}
                                    {/*                    dateEnd: '19.02.20'*/}
                                    {/*                }*/}
                                    {/*            ]*/}
                                    {/*    }*/}
                                    {/*]}*/}
                                    {/*/>*/}
                                </>
                                :
                                <CalculationOffers osago={osago} completed={true}
                                                   selectedOffer={this.updateSelectedOffer} offersList={[
                                    {
                                        logo: './logo/bck.png',
                                        offers: [
                                            {
                                                name: 'Обычный',
                                                document: 'СС 12345678',
                                                dateStart: '20.02.19',
                                                dateEnd: '19.02.20',
                                                franchise: 10000,
                                                price: 41450,
                                                dealerFee: 4145
                                            }
                                        ]
                                    }
                                ]}/>
                            }
                        </>
                        :
                        <>
                            {(step !== 2 || combo) ?
                                paramsBlock
                                : null
                            }

                            <>
                                {this.state.showCalculationOffers && !osago ?
                                    <div
                                        className="kasko-car-select__controls check_v2 comboInsurance">{comboInsurance}</div>
                                    : null}
                            </>

                            {this.state.showCalculationOffers ?
                                <Row gutter={20}>
                                    <Col span={3}/>
                                    <Col span={18}>
                                        {combo ?
                                            <>
                                                {/*<CalculationOffersCombo allowCheck={true}*/}
                                                {/*                        waiting={step === 2}*/}
                                                {/*                        osago={osago}*/}
                                                {/*                        hasSortType={!osago}*/}
                                                {/*                        eosago={true}*/}
                                                {/*                        selectedOffer={this.updateSelectedOffer}*/}
                                                {/*                        offersList={calculationOfferComboList}/>*/}

                                                <CalculationOffersEosago allowCheck={true}
                                                                         step={step}
                                                                         declined={this.state.declinedByProvider}
                                                                         waiting={step === 2}
                                                                         osago={osago}
                                                                         hasSortType={!osago}
                                                                         eosago={true}
                                                                         selectedOffer={this.updateSelectedOffer}
                                                                         offersList={calculationOfferComboList.slice(0, step >= 2 ? 1 : calculationOfferComboList.length)}/>
                                            </>
                                            :
                                            <CalculationOffers franchise={this.state.hasFranchise} allowCheck={true}
                                                               osago={osago} waiting={step === 2}
                                                               declined={this.state.declinedByProvider}
                                                               selectedOffer={this.updateSelectedOffer}
                                                               offersList={calculationOfferList}/>
                                        }

                                        <Row gutter={20} className={"calculation-offers__agreement"}>
                                            {step === 1 ?
                                                <Col span={24}>
                                                    <p className={"text_center calculation-offers__warning"}
                                                    >Стоимость вашего полиса предварительная. Она может измениться в
                                                        момент выпуска.</p>
                                                </Col>
                                                :
                                                <>
                                                    {this.state.declinedByProvider ? null :
                                                        <FormCheckbox span={16}
                                                                      onChangeCallback={this.formControlCallback}
                                                                      text="Клиент согласен с условиями страхования"
                                                                      className="check_v3 ant-col-push-8"
                                                                      value={1}
                                                                      controlName={'clientEOSAGOAgreement'}
                                                                      checked={this.state.clientEOSAGOAgreement}/>}
                                                </>
                                            }
                                        </Row>

                                        <Row gutter={20}
                                             className={"kasko-car-select__controls ant-row-center align_center"}>
                                            {
                                                (step === 2) ?
                                                    <>
                                                        <>
                                                            <Col span={8} className="text_left">
                                                                <Row gutter={20}
                                                                     className={"kasko-car-select__extra"}>
                                                                    <Col className="">
                                                                        <Tooltip overlayClassName="tooltip_v1"
                                                                                 placement="top"
                                                                                 title="Отказ клиента">
                                                                            <Button
                                                                                onClick={this.toggleClientRefusalPopup}
                                                                                className={"ant-btn ant-btn-sm btn-cancel"}>
                                                                                <span className={"i-close"}/></Button>
                                                                        </Tooltip>
                                                                    </Col>
                                                                    <Col className="">
                                                                        <Tooltip overlayClassName="tooltip_v1"
                                                                                 placement="top"
                                                                                 title="Пересчитать">
                                                                            <Button
                                                                                onClick={this.toggleDeclinedByProvider}
                                                                                className={"ant-btn ant-btn-sm btn-action"}>
                                                                                <span className={"i-recalc"}/></Button>
                                                                        </Tooltip>
                                                                    </Col>
                                                                </Row>

                                                                {/*<Tooltip overlayClassName="tooltip_v1"*/}
                                                                {/*         placement="bottomLeft"*/}
                                                                {/*         title="Отменить операцию и вернуться к расчету">*/}
                                                                {/*    <Button onClick={() => {*/}
                                                                {/*        this.nextStep(void 0)*/}
                                                                {/*    }} className={"ant-btn btn_green fz_14 w_100p"}*/}
                                                                {/*    >Вернуться к расчету 1</Button>*/}
                                                                {/*</Tooltip>*/}
                                                            </Col>
                                                        </>
                                                        {
                                                            this.state.SMSSent ?
                                                                <>
                                                                    <Col span={8}
                                                                         className="text_center">
                                                                        <Button htmlType="submit"
                                                                                className={"ant-btn-primary btn_middle" + ((this.state.clientEOSAGOAgreement && !this.state.declinedByProvider) ? "" : " disabled")}
                                                                                onClick={this.toggleClientConfirmationPopup}
                                                                        >Подтвердить оплату</Button>
                                                                    </Col>
                                                                    <Col span={8}/>

                                                                    {/*<Col span={8} className="text_center">*/}
                                                                    {/*    <div className="offer-select__sms">*/}
                                                                    {/*        <FormInput span={null}*/}
                                                                    {/*                   maxLength={4}*/}
                                                                    {/*                   onChangeCallback={this.formControlCallback}*/}
                                                                    {/*                   placeholder="Код подтверждения"*/}
                                                                    {/*                   controlName={'SMSCode'}*/}
                                                                    {/*                   value={''}/>*/}
                                                                    {/*        <div className="gl_link"*/}
                                                                    {/*             onClick={this.toggleSMSSent}*/}
                                                                    {/*        >Отправить код повторно*/}
                                                                    {/*        </div>*/}
                                                                    {/*    </div>*/}
                                                                    {/*</Col>*/}
                                                                    {/*<Col span={8}*/}
                                                                    {/*     className="kasko-car-select__controls--group-w text_left">*/}
                                                                    {/*    <p>*/}
                                                                    {/*        Попросите клиента продиктовать код, <br/>*/}
                                                                    {/*        который был отправлен ему <br/>*/}
                                                                    {/*        на мобильный телефон*/}
                                                                    {/*    </p>*/}
                                                                    {/*</Col>*/}
                                                                </>
                                                                :
                                                                <>
                                                                    <Col span={8}
                                                                         className="text_center">
                                                                        <Button htmlType="submit"
                                                                                className={"ant-btn-primary btn_middle"}
                                                                                onClick={this.toggleSMSSent}
                                                                        >Оплатить в кассу</Button>
                                                                    </Col>
                                                                    <Col span={8}
                                                                         className="text_right">
                                                                        <div className={"gl_link"}
                                                                        >Отправить ссылку повторно
                                                                        </div>
                                                                    </Col>
                                                                </>
                                                        }
                                                    </>
                                                    : (this.state.showPayment || osago) ?
                                                    <>
                                                        <Col span={8}>
                                                            {osago ?
                                                                <>
                                                                    {eosago ?
                                                                        <Row gutter={20}
                                                                             className={"kasko-car-select__extra"}>
                                                                            <Col className="">
                                                                                <Tooltip overlayClassName="tooltip_v1"
                                                                                         placement="top"
                                                                                         title="Отказ клиента">
                                                                                    <Button
                                                                                        onClick={this.toggleClientRefusalPopup}
                                                                                        className={"ant-btn ant-btn-sm btn-cancel"}>
                                                                                        <span
                                                                                            className={"i-close"}/></Button>
                                                                                </Tooltip>
                                                                            </Col>
                                                                            <Col className="">
                                                                                <Tooltip overlayClassName="tooltip_v1"
                                                                                         placement="top"
                                                                                         title="Пересчитать">
                                                                                    <Button
                                                                                        className={"ant-btn ant-btn-sm btn-action"}>
                                                                                        <span
                                                                                            className={"i-recalc"}/></Button>
                                                                                </Tooltip>
                                                                            </Col>
                                                                            {/*<Col className="">*/}
                                                                            {/*    <Tooltip overlayClassName="tooltip_v1"*/}
                                                                            {/*             placement="top"*/}
                                                                            {/*             title="Сохранить расчет">*/}
                                                                            {/*        <Button*/}
                                                                            {/*            className={"ant-btn ant-btn-sm btn-action"}>*/}
                                                                            {/*            <span*/}
                                                                            {/*                className={"i-save"}/></Button>*/}
                                                                            {/*    </Tooltip>*/}
                                                                            {/*</Col>*/}
                                                                        </Row>
                                                                        :
                                                                        <Button className={"w_100p ant-btn"}
                                                                        >Отказ клиента</Button>
                                                                    }
                                                                </>
                                                                : null
                                                            }
                                                        </Col>
                                                        <Col span={8}>
                                                            <Button
                                                                data-btn="step_btn_2"
                                                                className={"ant-btn ant-btn-primary w_100p" + ((this.state.availableCashier) ? "" : " disabled")}
                                                                onClick={() => {
                                                                    this.state.availableCashier && this.nextStep(2)
                                                                }}
                                                            >{this.state.showCompare ? 'Сравнить' : 'Оплатить в кассу'}</Button>
                                                        </Col>
                                                        <Col span={8}>
                                                            <PaymentSwitch
                                                                allowPayment={this.state.availablePayment}
                                                                paymentStep={0}/>
                                                        </Col>
                                                    </>
                                                    :
                                                    popup ?
                                                        <>
                                                            <Col span={12}>
                                                                <Button htmlType="submit"
                                                                        className={"ant-btn-primary btn_wide"}
                                                                        onClick={this.addToCredit}
                                                                >Добавить в кредит</Button>
                                                            </Col>
                                                            <Col span={24}/>
                                                            <Col span={12}>
                                                                <Button htmlType="submit"
                                                                        className={"btn_wide"}
                                                                        onClick={this.toggleCalculationPopup}>{this.calculationButtonText()}</Button>
                                                            </Col>
                                                        </>
                                                        :
                                                        <>
                                                            <Col span={8}>
                                                                <Button className={"w_100p ant-btn"}
                                                                >Отказ клиента</Button>
                                                            </Col>
                                                            <Col span={16}>
                                                                <Button htmlType="submit"
                                                                        className={"ant-btn-primary w_100p"}
                                                                        onClick={this.toggleCalculationPopup}>{this.calculationButtonText()}</Button>
                                                            </Col>
                                                            <Col span={8}>
                                                                <Button
                                                                    onClick={() => {
                                                                        this.changeTab(0)
                                                                    }} className={"w_100p btn_green"}
                                                                    disabled={this.state.availableAddCredit ? null : "disabled"}
                                                                >Добавить в кредит</Button>
                                                            </Col>
                                                        </>
                                            }
                                        </Row>
                                    </Col>
                                </Row>
                                : null
                            }
                        </>
                    }
                </div>

                <div ref={(el) => {
                    this.messagesEnd = el
                }}/>

                {this.state.confirmationPopupOpened ?
                    <PopupOverlay popupClass={'popup-middle'} span={16}>
                        <ConfirmationPopup confirm={true} yesBtn='Подтверждаю' noBtn='Отмена'
                                           title='Я, сотрудник дилерского центра, <br /> подтверждаю, что страховой полис оплачен'
                                           popupCloseFunc={this.toggleClientConfirmationPopup}/>
                    </PopupOverlay>
                    : null
                }

                {this.state.refusalPopupOpened ?
                    <PopupOverlay popupClass={'popup-middle'} span={16}>
                        <ConfirmationPopup confirm={true} attention={true} yesBtn='Продолжить оформление' noBtn='Отказаться'
                                           title='Клиент действительно хочет отказаться от полиса ОСАГО?'
                                           popupCloseFunc={this.toggleClientRefusalPopup}/>
                    </PopupOverlay>
                    : null
                }

                {this.state.calculationPopupOpened ?
                    <PopupOverlay span={16}>
                        <CalculationPopup osago={osago} updatePaymentState={this.updatePaymentState}
                                          step={this.state.showCalculationOffers ? 2 : step}
                                          allFields={this.state.showCalculationOffers || (step === 2)}
                                          fullCalculation={this.state.showCalculationOffers || this.state.fullCalculation}
                                          popupCloseFunc={this.toggleCalculationPopup}/>
                    </PopupOverlay>
                    : null
                }

                {this.state.policyPopupOpened ?
                    <PopupOverlay span={16}>
                        <PolicyPopup showTab={osago ? 2 : 1} popupConfirmation={this.updatePolicyState}
                                     step={this.state.showCalculationOffers ? 2 : step} osago={osago}
                                     allFields={this.state.showCalculationOffers || (step === 2)}
                                     fullCalculation={this.state.showCalculationOffers || this.state.fullCalculation}
                                     popupCloseFunc={this.togglePolicyPopup}/>
                    </PopupOverlay>
                    : null
                }
            </>
        );
    }
}

export default TabOffer;
