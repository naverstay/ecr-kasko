import React, {Component} from "react";

import PropTypes from "prop-types";
import ServiceRow from "../service-row";

class ServiceOffers extends Component {
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

    render() {
        const {offersList, selectedOffer, completed, waiting, allowCheck} = this.props

        return (
            <div className="calculation-offers">
                <table className="calculation-offers__table">
                    <thead>
                    <tr>
                        <th className={"calculation-offers__table--col-1" + ((completed || waiting) ? " small" : "")}
                        >Продукт и <br/> Поставщик
                        </th>
                        <th className={"calculation-offers__table--col-3"}>Получатель ДС</th>
                        <th className={"calculation-offers__table--col-3"}>Способ оплаты</th>
                        <th className={"calculation-offers__table--col-2 small"}>Стоимость</th>
                        <th className={"calculation-offers__table--col-9"}>Доход <br/>дилера</th>
                        <th className={"calculation-offers__table--col-9"}>Срок <br/>действия</th>
                        <th className={"calculation-offers__table--col-10"}>Номер карты</th>
                        {(completed || waiting) ?
                            <th className="calculation-offers__table--col-7 text_left">Статус <br/>выпуска</th>
                            :
                            <th className="calculation-offers__table--col-5">Выбрать</th>
                        }
                        <th className="calculation-offers__table--col-6">&nbsp;</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <td>
                            <b>Итого</b>
                        </td>
                        <td colSpan={7}>
                            <b>48 000 ₽</b>
                        </td>
                    </tr>
                    </tfoot>
                    {offersList && offersList.length ?
                        <tbody>{offersList.map((o, i) => {
                            return (<ServiceRow allowCheck={allowCheck}
                                                completed={completed} waiting={waiting} selectedOffer={selectedOffer}
                                                key={i} company={i} logo={o.logo} name={o.name} dealer={o.dealer}
                                                offers={o.offers}/>)
                        })}
                        </tbody> : null}
                </table>
            </div>
        );
    }
}

export default ServiceOffers;
