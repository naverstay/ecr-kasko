import React, {Component} from "react";
import {Checkbox, Select, Tooltip} from "antd";

import './style.scss';
import PropTypes from "prop-types";
import pluralFromArray from "../../helpers/pluralFromArray";
import {formatMoney} from "../../helpers/formatMoney";
import ReactComment from "../../helpers/reactComment";

const {Option} = Select;

class OfferRowEosago extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowsCollapsed: true,
            offerSelected: {},
            optionsToggle: {}
        };
    }

    static propTypes = {
        children: PropTypes.node,
        innerWidth: PropTypes.number,
        selectedOffer: PropTypes.func,
        offers: PropTypes.array
    };

    onSelectOfferToggle = (company, index, e, disableCashierPayment) => {
        let options = Object.assign({}, this.state.offerSelected)

        options[index] = e.target.checked

        this.setState({offerSelected: options, disableCashierPayment: disableCashierPayment})

        setTimeout(() => {
            console.log('onSelectOfferToggle offer', company, this.state.offerSelected, disableCashierPayment);
            this.props.selectedOffer && typeof this.props.selectedOffer === 'function' && this.props.selectedOffer(this.state.offerSelected, disableCashierPayment)
        }, 0)
    }

    onCollapseToggle = () => {
        this.setState({rowsCollapsed: !this.state.rowsCollapsed})
    }

    creditChange = () => {
        console.log('creditChange');
    }

    addOptionFlag(index) {
        let options = Object.assign({}, this.state.optionsToggle)

        if (index in options) {
            options[index] = !options[index]
        } else {
            options[index] = true
        }

        this.setState({optionsToggle: options})
    }

    renderSwitch(step, completed, waiting, o) {
        console.log('renderSwitch row', step, o);
        switch (step) {
            case 1:
                return (
                    <>
                        <td className="calculation-offers__table--col-2"/>
                        <td className={"calculation-offers__table--col-5 text_right" + ((completed || waiting) ? " small" : "")}>
                            <div className="offer-row__price">
                                {o.megashare ?
                                    <div className="offer-row__price-megashare">{o.megashare}</div> : null}
                                {(o.price)}</div>
                            {o.share ? <div className="offer-row__price-small">{(o.share)}</div> : null}
                            <div className="offer-row__fee">{(o.dealerFee)}</div>
                        </td>
                    </>);
            case 2:
                return (
                    <>
                        <td className="calculation-offers__table--col-2 text_left">
                            <div className="offer-row__documents">
                                <div className="gl_link color_black">{o.document || 'some doc'}</div>
                                {o.nobill ? null :
                                    <div className="offer-row__bill gl_link">Заявление</div>}
                            </div>
                        </td>
                        {/*<td>*/}
                        {/*    <div className="offer-row__date">{o.dateStart}</div>*/}
                        {/*    <div className="offer-row__date">{o.dateEnd}</div>*/}
                        {/*</td>*/}

                        <td className={"calculation-offers__table--col-5 text_right" + ((completed || waiting) ? " small" : "")}>
                            <div className="offer-row__price">
                                {o.megashare ?
                                    <div className="offer-row__price-megashare">{o.megashare}</div> : null}
                                {(o.price)}</div>
                            {o.share ? <div className="offer-row__price-small">{(o.share)}</div> : null}
                            <div>{(o.dealerFee)}</div>
                        </td>
                    </>);
            case 3:
                return (
                    <>
                        <td className="calculation-offers__table--col-2 text_left">
                            <div className="offer-row__documents">
                                <div className="gl_link color_black">{o.document || 'some doc'}</div>
                                {o.nobill ? null :
                                    <div className="offer-row__bill gl_link">Заявление</div>}
                            </div>
                        </td>
                        <td className={"calculation-offers__table--col-5 text_right" + ((completed || waiting) ? " small" : "")}>
                            <div className="offer-row__price">
                                {o.megashare ?
                                    <div className="offer-row__price-megashare">{o.megashare}</div> : null}
                                {(o.price)}</div>
                            {o.share ? <div className="offer-row__price-small">{(o.share)}</div> : null}
                            <div>{(o.dealerFee)}</div>
                        </td>
                    </>);
            default:
                return (
                    <>
                        <td className=""/>
                    </>);
        }
    }

    render() {
        const {offers, logo, fillColor, capLetter, name, info, credit, company, completed, waiting, allowCheck, osago, showMore, lastRow, step, declined, refused} = this.props
        const moreLink = 'еще ' + (offers.length - 1) + ' ' + pluralFromArray(['тариф', 'тарифа', 'тарифов'], (offers.length - 1))
        const lessLink = 'скрыть ' + (offers.length - 1) + ' ' + pluralFromArray(['тариф', 'тарифа', 'тарифов'], (offers.length - 1))

        function buildOptions(opt) {

            let ret = [<div key={1} className={'offer-row__option-title'}>{opt.title}</div>];
            let items = [];

            if (opt.hasOwnProperty('list')) {
                for (let j = 0; j < opt.list.length; j++) {
                    let item = opt.list[j];
                    items.push(<li key={j}>{item}</li>);
                }
            }

            if (opt.hasOwnProperty('params')) {
                for (let j = 0; j < opt.params.length; j++) {
                    let item = opt.params[j];
                    items.push(<li key={j} className={'offer-row__option-params __no-dot'}>
                        <span className={"offer-row__option-dash"} dangerouslySetInnerHTML={{__html: `${item.name}`}}/>
                        <span>{item.value}</span>
                    </li>);
                }
            }

            ret.push(<ul>{items}</ul>);

            return <li className={'__no-dot'}>{ret}</li>;
        }

        return (
            <>
                {offers.map((o, i) => {
                    const show = (i === 0 || !this.state.rowsCollapsed)
                    const showOptions = (i in this.state.optionsToggle) && this.state.optionsToggle[i]
                    const offerSelected = o.selected && (i in this.state.offerSelected) && this.state.offerSelected[i]

                    return (show ?
                        <>
                            {refused ?
                                <tr key={i}>
                                    <td className="" colSpan={2}>
                                        <div className="offer-row__name text_center">
                                            Клиент отказался от страхования е-ОСАГО
                                        </div>
                                    </td>
                                </tr>
                                :
                                <tr key={i}
                                    className={(showOptions ? "expanded" : "") + ((offerSelected && !(completed || waiting)) ? " selected" : "") + (lastRow && !showOptions ? ' last-row' : '')}>
                                    <td className={'wnw calculation-offers__table--col-8 ' + (lastRow ? '' : 'no-bdr-bottom')}>
                                        {i === 0 ? <div
                                            className={"offer-row__logo" + (info ? " info" : "")}>
                                            {fillColor ? <span className={"offer-row__letter"}
                                                               style={{background: fillColor}}>{capLetter}</span> : null}

                                            <span className={"offer-row__caption"} dangerouslySetInnerHTML={{__html: `${name}`}}/>
                                            {o.disableCashierPayment ?
                                                <Tooltip overlayClassName="tooltip_v1" placement="top"
                                                         title="Оплата е-е-ОСАГО в кассу дилера для этой СК недоступна.
Возможна только онлайн оплата на сайте СК.">
                                                    <span className={"offer-row__info"}/>
                                                </Tooltip>
                                                : null}
                                        </div> : null}
                                    </td>
                                    <td className={'calculation-offers__table--col-8'}>
                                        <div className="offer-row__name">{o.type}</div>
                                        {(this.state.rowsCollapsed && i === 0 && offers.length > 1) ?
                                            <div onClick={this.onCollapseToggle}
                                                 className="offer-row__hint gl_link">{moreLink}</div> : null}
                                        {(!this.state.rowsCollapsed && (i === offers.length - 1) && offers.length > 1) ?
                                            <div onClick={this.onCollapseToggle}
                                                 className="offer-row__hint gl_link">{lessLink}</div> : null}
                                    </td>

                                    {declined ?
                                        <>
                                            <td className="calculation-offers__table--col-5 wide" colSpan={2}>
                                                <div className="offer-row__name text_right">
                                                    <span>Нет предложений</span>
                                                    <Tooltip overlayClassName="tooltip_v1" placement="top"
                                                             title="Клиент в зоне риска. Страхование запрещено">
                                                        <span className={"offer-row__info"}/>
                                                    </Tooltip>
                                                </div>
                                            </td>
                                            <td colSpan={2}>&nbsp;</td>
                                        </>
                                        :
                                        <>
                                            {this.renderSwitch(step || 0, completed, waiting, o)}

                                            {osago ? null :
                                                <td className={'calculation-offers__table--col-6'}>
                                                    <div className="offer-row__fee">
                                                        <Checkbox disabled={completed || waiting || o.credit === null}
                                                                  defaultChecked={o.credit ? "checked" : null}
                                                                  onChange={this.creditChange}/>

                                                        {/*{o.payment && Array.isArray(o.payment) && o.payment.length > 1 ?*/}
                                                        {/*	<Select*/}
                                                        {/*		size="small"*/}
                                                        {/*		defaultValue={o.payment[0]}*/}
                                                        {/*		dropdownClassName="select_dropdown_v1"*/}
                                                        {/*		className={"w_100p small_select"}*/}
                                                        {/*		placeholder=""*/}
                                                        {/*	>*/}
                                                        {/*		{o.payment.map((e, i) =>*/}
                                                        {/*			<Option key={i} value={e}>{e}</Option>)}*/}
                                                        {/*	</Select>*/}
                                                        {/*	:*/}
                                                        {/*	o.payment*/}
                                                        {/*}*/}
                                                    </div>
                                                </td>
                                            }

                                            {(completed || waiting) ?
                                                <>
                                                    <td className={'calculation-offers__table--col-6 wide'}>
                                                        <div
                                                            className={"offer-row__status " + (completed ? "approved" : "waiting")}/>
                                                    </td>
                                                </>
                                                :
                                                <>
                                                    {(osago && waiting) ?
                                                        <td>
                                                            <div className="offer-row__date">{o.dateStart}</div>
                                                            <div className="offer-row__date">{o.dateEnd}</div>
                                                        </td>
                                                        : null
                                                    }
                                                    <td className={'calculation-offers__table--col-6 small'}>
                                                        <ReactComment
                                                            text={'ecr-kasko/src/components/offer-row-combo/index.jsx ' + name + ' selected ' + o.selected}/>

                                                        <Checkbox disabled={((allowCheck || osago) ? null : "disabled")}
                                                                  checked={o.selected ? "checked" : null}
                                                                  className="offer-row__check"
                                                                  onChange={(e) => this.onSelectOfferToggle(company, i, e, o.disableCashierPayment)}/>
                                                    </td>
                                                </>
                                            }

                                            <td className={'calculation-offers__table--col-6'}>
                                                {'options' in o && o.options.length ?
                                                    <div onClick={() => this.addOptionFlag(i)}
                                                         className="offer-row__link"/> : <>&nbsp;</>}
                                            </td>
                                        </>}
                                </tr>
                            }
                            {!declined && showOptions && 'options' in o && o.options.length ?
                                <tr key={i + 100000}
                                    className={'info_row ' + (offerSelected ? "selected" : "") + (lastRow ? ' last-row' : '')}>
                                    <td>&nbsp;</td>
                                    <td colSpan={((completed || waiting) ? 4 : 4)}>
                                        {/*<p className="text_left" style={{marginBottom: '15px'}}>Условия е-ОСАГО:</p>*/}

                                        <ul className={"offer-row__options" + (o.options.length && (typeof o.options[0] !== 'string') ? ' __no-cols' : '')}>
                                            {o.options.map((opt, k) => {
                                                let ret = [];
                                                if (typeof opt === 'string') {
                                                    ret.push(<li key={k}>{opt}</li>);
                                                } else {
                                                    ret.push(buildOptions(opt));
                                                }

                                                return (ret)
                                            })}
                                        </ul>
                                    </td>
                                    <td>&nbsp;</td>
                                </tr>
                                : null}
                        </> : null)
                })}
            </>
        );
    }
}

export default OfferRowEosago;
