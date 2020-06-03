import React from 'react';
//import ReportPageLayout from '../layouts/reports-layout';
import TableCell from '../../components/orders/table-cell';
import TableOrderRow from '../../components/orders/table-order-row';
import TableHeaderButton from '../../components/orders/table-header-button';
//import CheckBox from '../../components/orders/checkbox';
import Svetofor from '../../components/orders/svetofor';
import OrderButton from '../../components/orders/order-button';
import OrderInfo from '../../components/orders/order-info';
import Pagination from '../../components/pagination';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
//import PropTypes from "prop-types";
//import cn from "classnames";
import './style.scss';
//import {FormattedMessage} from "react-intl";
import {Checkbox} from "antd";

let orderInfoRow = () => {
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

const Orders = props => {
	console.log('###', props);
	return (
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
									<TableCell classList={['orders-table__cell', 'cell_size-1', 'check_v3']}>
										<Checkbox />
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-2', 'sortable-desc']}>
										<TableHeaderButton label={<>Дилер</>}/>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-3', 'sortable-asc']}>
										<TableHeaderButton label={<>КСО <br /> МОП</>} />
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-4']}>
										<TableHeaderButton label={<>Источник <br /> Дата заявки</>} />
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-5']}>
										<TableHeaderButton label={<>Клиент</>} />
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-6']}>
										<TableHeaderButton classList={['wide']} label={<>Статус заявки</>} />
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-7']}>
										<TableHeaderButton label={<>&nbsp;</>} />
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-8']}>
										<TableHeaderButton label={<>ОСАГО</>} />
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-9']}>
										<TableHeaderButton label={<>КАСКО</>} />
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-10']}>
									</TableCell>
								</div>
							</div>
							<div className="orders-table__body">
								{/* row 1*/}
								<TableOrderRow>
									<TableCell classList={['orders-table__cell', 'cell_size-1', 'check_v3']}>
										<Checkbox />
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											<p>200 ЕвросибАвто</p>
											<p>Пулково Санкт-Петербург</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											<p>* Абдрахманов И. </p>
											<p>Ларин</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'>
											<p className="color_green">auto.ru</p>
											<p>20.02.19</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'>
											<p className="color_black">Константинопольский</p>
											<p className="color_black">Максим</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'>&nbsp;</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-7']}>
										<div className='orders-table__cell-content'>
											&nbsp;
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]} />
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-9']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]} />
										</div>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-10']}>
										<div className='orders-table__cell-content'>
											<OrderButton text={'Открыть'} />
										</div>
									</TableCell>
									{ orderInfoRow() }
								</TableOrderRow>
								
								{/* row 2*/}
								<TableOrderRow>
									<TableCell classList={['orders-table__cell', 'cell_size-1', 'check_v3']}>
										<Checkbox />
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											<p>200 ЕвросибАвто</p>
											<p>Пулково Санкт-Петербург</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											<p>* Абдрахманов И. </p>
											<p>Ларин</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'>
											<p className="color_green">hyundai.ru</p>
											<p>20.02.19</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'>
											<p className="color_black">Константинопольский</p>
											<p className="color_black">Максим</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'>
											<p>Одобрение</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-7']}>
										<div className='orders-table__cell-content'>
											<Svetofor data={[
												{value: 5},
												{className: 'svetofor-item__yellow', value: 5},
												{className: 'svetofor-item__green', value: 1},
												{className: 'svetofor-item__blue', value: 3},
												{className: 'svetofor-item__red', value: 6}
											]} />
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]} />
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-9']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]} />
										</div>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-10']}>
										<div className='orders-table__cell-content'>
											<OrderButton text={'Открыть'} />
										</div>
									</TableCell>
									{ orderInfoRow() }
								</TableOrderRow>
								
								{/* row 3*/}
								<TableOrderRow>
									<TableCell classList={['orders-table__cell', 'cell_size-1', 'check_v3']}>
										<Checkbox />
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											<p>200 ЕвросибАвто</p>
											<p>Пулково Санкт-Петербург</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											<p>* Абдрахманов И. </p>
											<p>Ларин</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'>
											<p>Отдел продаж</p>
											<p>20.02.19</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'>
											<p className="color_black">Константинопольский</p>
											<p className="color_black">Максим</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'>
											&nbsp;
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-7']}>
										<div className='orders-table__cell-content'>
											&nbsp;
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']}
													  data={[{className: 'svetofor-item__green'}]} />
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-9']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']}
													  data={[{className: 'svetofor-item__green'}]} />
										</div>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-10']}>
										<div className='orders-table__cell-content'>
											<OrderButton text={'Открыть'} />
										</div>
									</TableCell>
									{ orderInfoRow() }
								</TableOrderRow>

								{/* row 4*/}
								<TableOrderRow>
									<TableCell classList={['orders-table__cell', 'cell_size-1', 'check_v3']}>
										<Checkbox/>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											<p>200 ЕвросибАвто</p>
											<p>Пулково Санкт-Петербург</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											<p>* Абдрахманов И. </p>
											<p>Ларин</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'>
											<p>Отдел продаж</p>
											<p>20.02.19</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'>
											<p className="color_black">Константинопольский</p>
											<p className="color_black">Максим</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'>&nbsp;</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-7']}>
										<div className='orders-table__cell-content'>
											&nbsp;
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-9']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
										</div>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-10']}>
										<div className='orders-table__cell-content'>
											<OrderButton text={'Открыть'}/>
										</div>
									</TableCell>
									{orderInfoRow()}
								</TableOrderRow>

								{/* row 5*/}
								<TableOrderRow>
									<TableCell classList={['orders-table__cell', 'cell_size-1', 'check_v3']}>
										<Checkbox/>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											<p>200 ЕвросибАвто</p>
											<p>Пулково Санкт-Петербург</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											<p>* Абдрахманов И. </p>
											<p>Ларин</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'>
											<p>Отдел продаж</p>
											<p>20.02.19</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'>
											<p className="color_black">Константинопольский</p>
											<p className="color_black">Максим</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'>
											<p>Одобрение</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-7']}>
										<div className='orders-table__cell-content'>
											<Svetofor data={[
												{value: 5},
												{className: 'svetofor-item__yellow', value: 5},
												{className: 'svetofor-item__green', value: 1},
												{className: 'svetofor-item__blue', value: 3},
												{className: 'svetofor-item__red', value: 6}
											]}/>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-9']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
										</div>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-10']}>
										<div className='orders-table__cell-content'>
											<OrderButton text={'Открыть'}/>
										</div>
									</TableCell>
									{orderInfoRow()}
								</TableOrderRow>

								{/* row 6*/}
								<TableOrderRow>
									<TableCell classList={['orders-table__cell', 'cell_size-1', 'check_v3']}>
										<Checkbox/>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											<p>200 ЕвросибАвто</p>
											<p>Пулково Санкт-Петербург</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											<p>* Абдрахманов И. </p>
											<p>Ларин</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'>
											<p>Отдел продаж</p>
											<p>20.02.19</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'>
											<p className="color_black">Константинопольский</p>
											<p className="color_black">Максим</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'>
											&nbsp;
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-7']}>
										<div className='orders-table__cell-content'>
											&nbsp;
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']}
													  data={[{className: 'svetofor-item__green'}]}/>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-9']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']}
													  data={[{className: 'svetofor-item__green'}]}/>
										</div>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-10']}>
										<div className='orders-table__cell-content'>
											<OrderButton text={'Открыть'}/>
										</div>
									</TableCell>
									{orderInfoRow()}
								</TableOrderRow>

								{/* row 7*/}
								<TableOrderRow>
									<TableCell classList={['orders-table__cell', 'cell_size-1', 'check_v3']}>
										<Checkbox/>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											<p>200 ЕвросибАвто</p>
											<p>Пулково Санкт-Петербург</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											<p>* Абдрахманов И. </p>
											<p>Ларин</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'>
											<p>Отдел продаж</p>
											<p>20.02.19</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'>
											<p className="color_black">Константинопольский</p>
											<p className="color_black">Максим</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'>&nbsp;</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-7']}>
										<div className='orders-table__cell-content'>
											&nbsp;
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-9']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
										</div>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-10']}>
										<div className='orders-table__cell-content'>
											<OrderButton text={'Открыть'}/>
										</div>
									</TableCell>
									{orderInfoRow()}
								</TableOrderRow>

								{/* row 8*/}
								<TableOrderRow>
									<TableCell classList={['orders-table__cell', 'cell_size-1', 'check_v3']}>
										<Checkbox/>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											<p>200 ЕвросибАвто</p>
											<p>Пулково Санкт-Петербург</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											<p>* Абдрахманов И. </p>
											<p>Ларин</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'>
											<p>Отдел продаж</p>
											<p>20.02.19</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'>
											<p className="color_black">Константинопольский</p>
											<p className="color_black">Максим</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'>
											<p>Одобрение</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-7']}>
										<div className='orders-table__cell-content'>
											<Svetofor data={[
												{value: 5},
												{className: 'svetofor-item__yellow', value: 5},
												{className: 'svetofor-item__green', value: 1},
												{className: 'svetofor-item__blue', value: 3},
												{className: 'svetofor-item__red', value: 6}
											]}/>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-9']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
										</div>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-10']}>
										<div className='orders-table__cell-content'>
											<OrderButton text={'Открыть'}/>
										</div>
									</TableCell>
									{orderInfoRow()}
								</TableOrderRow>

								{/* row 9*/}
								<TableOrderRow>
									<TableCell classList={['orders-table__cell', 'cell_size-1', 'check_v3']}>
										<Checkbox/>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											<p>200 ЕвросибАвто</p>
											<p>Пулково Санкт-Петербург</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											<p>* Абдрахманов И. </p>
											<p>Ларин</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'>
											<p>Отдел продаж</p>
											<p>20.02.19</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'>
											<p className="color_black">Константинопольский</p>
											<p className="color_black">Максим</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'>
											&nbsp;
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-7']}>
										<div className='orders-table__cell-content'>
											&nbsp;
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']}
													  data={[{className: 'svetofor-item__yellow'}]}/>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-9']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']}
													  data={[{className: 'svetofor-item__green'}]}/>
										</div>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-10']}>
										<div className='orders-table__cell-content'>
											<OrderButton text={'Открыть'}/>
										</div>
									</TableCell>
									{orderInfoRow()}
								</TableOrderRow>
								
								{/* row 10*/}
								<TableOrderRow>
									<TableCell classList={['orders-table__cell', 'cell_size-1', 'check_v3']}>
										<Checkbox/>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											<p>200 ЕвросибАвто</p>
											<p>Пулково Санкт-Петербург</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											<p>* Абдрахманов И. </p>
											<p>Ларин</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'>
											<p>Отдел продаж</p>
											<p>20.02.19</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'>
											<p className="color_black">Константинопольский</p>
											<p className="color_black">Максим</p>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'>
											&nbsp;
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-7']}>
										<div className='orders-table__cell-content'>
											&nbsp;
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']}
													  data={[{}]}/>
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-9']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']}
													  data={[{className: 'svetofor-item__red'}]}/>
										</div>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-10']}>
										<div className='orders-table__cell-content'>
											<OrderButton text={'Открыть'}/>
										</div>
									</TableCell>
									{orderInfoRow()}
								</TableOrderRow>


							</div>
						</div>
					</div>
					<Pagination classList={['_hide-prev', '_hide-next', '_order']} start='В начало' end='В конец' pages={[11,12,13,14,15,16,17,18,19,20]} activePage={11} />
				</TabPanel>
				<TabPanel>
					<h2>Any content 2</h2>
				</TabPanel>
				<TabPanel>
					<h2>Any content 3</h2>
				</TabPanel>
			</Tabs>
	);
};

export default Orders;
