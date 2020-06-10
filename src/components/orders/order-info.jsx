import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import BankUnit from "./bank-unit";
import BankStatus from "./bank-status";
import Comments from "./comments";

class OrderInfo extends Component {
	static propTypes = {
		order: PropTypes.object
	};

	render() {
		const {
			order,
		} = this.props;
	
		return (
			<div className="orders-table__info">
				<div className="orders-table__row-overlay-bottom"/>
				{/*<div className="orders-table__row-overlay-right"/>*/}
				<ul className="orders-table__info--list">
					<li className="orders-table__info--item item_size-1">
						<div className="orders-table__info--caption">ID заявки</div>
						<div className="orders-table__info--value">{order.id}</div>
					</li>
					<li className="orders-table__info--item item_size-2">
						<div className="orders-table__info--caption">Автомобиль новый</div>
						<div className="orders-table__info--value">{order.car}</div>
					</li>
					<li className="orders-table__info--item item_size-3">
						<div className="orders-table__info--caption">Год</div>
						<div className="orders-table__info--value">{order.year}</div>
					</li>
					<li className="orders-table__info--item item_size-4">
						<div className="orders-table__info--caption">Телефон</div>
						<div className="orders-table__info--value">
							<a className="orders-table__info--phone"
							   href={"tel:+" + order.phone.replace(/\D/, '')}>{order.phone}</a>
						</div>
					</li>
					<li className="orders-table__info--item item_size-5">
						<div className="orders-table__info--caption">Цена автомобиля</div>
						<div className="orders-table__info--value">{order.price}</div>
					</li>
					<li className="orders-table__info--item item_size-6">
						<div className="orders-table__info--caption">Срок кредита</div>
						<div className="orders-table__info--value">{order.period}</div>
					</li>
					<li className="orders-table__info--item item_size-7">
						<div className="orders-table__info--caption">ПВ</div>
						<div className="orders-table__info--value">{order.firstpayment}</div>
					</li>
					<li className="orders-table__info--item item_size-8">
						<div className="orders-table__info--caption">Включено в кредит</div>
						<div className="orders-table__info--value">{order.extra}</div>
					</li>
				</ul>
				<div className="orders-table__info--banks">
					<ul className="orders-table__info--banks-list">
						{order.banks.map((b, i) => {
							return (
								<li key={i} className={"orders-table__info--banks-unit" + (i === 0 ? ' unit_active' : '')}>
									<BankUnit
										bankName={b.bankName}
										programmeName={b.programmeName}
										price={b.price}
										fee={b.fee}
										status={b.status}
										statusColor={b.statusColor}
									/>
								</li>
							)
						})}
	
					</ul>
					<ul className="orders-table__info--banks-info">
						<li className="orders-table__info--banks-status">
							<BankStatus data={[
								{
									date: '20.02.19',
									msg: [
										{
											author: 'client',
											text: 'Кредитный расчет',
											time: '13:18'
										},
										{
											author: 'client',
											text: 'Новая заявка',
											time: '13:18'
										},
										{
											author: 'client',
											text: 'Отправлена в банк',
											time: '13:18'
										},
										{
											author: 'bank',
											text: 'Заявка одобрена банком',
											time: '13:18'
										},
										{
											author: 'client',
											text: 'Клиент приглашен на сделку',
											time: '13:18'
										},
										{
											author: 'client',
											text: 'Отправка в банк при оформлении',
											time: '13:18'
										},
										{
											author: 'client',
											text: 'Отправка в банк при оформлении',
											time: '13:18'
										},
										{
											author: 'client',
											text: 'Запрошен кредитный договор у банка на дату',
											time: '13:18'
										}
									]
								},
								{
									date: '22.02.19',
									msg: [
										{
											author: 'client',
											text: 'Кредитный расчет',
											time: '13:18'
										},
										{
											author: 'client',
											text: 'Новая заявка',
											time: '13:18'
										},
										{
											author: 'client',
											text: 'Отправлена в банк',
											time: '13:18'
										},
										{
											author: 'bank',
											text: 'Заявка одобрена банком',
											time: '13:18'
										},
										{
											author: 'client',
											text: 'Клиент приглашен на сделку',
											time: '13:18'
										},
										{
											author: 'client',
											text: 'Отправка в банк при оформлении',
											time: '13:18'
										},
										{
											author: 'client',
											text: 'Отправка в банк при оформлении',
											time: '13:18'
										},
										{
											author: 'client',
											text: 'Запрошен кредитный договор у банка на дату',
											time: '13:18'
										}
									]
								}
							]}
										bankName='Русфинансбанк.'
										programmeName='Classic. Новое авто'
										price='107 485 ₽'
										fee='Доход дилера'
							/>
						</li>
					</ul>
				</div>
				{/*<div className="orders-table__info--comments">*/}
				{/*	<Comments title={'Внутренние комментарии к клиенту'} msg={[*/}
				{/*		{*/}
				{/*			author: 'Брюс Уиллис',*/}
				{/*			date: ['11.01.18', '13:18'],*/}
				{/*			text: 'Море могуче. В тон ему, шумен, отвечу Гомером'*/}
				{/*		},*/}
				{/*		{author: 'Одри Тоту', date: ['01.01.19', '00:37'], text: 'Навидал фуфла диван'},*/}
				{/*		{*/}
				{/*			author: 'Джек Воробей',*/}
				{/*			date: ['14.01.19', '13:18'],*/}
				{/*			text: 'Не видно морд, ни лап. А палиндром – он дивен'*/}
				{/*		},*/}
				{/*		{author: 'я', date: ['15.01.19', '16:01'], text: 'Карма - мрак'}*/}
				{/*	]}/>*/}
				{/*</div>*/}
			</div>
		)
	}
};

export default OrderInfo;
