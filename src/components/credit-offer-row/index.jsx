import React, {Component} from "react";
import {Checkbox} from "antd";

import './style.scss';
import PropTypes from "prop-types";
import pluralFromArray from "../../helpers/pluralFromArray";
import {formatMoney} from "../../helpers/formatMoney";

class CreditOfferRow extends Component {
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

    onSelectOfferToggle = (company, index, e) => {
        let options = Object.assign({}, this.state.offerSelected)

        options[index] = e.target.checked

        this.setState({offerSelected: options})

        setTimeout(() => {
            console.log('onSelectOfferToggle', company, this.state.offerSelected);
            this.props.selectedOffer && typeof this.props.selectedOffer === 'function' && this.props.selectedOffer(company, this.state.offerSelected)
        })
    }

    onCollapseToggle = () => {
        this.setState({rowsCollapsed: !this.state.rowsCollapsed})
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

    render() {
        const {offers, credit, company, completed, waiting, allowCheck, name} = this.props

        return (
            <>
                {offers.map((o, i) => {
                    const show = (i === 0 || !this.state.rowsCollapsed)
                    const showOptions = (i in this.state.optionsToggle) && this.state.optionsToggle[i]
                    const offerSelected = (i in this.state.offerSelected) && this.state.offerSelected[i]

                    return (show ?
                        <>
                            <tr key={i}
                                className={(showOptions ? "expanded" : "") + ((offerSelected && !(completed || waiting)) ? " selected" : "")}>
                                <td>
                                    <div className={"offer-row__logo"}>{name}</div>
                                    <div className={"offer-row__dealer"}>{o.programme}</div>
                                </td>

                                <td>
                                    <div className="offer-row__price text_center">{formatMoney(o.price)} ₽</div>
                                </td>

                                <td>
                                    <div className="offer-row__fee">{o.rate}</div>
                                </td>

                                <td>
                                    <div className="offer-row__fee">{formatMoney(o.dealerFee)} ₽</div>
                                </td>

                                {(completed || waiting) ?
                                    <>
                                        <td>
                                            <div className="offer-row__date">{o.dateStart}</div>
                                            <div className="offer-row__date">{o.dateEnd}</div>
                                        </td>
                                        <td className="text_left">
                                            <div className="offer-row__documents">
                                                <div className="gl_link color_black">{o.document}</div>
                                                <div className="offer-row__bill gl_link">Счет на оплату</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                className={"offer-row__status " + (completed ? "approved" : "waiting")}/>
                                        </td>
                                    </>
                                    :
                                    <>
                                        <td>
                                            <ul className="offer-row__options cols-1">
                                                {o.products.map((opt, k) => <li key={k} className="offer-row__product">
                                                    <div className="offer-row__credit--name">{opt.option}</div>
                                                    <div
                                                        className={"offer-row__credit--val"}>{formatMoney(opt.price)} ₽
                                                    </div>
                                                </li>)}
                                            </ul>
                                        </td>
                                        <td>
                                            <div className={"offer-row__status " + (o.status)}/>
                                        </td>
                                        <td>
                                            <Checkbox disabled={((allowCheck) ? null : "disabled")}
                                                      className="offer-row__check"
                                                      onChange={(e) => this.onSelectOfferToggle(company, i, e)}/>
                                        </td>
                                        <td>
                                            <div onClick={() => this.addOptionFlag(i)} className="offer-row__link"/>
                                        </td>
                                    </>
                                }
                            </tr>

                            {(!(completed || waiting) && showOptions) ?
                                <tr key={i + 100000} className={(offerSelected ? "selected" : "")}>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td colSpan={6}>
                                        <ul className="offer-row__options">
                                            {o.options.map((opt, k) => <li key={k} className="offer-row__credit">
                                                <div className="offer-row__credit--name">{opt.option || ''}</div>
                                                <div onClick={() => {
                                                    opt.func && opt.func()
                                                }}
                                                     className={"offer-row__credit--link" + ((opt.link || opt.func) ? ' gl_link' : '')}
                                                >{opt.price || ''}</div>
                                            </li>)}
                                        </ul>
                                    </td>
                                </tr>
                                : null}
                        </> : null)
                })}
            </>
        );
    }
}

export default CreditOfferRow;
