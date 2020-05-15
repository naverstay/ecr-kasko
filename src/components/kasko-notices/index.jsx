import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";

class KaskoNotices extends Component {
	constructor(props) {
		super(props);
		this.state = {
			noticeOpened: true,
		};
	}
	
	static propTypes = {
		children: PropTypes.node,
		type: PropTypes.string,
		status: PropTypes.any,
	};

	toggleOpened = () => {
		this.setState({noticeOpened : !this.state.noticeOpened})
	}

	componentDidMount() {
		this.props.type !== void 0 && this.setState({noticeOpened: false})
	}

	render() {
		const {noticeList, type, status} = this.props;
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

		const noticeHtml = noticeList && noticeList.length ? noticeList.map((n, i) => <li key={i} className="kasko-notice__item">
			<div className="kasko-notice__item--head">
				{n.list.length ? <span className="kasko-notice__item--count">{n.list.length}</span> : ""}
				{n.title}
			</div>
			{
				n.list.length ?
					n.list.map((l, i) => <div key={i} className="kasko-notice__unit">
						<div className={"kasko-notice__unit--caption " + (statusClasses[l.progress])}>{l.name}</div>
						<div className="kasko-notice__unit--time">{l.time}</div>
						<div className="kasko-notice__unit--status">{l.status}</div>
					</div>)
				: ""
			}
			
		</li>) : "";

		const progressHtml = [] 
		
		if (status !== void 0) {
			for (let p in progressNames) {
				if (progressNames.hasOwnProperty(p)) {
					progressHtml.push(<li key={p} className={"kasko-notice__progress--unit" + (+p <= status ? ' active' : '')}>{(+p === status ? <span>{progressNames[p]}</span> : '')}</li>)
				}
			}
		}
		
		return (
			type ?
				<div className="kasko-notice">
					<div className={"kasko-notice" + (this.state.noticeOpened ? " open" : "")}>
						<div className="kasko-notice__head">
							<div className={"kasko-notice__caption offer" + (this.state.noticeOpened ? " open" : "")}
								 onClick={this.toggleOpened}>{(type).toUpperCase()}</div>
							<div className={"kasko-notice__status " + (statusClasses[status])}>{statusNames[status]}</div>
						</div>
						<ul className="kasko-notice__progress">
							{progressHtml}
						</ul>
						{this.state.noticeOpened ?
							<ul className={"kasko-notice__price"}>
								<li>
									<div className="kasko-notice__price--label">Стоимость</div>
									<div className="kasko-notice__price--value">
										<span>41 450 ₽</span>
									</div>
								</li>
								<li>
									<div className="kasko-notice__price--label">СК</div>
									<div className="kasko-notice__price--value">ВСК</div>
								</li>
								<li>
									<div className="kasko-notice__price--label">Срок</div>
									<div className="kasko-notice__price--value">21.09.19<br />20.09.20</div>
								</li>
								<li>
									<div className="kasko-notice__price--label">Полис</div>
									<div className="kasko-notice__price--value" />
								</li>
							</ul>
							: ""}
					</div>
				</div>
			:
				<div className={"kasko-notice" + (this.state.noticeOpened ? " open" : "")}>
					<div className="kasko-notice__head">
						<div
							className={"kasko-notice__caption color_red" + (this.state.noticeOpened ? " open" : "")}
							onClick={this.toggleOpened}>Уведомления</div>
						<div className="kasko-notice__settings"/>
					</div>
					{this.state.noticeOpened ?
						<ul className="kasko-notice__list">
							{noticeHtml}
						</ul>
						: ""}
				</div>
		);
	}
}

export default KaskoNotices;