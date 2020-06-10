import React from 'react';
import OrderInfo from '../../components/orders/order-info';
import 'react-tabs/style/react-tabs.css';
import './style.scss';

const Details = props => {
	return (
		<div>
			<h1 className="kasko-main__title" style={{marginBottom: '10px'}}>Оформить кредит</h1>
			<div className="cc_tab ccTab_" id="cc_calc_tab_3_" style={{display: 'block'}}>
				<table className="oo_offers_table two _chat">
					<tbody>
					<tr>
						<th className="oo_offer_cell oo_offer_col_1">Кредитная программа
						</th>
						<th className="oo_offer_cell oo_offer_col_2"><span
							className="oo_offer_sort ooSortBtn _desc"
							data-sort="monthly_payments_1">Ежемес.<br/>платеж</span>
						</th>
						<th className="oo_offer_cell oo_offer_col_3"><span
							className="oo_offer_sort ooSortBtn"
							data-sort="credit_rate_real">Ставка</span></th>
						<th className="oo_offer_cell oo_offer_col_4"
							style={{minWidth: '100px'}}>
							Страховые продукты
						</th>
						<th className="oo_offer_cell oo_offer_col_7"
							style={{minWidth: '100px', textAlign: 'center'}}><span
							className="oo_offer_sort ooSortBtn" data-sort="comission_sum_1">Доход дилера</span>
						</th>
						<th className="oo_offer_cell oo_offer_col_8" colSpan="2">Статус</th>
					</tr>
					<tr className="oo_offer_row ooOfferTitle banks_list_step_2 docs_opened"
						data-bank="14316306" data-sort-status="forward">
						<td className="oo_offer_cell oo_offer_col_1">
								<span className="oo_offer_name">ВТБ<br/><span
									className="oo_offer_program">АвтоСтандарт (СЖ дилера) </span></span>
						</td>
						<td className="oo_offer_cell oo_offer_col_2"><span
							className="fz_22">18 858</span></td>
						<td className="oo_offer_cell oo_offer_col_3">16.10 % <p
							title="Остаточный платеж">0 р.</p></td>
						<td className="oo_offer_cell oo_offer_col_4">
							<div className="kasko"><span>КАСКО</span><span className="sum"
																		   style={{
																			   display: 'block',
																			   float: 'right',
																			   fontWeight: 'bold'
																		   }}>50 000</span>
							</div>
							<div className="ppi"><span>СЖ</span><span className="sum"
																	  style={{
																		  display: 'block',
																		  float: 'right',
																		  fontWeight: 'bold'
																	  }}>45 459</span>
							</div>
							<div className="gap"><span>GAP</span><span className="sum"
																	   style={{
																		   display: 'block',
																		   float: 'right',
																		   fontWeight: 'bold'
																	   }}>0</span>
							</div>
							<div className="service"><span>Услуги</span><span
								className="sum"
								style={{display: 'block', float: 'right', fontWeight: 'bold'}}>25 000</span>
							</div>
						</td>
						<td className="oo_offer_cell oo_offer_col_7"
							style={{minWidth: '100px', textAlign: 'center'}}>
								<span className="fz_22 comission_sum_1"
									  style={{
										  minWidth: '100px',
										  textAlign: 'center',
										  display: 'block',
										  marginBottom: '7px'
									  }}
								>0</span>
						</td>
						<td className="oo_offer_cell oo_offer_col_8 _last_cell" colSpan="2"
							style={{display: 'none'}}>
							<span className="semaphore_item"/><span
							className="bank_answer_text">Отправлено в банк</span>
						</td>
						<td className="oo_offer_cell oo_offer_col_9">
							<span className="semaphore_item semaphore_green"/><span
							className="bank_answer_text" status_sys_name="financed">Заявка одобрена</span>
						</td>
						<td className="oo_offer_cell oo_offer_col_10 text_center"><a
							href="#step_backout" className="oo_get_credit_btn"
							style={{height: '50px', lineHeight: '50px'}}><span>Оформить кредит</span></a>
						</td>
					</tr>
					<tr className="oo_offer_row ooOfferTitle banks_list_step_2 docs_opened"
						data-bank="14316306" data-sort-status="forward">
						<td className="oo_offer_cell oo_offer_col_1">
								<span className="oo_offer_name">ВТБ<br/><span
									className="oo_offer_program">АвтоСтандарт (СЖ дилера) </span></span>
						</td>
						<td className="oo_offer_cell oo_offer_col_2"><span
							className="fz_22">18 858</span></td>
						<td className="oo_offer_cell oo_offer_col_3">16.10 % <p
							title="Остаточный платеж">0 р.</p></td>
						<td className="oo_offer_cell oo_offer_col_4">
							<div className="kasko"><span>КАСКО</span><span className="sum"
																		   style={{
																			   display: 'block',
																			   float: 'right',
																			   fontWeight: 'bold'
																		   }}>50 000</span>
							</div>
							<div className="ppi"><span>СЖ</span><span className="sum"
																	  style={{
																		  display: 'block',
																		  float: 'right',
																		  fontWeight: 'bold'
																	  }}>45 459</span>
							</div>
							<div className="gap"><span>GAP</span><span className="sum"
																	   style={{
																		   display: 'block',
																		   float: 'right',
																		   fontWeight: 'bold'
																	   }}>0</span>
							</div>
							<div className="service"><span>Услуги</span><span
								className="sum"
								style={{display: 'block', float: 'right', fontWeight: 'bold'}}>25 000</span>
							</div>
						</td>
						<td className="oo_offer_cell oo_offer_col_7"
							style={{minWidth: '100px', textAlign: 'center'}}>
								<span className="fz_22 comission_sum_1"
									  style={{
										  minWidth: '100px',
										  textAlign: 'center',
										  display: 'block',
										  marginBottom: '7px'
									  }}
								>0</span>
						</td>
						<td className="oo_offer_cell oo_offer_col_8 _last_cell" colSpan="2"
							style={{display: 'none'}}>
							<span className="semaphore_item"/><span
							className="bank_answer_text">Отправлено в банк</span>
						</td>
						<td className="oo_offer_cell oo_offer_col_9">
							<span className="semaphore_item semaphore_green"/><span
							className="bank_answer_text" status_sys_name="financed">Заявка одобрена</span>
						</td>
						<td className="oo_offer_cell oo_offer_col_10 text_center"><a
							href="#step_backout" className="oo_get_credit_btn"
							style={{height: '50px', lineHeight: '50px'}}><span>Оформить кредит</span></a>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Details;
