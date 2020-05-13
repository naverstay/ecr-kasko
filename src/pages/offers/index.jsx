import React from "react";
import AsideBlock from "../../components/aside-block";
import AsideCrumbs from "../../components/aside-crumbs";
import KaskoNotices from "../../components/kasko-notices";
import KaskoUser from "../../components/kasko-user";
import KaskoCarInfo from "../../components/kasko-car-info";

//import './style.scss';

export default () => (
	<div className="kasko-wrapper">
		<div className="kasko-aside">
			<AsideCrumbs crumbs = {['Главное']} />
			
			<AsideBlock>
				<KaskoUser firstName = 'Сергей' lastName = 'Фомин' avatar = "" phone = "+ 7 (916) 111 11 11" docs = "" trustees = "" autos = '' />
			</AsideBlock>
			
			<AsideBlock>
				<KaskoCarInfo carName = 'Mersedes Benz GT S Sports Car' image = "" info = "2013 г.  Авто с пробегом" price = "14 800 000 ₽" />
			</AsideBlock>
		</div>
		<div className="kasko-main">
			<h1 className="kasko-main__title">Автомобиль</h1>
		</div>
		<div className="kasko-aside">
			<AsideBlock>
				<KaskoNotices noticeList={['Сегодня, Пон 20.02.19']}/>
			</AsideBlock>
		</div>
	</div>
);
