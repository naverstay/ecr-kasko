import React, {Component} from 'react';

import TableCell from '../../components/orders/table-cell';
import TableOrderRow from '../../components/orders/table-order-row';
import TableHeaderButton from '../../components/orders/table-header-button';
import Svetofor from '../../components/orders/svetofor';
import OrderButton from '../../components/orders/order-button';
import OrderInfo from '../../components/orders/order-info';
import Pagination from '../../components/pagination';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {Col, Row, Checkbox} from "antd";

import './style.scss';

import PopupOverlay from "../../components/popup-overlay";
import ManagerPopup from "../../components/manager-popup";

class Orders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showManagerPopup: false,
			checkedRows: [],
			carImage: this.props.step === 1 ? 'car' : 'Hyundai',
			markList: [
				"Hyundai",
				"Mazda",
				"Mercedes-Benz"
			]
		};
	}

	toggleManagerPopup = () => {
		this.setState({showManagerPopup: !this.state.showManagerPopup})
	}
	
	checkRowCallback = (row) => {
		let checkedRows = this.state.checkedRows

		if (row.checked) {
			checkedRows.push(row.id)
		} else {
			const index = checkedRows.indexOf(row.id);
			if (index > -1) {
				checkedRows.splice(index, 1);
			}
		}

		this.setState({
			checkedRows: checkedRows,
			//paramsChanged: true
		});
	}
	
	orderInfoRow = () => {
		return (
			<OrderInfo order={{
				id: '169629',
				car: 'Hyundai Santa Fe',
				year: '2018',
				phone: '+7 (915) 856-52-52',
				price: '2 059 000.00',
				period: '36 мес.',
				firstpayment: '425 000.00',
				extra: 'GAP, КАСКО, СЖ, ОСАГО',
				banks: [
					{
						bankName: 'Hyundai Finance. Совкомбанк.',
						programmeName: 'ТОП-Партнерский для Hyundai (СЖ 3,4%)',
						price: '95 771 ₽',
						fee: 'Доход дилера',
						status: 'Одобрено',
						statusColor: 'status_green'
					},
					{
						bankName: 'Локо Банк.',
						programmeName: 'Авто ПРЕСТИЖ. Заблаговременный платеж',
						price: '102 997 ₽',
						fee: 'Доход дилера',
						status: '',
						statusColor: ''
					},
					{
						bankName: 'Русфинансбанк.',
						programmeName: 'Classic. Новое авто',
						price: '107 485 ₽',
						fee: 'Доход дилера'
					},
					{
						bankName: 'Экспо Банк',
						programmeName: 'Автоэкспресс. Два документа',
						price: '85 158 ₽',
						fee: 'Доход дилера',
						status: 'отакз',
						statusColor: 'status_red'
					},
					{
						bankName: 'Русфинансбанк.',
						programmeName: 'Classic. Новое авто',
						price: '107 485 ₽',
						fee: 'Доход дилера'
					},
					{
						bankName: 'Экспо Банк',
						programmeName: 'Автоэкспресс. Два документа',
						price: '85 158 ₽',
						fee: 'Доход дилера',
						status: 'отакз',
						statusColor: 'status_red'
					},
					{
						bankName: 'Русфинансбанк.',
						programmeName: 'Classic. Новое авто',
						price: '107 485 ₽',
						fee: 'Доход дилера'
					},
					{
						bankName: 'Русфинансбанк.',
						programmeName: 'Classic. Новое авто',
						price: '107 485 ₽',
						fee: 'Доход дилера'
					},
					{
						bankName: 'Экспо Банк',
						programmeName: 'Автоэкспресс. Два документа',
						price: '85 158 ₽',
						fee: 'Доход дилера',
						status: 'отакз',
						statusColor: 'status_red'
					},
					{
						bankName: 'Русфинансбанк.',
						programmeName: 'Classic. Новое авто',
						price: '107 485 ₽',
						fee: 'Доход дилера'
					}
				]
			}}/>
		)
	}

	openOrder = (index) => {
		console.log('openOrder', index);
	}
	
	render () {
		//let events = [
		//	{
		//		progress: 2,
		//		name: 'КАСКО',
		//		status: 'Выпущено / ВСК',
		//		time: '9:50'
		//	},
		//	{
		//		progress: 1,
		//		name: 'КАСКО',
		//		status: 'Ожидание оплаты / ВСК',
		//		time: '9:50'
		//	}
		//]
		
		let svetoforTooltip = <Svetofor data={[
				{
					value: 5,
					tooltipWide: true,
					tooltipList: ['Райффайзенбанк', 'Плюс Банк', 'Совкомбанк', 'ВТБ'],
					tooltipTitle: 'Одобрение'
				},
				{
					className: 'svetofor-item--yellow',
					value: 5,
					tooltipWide: true,
					tooltipList: ['Райффайзенбанк', 'Плюс Банк', 'Совкомбанк', 'ВТБ'],
					tooltipTitle: 'Ожидание'
				},
				{
					className: 'svetofor-item--green',
					value: 1,
					tooltipWide: true,
					tooltipList: ['Райффайзенбанк', 'Плюс Банк', 'Совкомбанк', 'ВТБ'],
					tooltipTitle: 'Оформление'
				},
				{
					className: 'svetofor-item--blue',
					value: 3,
					tooltipWide: true,
					tooltipList: ['Райффайзенбанк', 'Плюс Банк', 'Совкомбанк', 'ВТБ'],
					tooltipTitle: 'Расслабление'
				},
				{
					className: 'svetofor-item--red',
					value: 6,
					tooltipWide: true,
					tooltipList: ['Райффайзенбанк', 'Плюс Банк', 'Совкомбанк', 'ВТБ'],
					tooltipTitle: 'Отказ'
				}
			]}/>
		
		return (
			<>
				<Row gutter={20} className="kasko-wrapper">
					<Col span={24} className="kasko-main">
						<Tabs className={'orders-tabs__wrapper'}>
							<TabList className={'orders-tabs__list'}>
								<Tab className={'orders-tabs__tab'}>
									<div className="tab-panel__name">Заявки в работе</div>
								</Tab>
								<Tab className={'orders-tabs__tab'}>
									<div className="tab-panel__name">Список заявок</div>
								</Tab>
								<Tab className={'orders-tabs__tab'}>
									<div className="tab-panel__name">Lost</div>
								</Tab>
							</TabList>
	
							<TabPanel>
								<div className="orders-table__scroller">
									<div className="orders-table">
										<div className="orders-table__header">
											<div className="orders-table__row">
												<TableCell
													classList={['orders-table__cell', (this.state.checkedRows.length ? 'cell_size-wide' : 'cell_size-1'), 'check_v3']}>
													<Checkbox>
														{this.state.checkedRows.length ? 'Выбрать все' : null}
													</Checkbox>

													{this.state.checkedRows.length ?
														<>
															<div className="orders-table__common--count">
																{'Выбрано ' + this.state.checkedRows.length}
															</div>
															<ul className="orders-table__common--controls">
																<li>
																	<div onClick={this.toggleManagerPopup} className="gl_link">Изменить менеджера</div>
																</li>
																<li>
																	<div className="gl_link">Отказ клиента</div>
																</li>
																<li>
																	<div className="gl_link">Удалить заявку</div>
																</li>
															</ul>
															<div className="orders-table__common--close"/>
														</>
														: null
													}
												</TableCell>

												{this.state.checkedRows.length ?
													null
													:
													<>
														<TableCell
															classList={['orders-table__cell', 'cell_size-2', 'sortable-desc']}>
															<TableHeaderButton label={<>Дилер</>}/>
														</TableCell>
														<TableCell
															classList={['orders-table__cell', 'cell_size-3', 'sortable-asc']}>
															<TableHeaderButton label={<>КСО <br/> МОП</>}/>
														</TableCell>
														<TableCell classList={['orders-table__cell', 'cell_size-4']}>
															<TableHeaderButton label={<>Источник <br/> Дата заявки</>}/>
														</TableCell>
														<TableCell classList={['orders-table__cell', 'cell_size-5']}>
															<TableHeaderButton label={<>Клиент</>}/>
														</TableCell>
														<TableCell classList={['orders-table__cell', 'cell_size-6']}>
															<TableHeaderButton classList={['wide']} label={<>Кредит</>}/>
														</TableCell>
														<TableCell classList={['orders-table__cell', 'cell_size-8']}>
															<TableHeaderButton label={<>ОСАГО</>}/>
														</TableCell>
														<TableCell classList={['orders-table__cell', 'cell_size-9']}>
															<TableHeaderButton label={<>КАСКО</>}/>
														</TableCell>
														<TableCell classList={['orders-table__cell', 'cell_size-10']}>
														</TableCell>
													</>
												}
											</div>
										</div>
										<div className="orders-table__body">
											{/* row 1*/}
											<TableOrderRow index={1} rowCheckCallback={this.checkRowCallback}>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-2']}>
													<div
														className='orders-table__cell-content orders-table__cell--collapse'>
														<p>200 ЕвросибАвто</p>
														<p>Пулково Санкт-Петербург</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-3']}>
													<div className='orders-table__cell-content'>
														<p>* Абдрахманов И. </p>
														<p>Ларин</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-4']}>
													<div className='orders-table__cell-content'>
														<p className="color_green">auto.ru</p>
														<p>20.02.19</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-5']}>
													<div className='orders-table__cell-content'>
														<p className="color_black">Константинопольский</p>
														<p className="color_black">Максим</p>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-6']}>
													<div>
														&nbsp;
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-8']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-9']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-10']}>
													<div className='orders-table__cell-content'>
														<OrderButton onClick={() => {this.openOrder(1)}} text={'Открыть'}/>
													</div>
												</TableCell>
												{this.orderInfoRow()}
											</TableOrderRow>
	
											{/* row 2*/}
											<TableOrderRow index={2} rowCheckCallback={this.checkRowCallback}>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-2']}>
													<div
														className='orders-table__cell-content orders-table__cell--collapse'>
														<p>200 ЕвросибАвто</p>
														<p>Пулково Санкт-Петербург</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-3']}>
													<div className='orders-table__cell-content'>
														<p>* Абдрахманов И. </p>
														<p>Ларин</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-4']}>
													<div className='orders-table__cell-content'>
														<p className="color_green">hyundai.ru</p>
														<p>20.02.19</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-5']}>
													<div className='orders-table__cell-content'>
														<p className="color_black">Константинопольский</p>
														<p className="color_black">Максим</p>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-6']}>
													<div className='orders-table__cell-content'>
														{svetoforTooltip}
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-8']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-9']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-10']}>
													<div className='orders-table__cell-content'>
														<OrderButton onClick={() => {this.openOrder(2)}} text={'Открыть'}/>
													</div>
												</TableCell>
												{this.orderInfoRow()}
											</TableOrderRow>
	
											{/* row 3*/}
											<TableOrderRow index={3} rowCheckCallback={this.checkRowCallback}>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-2']}>
													<div
														className='orders-table__cell-content orders-table__cell--collapse'>
														<p>200 ЕвросибАвто</p>
														<p>Пулково Санкт-Петербург</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-3']}>
													<div className='orders-table__cell-content'>
														<p>* Абдрахманов И. </p>
														<p>Ларин</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-4']}>
													<div className='orders-table__cell-content'>
														<p>Отдел продаж</p>
														<p>20.02.19</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-5']}>
													<div className='orders-table__cell-content'>
														<p className="color_black">Константинопольский</p>
														<p className="color_black">Максим</p>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-6']}>
													<div className='orders-table__cell-content'>
														&nbsp;
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-8']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']}
																  data={[{className: 'svetofor-item--green', tooltipShort: true, tooltipTitle: 'Оформление'}]}/>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-9']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']}
																  data={[{className: 'svetofor-item--green', tooltipShort: true, tooltipTitle: 'Оформление'}]}/>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-10']}>
													<div className='orders-table__cell-content'>
														<OrderButton onClick={() => {this.openOrder(3)}} text={'Открыть'}/>
													</div>
												</TableCell>
												{this.orderInfoRow()}
											</TableOrderRow>
	
											{/* row 4*/}
											<TableOrderRow index={4} rowCheckCallback={this.checkRowCallback}>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-2']}>
													<div
														className='orders-table__cell-content orders-table__cell--collapse'>
														<p>200 ЕвросибАвто</p>
														<p>Пулково Санкт-Петербург</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-3']}>
													<div className='orders-table__cell-content'>
														<p>* Абдрахманов И. </p>
														<p>Ларин</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-4']}>
													<div className='orders-table__cell-content'>
														<p>Отдел продаж</p>
														<p>20.02.19</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-5']}>
													<div className='orders-table__cell-content'>
														<p className="color_black">Константинопольский</p>
														<p className="color_black">Максим</p>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-6']}>
													<div className='orders-table__cell-content'>
														<div className="orders-table__tooltip-holder">
															<div className="orders-table__state orders-table__state--green">Оформление</div>
															<div className="orders-table__tooltip orders-table__tooltip--bottom">
																<ul className="orders-table__tooltip-list">
																	<li>
																		<div className="orders-table__state orders-table__state--green">Оформление</div>
																		<div className="orders-table__state-caption">Райффайзенбанк</div>
																		<div className="color_gray">
																			Банк направил
																			документы
																			для подписания
																		</div>
																	</li>
																	<li>
																		<div className="orders-table__state orders-table__state--green">Одобрено</div>
																		<div className="orders-table__tooltip-item">ЮниКредит Банк</div>
																		<div className="orders-table__tooltip-item">Совкомбанк</div>
																		<div className="orders-table__tooltip-item">ОТП Банк</div>
																		<div className="orders-table__tooltip-item">Банк Союз</div>
																		<div className="orders-table__tooltip-item">Уралсиб</div>
																	</li>
																	<li>
																		<div className="orders-table__state orders-table__state--yellow">Ожидание</div>
																		<div className="orders-table__tooltip-item">Тинькофф</div>
																		<div className="orders-table__tooltip-item">ВТБ</div>
																		<div className="orders-table__tooltip-item">Экспобанк</div>
																		<div className="orders-table__tooltip-item">Балтинвестбанк</div>
																	</li>
																	<li>
																		<div className="orders-table__state orders-table__state--red">Отказ</div>
																		<div className="orders-table__tooltip-item">Банк Зенит</div>
																		<div className="orders-table__tooltip-item">ПлюсБанк</div>
																	</li>
																</ul>
															</div>
														</div>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-8']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-9']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-10']}>
													<div className='orders-table__cell-content'>
														<OrderButton onClick={() => {this.openOrder(4)}} text={'Открыть'}/>
													</div>
												</TableCell>
												{this.orderInfoRow()}
											</TableOrderRow>
	
											{/* row 5*/}
											<TableOrderRow index={5} rowCheckCallback={this.checkRowCallback}>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-2']}>
													<div
														className='orders-table__cell-content orders-table__cell--collapse'>
														<p>200 ЕвросибАвто</p>
														<p>Пулково Санкт-Петербург</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-3']}>
													<div className='orders-table__cell-content'>
														<p>* Абдрахманов И. </p>
														<p>Ларин</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-4']}>
													<div className='orders-table__cell-content'>
														<p>Отдел продаж</p>
														<p>20.02.19</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-5']}>
													<div className='orders-table__cell-content'>
														<p className="color_black">Константинопольский</p>
														<p className="color_black">Максим</p>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-6']}>
													<div className='orders-table__cell-content'>
														{svetoforTooltip}
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-8']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-9']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-10']}>
													<div className='orders-table__cell-content'>
														<OrderButton onClick={() => {this.openOrder(5)}} text={'Открыть'}/>
													</div>
												</TableCell>
												{this.orderInfoRow()}
											</TableOrderRow>
	
											{/* row 6*/}
											<TableOrderRow index={6} rowCheckCallback={this.checkRowCallback}>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-2']}>
													<div
														className='orders-table__cell-content orders-table__cell--collapse'>
														<p>200 ЕвросибАвто</p>
														<p>Пулково Санкт-Петербург</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-3']}>
													<div className='orders-table__cell-content'>
														<p>* Абдрахманов И. </p>
														<p>Ларин</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-4']}>
													<div className='orders-table__cell-content'>
														<p>Отдел продаж</p>
														<p>20.02.19</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-5']}>
													<div className='orders-table__cell-content'>
														<p className="color_black">Константинопольский</p>
														<p className="color_black">Максим</p>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-6']}>
													<div className='orders-table__cell-content'>
														&nbsp;
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-8']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']}
																  data={[{className: 'svetofor-item--green', tooltipShort: true, tooltipTitle: 'Оформление'}]}/>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-9']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']}
																  data={[{className: 'svetofor-item--green', tooltipShort: true, tooltipTitle: 'Оформление'}]}/>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-10']}>
													<div className='orders-table__cell-content'>
														<OrderButton onClick={() => {this.openOrder(6)}} text={'Открыть'}/>
													</div>
												</TableCell>
												{this.orderInfoRow()}
											</TableOrderRow>
	
											{/* row 7*/}
											<TableOrderRow index={7} rowCheckCallback={this.checkRowCallback}>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-2']}>
													<div
														className='orders-table__cell-content orders-table__cell--collapse'>
														<p>200 ЕвросибАвто</p>
														<p>Пулково Санкт-Петербург</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-3']}>
													<div className='orders-table__cell-content'>
														<p>* Абдрахманов И. </p>
														<p>Ларин</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-4']}>
													<div className='orders-table__cell-content'>
														<p>Отдел продаж</p>
														<p>20.02.19</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-5']}>
													<div className='orders-table__cell-content'>
														<p className="color_black">Константинопольский</p>
														<p className="color_black">Максим</p>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-6']}>
													<div>
														&nbsp;
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-8']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-9']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-10']}>
													<div className='orders-table__cell-content'>
														<OrderButton onClick={() => {this.openOrder(7)}} text={'Открыть'}/>
													</div>
												</TableCell>
												{this.orderInfoRow()}
											</TableOrderRow>
	
											{/* row 8*/}
											<TableOrderRow index={8} rowCheckCallback={this.checkRowCallback}>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-2']}>
													<div
														className='orders-table__cell-content orders-table__cell--collapse'>
														<p>200 ЕвросибАвто</p>
														<p>Пулково Санкт-Петербург</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-3']}>
													<div className='orders-table__cell-content'>
														<p>* Абдрахманов И. </p>
														<p>Ларин</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-4']}>
													<div className='orders-table__cell-content'>
														<p>Отдел продаж</p>
														<p>20.02.19</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-5']}>
													<div className='orders-table__cell-content'>
														<p className="color_black">Константинопольский</p>
														<p className="color_black">Максим</p>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-6']}>
													<div className='orders-table__cell-content'>
														{svetoforTooltip}
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-8']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-9']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-10']}>
													<div className='orders-table__cell-content'>
														<OrderButton onClick={() => {this.openOrder(8)}} text={'Открыть'}/>
													</div>
												</TableCell>
												{this.orderInfoRow()}
											</TableOrderRow>
	
											{/* row 9*/}
											<TableOrderRow index={9} rowCheckCallback={this.checkRowCallback}>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-2']}>
													<div
														className='orders-table__cell-content orders-table__cell--collapse'>
														<p>200 ЕвросибАвто</p>
														<p>Пулково Санкт-Петербург</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-3']}>
													<div className='orders-table__cell-content'>
														<p>* Абдрахманов И. </p>
														<p>Ларин</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-4']}>
													<div className='orders-table__cell-content'>
														<p>Отдел продаж</p>
														<p>20.02.19</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-5']}>
													<div className='orders-table__cell-content'>
														<p className="color_black">Константинопольский</p>
														<p className="color_black">Максим</p>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-6']}>
													<div className='orders-table__cell-content'>
														&nbsp;
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-8']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']}
																  data={[{className: 'svetofor-item--yellow', tooltipShort: true, tooltipTitle: 'Ожидание'}]}/>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-9']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']}
																  data={[{className: 'svetofor-item--green', tooltipShort: true, tooltipTitle: 'Оформление'}]}/>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-10']}>
													<div className='orders-table__cell-content'>
														<OrderButton onClick={() => {this.openOrder(9)}} text={'Открыть'}/>
													</div>
												</TableCell>
												{this.orderInfoRow()}
											</TableOrderRow>
	
											{/* row 10*/}
											<TableOrderRow index={10} rowCheckCallback={this.checkRowCallback}>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-2']}>
													<div
														className='orders-table__cell-content orders-table__cell--collapse'>
														<p>200 ЕвросибАвто</p>
														<p>Пулково Санкт-Петербург</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-3']}>
													<div className='orders-table__cell-content'>
														<p>* Абдрахманов И. </p>
														<p>Ларин</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-4']}>
													<div className='orders-table__cell-content'>
														<p>Отдел продаж</p>
														<p>20.02.19</p>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-5']}>
													<div className='orders-table__cell-content'>
														<p className="color_black">Константинопольский</p>
														<p className="color_black">Максим</p>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-6']}>
													<div className='orders-table__cell-content'>
														&nbsp;
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-8']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']}
																  data={[{}]}/>
													</div>
												</TableCell>
												<TableCell toggleInfoRow={true}
														   classList={['orders-table__cell', 'cell_size-9']}>
													<div className='orders-table__cell-content'>
														<Svetofor classList={['svetofor-wrapper__center']} data={[{className: 'svetofor-item--red', tooltipShort: true, tooltipTitle: 'Отказ'}]}/>
													</div>
												</TableCell>
												<TableCell classList={['orders-table__cell', 'cell_size-10']}>
													<div className='orders-table__cell-content'>
														<OrderButton onClick={() => {this.openOrder(10)}} text={'Открыть'}/>
													</div>
												</TableCell>
												{this.orderInfoRow()}
											</TableOrderRow>
										</div>
									</div>
								</div>
								<Pagination classList={['_hide-prev', '_hide-next', '_order']} start='В начало'
											end='В конец' pages={[11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
											activePage={11}/>
							</TabPanel>
							<TabPanel>
								<h2>Any content 2</h2>
							</TabPanel>
							<TabPanel>
								<h2>Any content 3</h2>
							</TabPanel>
						</Tabs>
					</Col>
				</Row>

				{this.state.showManagerPopup ?
					<PopupOverlay span={12}>
						<ManagerPopup subtitle={'(Выбрано ' + this.state.checkedRows.length + ')'} popupCloseFunc={this.toggleManagerPopup}/>
					</PopupOverlay>
					: null
				}
				
				{/*<Row gutter={20} className="kasko-wrapper kasko-wrapper__fixed">*/}
				{/*	<Col span={24} className="kasko-main"/>*/}
	
					{/*<Col span={5} className="kasko-aside">*/}
						{/*<AsideBlock>*/}
						{/*	<KaskoNotices search={true} noticeList={[{title: 'Сегодня, Пон 20.02.19', list: events}]}/>*/}
						{/*</AsideBlock>*/}
					{/*</Col>*/}
				{/*</Row>*/}
				
				
			</>
		);
	}
};

export default Orders;
