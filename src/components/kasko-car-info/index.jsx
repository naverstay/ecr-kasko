import React, {Component} from "react";
import ReactComment from "../../helpers/reactComment";

import './style.scss';
import PropTypes from "prop-types";

class KaskoCarInfo extends Component {
    static propTypes = {
        children: PropTypes.node,
        innerWidth: PropTypes.number,
        notificationCount: PropTypes.any
    };

    onChange = e => {
        this.setState({
            value: e.target.value
        });
    };

    render() {
        const {carName, carModel, image, info, price, notificationCount, step, osago, garage} = this.props;

        return (
            <div className="kasko-car-info">
                <ReactComment text="ecr-kasko/src/components/kasko-car-info/index.jsx"/>
                <div className="kasko-car-info__notification">{notificationCount ?
                    <span>{notificationCount}</span> : ""}</div>
                <div className={"kasko-car-info__name" + ((carName) ? "" : " _inactive")}>{carName || 'Марка'}</div>
                <div className={"kasko-car-info__name" + ((carName) ? "" : " _inactive")}>{carModel || 'Модель'}</div>

                {garage ? null :
                    <>
                        <div className={"kasko-car-info__info _inactive"}>{info || 'Год выпуска'}</div>
                        <div className={"kasko-car-info__info _inactive"}>{price || 'Стоимость'}</div>
                        <div className={"kasko-car-info__image" + (step === 1 ? " _inactive__" : "")}>
                            <img src={'./cars/' + image + '-s.png'} alt=""/>
                        </div>
                        <div className="kasko-car-info__controls">
                            {/*<Radio.Group onChange={this.onChange} >*/}
                            {/*	<Radio value={1}>Кредит</Radio>*/}
                            {/*	<Radio value={2}>е-ОСАГО</Radio>*/}
                            {/*	<Radio value={3}>КАСКО</Radio>*/}
                            {/*</Radio.Group>*/}

                            <ul className="kasko-car-info__status">
                                <li className="kasko-car-info__status--item">Кредит</li>
                                <li className={"kasko-car-info__status--item" + (osago ? (notificationCount === 1 ? ' waiting' : notificationCount === 2 ? ' approved' : '') : "")}>е-ОСАГО</li>
                                <li className={"kasko-car-info__status--item" + (!osago ? (notificationCount === 1 ? ' waiting' : notificationCount === 2 ? ' approved' : '') : "")}>КАСКО</li>
                            </ul>

                        </div>
                    </>
                }
            </div>
        );
    }
}

export default KaskoCarInfo;
