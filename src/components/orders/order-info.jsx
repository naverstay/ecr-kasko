import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import BankUnit from "./bank-unit";
import BankStatus from "./bank-status";
import Comments from "./comments";
import PopupOverlay from "../popup-overlay";
import ManagerPopup from "../manager-popup";
import AttachPopup from "../attach-popup";

class OrderInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeBank: 0,
            showAttachPopup: false,
            activeMobTab: 0
        };
    }

    static propTypes = {
        order: PropTypes.object
    };

    toggleActiveBank = (index) => {
        this.setState({activeBank: this.state.activeBank === index ? -1 : index})
    }

    toggleAttachPopup = () => {
        this.setState({showAttachPopup: !this.state.showAttachPopup})
    }

    setActiveMobTab = (index) => {
        this.setState({activeMobTab: index})
    }

    render() {
        const {
            order
        } = this.props;

        const {
            activeMobTab
        } = this.state;

        return (
            <>
                <div className="orders-table__info" data-mobile-tab={activeMobTab}>
                    <div className="orders-table__mobile dt-hidden">
                        <div className="orders-tabs__list-holder">
                            <ul className="orders-tabs__list">
                                <li onClick={() => {
                                    this.setActiveMobTab(0)
                                }}
                                    className={"orders-tabs__tab" + (activeMobTab === 0 ? ' react-tabs__tab--selected' : '')}>Инфо
                                </li>
                                <li onClick={() => {
                                    this.setActiveMobTab(1)
                                }}
                                    className={"orders-tabs__tab" + (activeMobTab === 1 ? ' react-tabs__tab--selected' : '')}>Банки
                                </li>
                                <li onClick={() => {
                                    this.setActiveMobTab(2)
                                }}
                                    className={"orders-tabs__tab" + (activeMobTab === 2 ? ' react-tabs__tab--selected' : '')}>Ответственный
                                </li>
                                <li onClick={() => {
                                    this.setActiveMobTab(3)
                                }}
                                    className={"orders-tabs__tab" + (activeMobTab === 3 ? ' react-tabs__tab--selected' : '')}>Комментарий
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="orders-table__row-overlay-bottom"/>
                    {/*<div className="orders-table__row-overlay-right"/>*/}
                    <ul className="orders-table__info--list">
                        {/* duplications for mobile */}
                        <li data-mobile-tab={2} className="dt-hidden orders-table__info--item item_size-1">
                            <div className="orders-table__info--caption">Дилер</div>
                            <div className="orders-table__info--value">КИА Центр Кемерово-Юг</div>
                        </li>
                        <li data-mobile-tab={2} className="dt-hidden orders-table__info--item item_size-1">
                            <div className="orders-table__info--caption">КСО</div>
                            <div className="orders-table__info--value">* Абдрахманов И.</div>
                        </li>
                        <li data-mobile-tab={2} className="dt-hidden orders-table__info--item item_size-1">
                            <div className="orders-table__info--caption">МОП</div>
                            <div className="orders-table__info--value">Ларин</div>
                        </li>
                        <li data-mobile-tab={2} className="dt-hidden orders-table__info--item item_size-1">
                            <div className="orders-table__info--caption">Источник заявки</div>
                            <div className="orders-table__info--value">Отдел продаж</div>
                        </li>
                        <li data-mobile-tab={2} className="dt-hidden orders-table__info--item item_size-1">
                            <div className="orders-table__info--caption">Дата заявки</div>
                            <div className="orders-table__info--value">12.01.21</div>
                        </li>
                        {/* duplications for mobile */}

                        <li className="orders-table__info--item item_size-1">
                            <div className="orders-table__info--caption">ID заявки</div>
                            <div className="orders-table__info--value">{order.id}</div>
                        </li>
                        <li data-mobile-tab={0} className="orders-table__info--item item_size-2">
                            <div className="orders-table__info--caption">Автомобиль новый</div>
                            <div className="orders-table__info--value">{order.car}</div>
                        </li>
                        <li data-mobile-tab={0} className="orders-table__info--item item_size-3">
                            <div className="orders-table__info--caption">Год</div>
                            <div className="orders-table__info--value">{order.year}</div>
                        </li>
                        <li data-mobile-tab={0} className="orders-table__info--item item_size-4">
                            <div className="orders-table__info--caption">Телефон</div>
                            <div className="orders-table__info--value">
                                <a className="orders-table__info--phone"
                                   href={"tel:+" + order.phone.replace(/\D/, '')}>{order.phone}</a>
                            </div>
                        </li>
                        <li data-mobile-tab={0} className="orders-table__info--item item_size-5">
                            <div className="orders-table__info--caption">Цена авто</div>
                            <div className="orders-table__info--value">{order.price}</div>
                        </li>
                        <li data-mobile-tab={0} className="orders-table__info--item item_size-6">
                            <div className="orders-table__info--caption">Срок кредита</div>
                            <div className="orders-table__info--value">{order.period}</div>
                        </li>
                        <li data-mobile-tab={0} className="orders-table__info--item item_size-7">
                            <div className="orders-table__info--caption">ПВ</div>
                            <div className="orders-table__info--value">{order.firstpayment}</div>
                        </li>
                        <li data-mobile-tab={0} className="orders-table__info--item item_size-8">
                            <div className="orders-table__info--caption">Включено в кредит</div>
                            <div className="orders-table__info--value">{order.extra}</div>
                        </li>
                        <li data-mobile-tab={3} className="orders-table__info--item item_size-9">
                            <div className="comments-form">
                                <textarea className='comments-form__text'
                                          placeholder="Комментарий для внутреннего пользования"/>
                                <button
                                    className='comments-form__btn __v2 ant-btn ant-btn-primary ant-btn-block'>
                                    <span className={"i-plane"}/>
                                </button>
                            </div>
                        </li>
                    </ul>
                    <div data-mobile-tab={1} className="orders-table__info--banks">
                        <ul className="orders-table__info--banks-list">
                            {order.banks.map((b, i) => {
                                return (
                                    <li key={i}
                                        onClick={() => {
                                            this.toggleActiveBank(i);
                                        }}
                                        className={"orders-table__info--banks-unit" + (i === this.state.activeBank ? ' unit_active' : '')}>
                                        <BankUnit
                                            bankName={b.bankName}
                                            programmeName={b.programmeName}
                                            price={b.price}
                                            fee={b.fee}
                                            status={b.status}
                                            statusColor={b.statusColor}
                                        />
                                        <div className="orders-table__info--banks-chat dt-hidden">
                                            Чат
                                        </div>
                                    </li>
                                )
                            })}

                        </ul>
                        <div className="orders-table__info--banks-info">
                            <div className="orders-table__info--banks-status">
                                <BankStatus data={[
                                    {
                                        date: '28 августа',
                                        msg: [
                                            {
                                                author: 'client',
                                                text: 'Кредитный расчет',
                                                time: '13:18'
                                            },
                                            {
                                                author: 'client',
                                                text: 'Новая заявка',
                                                time: '13:18'
                                            },
                                            {
                                                author: 'client',
                                                text: 'Отправлена в банк',
                                                time: '13:18'
                                            },
                                            {
                                                author: 'bank',
                                                text: 'Запрос банка',
                                                time: '13:18',
                                                orderInfo: {
                                                    bankStatus: 'Банк направил запрос',
                                                    bankReason: 'Анкета плохо читаема, подгрузите в хорошем качестве',
                                                    bankTips: [
                                                        {
                                                            tipName: 'Как ответить на запрос банка',
                                                            tipList: [
                                                                '1. Проверьте требуемые банком документы;',
                                                                '2. При необходимости, отсканируйте заново;',
                                                                '3. Прикрепите документы в разделе "Рассмотрение заявки", нажав на скрепку, и ответьте на запрос.'
                                                            ]
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                author: 'client',
                                                text: 'Клиент приглашен на сделку',
                                                time: '13:18'
                                            },
                                            {
                                                author: 'client',
                                                text: 'Отправка в банк при оформлении',
                                                time: '13:18'
                                            },
                                            {
                                                author: 'client',
                                                text: 'Отправка в банк при оформлении',
                                                time: '13:18'
                                            },
                                            {
                                                author: 'client',
                                                text: 'Запрошен кредитный договор у банка на дату',
                                                time: '13:18'
                                            }
                                        ]
                                    },
                                    {
                                        date: '29 августа',
                                        msg: [
                                            {
                                                author: 'client',
                                                text: 'Кредитный расчет',
                                                time: '13:18'
                                            },
                                            {
                                                author: 'client',
                                                text: 'Новая заявка',
                                                time: '13:18'
                                            },
                                            {
                                                author: 'client',
                                                text: 'Отправлена в банк',
                                                time: '13:18'
                                            },
                                            {
                                                author: 'bank',
                                                text: 'Заявка одобрена банком',
                                                time: '13:18'
                                            },
                                            {
                                                author: 'client',
                                                text: 'Клиент приглашен на сделку',
                                                time: '13:18'
                                            },
                                            {
                                                author: 'client',
                                                text: 'Отправка в банк при оформлении',
                                                time: '13:18'
                                            },
                                            {
                                                author: 'client',
                                                text: 'Отправка в банк при оформлении',
                                                time: '13:18'
                                            },
                                            {
                                                author: 'client',
                                                text: 'Запрошен кредитный договор у банка на дату',
                                                time: '13:18'
                                            }
                                        ]
                                    }
                                ]}
                                            bankName='Русфинансбанк.'
                                            programmeName='Classic. Новое авто'
                                            price='107 485 ₽'
                                            fee='Доход дилера'
                                />
                            </div>
                            <div className="orders-table__info--banks-msg">
                                <textarea className="orders-table__info--banks-comment"
                                          placeholder="Напишите ваше сообщение"/>
                                <div onClick={this.toggleAttachPopup}
                                     className="orders-table__info--banks-attach ant-btn">&nbsp;</div>
                                <div className="orders-table__info--banks-send ant-btn ant-btn-primary">&nbsp;</div>
                            </div>
                        </div>
                    </div>
                    {/*<div className="orders-table__info--comments">*/}
                    {/*	<Comments title={'Внутренние комментарии к клиенту'} msg={[*/}
                    {/*		{*/}
                    {/*			author: 'Брюс Уиллис',*/}
                    {/*			date: ['11.01.18', '13:18'],*/}
                    {/*			text: 'Море могуче. В тон ему, шумен, отвечу Гомером'*/}
                    {/*		},*/}
                    {/*		{author: 'Одри Тоту', date: ['01.01.19', '00:37'], text: 'Навидал фуфла диван'},*/}
                    {/*		{*/}
                    {/*			author: 'Джек Воробей',*/}
                    {/*			date: ['14.01.19', '13:18'],*/}
                    {/*			text: 'Не видно морд, ни лап. А палиндром – он дивен'*/}
                    {/*		},*/}
                    {/*		{author: 'я', date: ['15.01.19', '16:01'], text: 'Карма - мрак'}*/}
                    {/*	]}/>*/}
                    {/*</div>*/}
                </div>

                {this.state.showAttachPopup ?
                    <PopupOverlay span={18}>
                        <AttachPopup popupCloseFunc={this.toggleAttachPopup}/>
                    </PopupOverlay>
                    : null
                }
            </>
        )
    }
};

export default OrderInfo;
