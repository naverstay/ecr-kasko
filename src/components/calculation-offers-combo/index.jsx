import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";
import OfferRowCombo from "../offer-row-combo";
import {Checkbox, Col, Radio, Row} from "antd";
import ReactComment from "../../helpers/reactComment";

class CalculationOffersCombo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSortType: false
        };
    }

    static propTypes = {
        children: PropTypes.node,
        innerWidth: PropTypes.number,
        hasSortType: PropTypes.bool,
        popupCloseFunc: PropTypes.func,
        offersList: PropTypes.array
    };

    openSortType = (type) => {
        this.setState({showSortType: !this.state.showSortType})
    }

    onSortTypeChange = (type) => {
        console.log('onSortTypeChange', type);
    }

    onSelectOfferToggle = (index, selected, disableCashier) => {
        //let options = Object.assign({}, this.state.offerSelected)

        //this.setState({offerSelected: options, disableCashierPayment: disableCashierPayment})

        setTimeout(() => {
            console.log('onSelectOfferToggle row', index, selected, disableCashier);
            this.props.selectedOffer && typeof this.props.selectedOffer === 'function' && this.props.selectedOffer(index, selected, disableCashier)
        }, 0)
    }

    render() {
        const {offersList, selectedOffer, completed, waiting, allowCheck, osago, hasSortType} = this.props

        const sortTypeList = ['Сортировать по самому выгодному КАСКО+ОСАГО', 'Сортировать по самому выгодному КАСКО', 'Сортировать по самому выгодному GAP', 'Сортировать по самому выгодному ОСАГО']

        return (
            <div className="calculation-offers">
                <ReactComment text='"ecr-kasko/src/components/calculation-offers-combo/index.jsx"'/>

                <table className="calculation-offers__table">
                    <thead>
                    <tr>
                        <th className={"calculation-offers__table--col-8" + ((completed || waiting) ? " small" : "")}>
                            <div className="calculation-offers__table--sort-holder">
                                <span>Страховая компания</span>
                                {this.state.showSortType ?
                                    <div className="calculation-offers__table--sort-wrapper">
                                        <div className="kasko-car-select__controls radio_v4 mb_0">
                                            <Radio.Group defaultValue={sortTypeList[0]}
                                                         onChange={this.onSortTypeChange}>
                                                <ul className="calculation-offers__table--sort-list">
                                                    {sortTypeList.map((c, i) => <li key={i}>
                                                        <Radio value={c}>
                                                            <span className="">{c}</span>
                                                        </Radio>
                                                    </li>)}
                                                </ul>
                                            </Radio.Group>
                                        </div>
                                    </div>
                                    : null
                                }
                            </div>
                        </th>
                        <th className={"calculation-offers__table--col-8"}>
                            {hasSortType ?
                                <span onClick={this.openSortType}
                                      className={"sort-btn " + (!this.state.showSortType ? '_asc' : '_desc')}>Тип</span> :
                                <span>Тип</span>
                            }
                        </th>
                        <th className={"calculation-offers__table--col-10 text_left" + ((completed || waiting) ? " small" : "")}>{osago ? null : <>Тариф</>}</th>
                        <th className={"calculation-offers__table--col-5" + ((completed || waiting) ? " small" : "")}>Стоимость</th>
                        <th className={"calculation-offers__table--col-5" + ((completed || waiting) ? " small" : "")}>Доход <br/>дилера
                        </th>
                        {osago ? null :
                            <th className={"calculation-offers__table--col-5" + ((completed || waiting) ? " small" : "")}>В
                                кредит</th>
                        }
                        {(completed || waiting) ?
                            <>
                                <th className="calculation-offers__table--col-8">Срок <br/>действия</th>
                                <th className="calculation-offers__table--col-7 text_left">Полис</th>
                                <th className="calculation-offers__table--col-6">Статус <br/>выпуска</th>
                                <th className="calculation-offers__table--col-6">&nbsp;</th>
                            </> :
                            <>
                                <th className={"calculation-offers__table--col-10"}>&nbsp;</th>
                                {osago ?
                                    <th className="calculation-offers__table--col-7 text_left">Полис</th> :
                                    <th className="calculation-offers__table--col-4">&nbsp;</th>
                                }
                                <th className="calculation-offers__table--col-5">Выбрать</th>
                                <th className="calculation-offers__table--col-6">&nbsp;</th>
                            </>
                        }
                    </tr>
                    </thead>

                    {offersList && offersList.length ?
                        <tbody>
                        {offersList.map((offer, k) => {
                            let ret = []

                            offer.offers.map((o, i) => {
                                if ('list' in o) {
                                    ret.push(<OfferRowCombo allowCheck={allowCheck}
                                                            osago={osago}
                                                            completed={completed} waiting={waiting}
                                                            selectedOffer={(select, disableCashier) => this.onSelectOfferToggle(k, select, disableCashier)}
                                                            lastRow={i === offer.offers.length - 1}
                                                            key={i} company={i} logo={false}
                                                            name={i ? '' : offer.name}
                                                            offers={o.list}/>)
                                } else {
                                    ret.push(<OfferRowCombo allowCheck={allowCheck}
                                                            osago={osago}
                                                            completed={completed} waiting={waiting}
                                                            selectedOffer={(select, disableCashier) => this.onSelectOfferToggle(k, select, disableCashier)}
                                                            lastRow={i === offer.offers.length - 1}
                                                            key={i} company={i} logo={false} name={i ? '' : offer.name}
                                                            offers={[o]}/>)
                                }
                            })

                            return ret
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

export default CalculationOffersCombo;
