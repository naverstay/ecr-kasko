import React from 'react';
//import ReportPageLayout from '../layouts/reports-layout';
import TableCell from '../../components/orders/table-cell';
import TableOrderRow from '../../components/orders/table-order-row';
import TableHeaderButton from '../../components/orders/table-header-button';
import CheckBox from '../../components/orders/checkbox';
import Svetofor from '../../components/orders/svetofor';
import OrderButton from '../../components/orders/order-button';
import OrderInfo from '../../components/orders/order-info';
import Pagination from '../../components/pagination';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PropTypes from "prop-types";
import cn from "classnames";
import './style.scss';
import {FormattedMessage} from "react-intl";

let showOrderInfo = index => () => {
	console.log('showOrderInfo', index);
}

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
									<TableCell classList={['orders-table__cell', 'cell_size-1']}>
										<CheckBox classList={['checkbox_v1']} id='check_order_all' name='check_order_all' />
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-2', 'sortable-desc']}>
										<TableHeaderButton label={<>Дилер</>}/>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-3', 'sortable-asc']}>
										<TableHeaderButton label={<>КСО <br /> МОП</>} />
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-4']}>
										<TableHeaderButton label={<>Клиент <br /> Дата заявки</>} />
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-5']}>
										<TableHeaderButton label={<>Марка и <br /> Модель</>} />
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-6', 'sortable-asc']}>
										<TableHeaderButton label={<>Статус <br /> заявки</>} />
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-7']}>
										<TableHeaderButton label={<>Статус <br /> кредита</>} />
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
									<TableCell classList={['orders-table__cell', 'cell_size-1']}>
										<CheckBox classList={['checkbox_v1']} id='check_order_1' name='check_order_1' />
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											200 ЕвросибАвто Пулково Санкт-Петербург
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>Константинопольский<br/>Ларин</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'><b className={'color-black'}>Константинопольский
											<br/>Максим</b>
											<br/>20.02.19
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'><span
											className={'color-black'}>Mersedes Benz</span>
											<br/> E200 Special Edition
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'><span className={'color-black'}>Запрос <br/> договора</span></div>
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
								{/* row 2*/}
								<TableOrderRow>
									<TableCell classList={['orders-table__cell', 'cell_size-1']}>
										<CheckBox classList={['checkbox_v1']} id='check_order_1' name='check_order_1' />
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											200 ЕвросибАвто
											Пулково Санкт-
											Петербург
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											Ларин
											Середкин
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'>
											<b className={'color-black'}>
												Рябоконь<br/>Светлана Юрьевна
											</b>
											<br/>20.02.19
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'><span
											className={'color-black'}>Mersedes Benz</span>
											<br/> E200 Special Edition
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'><span className={'color-black'}>Запрос <br/> договора</span></div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-7']}>
										<div className='orders-table__cell-content'>
											<Svetofor data={[
												{},
												{className: 'svetofor-item__yellow', value: 5},
												{className: 'svetofor-item__green', value: 1},
												{className: 'svetofor-item__blue', value: 3},
												{className: 'svetofor-item__red', value: 6}
											]} />
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{className: 'svetofor-item__yellow'}]} />
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-9']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{className: 'svetofor-item__yellow'}]} />
										</div>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-10']}>
										<div className='orders-table__cell-content'>
											<OrderButton text={'Открыть'} />
										</div>
									</TableCell>
									{orderInfoRow()}
								</TableOrderRow>
								{/* row 3*/}
								<TableOrderRow>
									<TableCell classList={['orders-table__cell', 'cell_size-1']}>
										<CheckBox classList={['checkbox_v1']} id='check_order_1' name='check_order_1' />
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											КИА Центр
											Кемерово-Юг
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											Ларин
											Середкин
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'>
											<b className={'color-black'}>
												Рябоконь<br/>Светлана Юрьевна
											</b>
											<br/>20.02.19
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'><span
											className={'color-black'}>Mersedes Benz</span>
											<br/> E200 Special Edition
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'><span className={'color-black'}>Запрос <br/> договора</span></div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-7']}>
										<div className='orders-table__cell-content'>
											<Svetofor data={[
												{},
												{className: 'svetofor-item__yellow', value: 5},
												{className: 'svetofor-item__green', value: 1},
												{className: 'svetofor-item__blue', value: 3},
												{className: 'svetofor-item__red', value: 6}
											]} />
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{className: 'svetofor-item__green'}]} />
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-9']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{className: 'svetofor-item__red'}]} />
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
									<TableCell classList={['orders-table__cell', 'cell_size-1']}>
										<CheckBox classList={['checkbox_v1']} id='check_order_1' name='check_order_1' />
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											200 ЕвросибАвто
											Пулково Санкт-
											Петербург
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											Ларин
											Солохов
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'>
											<b className={'color-black'}>
												Рябоконь<br/>Светлана Юрьевна
											</b>
											<br/>20.02.19
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'><span
											className={'color-black'}>Mersedes Benz</span>
											<br/> E200 Special Edition
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'><span className={'color-black'}>Запрос <br/> договора</span></div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-7']}>
										<div className='orders-table__cell-content'>
											<Svetofor data={[
												{},
												{className: 'svetofor-item__yellow', value: 5},
												{className: 'svetofor-item__green', value: 1},
												{className: 'svetofor-item__blue', value: 3},
												{className: 'svetofor-item__red', value: 6}
											]} />
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{className: 'svetofor-item__yellow'}]} />
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-9']}>
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
								{/* row 5*/}
								<TableOrderRow>
									<TableCell classList={['orders-table__cell', 'cell_size-1']}>
										<CheckBox classList={['checkbox_v1']} id='check_order_1' name='check_order_1' />
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											200 ЕвросибАвто
											Пулково Санкт-
											Петербург
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											Ларин
											Солохов
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'>
											<b className={'color-black'}>
												Рябоконь<br/>Светлана Юрьевна
											</b>
											<br/>20.02.19
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'><span
											className={'color-black'}>Mersedes Benz</span>
											<br/> E200 Special Edition
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'><span className={'color-black'}>Запрос <br/> договора</span></div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-7']}>
										<div className='orders-table__cell-content'>
											<Svetofor data={[
												{value: 12}
											]} />
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{className: 'svetofor-item__green'}]} />
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-9']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{className: 'svetofor-item__yellow'}]}/>
										</div>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-10']}>
										<div className='orders-table__cell-content'>
											<OrderButton text={'Открыть'} />
										</div>
									</TableCell>
									{ orderInfoRow() }
								</TableOrderRow>
								{/* row 6*/}
								<TableOrderRow>
									<TableCell classList={['orders-table__cell', 'cell_size-1']}>
										<CheckBox classList={['checkbox_v1']} id='check_order_1' name='check_order_1' />
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											200 ЕвросибАвто
											Пулково Санкт-
											Петербург
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											Ларин
											Середкин
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'><b className={'color-black'}>
											Салямин
											Александр
											Владимирович</b>
											<br/>20.02.19
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'><span
											className={'color-black'}>Mersedes Benz</span>
											<br/> E200 Special Edition
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'><span className={'color-black'}>Запрос <br/> договора</span></div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-7']}>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{className: 'svetofor-item__green'}]} />
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-9']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
										</div>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-10']}>
										<div className='orders-table__cell-content'>
											<OrderButton text={'Открыть'} />
										</div>
									</TableCell>
									{ orderInfoRow() }
								</TableOrderRow>
								{/* row 7*/}
								<TableOrderRow>
									<TableCell classList={['orders-table__cell', 'cell_size-1']}>
										<CheckBox classList={['checkbox_v1']} id='check_order_1' name='check_order_1' />
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											200 ЕвросибАвто
											Пулково Санкт-
											Петербург
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											Ларин
											Середкин
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'><b className={'color-black'}>
											Салямин
											Александр
											Владимирович</b>
											<br/>20.02.19
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'><span
											className={'color-black'}>Mersedes Benz</span>
											<br/> E200 Special Edition
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'><span className={'color-black'}>Договор<br />прислан</span></div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-7']}>
										<Svetofor data={[
											{},
											{className: 'svetofor-item__yellow', value: 5},
											{className: 'svetofor-item__green', value: 1},
											{className: 'svetofor-item__blue', value: 3},
											{className: 'svetofor-item__red', value: 6}
										]}/>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{className: 'svetofor-item__red'}]} />
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-9']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
										</div>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-10']}>
										<div className='orders-table__cell-content'>
											<OrderButton text={'Открыть'} />
										</div>
									</TableCell>
									{ orderInfoRow() }
								</TableOrderRow>
								{/* row 8*/}
								<TableOrderRow>
									<TableCell classList={['orders-table__cell', 'cell_size-1']}>
										<CheckBox classList={['checkbox_v1']} id='check_order_1' name='check_order_1' />
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											200 ЕвросибАвто
											Пулково Санкт-
											Петербург
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											Ларин
											Середкин
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'><b className={'color-black'}>
											Салямин
											Александр
											Владимирович</b>
											<br/>20.02.19
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'><span
											className={'color-black'}>Mersedes Benz</span>
											<br/> E200 Special Edition
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'><span className={'color-black'}>Одобрена</span></div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-7']}>
										<Svetofor data={[
											{},
											{className: 'svetofor-item__yellow', value: 5},
											{className: 'svetofor-item__green', value: 1},
											{className: 'svetofor-item__blue', value: 3},
											{className: 'svetofor-item__red', value: 6}
										]}/>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]} />
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-9']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{className: 'svetofor-item__red'}]}/>
										</div>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-10']}>
										<div className='orders-table__cell-content'>
											<OrderButton text={'Открыть'} />
										</div>
									</TableCell>
									{ orderInfoRow() }
								</TableOrderRow>
								{/* row 9*/}
								<TableOrderRow>
									<TableCell classList={['orders-table__cell', 'cell_size-1']}>
										<CheckBox classList={['checkbox_v1']} id='check_order_1' name='check_order_1' />
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											200 ЕвросибАвто
											Пулково Санкт-
											Петербург
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											Ларин
											Середкин
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'><b className={'color-black'}>
											Салямин
											Александр
											Владимирович</b>
											<br/>20.02.19
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'><span
											className={'color-black'}>Mersedes Benz</span>
											<br/> E200 Special Edition
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'><span className={'color-black'}>Тест-драйв</span></div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-7']}>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]} />
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true}classList={['orders-table__cell', 'cell_size-9']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
										</div>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-10']}>
										<div className='orders-table__cell-content'>
											<OrderButton text={'Открыть'} />
										</div>
									</TableCell>
									{ orderInfoRow() }
								</TableOrderRow>
								{/* row 10*/}
								<TableOrderRow>
									<TableCell classList={['orders-table__cell', 'cell_size-1']}>
										<CheckBox classList={['checkbox_v1']} id='check_order_1' name='check_order_1' />
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-2']}>
										<div className='orders-table__cell-content orders-table__cell--collapse'>
											200 ЕвросибАвто
											Пулково Санкт-
											Петербург
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-3']}>
										<div className='orders-table__cell-content'>
											Ларин
											Середкин
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-4']}>
										<div className='orders-table__cell-content'><b className={'color-black'}>
											Салямин
											Александр
											Владимирович</b>
											<br/>20.02.19
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-5']}>
										<div className='orders-table__cell-content'><span
											className={'color-black'}>Mersedes Benz</span>
											<br/> E200 Special Edition
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-6']}>
										<div className='orders-table__cell-content'><span className={'color-black'}>Расчет</span></div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-7']}>
										<Svetofor data={[
											{value: 12}
										]}/>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-8']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]} />
										</div>
									</TableCell>
									<TableCell toggleInfoRow={true} classList={['orders-table__cell', 'cell_size-9']}>
										<div className='orders-table__cell-content'>
											<Svetofor classList={['svetofor-wrapper__center']} data={[{}]}/>
										</div>
									</TableCell>
									<TableCell classList={['orders-table__cell', 'cell_size-10']}>
										<div className='orders-table__cell-content'>
											<OrderButton text={'Открыть'} />
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
