import React, {Component} from "react";
import {Button, Checkbox, Col, Row} from "antd";
import AsideBlock from "../../components/aside-block";
import AsideCrumbs from "../../components/aside-crumbs";
import KaskoNotices from "../../components/kasko-notices";
import KaskoUser from "../../components/kasko-user";
import KaskoCarInfo from "../../components/kasko-car-info";
import KaskoCarSelect from "../../components/kasko-car-select";
import PropTypes from 'prop-types';

import './style.scss';
import OfferSelect from "../../components/offer-select";
import AuthPopup from "../../components/auth-popup";
import PopupOverlay from "../../components/popup-overlay";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import TabCredit from "../../components/tab-credit";
import CarSelect from "../../components/car-select";
import TabService from "../../components/tab-service";
import TabOffer from "../../components/tab-offer";
import ServiceNotices from "../../components/service-notices";

class Kasko extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			newStep: null,
			tabIndex: null,
			showAuthForm: false,
			productCount: 0,
			carFound: this.props.dev || false,
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

	updateTab = (tabIndex) => {
		console.log('tabIndex', tabIndex);
		this.setState({tabIndex: tabIndex, newStep: null})
	}
	toggleAuth = (img) => {
		this.setState({showAuthForm: !this.state.showAuthForm})
	}

	imageCallback = (img) => {
		this.setState({carImage: img, carFound: true})
	}

	changeTabState = (action) => {
		console.log('changeTabState', action);

		if ('tabIndex' in action) {
			this.setState({tabIndex: action.tabIndex})
		}
		
		if ('newStep' in action) {
			this.setState({newStep: action.newStep})
		}
		
		if ('productCount' in action) {
			this.setState({productCount: action.productCount})
		}
	}

	render() {
		let {showOffers, step, progress, cabinet, tabs} = this.props;
		let status = 0
		
		const statusClasses = {
			0: 'calculation',
			1: 'waiting',
			2: 'approved',
			3: 'approved'
		}
		const statusNames = {
			0: 'Расчет',
			1: 'Ожидание',
			2: 'Выпущено',
			3: 'Выпущено'
		}
		const progressNames = {
			0: 'Консультация',
			1: 'Расчет',
			2: 'Оформление',
			3: 'Выпуск'
		}
		
		let events = []
		
		if (this.state.newStep !== null) {
			step = this.state.newStep
			
			status = Math.max(0, step - 1)
		}
		
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
		
		switch (this.state.tabIndex) {
			case 0:
				showOffers = 'кредит'
				break
			case 1:
				showOffers = 'каско'
				break
			case 2:
				showOffers = 'осаго'
				break
			case 3:
				showOffers = 'сервис меню'
				break
		}
		
		let tabStatus = <div className={"kasko-notice__status " + (statusClasses[status])}
			>{statusNames[status] + (this.state.tabIndex === 3 && this.state.productCount ? ' (' + this.state.productCount + ')' : '')}</div>

		console.log('this.state.tabIndex', this.state.tabIndex);
		
		return (
			<>
				<Row gutter={20} className="kasko-wrapper">
					{cabinet ?
						<Col span={4} className="kasko-aside">
							<AsideCrumbs crumbs={['Главная']}/>
							<AsideBlock>
								<KaskoUser firstName={step === 1 ? '' : 'Сергей'} lastName={step === 1 ? '' : 'Фомин'}
										   avatar="" phone={step > 1 ? "+ 7 (916) 111 11 11" : ""} docs="" trustees=""
										   autos=''/>
							</AsideBlock>

							<AsideBlock>
								<KaskoCarInfo step={step} notificationCount={step === 2 ? 1 : step === 3 ? 2 : 0}
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
						{tabs ?
							<>
								<CarSelect collapseCarInfo={this.state.tabIndex !== null} showCarOptions={(this.state.tabIndex !== null)}
										   imageCallback={this.imageCallback} step={step} image={this.state.carImage}/>
								<Tabs selectedIndex={this.state.tabIndex === null ? -1 : this.state.tabIndex}
									  onSelect={this.updateTab} className={'kasko-tabs__wrapper'}>
									<TabList
										className={'kasko-tabs__list' + (this.state.carFound ? ' active' : '') + (this.state.tabIndex === null ? '' : ' selected')}>
										<Tab className={'kasko-tabs__tab'}>
											<div className="kasko-tab__panel-name"><span
												className="kasko-tab__panel-name--text">Кредит</span>
												{this.state.tabIndex === 0 ?
													tabStatus
													: this.state.carFound ?
														<span className="kasko-tab__panel-name--val">от <b>16 450 ₽</b></span>
														: null
												}
											</div>
										</Tab>
										<Tab className={'kasko-tabs__tab'}>
											<div className="kasko-tab__panel-name"><span
												className="kasko-tab__panel-name--text">КАСКО</span>
												{this.state.tabIndex === 1 ?
													tabStatus
													: this.state.carFound ?
														<span className="kasko-tab__panel-name--val">от <b>18 450 ₽</b></span>
														: null
												}
											</div>
										</Tab>
										<Tab className={'kasko-tabs__tab'}>
											<div className="kasko-tab__panel-name"><span
												className="kasko-tab__panel-name--text">ОСАГО</span>
												{this.state.tabIndex === 2 ?
													tabStatus
													: this.state.carFound ?
														<span className="kasko-tab__panel-name--val">от <b>10 450 ₽</b></span>
														: null
												}</div>
										</Tab>
										<Tab className={'kasko-tabs__tab'}>
											<div className="kasko-tab__panel-name"><span
												className="kasko-tab__panel-name--text">Сервис меню</span>
												{this.state.tabIndex === 3 ?
													tabStatus
													: this.state.carFound ?
														null
														: null
												}
											</div>
										</Tab>
										<Tab className={'kasko-tabs__tab'}>
											<div className="kasko-tab__panel-name"><span
												className="kasko-tab__panel-name--text">POS кредит</span>
												{this.state.tabIndex === 4 ?
													tabStatus
													: this.state.carFound ?
														null
														: null
												}
											</div>
										</Tab>
									</TabList>

									<TabPanel className="kasko-tab__panel">
										{this.state.tabIndex === null || !this.state.carFound ? null :
											<TabCredit tabCallback={this.changeTabState} step={step} carPrice={762000 * 2}/>
										}
									</TabPanel>
									<TabPanel className="kasko-tab__panel">
										{this.state.tabIndex === null || !this.state.carFound ? null :
											<TabOffer tabCallback={this.changeTabState} imageCallback={this.imageCallback}
													  step={step} image={this.state.carImage} type={showOffers}/>
										}
									</TabPanel>
									<TabPanel className="kasko-tab__panel">
										{this.state.tabIndex === null || !this.state.carFound ? null :
											<TabOffer tabCallback={this.changeTabState} imageCallback={this.imageCallback}
													  osago={true}
													  step={step} image={this.state.carImage} type={showOffers}/>
										}
									</TabPanel>
									<TabPanel className="kasko-tab__panel">
										{this.state.tabIndex === null || !this.state.carFound ? null :
											<TabService step={step} tabCallback={this.changeTabState} />
										}
									</TabPanel>
									<TabPanel className="kasko-tab__panel">
										{this.state.tabIndex === null || !this.state.carFound ? null :
											<h2>Any content 5</h2>}
									</TabPanel>
								</Tabs>
							</>
							:
							showOffers === false ?
								<KaskoCarSelect imageCallback={this.imageCallback} step={step} image={this.state.carImage}/>
								:
								<OfferSelect imageCallback={this.imageCallback} step={step} image={this.state.carImage} type={showOffers}/>
						}
						
					</Col>
					
					{cabinet ?
						<Col span={4} className="kasko-aside">
								<Button onClick={this.toggleAuth} className={"ant-btn ant-btn-primary kasko-aside__btn"}>Личный кабинет</Button>

							{showOffers === false ? null :
								<AsideBlock>
									<KaskoNotices step={step} status={step === 2 ? 1 : step === 3 ? 3 : 0} type={showOffers}/>
								</AsideBlock>
							}

							<AsideBlock>
								<KaskoNotices noticeList={[{title: 'Сегодня, Пон 20.02.19', list: events}]}/>
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
								<KaskoUser firstName={step === 1 ? '' : 'Сергей'} lastName={step === 1 ? '' : 'Фомин'}
										   avatar="" phone={step > 1 ? "+ 7 (916) 111 11 11" : ""} docs="" trustees=""
										   autos=''/>
							</AsideBlock>
		
							<AsideBlock>
								<KaskoCarInfo step={step} notificationCount={step === 2 ? 1 : step === 3 ? 2 : 0}
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
									{this.state.tabIndex === 0 ?
										<KaskoNotices step={step} credit={true} status={0} type={showOffers}/>
										: this.state.tabIndex === 1 ?
											<KaskoNotices step={step} status={step === 2 ? 1 : step === 3 ? 3 : 0} type={showOffers}/>
											: this.state.tabIndex === 2 ?
												<KaskoNotices osago={true} step={step} status={step === 2 ? 1 : step === 3 ? 3 : 0} type={showOffers}/> 
												: this.state.tabIndex === 3 ?
													<ServiceNotices step={step} status={step === 2 ? 1 : step === 3 ? 3 : 0} type={showOffers}/>
													: null
									}
								</AsideBlock>
							}
		
							<AsideBlock>
								<KaskoNotices noticeList={[{title: 'Сегодня, Пон 20.02.19', list: events}]}/>
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

export default Kasko
