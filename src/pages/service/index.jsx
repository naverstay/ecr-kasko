import React, {Component} from "react";
import {Button, Col, Row} from "antd";
import AsideBlock from "../../components/aside-block";
import AsideCrumbs from "../../components/aside-crumbs";
import KaskoUser from "../../components/kasko-user";
import KaskoCarInfo from "../../components/kasko-car-info";
import KaskoCarSelect from "../../components/kasko-car-select";
import PropTypes from 'prop-types';

import './style.scss';
import OfferSelect from "../../components/offer-select";
import AuthPopup from "../../components/auth-popup";
import PopupOverlay from "../../components/popup-overlay";
import ServiceSelect from "../../components/service-select";
import ServiceNotices from "../../components/service-notices";

class Service extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAuthForm: false,
			carImage: this.props.step === 1 ? 'car' : 'Hyundai',
			markList: [
				"Hyundai",
				"Mazda",
				"Mercedes-Benz"
			]
		};
	}

	static propTypes = {
		children: PropTypes.node,
		showOffers: PropTypes.any,
		progress: PropTypes.any,
		innerWidth: PropTypes.number,
		step: PropTypes.number
	};

	toggleAuth = (img) => {
		this.setState({showAuthForm: !this.state.showAuthForm})
	}

	imageCallback = (img) => {
		this.setState({carImage: img})
	}

	render() {
		const {showOffers, step, service, cabinet} = this.props;

		let events = []

		if (!service) {
			if (step === 2) {
				events.push({
						progress: 1,
						name: 'КАСКО',
						status: 'Ожидание оплаты / Ингосстрах',
						time: '9:50'
					})
			}

			if (step === 3) {
				events.push({
					progress: 2,
					name: 'КАСКО',
					status: 'Выпущено / ВСК',
					time: '9:50'
				})
				events.push({
					progress: 1,
					name: 'КАСКО',
					status: 'Ожидание оплаты / ВСК',
					time: '9:50'
				})
			}
		}

		return (
			<>
				<Row gutter={20} className="kasko-wrapper">
					{cabinet ?
						<Col span={4} className="kasko-aside">
							<AsideCrumbs crumbs={['Главная']}/>
							<AsideBlock>
								<KaskoUser firstName={step === 1 ? '' : 'Кирилл'} lastName={step === 1 ? '' : 'Лучкин'}
										   avatar={step === 1 ? '' : 'users/luchkin.png'} phone={step > 1 ? "+ 7 (916) 111 11 11" : ""} docs="" trustees=""
										   autos=''/>
							</AsideBlock>

							<AsideBlock>
								<KaskoCarInfo step={0} notificationCount={0}
											  carName={step === 1 ? '' : 'Hyundai'}
											  carModel={step === 1 ? '' : 'Sonata'} image={this.state.carImage}
											  info={step === 1 ? '' : "2020 Новый"}
											  price={step === 1 ? '' : "1 534 000 ₽"}/>
							</AsideBlock>
						</Col>
					:
						<Col span={4} className="kasko-aside"/>
					}

					<Col span={16} className="kasko-main">
						{showOffers === false ?
							<div className={"kasko-car-select__form"}>
								<h1 className="kasko-main__title"><span>Автомобиль</span></h1>
								<KaskoCarSelect fill={false} imageCallback={this.imageCallback} step={step} image={this.state.carImage} />
							</div>
							:
							<>
								{service ?
									<ServiceSelect imageCallback={this.imageCallback} step={step} image={this.state.carImage} type={showOffers}/>
									:
									<OfferSelect imageCallback={this.imageCallback} step={step} image={this.state.carImage} type={showOffers}/>
								}
							</>
						}
					</Col>

					{cabinet ?
						<Col span={4} className="kasko-aside">
								<Button onClick={this.toggleAuth} className={"ant-btn ant-btn-primary kasko-aside__btn"}>Личный кабинет</Button>

							{showOffers === false ? null :
								<AsideBlock>
									<ServiceNotices step={step} status={step === 2 ? 1 : step === 3 ? 3 : step === 5 ? 4 : 0} type={showOffers}/>
								</AsideBlock>
							}

							<AsideBlock>
								<ServiceNotices noticeList={[{title: 'Сегодня, Пон 20.02.19', list: events}]}/>
							</AsideBlock>
						</Col>
						: <Col span={4} className="kasko-aside"/>
					}

				</Row>

				{!cabinet ?
					<Row gutter={20} className="kasko-wrapper kasko-wrapper__fixed">
						<Col span={4} className="kasko-aside">
							<AsideCrumbs crumbs={['Главная']}/>
							<AsideBlock>
								<KaskoUser firstName={step === 1 ? '' : 'Кирилл'} lastName={step === 1 ? '' : 'Лучкин'}
										   avatar={step === 1 ? '' : 'users/luchkin.png'} phone={step > 1 ? "+ 7 (916) 111 11 11" : ""} docs="" trustees=""
										   autos=''/>
							</AsideBlock>

							<AsideBlock>
								<KaskoCarInfo step={0} notificationCount={0}
											  carName={step === 1 ? '' : 'Hyundai'} carModel={step === 1 ? '' : 'Sonata'} image={this.state.carImage}
											  info={step === 1 ? '' : "2020 Новый"}
											  price={step === 1 ? '' : "1 534 000 ₽"}/>
							</AsideBlock>
						</Col>

						<Col span={16} className="kasko-main"/>

						<Col span={4} className="kasko-aside">
							{showOffers === false ?
								null
								:
								<AsideBlock>
									<ServiceNotices step={step} status={step === 2 ? 1 : step === 3 ? 3 : step === 5 ? 4 : 0} type={showOffers}/>
								</AsideBlock>
							}

							<AsideBlock>
								<ServiceNotices noticeList={[{title: 'Сегодня, Пон 20.02.19', list: events}]}/>
							</AsideBlock>
						</Col>
					</Row>
					: null }

				{this.state.showAuthForm ?
					<PopupOverlay span={8}>
						<AuthPopup popupCloseFunc={this.toggleAuth}/>
					</PopupOverlay>
					: null
				}
			</>
		);
	}
}

export default Service
