import React, {Component} from "react";
import {Input, Col, Row, Select, Checkbox} from "antd";
import './style.scss';
import PropTypes from "prop-types";

import InsurancePolicy from "../insurance-policy";
import {Link} from "react-router-dom";
import Inputmask from "inputmask";

const {Option} = Select;

class CheryHeader extends Component {
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
		<header>
			<div className="stick">
				<div className="top" style={{opacity: '1'}}>
					<a className="logo" href="/">
						<img src="./images/logo.png" alt="Chery"/>
					</a>
					<div className="contacts">
						<a href="tel:88005559998" className="tel">8-800-555-999-8</a>
						<a href="/back_call#form" className="back_call">Обратный звонок</a>
					</div>
					<div className="car2015">
						<img src="./images/2019.png" alt="Автомобиль 2019 года" />
					</div>
					<div className="mobile_nav hidden-lg">
						<a className="nav_1"></a>
						<a className="nav_2 xs-hidden"></a>
					</div>
				
					<nav className="hidden-md visible-lg nav_1_mobile topcat" style={{display: 'none'}}>
						<img src="./images/test-drive.png" alt="" />
						<a href="/signup_testdrive">Записаться<br className="hidden-md" /> на тест-драйв</a>
						<img src="./images/pay.png" alt=""/>
						<a href="/creditonline">Получить кредит<br className="hidden-md" /> ОНЛАЙН</a>
						<img src="./images/cars.png" alt=""/>
						<a href="https://www.chery.ru/shop_search">СHERY ОНЛАЙН<br className="hidden-md" /> спецпредложение</a>
						<img src="./images/dealers.png" alt=""/>
						<a href="/dealers">Найти<br className="hidden-md" /> дилера</a>
						<img src="./images/lk.png" alt=""/>
						<a href="https://lk.chery.ru/">Личный <br className="hidden-md" /> кабинет</a>
					</nav>
			</div>
		</div>

			<div className="navigation">
				<nav className="hidden-md visible-lg nav_2_mobile" style={{display: 'none'}}>
					<a className="models roll" href="#"><span>Модельный ряд</span></a>
					<div className="models_open hidden-md-i" style={{display: 'none'}}>
						<div className="row">
							<div className="range">
								<div className="switch">
									<div className="first selected">Внешний вид</div>
									<div className="second">Характеристики</div>
								</div>
								<div className="models-items">
									<div>
										<a className="models-items-link" href="https://tiggo8.chery.ru/" target="_blank">
											<div className="model tiggo_8">
												<p className="h6">Tiggo 8
													<span className="oldnew"><s><i>1 599 900</i> руб.</s><span><b>1 399 900</b> руб.</span></span>
												</p>
											</div>
										</a>
										<a className="models-items-button" href="/shop_search">Автомобили в наличии</a>
									</div>
									<div>
										<a className="models-items-link" href="/models/tiggo7">
											<div className="model tiggo_7">
												<p className="h6">Tiggo 7
													<span className="oldnew">
						<s>
						от <i>1 199 900</i> руб.
						</s>                                                                    <span>от
						<b>999 900</b>
						руб.</span>
						</span>
														</p>
													</div>
												</a>
												<a className="models-items-button" href="/shop_search">Автомобили в наличии</a>
											</div>
											<div>
												<a className="models-items-link" href="/models/tiggo5new">
													<div className="model tiggo_5">
														<p className="h6">Tiggo 5
															<span className="oldnew">
						от
						<i>999 900</i>
						руб.
						</span>
														</p>
													</div>
												</a>
												<a className="models-items-button" href="/shop_search">Автомобили в наличии</a>
											</div>
											<div>
												<a className="models-items-link" href="/models/tiggo4">
													<div className="model tiggo_4">
														<p className="h6">Tiggo 4
															<span className="oldnew">
						<s>
						от <i>919 900</i> руб.
						</s>                                                                    <span>от
						<b>859 900</b>
						руб.</span>
						</span>
														</p>
													</div>
												</a>
												<a className="models-items-button" href="/shop_search">Автомобили в наличии</a>
											</div>
											<div>
												<a className="models-items-link" href="/models/tiggo3">
													<div className="model tiggo_3">
														<p className="h6">Tiggo 3
															<span className="oldnew">
						<br/>
						<span>от
						<b>749 900</b>
						руб.</span>
						</span>
														</p>
													</div>
												</a>
												<a className="models-items-button" href="/shop_search">Автомобили в наличии</a>
											</div>
										</div>
									</div>
									<div className="performance">
										<div className="switch">
											<div className="first selected">Внешний вид</div>
											<div className="second">Характеристики</div>
										</div>
										<div className="models-items">
											<a className="models-items-link" href="https://tiggo8.chery.ru/" target="_blank">
												<div className="model tiggo_8">
													<p className="h6">Tiggo 8
														<span
															className="oldnew"><s><i>1 599 900</i> руб.</s><span><b>1 399 900</b> руб.</span></span>
													</p>
													<div className="power">
														170 л.с.
														<p>5500 об/мин</p>
													</div>
													<div className="fuel">
														Расход на 100 км, л
														<div>
															<p className="track_rate">6,3</p>
															<p className="city_rate">11,5</p>
															<p className="average_rate">8,2</p>
														</div>
													</div>
												</div>
											</a>
											<a className="models-items-link" href="/models/tiggo7">
												<div className="model tiggo_7">
													<p className="h6">Tiggo 7
														<span className="oldnew">
						<s>
						от <i>1 199 900</i> руб.
						</s>                                                                <span>от
						<b>999 900</b>
						руб.</span>
						</span>
													</p>
													<div className="power">
														152 л.с./122 л.с***
														<p>5500 об/мин</p>
													</div>
													<div className="fuel">
														Расход на 100 км, л
														<div>
															<p className="track_rate">5.5/5.8</p>
															<p className="city_rate">8.7/10.2</p>
															<p className="average_rate">6.7/7.4**</p>
														</div>
													</div>
												</div>
											</a>
											<a className="models-items-link" href="/models/tiggo5new">
												<div className="model tiggo_5">
													<p className="h6">Tiggo 5
														<span className="oldnew">
						от
						<i>999 900</i>
						руб.
						</span>
													</p>
													<div className="power">
														136 л.с.
														<p>5750 об/мин</p>
													</div>
													<div className="fuel">
														Расход на 100 км, л
														<div>
															<p className="track_rate">6,9/6,9</p>
															<p className="city_rate">10,7/10,9</p>
															<p className="average_rate">8,3/8,3**</p>
														</div>
													</div>
												</div>
											</a>
											<a className="models-items-link" href="/models/tiggo4">
												<div className="model tiggo_4">
													<p className="h6">Tiggo 4
														<span className="oldnew">
						<s>
						от <i>919 900</i> руб.
						</s>                                                                <span>от
						<b>859 900</b>
						руб.</span>
						</span>
													</p>
													<div className="power">
														147 л.с./123 л.с.
														<p>5500 об/мин</p>
													</div>
													<div className="fuel">
														Расход на 100 км, л
														<div>
															<p className="track_rate">6.0/6.4</p>
															<p className="city_rate">9.6/11.2</p>
															<p className="average_rate">7.2/8.2</p>
														</div>
													</div>
												</div>
											</a>
											<a className="models-items-link" href="/models/tiggo3">
												<div className="model tiggo_3">
													<p className="h6">Tiggo 3
														<span className="oldnew">
						<br/>
						<span>от
						<b>749 900</b>
						руб.</span>
						</span>
													</p>
													<div className="power">
														126 л.с.
														<p>6150 об/мин</p>
													</div>
													<div className="fuel">
														Расход на 100 км, л
														<div>
															<p className="track_rate">6,3/6,9</p>
															<p className="city_rate">9,0/10,7</p>
															<p className="average_rate">7,3/8,2**</p>
														</div>
													</div>
												</div>
											</a>
										</div>
										<div className="notes">
											<p>*Показатели расхода топлива определены в соответствии с Правилами ЕЭК ООН № 101</p>
											<p>**Указаны данные для механической/
												<br />
													автоматической трансмиссий
											</p>
											<p>*** Указаны данные для турбированного/атмосферного двигателя</p>
										</div>
									</div>
								</div>
							</div>
							<div className="models_open mobile_list hidden-lg-i" style={{display: 'none'}}>
								<a href="https://tiggo8.chery.ru/">Tiggo 8</a> <a href="/models/tiggo7">Tiggo 7</a> <a href="/models/tiggo5new">Tiggo
								5</a> <a href="/models/tiggo4">Tiggo 4</a> <a href="/models/tiggo3">Tiggo 3</a></div>
						
							<a className="mileage roll" href="#" id="1"><span>Покупателям</span>
						</a>
						<div className="mileage_open hidden-md-i" style={{display: 'none'}}>
							<div className="row">
								<a className="one trade-in" href="/trade_in"><p className="h2">Chery Trade-in</p><p>Оцените ваш автомобиль <br
									className="hidden-md" />ОНЛАЙН</p>
									<div>Подробнее<br className="hidden-md"/> о программе обмена</div>
								</a><a className="one offers" href="https://www.chery.ru/shop_search"><p className="h2">Специальные предложения</p>
								<p>Автомобили в наличии<br className="hidden-md"/> на выгодных условиях</p>
								<div>Подробнее<br className="hidden-md"/>о спецпредложениях</div>
							</a><a className="one assess correctprice" href="https://www.chery.ru/shop_search"><p className="h2">Онлайн бронирование</p>
								<p>Забронируйте автомобиль<br className="hidden-md"/> не выходя из дома</p>
								<div>Подробнее<br className="hidden-md"/> об онлайн бронировании</div>
							</a><a className="one coorporate" href="/corporate_sales"><p className="h2">Корпоративные продажи</p><p>Особый подход<br
								className="hidden-md" /> к вашему бизнесу</p>
								<div>Подробнее<br className="hidden-md"/> о корпоративных продажах</div>
							</a><a className="one cloudrive" href="/cloudrive"><p className="h2">Технология CLOUDRIVE</p><p>Управление автомобилем <br
								className="hidden-md" /> не отвлекаясь на мелочи</p>
								<div>Подробнее<br/> о технологии cloudrive</div>
							</a></div>
						</div>
						<div className="mileage_open mobile_list hidden-lg-i" style={{display: 'none'}}>
							<a href="/trade_in" className="trade-in">Chery Trade-in</a><a href="https://www.chery.ru/shop_search" className="offers">Специальные
							предложения</a><a href="https://www.chery.ru/shop_search" className="assess correctprice">Онлайн бронирование</a><a
							href="/corporate_sales" className="coorporate">Корпоративные продажи</a><a href="/cloudrive" className="cloudrive">Технология
							CLOUDRIVE</a> <a href="javascript:void(0)" className="correctprice">Оцените ваш автомобиль</a>
						</div>
						<a className="finance roll" href="#" id="2"><span>Chery кредит</span></a>
						<div className="finance_open page_icons hidden-md-i" style={{display: 'none'}}>
							<div className="container">
								<div className="row">
									<a className="one" href="/creditonline">
										<div className="more inline">Получить кредит <br className="hidden-md"/>ОНЛАЙН</div>
									</a><a className="one" href="/finance">
									<div className="more inline">Программы CHERY FINANCE</div>
								</a><a className="one carfin_popup" href="#">
									<div className="more inline">Кредитный калькулятор CHERY</div>
								</a></div>
							</div>
						</div>
						<div className="finance_open mobile_list hidden-lg-i" style={{display: 'none'}}>
							<a href="/creditonline">Получить кредит <br className="hidden-md"/>ОНЛАЙН</a><a href="/finance">Программы CHERY
							FINANCE</a><a className="carfin_popup" href="#">Кредитный калькулятор CHERY</a></div>
						<a className="world roll" href="#" id="3"><span>Мир chery</span></a>
						<div className="world_open page_icons hidden-md-i" style={{display: 'none'}}>
							<div className="container">
								<div className="row">
									<a className="one" href="/about">
										<div className="image"><img src="/images/navigation/about.jpg" alt="О компании"/></div>
										<div className="more inline">О компании</div>
									</a><a className="one" href="/press">
									<div className="image"><img src="/images/navigation/news.jpg" alt="Новости"/></div>
									<div className="more inline">Новости</div>
								</a><a className="one" href="/press/publications">
									<div className="image"><img src="/images/navigation/publications.jpg" alt="СМИ и блогеры о нас"/></div>
									<div className="more inline">СМИ и блогеры о нас</div>
								</a><a className="one" href="/press/social">
									<div className="image"><img src="/images/navigation/social.jpg" alt="Мы в соцсетях"/></div>
									<div className="more inline">Мы в соцсетях</div>
								</a><a className="one" href="/customer_support">
									<div className="image"><img src="/images/navigation/support.jpg" alt="Клиентская поддержка"/></div>
									<div className="more inline">Клиентская поддержка</div>
								</a><a className="one" href="/contacts">
									<div className="image"><img src="/images/navigation/contacts.jpg" alt="Контакты"/></div>
									<div className="more inline">Контакты</div>
								</a></div>
							</div>
						</div>
						<div className="world_open mobile_list hidden-lg-i" style={{display: 'none'}}>
							<a href="/about">О компании</a><a href="/press">Новости</a><a href="/press/publications">СМИ и блогеры о нас</a><a
							href="/press/social">Мы в соцсетях</a><a href="/customer_support">Клиентская поддержка</a><a
							href="/contacts">Контакты</a></div>
						<a className="services roll" href="#" id="13"><span>Обслуживание</span></a>
						<div className="services_open page_icons hidden-md-i" style={{display: 'none'}}>
							<div className="container">
								<div className="row">
									<a className="one" href="/service/chery_guarantee">
										<div className="more inline">Гарантия Chery</div>
									</a><a className="one" href="/service/help">
									<div className="more inline">Программа «Помощь в пути»</div>
								</a><a className="one" href="/service/original_access">
									<div className="more inline">Оригинальные аксессуары</div>
								</a><a className="one" href="/oil">
									<div className="more inline">Chery Oil</div>
								</a></div>
							</div>
						</div>
						<div className="services_open mobile_list hidden-lg-i" style={{display: 'none'}}>
							<a href="/service/chery_guarantee">Гарантия Chery</a><a href="/service/help">Программа «Помощь в пути»</a><a
							href="/service/original_access">Оригинальные аксессуары</a><a href="/oil">Chery Oil</a></div>
						<a className="visible-mobile-i" href="/dealers" id="24">Найти дилера</a>
						<a className="hidden-lg-i" href="#callkeeper" id="25">Заказать обратный звонок</a>
						<a className="parts" href="/parts" id="27">Запчасти и аксессуары</a>
						<a className="visible-mobile-i" href="https://lk.chery.ru/" id="26">Личный кабинет</a>
						<a className="archive roll hidden-lg-i" href="#"><span>Архивные модели</span></a>
						<div className="archive_open mobile_list hidden-lg-i">
							<a href="/archived_models">Смотреть архивные модели</a>
						</div>
					</nav>
			</div>
		</header>
		);
	}
}

export default CheryHeader;
