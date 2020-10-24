import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";

class KaskoUser extends Component {
    static propTypes = {
        children: PropTypes.node,
        innerWidth: PropTypes.number
    };

    render() {
        const {firstName, lastName, avatar, phone, docs, trustees, autos} = this.props;
        return (
            <div className="kasko-user">
                <div className="kasko-user__avatar">
                    <img src={avatar || 'user.png'} alt=""/>
                </div>
                <div
                    className={"kasko-user__name" + ((lastName || firstName) ? "" : " _inactive")}>{lastName || 'Фамилия'}
                    <br/> {firstName || 'Имя'}</div>
                <div
                    className={"kasko-user__info _phone" + ((phone) ? "" : " _inactive")}>{phone || '+ _ (___) ___ -__-__'}</div>
                <div
                    className={"kasko-user__info _small" + ((docs) ? "" : " _inactive")}>{docs || 'Анкета и документы'}</div>
                <div
                    className={"kasko-user__info _small" + ((trustees) ? "" : " _inactive")}>{trustees || 'Доверенные лица'}</div>
                <div
                    className={"kasko-user__info _small" + ((autos) ? "" : " _inactive")}>{autos || 'Автомобили клиента'}</div>
            </div>
        );
    }
}

export default KaskoUser;
