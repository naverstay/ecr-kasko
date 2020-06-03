import React, {Component} from "react";

//import {Input, Col, Row, Select, Checkbox} from "antd";
import './style.scss';
import PropTypes from "prop-types";

//import InsurancePolicy from "../insurance-policy";
//import {Link} from "react-router-dom";
//import Inputmask from "inputmask";

//const {Option} = Select;

class CheryFooter extends Component {
	constructor(props) {
		super(props);
		this.state = {
		
		};
	}
	
	static propTypes = {
		children: PropTypes.node,
		fullCalculation: PropTypes.bool,
		innerWidth: PropTypes.number
	};
	
	render() {
		return (
			<footer>
				<div className="container xs-hidden">
					<div className="quarter mg-0-md"><p className="h3"><a href="#">Модельный ряд Chery</a></p></div>
					<div className="quarter hidden-md"><p className="h3"><a href="/archived_models">Архивные модели
						Chery</a></p></div>
					<div className="quarter hidden-md"><p className="h3"><a className="correctprice"
																			href="javascript:void(0)">Оцените ваш
						автомобиль</a></p></div>
					<div className="ten hidden-md"><p className="h3">&nbsp;</p></div>
					<div className="quarter hidden-md"><p className="h3"><a href="/corporate_sales">Корпоративные
						продажи</a></p></div>
				</div>
				<div className="container space xs-hidden">
					<div className="five-foot"><p className="h4"><a href="/models/tiggo7">Tiggo 7</a></p></div>
					<div className="five-foot"><p className="h4"><a href="/models/tiggo5new">Tiggo 5</a></p></div>
					<div className="five-foot"><p className="h4"><a href="/models/tiggo4">Tiggo 4</a></p></div>
					<div className="five-foot"><p className="h4"><a href="/models/tiggo3">Tiggo 3</a></p></div>
				</div>
				<div className="container space hidden-lg xs-hidden">
					<div className="quarter">
						<p className="h3"><a href="/archived_models">Архивные модели Chery</a></p>
						<a href="/archived_models">Смотреть архивные модели</a>
					</div>
				</div>
				<div className="container space xs-hidden">
					<div className="quarter"><p className="h3"><a href="#">Покупателям</a></p><a href="/trade_in"
																								 className="">Трейд-ин</a><a
						href="/in_stock" className="">Специальные предложения</a><a
						href="https://www.chery.ru/shop_search" className="correctprice">Онлайн бронирование </a><a
						href="/cloudrive" className="">Технология CLOUDRIVE</a><a href="/corporate_sales" className="">Корпоративные
						продажи</a></div>
					<div className="quarter"><p className="h3"><a href="/finance">Chery finance</a></p><a
						href="/finance#finance_info2" className="">Специальное предложение</a><a
						href="/finance#finance_info3" className="">Стандартное предложение</a><a
						href="/finance#finance_info4" className="">Страхование</a><a href="/finance#finance_credit"
																					 className="">Рассчитать кредит</a>
					</div>
					<div className="ten hidden-md"><p className="h3">&nbsp;</p></div>
					<div className="quarter -mg-0-md"><p className="h3"><a href="#">Chery обслуживание</a></p><a
						href="/service/chery_guarantee" className="">Гарантия Chery</a><a href="/service/help"
																						  className="">Программа «Помощь
						в пути»</a><a href="/service/original_access" className="">Оригинальные аксессуары</a></div>
					<div className="quarter -mg-0-md"><p className="h3"><a href="#">Мир Chery</a></p><a href="/about"
																										className="">О
						компании</a><a href="/press" className="">Новости</a><a href="/press/publications" className="">СМИ
						о нас</a><a href="/terms_of_service" className="">Правовая информация</a><a href="/press/social"
																									className="">Мы в
						соцсетях</a><a href="/customer_support" className="">Клиентская поддержка</a><a href="/contacts"
																										className="">Контакты</a><a
						href="/press/articles" className="">Полезные советы</a><a href="https://www.chery-motors.kz/"
																				  className="">Chery Казахстан</a></div>
				</div>
				<div className="container">
					<div className="third">
						<p className="h3">Горячая линия</p>
						<p className="h4"><a href="tel:88005559998">8 (800) 555-9998</a></p>
					</div>
					<div className="third">
						<p className="h3">Общайтесь с нами в соцсетях</p>
						<div className="social row_min">
							<a href="//www.facebook.com/cheryrussia" rel="nofollow"><img
								src="./images/facebook.png" alt="facebook"/></a>
							<a href="//vk.com/cheryrussia" rel="nofollow"><img src="./images/vk.png" alt="vk"/></a>
							<a href="//www.youtube.com/user/rucherycars" rel="nofollow"><img
								src="./images/youtube.png" alt="youtube"/></a>
							<a href="//www.instagram.com/chery.russia/" rel="nofollow"><img
								src="./images/instagram.png" alt="instagram"/></a>
							<a href="//ok.ru/group/53683542098091" rel="nofollow"><img src="./images/ok.png"
																					   alt="Одноклассники"/></a>
						</div>
					</div>
					<div className="third">
						<p className="h3">Chery рекомендует</p>
						<div className="cheryoil">Масло CHERYOIL</div>
					</div>
				</div>
				<div className="bottom mg-0-md">
					<div className="row">
						<div className="copy">© 2019 АО «ЧЕРИ АВТОМОБИЛИ РУС»</div>
						<nav>
							<a href="/contacts">Контакты</a>
							<a href="/info">Юридическая информация</a>
							<a href="http://dealers.chery.ru/" target="_blank" rel="nofollow">Раздел для дилеров</a>
							<a href="/sitemap">Карта сайта</a>
						</nav>
					</div>
				</div>
				<div className="xs-footer-bottom">
					<div className="js-footer-button hidden xs-footer-button">Карта сайта</div>
					<div className="xs-footer-content">
						<div className="container">
							<div className="quarter mg-0-md"><p className="h3"><a href="#">Модельный ряд Chery</a></p>
							</div>
						</div>
						<div className="container space xs-padding-bottom">
							<div className="five-foot"><p className="h4"><a href="/models/tiggo7">Tiggo 7</a></p></div>
							<div className="five-foot"><p className="h4"><a href="/models/tiggo5new">Tiggo 5</a></p>
							</div>
							<div className="five-foot"><p className="h4"><a href="/models/tiggo4">Tiggo 4</a></p></div>
							<div className="five-foot"><p className="h4"><a href="/models/tiggo3">Tiggo 3</a></p></div>
						</div>
						<div className="container space hidden-lg">
							<div className="quarter">
								<p className="h3 xs-margin-bottom"><a href="/archived_models">Архивные модели Chery</a>
								</p>
								<a href="/archived_models">Смотреть архивные модели</a>
							</div>
						</div>
						<div className="container space hidden-lg">
							<div className="quarter"><p className="h3 xs-margins"><a href="#">Покупателям</a></p><a
								href="/trade_in" className="">Трейд-ин</a><a href="/in_stock" className="">Специальные
								предложения</a><a href="https://www.chery.ru/shop_search" className="correctprice">Онлайн
								бронирование </a><a href="/cloudrive" className="">Технология CLOUDRIVE</a><a
								href="/corporate_sales" className="">Корпоративные продажи</a></div>
						</div>
						<div className="container space hidden-lg">
							<div className="quarter"><p className="h3 xs-margins"><a href="/finance">Chery finance</a>
							</p><a href="/finance#finance_info2" className="">Специальное предложение</a><a
								href="/finance#finance_info3" className="">Стандартное предложение</a><a
								href="/finance#finance_info4" className="">Страхование</a><a
								href="/finance#finance_credit" className="">Рассчитать кредит</a></div>
						</div>
						<div className="container space ">
							<div className="quarter -mg-0-md"><p className="h3 xs-margin-bottom"><a href="#">Chery
								обслуживание</a></p><a href="/service/chery_guarantee" className="">Гарантия Chery</a><a
								href="/service/help" className="">Программа «Помощь в пути»</a><a
								href="/service/original_access" className="">Оригинальные аксессуары</a></div>
							<div className="quarter -mg-0-md"><p className="h3 xs-margins"><a href="#">Мир Chery</a></p>
								<a href="/about" className="">О компании</a><a href="/press" className="">Новости</a><a
									href="/press/publications" className="">СМИ о нас</a><a href="/terms_of_service"
																							className="">Правовая
									информация</a><a href="/press/social" className="">Мы в соцсетях</a><a
									href="/customer_support" className="">Клиентская поддержка</a><a href="/contacts"
																									 className="">Контакты</a><a
									href="/press/articles" className="">Полезные советы</a><a
									href="https://www.chery-motors.kz/" className="">Chery Казахстан</a></div>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}

export default CheryFooter;
