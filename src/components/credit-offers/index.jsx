import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";
import OfferRow from "../offer-row";
import {Select} from "antd";
import ReactComment from "../../helpers/reactComment";
import OfferRowCombo from "../offer-row-combo";

const {Option} = Select;

class CreditOffers extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        children: PropTypes.node,
        innerWidth: PropTypes.number,
        popupCloseFunc: PropTypes.func,
        offersList: PropTypes.array
    };

    onSelectOfferToggle = (index, selected, disableCashier) => {
        //let options = Object.assign({}, this.state.offerSelected)

        //this.setState({offerSelected: options, disableCashierPayment: disableCashierPayment})

        setTimeout(() => {
            console.log('onSelectOfferToggle credit row', index, selected, disableCashier);
            this.props.selectedOffer && typeof this.props.selectedOffer === 'function' && this.props.selectedOffer(index, selected, disableCashier)
        }, 0)
    }

    render() {
        const {offersList, selectedOffer, completed, waiting, allowCheck} = this.props

        let bankOptions = [
            'Все банки'
        ]

        return (
            <div className="calculation-offers">
                <ReactComment text='"ecr-kasko/src/components/credit-offers/index.jsx"'/>

                <table className="calculation-offers__table">
                    <thead>
                    <tr>
                        <th className={"calculation-offers__table--col-1" + ((completed || waiting) ? " small" : "")}>
                            <Select
                                size="small"
                                dropdownClassName="select_dropdown_v1"
                                className={"w_100p small_select"}
                                placeholder=""
                            >
                                {bankOptions.map((e, i) =>
                                    <Option key={i} value={e}>{e}</Option>)}
                            </Select>
                        </th>
                        <th className={"calculation-offers__table--col-2 wide"}>Программа</th>
                        <th className={"calculation-offers__table--col-3" + ((completed || waiting) ? " small" : "")}>Платеж</th>
                        <th className={"calculation-offers__table--col-3" + ((completed || waiting) ? " small" : "")}>Ставка</th>
                        <th className={"calculation-offers__table--col-4" + ((completed || waiting) ? " small" : "")}>Доход <br/>дилера
                        </th>
                        <th className="calculation-offers__table--col-4">Параметры<br/>кредита</th>
                        <th className="calculation-offers__table--col-5">Выбрать</th>
                        <th className="calculation-offers__table--col-6">&nbsp;</th>
                    </tr>
                    </thead>

                    {offersList && offersList.length ?
                        <tbody>
                        {
                            offersList.map((o, k) => {
                                return (<OfferRow allowCheck={true} credit={true} key={k}
                                                  selectedOffer={(select, disableCashier) => this.onSelectOfferToggle(k, select, disableCashier)}
                                                  company={k} logo={o.logo} info={o.info} name={o.name}
                                                  offers={o.offers}/>)
                            })
                        }
                        </tbody>
                        : null
                    }
                </table>

                {waiting ?
                    <div className="kasko-offer__more">
                        <div className="gl_link">Показать все предложения</div>
                    </div>
                    : null
                }
            </div>
        );
    }
}

export default CreditOffers;
