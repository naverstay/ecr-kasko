import React, {Component} from "react";
import {Link} from "react-router-dom";

import './style.scss';
import PropTypes from "prop-types";

class ServiceNotices extends Component {
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
        const {noticeList, type, status, step, credit, kasko, osago, showStatus, consult} = this.props;
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
                {n.list.length ? <span className="kasko-notice__item--count">{n.list.length}</span> : null}
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
        let newNotice = true;

        if (status !== void 0) {
            for (let p in progressNames) {
                if (p < 4 && progressNames.hasOwnProperty(p)) {
                    let active = status !== 4 ? status : 0;
                    progressHtml.push(<li key={p}
                                          className={"kasko-notice__progress--unit" + (+p <= active ? ' active' : '')}
                    >{(+p === active ? <>
                        <span>{progressNames[p]}</span>
                    </> : '')}</li>)
                }
            }
        }

        console.log('service-notices');

        return (
            type ?
                newNotice ?
                    <div className={"kasko-notices"}>
                        <div className={"kasko-notices__row"}>
                            <div className={"kasko-notices__caption"}>{type}</div>
                            <div className={"kasko-notices__info"}>
                                {showStatus ? <div
                                    className={"kasko-notice__status " + (statusClasses[consult ? 6 : status])}>{statusNames[consult ? 6 : status]}</div> : null}
                            </div>

                        </div>
                        {step >= 2 && <div className={"kasko-notices__row"}>
                            <div className="kasko-notices__price">
                                {(status !== 4) ?
                                    <>
                                        <span>41 450 ₽</span>
                                        {osago ? null : <span
                                            className="kasko-notice__status calculation">Наличные</span>}
                                    </>
                                    : null}
                            </div>
                            <div className="kasko-notices__info">{(status !== 4) ? 'Ренессанс Страхование' : ''}</div>
                        </div>}
                    </div>
                    :
                    <div className="kasko-notice">
                        <div className={"kasko-notice" + (this.state.noticeOpened ? " open" : "")}>
                            <div className="kasko-notice__head">
                                <div
                                    className={"kasko-notice__caption offer" + (this.state.noticeOpened ? " open" : "")}
                                    onClick={this.toggleOpened}>{(type)}</div>
                                {step > 1 ? <div
                                    className={"kasko-notice__status " + (statusClasses[status])}>{statusNames[status]}</div> : null}
                            </div>
                            <div className="kasko-notice__progress--wrapper">
                                {status ? null : <div className="kasko-notice__progress--price">11 450 ₽</div>}
                                <ul className="kasko-notice__progress">
                                    {progressHtml}
                                </ul>
                            </div>

                            {this.state.noticeOpened ?
                                <ul className={"kasko-notice__price"}>
                                    <li>
                                        <div className="kasko-notice__price--label">Продленная <br/>гарантия</div>
                                        <div className="kasko-notice__price--value">
                                            {step >= 2 ?
                                                <>
                                                    <span className="kasko-notice__price--big">10 000 ₽</span>
                                                    <span className={"offer-row__status " + (statusClasses[status])}/>
                                                </>
                                                : null}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="kasko-notice__price--label">Ассистанс</div>
                                        <div className="kasko-notice__price--value">
                                            {step >= 2 ?
                                                <>
                                                    <span className="kasko-notice__price--big">10 000 ₽</span>
                                                    <span className={"offer-row__status " + (statusClasses[status])}/>
                                                </>
                                                : null}
                                        </div>
                                    </li>
                                </ul>
                                : null}
                        </div>
                    </div>
                :
                <div className={"kasko-notice" + (this.state.noticeOpened ? " open" : "")}>
                    <div className="kasko-notice__head">
                        <div
                            className={"kasko-notice__caption color_red" + (this.state.noticeOpened ? " open" : "")}
                            onClick={this.toggleOpened}>Уведомления
                        </div>
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

export default ServiceNotices;
