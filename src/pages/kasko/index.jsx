import React, {Component} from "react";
import {Col, Row} from "antd";
import AsideBlock from "../../components/aside-block";
import AsideCrumbs from "../../components/aside-crumbs";
import KaskoNotices from "../../components/kasko-notices";
import KaskoUser from "../../components/kasko-user";
import KaskoCarInfo from "../../components/kasko-car-info";
import KaskoCarSelect from "../../components/kasko-car-select";
import PropTypes from 'prop-types';

import './style.scss';
import OfferSelect from "../../components/offer-select";

class Kasko extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carImage: this.props.step === 1 ? '' : 'Hyundai',
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

	render() {
		const {showOffers, step, progress} = this.props;
		
		const events = []
		
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
					{showOffers === false ?
						<>
							<h1 className="kasko-main__title">Автомобиль</h1>
							<KaskoCarSelect imageCallback={this.imageCallback} step={step} image={this.state.carImage} />
						</>
						:
						<>
							<OfferSelect imageCallback={this.imageCallback} step={step} image={this.state.carImage} type={showOffers}/>
						</>
					}
				</Col>
				<Col span={4} className="kasko-aside"/>
			</Row>

			<Row gutter={20} className="kasko-wrapper kasko-wrapper__fixed">
				<Col span={4} className="kasko-aside">
					<AsideCrumbs crumbs={['Главное']}/>
					<AsideBlock>
						<KaskoUser firstName={step === 1 ? '' : 'Сергей'} lastName={step === 1 ? '' : 'Фомин'}
								   avatar="" phone={step > 1 ? "+ 7 (916) 111 11 11" : ""} docs="" trustees=""
								   autos=''/>
					</AsideBlock>

					<AsideBlock>
						<KaskoCarInfo step={step} notificationCount={step === 2 ? 1 : step === 3 ? 2 : 0}
									  carName={step === 1 ? '' : 'Hyundai Sonata'} image={this.state.carImage}
									  info={step === 1 ? '' : "2013 г.  Авто с пробегом"}
									  price={step === 1 ? '' : "14 800 000 ₽"}/>
					</AsideBlock>
				</Col>

				<Col span={16} className="kasko-main"/>

				<Col span={4} className="kasko-aside">
					{showOffers === false ?
						""
						:
						<AsideBlock>
							<KaskoNotices step={step} status={step === 2 ? 1 : step === 3 ? 3 : 0} type={showOffers}/>
						</AsideBlock>
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

export default Kasko
