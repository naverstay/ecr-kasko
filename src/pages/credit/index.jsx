import React, {Component} from "react";
import {Col, Row} from "antd";
import AsideBlock from "../../components/aside-block";
import AsideCrumbs from "../../components/aside-crumbs";
import KaskoNotices from "../../components/kasko-notices";
import KaskoUser from "../../components/kasko-user";
import KaskoCarInfo from "../../components/kasko-car-info";
import PropTypes from 'prop-types';

import './style.scss';
import CarCredit from "../../components/car-credit";
import Details from "../details";

class Credit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			kaskoWidget: {show: false},
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

	imageCallback = (img) => {
		this.setState({carImage: img})
	}

	updateRightAside = (wdgt) => {
		this.setState({kaskoWidget: wdgt})
	}

	render() {
		const {showOffers, step, progress, kasko, details} = this.props;

		let events = []

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

		return (
			<>
				<Row gutter={20} className="kasko-wrapper">
					<Col span={4} className="kasko-aside"/>
					<Col span={16} className="kasko-main">
						{details ?
							<Details />
						:
							<CarCredit kasko={kasko} showKaskoWidget={this.updateRightAside} carPrice={1048000}
									   imageCallback={this.imageCallback} step={step} image={this.state.carImage}/>
						}
					</Col>
					<Col span={4} className="kasko-aside"/>
				</Row>

				<Row gutter={20} className="kasko-wrapper kasko-wrapper__fixed">
					<Col span={4} className="kasko-aside">
						<AsideCrumbs crumbs={['Главная']}/>
						<AsideBlock>
							<KaskoUser firstName={step === 1 ? '' : 'Кирилл'} lastName={step === 1 ? '' : 'Лучкин'}
									   avatar={step === 1 ? '' : 'users/luchkin.png'} phone={step > 1 ? "+ 7 (916) 111 11 11" : ""} docs="" trustees=""
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
								<KaskoNotices step={step} credit={true} status={0} type={showOffers}/>
							</AsideBlock>
						}

						{this.state.kaskoWidget.show ?
							<AsideBlock>
								<KaskoNotices step={this.state.kaskoWidget.step} kasko={true} status={0} type={'Каско'}/>
							</AsideBlock>
							: null
						}

						<AsideBlock>
							<KaskoNotices noticeList={[{title: 'Сегодня, Пон 20.02.19', list: events}]}/>
						</AsideBlock>
					</Col>
				</Row>
			</>
		);
	}
}

export default Credit
