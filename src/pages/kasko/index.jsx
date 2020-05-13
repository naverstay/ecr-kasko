import React, {Component} from "react";
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
	static propTypes = {
		children: PropTypes.node,
		showOffers: PropTypes.any,
		innerWidth: PropTypes.number
	};

	render() {
		const {showOffers} = this.props;
		
		return (
			<div className="kasko-wrapper">
				<div className="kasko-aside">
					<AsideCrumbs crumbs = {['Главное']} />
					<AsideBlock>
						<KaskoUser firstName = 'Сергей' lastName = 'Фомин' avatar = "" phone = "" docs = "" trustees = "" autos = '' />
					</AsideBlock>
	
					<AsideBlock>
						<KaskoCarInfo notificationCount={showOffers === false ? 0 : 1} carName = 'Mersedes Benz GT S Sports Car' image = "" info = "2013 г.  Авто с пробегом" price = "14 800 000 ₽" />
					</AsideBlock>
				</div>
				<div className="kasko-main">
					{showOffers === false ?
						<>
							<h1 className="kasko-main__title">Автомобиль</h1>
							<KaskoCarSelect image="car-1.png" />
						</>
						:
						<>
							<OfferSelect image="car-1.png" type={showOffers}/>
						</>
					}
					
				</div>
				<div className="kasko-aside">
					{showOffers === false ?
						""
						:
						<AsideBlock>
							<KaskoNotices status={0} type={showOffers}/>
						</AsideBlock>
					}
					
					<AsideBlock>
						<KaskoNotices noticeList={['Сегодня, Пон 20.02.19']}/>
					</AsideBlock>
				</div>
			</div>
		);
	}
}

export default Kasko