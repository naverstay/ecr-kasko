import React, {Component} from "react";
import {Link} from "react-router-dom";

import './style.scss';
import PropTypes from "prop-types";
import KaskoNotice from "../kasko-notice";

class KaskoNotices extends Component {
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
        const {noticeList, type, status, step, credit, kasko, osago, search, productList, showStatus, consult} = this.props;
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

        let progressHtml = [];

        if (status !== void 0) {
            for (let p in progressNames) {
                if (p < 4 && progressNames.hasOwnProperty(p)) {
                    let active = status !== 4 ? status : 0;
                    if (active < 0) {
                        active = 0;
                    }
                    progressHtml.push(<li key={p}
                                          className={"kasko-notice__progress--unit" + ((+p <= active) ? ' active' : '')}
                    >{((+p === active) ? <span>{progressNames[p]}</span> : '')}</li>)
                }
            }
        }

        console.log('consult', consult);

        return (
            type ?
                <div className="kasko-notice">
                    <div className={"kasko-notice" + (this.state.noticeOpened ? " open" : "")}>
                        <div className="kasko-notice__head">
                            <div className={"kasko-notice__caption offer" + (this.state.noticeOpened ? " open" : "")}
                                 onClick={this.toggleOpened}>{(type).toUpperCase()}</div>
                            {showStatus ? <div
                                className={"kasko-notice__status " + (statusClasses[consult ? 6 : status])}>{statusNames[consult ? 6 : status]}</div> : null}
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
                                            {(step >= 2 && status !== 4) ?
                                                <>
                                                    <span>41 450 ₽</span>
                                                    <span className="kasko-notice__status calculation">Наличные</span>
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
                                kasko ?
                                    <ul className={"kasko-notice__price"}>
                                        <li>
                                            <div className="kasko-notice__price--label">Стоимость</div>
                                            <div className="kasko-notice__price--value">
                                                {(step >= 2 && status !== 4) ? <span>41 450 ₽</span> : null}
                                            </div>
                                        </li>
                                        <li>
                                            <div className="kasko-notice__price--label">СК</div>
                                            <div
                                                className="kasko-notice__price--value">{step >= 2 ? 'Ингосстрах' : ''}</div>
                                        </li>
                                        {/*<li>*/}
                                        {/*    <div className="kasko-notice__price--label">Срок</div>*/}
                                        {/*    <div*/}
                                        {/*        className="kasko-notice__price--value">{step >= 2 ? <>21.09.19<br/>20.09.20</> : ''}</div>*/}
                                        {/*</li>*/}
                                        {/*<li>*/}
                                        {/*    <div className="kasko-notice__price--label">Полис</div>*/}
                                        {/*    <div className="kasko-notice__price--value"/>*/}
                                        {/*</li>*/}
                                    </ul>
                                    :
                                    <ul className={"kasko-notice__price"}>
                                        <li>
                                            <div className="kasko-notice__price--label">Стоимость</div>
                                            <div className="kasko-notice__price--value">
                                                {(step >= 2 && status !== 4) ?
                                                    <>
                                                        <span>41 450 ₽</span>
                                                        {osago ? null : <span
                                                            className="kasko-notice__status calculation">Наличные</span>}
                                                    </>
                                                    : null}
                                            </div>
                                        </li>
                                        <li>
                                            <div className="kasko-notice__price--label">СК</div>
                                            <div
                                                className="kasko-notice__price--value">{(step >= 2 && status !== 4) ? 'Ингосстрах' : ''}
                                            </div>
                                        </li>
                                        {/*<li>*/}
                                        {/*    <div className="kasko-notice__price--label">Срок</div>*/}
                                        {/*    <div*/}
                                        {/*        className="kasko-notice__price--value">{step >= 2 ? <>21.09.19<br/>20.09.20</> : ''}</div>*/}
                                        {/*</li>*/}
                                        {/*<li>*/}
                                        {/*    <div className="kasko-notice__price--label">Полис</div>*/}
                                        {/*    <div className="kasko-notice__price--value"/>*/}
                                        {/*</li>*/}
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

export default KaskoNotices;
