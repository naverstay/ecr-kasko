import React, {Component} from "react";
import {Link} from "react-router-dom";

import './style.scss';
import PropTypes from "prop-types";

class KaskoNotice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noticeOpened: true
        };
    }

    static propTypes = {
        children: PropTypes.node,
        type: PropTypes.string,
        status: PropTypes.any
    };

    toggleOpened = () => {
        this.setState({noticeOpened: !this.state.noticeOpened})
    }

    componentDidMount() {
        this.props.type !== void 0 && this.setState({noticeOpened: true})
    }

    render() {
        const {noticeList, type, status, step, credit, kasko, osago, search, price, product, doc} = this.props;
        const statusClasses = {
            0: 'calculation',
            1: 'waiting',
            2: 'approved',
            3: 'done',
            4: 'declined'
        }
        const statusNames = {
            0: 'Расчет',
            1: 'Ожидание',
            2: 'Выпущено',
            3: 'Выпущено',
            4: 'Отказ'
        }
        const progressNames = {
            0: 'Консультация',
            1: 'Расчет',
            2: 'Оформление',
            3: 'Выпуск',
            4: 'Отказ'
        }

        const noticeHtml = noticeList && noticeList.length ? noticeList.map((n, i) => <li key={i}
                                                                                          className="kasko-notice__item">
            <div className="kasko-notice__item--head">
                {n.list.length ? <span className="kasko-notice__item--count">{n.list.length}</span> : ""}
                {n.title}
            </div>
            {
                n.list.length ?
                    n.list.map((l, i) => <div key={i} className="kasko-notice__unit">
                        <div className={"kasko-notice__unit--caption " + (statusClasses[l.progress])}>{l.name}</div>
                        <div className="kasko-notice__unit--time">{l.time}</div>
                        <div className="kasko-notice__unit--status">{l.status}</div>
                    </div>)
                    : null
            }

        </li>) : null;

        let progressHtml = []

        if (status !== void 0) {
            for (let p in progressNames) {
                if (progressNames.hasOwnProperty(p)) {
                    progressHtml.push(<li key={p}
                                          className={"kasko-notice__progress--unit" + (+p <= status ? ' active' : '')}>{(+p === status ?
                        <span>{progressNames[p]}</span> : '')}</li>)
                }
            }
        }

        return (type ?
                <div className="kasko-notice">
                    <div className={"kasko-notice" + (this.state.noticeOpened ? " open" : "")}>
                        <div className="kasko-notice__head">
                            <div className={"kasko-notice__caption offer" + (this.state.noticeOpened ? " open" : "")}
                                 onClick={this.toggleOpened}>{(product).toUpperCase()}</div>
                            <div
                                className={"kasko-notice__status " + (statusClasses[status])}>{statusNames[status]}</div>
                        </div>
                        <ul className="kasko-notice__progress">
                            {progressHtml}
                        </ul>
                        {this.state.noticeOpened ?
                            credit ?
                                <ul className={"kasko-notice__price"}>
                                    <li>
                                        <div className="kasko-notice__price--label">Платеж в мес.</div>
                                        <div className="kasko-notice__price--value">
                                            {step >= 2 ?
                                                <>
                                                    <span>{price}</span>
                                                    {/*<span className="kasko-notice__status calculation">Наличные</span>*/}
                                                </>
                                                : null}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="kasko-notice__price--label">Срок</div>
                                        <div
                                            className="kasko-notice__price--value">{step >= 2 ? 'ВСК' : ''}
                                        </div>

                                    </li>
                                    <li>
                                        <div className="kasko-notice__price--label">ПВ</div>
                                        <div
                                            className="kasko-notice__price--value">{step >= 2 ? <>21.09.19<br/>20.09.20</> : ''}</div>
                                    </li>
                                    <li>
                                        <div className="kasko-notice__price--label">Сумма кредита</div>
                                        <div className="kasko-notice__price--value"/>
                                    </li>
                                    <li>
                                        <div className="kasko-notice__price--label">Включено</div>
                                        <div className="kasko-notice__price--value"/>
                                    </li>
                                    {/*<li>*/}
                                    {/*	<Link to="#" className="kasko-notice__link">Рассчитать кредит</Link>*/}
                                    {/*</li>*/}
                                    {/*<li>*/}
                                    {/*	<Link to="#" className="kasko-notice__link">Подготовить заявку</Link>*/}
                                    {/*</li>*/}
                                    {/*<li>*/}
                                    {/*	<Link to="#" className="kasko-notice__link">Оформить кредит</Link>*/}
                                    {/*</li>*/}
                                </ul>
                                :
                                <ul className={"kasko-notice__price"}>
                                    <li>
                                        <div className="kasko-notice__price--label">Стоимость</div>
                                        <div className="kasko-notice__price--value">
                                            {step >= 2 ?
                                                <>
                                                    <span>{price}</span>
                                                </>
                                                : null}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="kasko-notice__price--label">СК</div>
                                        <div
                                            className="kasko-notice__price--value">{step >= 2 ? 'Ингосстрах' : ''}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="kasko-notice__price--label">Срок</div>
                                        <div
                                            className="kasko-notice__price--value">{step >= 2 ? <>21.09.19<br/>20.09.20</> : null}</div>
                                    </li>
                                    <li>
                                        <div className="kasko-notice__price--label">Полис</div>
                                        <div
                                            className="kasko-notice__price--value">{step === 3 ? doc || '' : null}</div>
                                    </li>
                                </ul>
                            : null}
                    </div>
                </div>
                :
                <div className={"kasko-notice" + (this.state.noticeOpened ? " open" : null)}>
                    <div className="kasko-notice__head">
                        <div
                            className={"kasko-notice__caption color_red" + (this.state.noticeOpened ? " open" : "")}
                            onClick={this.toggleOpened}>Уведомления
                        </div>
                        {
                            search ?
                                <div className="kasko-notice__search"/>
                                : null
                        }

                        <div className="kasko-notice__settings"/>
                    </div>
                    {this.state.noticeOpened ?
                        <ul className="kasko-notice__list">
                            {noticeHtml}
                        </ul>
                        : null}
                </div>
        );
    }
}

export default KaskoNotice;
