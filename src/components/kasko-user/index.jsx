import React, {Component} from "react";
import {Link, NavLink} from "react-router-dom";

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
                    className={"kasko-user__info _small"}>
                    <NavLink to={"/docs"} activeClassName='_active' className={'gl_link'}>{docs || 'Анкета и документы'}</NavLink></div>
                {/*<div className={"kasko-user__info _small" + ((trustees) ? "" : " _inactive")}>{trustees || 'Доверенные лица'}</div>*/}
                {/*<div*/}
                {/*    className={"kasko-user__info _small" + ((trustees) ? "" : " _inactive")}>*/}
                {/*    <Link to={"/trustees"} className={'gl_link'}>{trustees || 'Доверенные лица'}</Link>*/}
                {/*</div>*/}
                <div
                    className={"kasko-user__info _small"}>
                    <NavLink to={"/vehicles"} activeClassName='_active' className={'gl_link'}>{autos || 'Автомобили клиента'}</NavLink>
                </div>
            </div>
        );
    }
}

export default KaskoUser;
