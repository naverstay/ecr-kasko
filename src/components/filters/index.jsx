import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {connect} from 'react-redux';
import PropagateLoader from 'react-spinners/PropagateLoader';
import {filtersChange, filtersLoad} from '../../store/filters';
import cn from 'classnames';
// import DateRangePicker from './DateRangePicker';
import flatpickr from 'flatpickr';
import {Russian} from 'flatpickr/dist/l10n/ru.js';
import moment from 'moment';
import ru from 'moment/locale/ru';
import ReportSelect from './reportSelect';
import ReportPageMenu from '../ReportPageMenu';
import './style.scss';

moment().locale('ru', ru);

const reportLinks = {
    appreg: `https://reports.auto.e-credit.one/reports/make-xsl-applications-registry-report`
};

const enhance = connect(
    ({
         filters: {
             models,
             groups,
             dealers,
             isNew,
             scenario,
             loaded,
             error,
             selected,
             filters
         }
     }) => ({
        models,
        groups,
        dealers,
        isNew,
        scenario,
        loaded,
        error,
        selected,
        filters
    }),
    {filtersChange, filtersLoad}
);

const currDate = new Date();

const dateOptions = [
    {value: 'day', label: 'День'},
    {value: 'week', label: 'Неделя'},
    {value: 'month', label: 'Месяц'},
    {value: 'year', label: 'Год'}
]

class Filters extends Component {
    static propTypes = {
        models: PropTypes.array,
        groups: PropTypes.array,
        dealers: PropTypes.array,
        isNew: PropTypes.array,
        scenario: PropTypes.array,
        loaded: PropTypes.bool,
        error: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.datePicker = React.createRef();
    }

    state = {
        flatpickr: null,
        currentDateOption: dateOptions[0]
    };

    selectOptionHandler = key => option => {
        console.log(' option key ', option);
        // const value = option.value === '-1' ? '' : option;
        const {filtersChange, filters} = this.props;
        filtersChange({...filters, [key]: option});
    };

    selectDateHandler = ({value, label}) => {
        console.log('$$$ date option key ', value);
        let dateSelectAction = this.todayClickHandler;
        if (value === 'week') {
            dateSelectAction = this.weekClickHandler;
        }
        if (value === 'month') {
            dateSelectAction = this.monthClickHandler;
        }
        if (value === 'year') {
            dateSelectAction = this.yearClickHandler;
        }

        this.setState({currentDateOption: {value, label}}, () => {
            dateSelectAction();
        })

    };

    isnewChangeHandler = option => {
        const {filtersChange, filters} = this.props;
        filtersChange({...filters, isNew: option});
    };

    // date
    todayClickHandler = () => {
        const {filtersChange, filters} = this.props;
        this.flatpickr.setDate();
        const today = `${moment().format('DD.MM.YYYY')}`;
        const todayFilter = {
            active: 'today',
            clickedTimeFilter: 0,
            dateFrom: today,
            dateTo: today
        };

        filtersChange({...filters, ...todayFilter});
    };
    monthClickHandler = () => {
        const {filtersChange, filters} = this.props;
        this.flatpickr.setDate();
        const monthBegin = `${moment()
            .startOf('month')
            .format('DD.MM.YYYY')}`;
        const today = `${moment().format('DD.MM.YYYY')}`;
        const monthFilter = {
            clickedTimeFilter: 2,
            month: `${currDate.getMonth()}`,
            dateFrom: monthBegin,
            dateTo: today,
            active: 'month'
        };
        filtersChange({...filters, ...monthFilter});
    };

    yearClickHandler = () => {
        const {filtersChange, filters} = this.props;

        this.flatpickr.setDate();

        const yearFilter = {
            clickedTimeFilter: 3,
            dateFrom: `${moment()
                .startOf('year')
                .format('DD.MM.YYYY')}`,
            dateTo: `${moment().format('DD.MM.YYYY')}`,
            year: `${currDate.getFullYear()}`,
            active: 'year'
        };

        filtersChange({...filters, ...yearFilter});
    };

    weekClickHandler = e => {
        const {filtersChange, filters} = this.props;

        this.flatpickr.setDate();

        const today = `${moment().format('DD.MM.YYYY')}`;
        const weekBeginDate = `${moment()
            .startOf('week')
            .format('DD.MM.YYYY')}`;
        const weekFilter = {
            active: 'week',
            clickedTimeFilter: 1,
            dateFrom: weekBeginDate,
            dateTo: today
        };

        filtersChange({...filters, ...weekFilter});
    };

    componentDidMount() {
        const {filtersChange, filters} = this.props;
        this.flatpickr = flatpickr(this.datePicker.current, {
            dateFormat: 'd.m.Y',
            locale: Russian,
            mode: 'range',
            onChange: date => {
                if (date.length > 1) {
                    const dateFrom = `${moment(date[0]).format('DD.MM.YYYY')}`;
                    const dateTo = `${moment(date[1]).format('DD.MM.YYYY')}`;
                    const datePickerFilter = {
                        clickedTimeFilter: 4,
                        dateFrom,
                        dateTo,
                        active: 'period'
                    };
                    filtersChange({
                        ...this.props.filters,
                        ...datePickerFilter
                    });
                }
            }
        });

        this.props.filtersLoad();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.filters.active !== this.props.filters.active &&
            this.props.filters.active === 'period'
        ) {
            let defaultDate = [];
            if ('period' === this.props.filters.active) {
                defaultDate = [
                    this.props.filters.dateFrom,
                    this.props.filters.dateTo
                ];
            }
            this.flatpickr.setDate(defaultDate);
        }
    }

    render() {
        const {
            models,
            groups,
            dealers,
            isNew,
            scenario,
            loaded,
            error,
            filters,
            pages
        } = this.props;

        const todayClassList = cn([
            'filter__pure-button',
            {active: 'today' === filters.active}
        ]);
        const weekClassList = cn([
            'filter__pure-button',
            {active: 'week' === filters.active}
        ]);
        const monthClassList = cn([
            'filter__pure-button',
            {active: 'month' === filters.active}
        ]);
        const yearClassList = cn([
            'filter__pure-button',
            {active: 'year' === filters.active}
        ]);
        const periodClassList = cn([
            'date-period__input',
            {
                active: 'period' === filters.active,
                'period-active': 'period' === filters.active
            }
        ]);

        /*
    if (!loaded) { 
      return <><PropagateLoader /></>
    }
    */
        return (
            <div className='filters__wrapper'>
                <div className='filters__inner'>
                    <div className='filters__inner-left'>
                        <div className='filter-gropup'>
                            <Select
                                options={models}
                                value={filters.carBrand}
                                className='filter-gropup__select'
                                classNamePrefix='filter-gropup__select'
                                placeholder='Выберите...'
                                onChange={this.selectOptionHandler('carBrand')}
                            />
                        </div>
                        <div className='filter-gropup'>
                            <Select
                                options={groups}
                                value={filters.group}
                                classNamePrefix='filter-gropup__select'
                                onChange={this.selectOptionHandler('group')}
                                className='filter-gropup__select'
                                placeholder='Выберите...'
                            />
                        </div>
                        <div className='filter-gropup filter-gropup__dealers'>
                            <Select
                                options={dealers}
                                value={filters.dealer}
                                className='filter-gropup__select'
                                classNamePrefix='filter-gropup__select'
                                onChange={this.selectOptionHandler('dealer')}
                                placeholder='Выберите...'
                            />
                        </div>
                        <div className='filter-gropup'>
                            <Select
                                options={isNew}
                                value={filters.isNew}
                                className='filter-gropup__select'
                                classNamePrefix='filter-gropup__select'
                                onChange={this.isnewChangeHandler}
                                placeholder='Выберите...'
                            />
                        </div>
                        <div className='filter-gropup'>
                            <Select
                                options={scenario}
                                value={filters.scenario}
                                className='filter-gropup__select'
                                classNamePrefix='filter-gropup__select'
                                onChange={this.selectOptionHandler('scenario')}
                                placeholder='Выберите...'
                            />
                        </div>

                        <div className='filter-gropup'>
                            <Select
                                options={dateOptions}
                                value={this.state.currentDateOption}
                                classNamePrefix='filter-gropup__select'
                                onChange={this.selectDateHandler}
                                placeholder='Выберите...'
                            />
                        </div>
                        <div className='filter-gropup flex filter-gropup__select-wrapper'>
                            <input
                                type='date'
                                ref={this.datePicker}
                                placeholder='выбрать период'
                                className={periodClassList}
                            />
                        </div>
                        <div className='filter-gropup flex filter-gropup__select-wrapper'>
                            <ReportSelect/>
                        </div>
                    </div>
                    <div className='filters__inner-right'>
                        <ReportPageMenu pages={pages}/>

                        {/*<div className='filter-gropup flex filter-gropup__link-wrapper'>
							<button
								className={todayClassList}
								onClick={this.todayClickHandler}
							>
								Сегодня
							</button>
						</div>
						<div className='filter-gropup flex filter-gropup__link-wrapper'>
							<button
								className={weekClassList}
								onClick={this.weekClickHandler}
							>
								Неделя
							</button>
						</div>
						<div className='filter-gropup flex filter-gropup__link-wrapper'>
							<button
								className={monthClassList}
								onClick={this.monthClickHandler}
							>
								Месяц
							</button>
						</div>
						<div className='filter-gropup flex filter-gropup__link-wrapper'>
							<button
								className={yearClassList}
								onClick={this.yearClickHandler}
							>
								Год
							</button>
						</div>*/}

                    </div>
                </div>
            </div>
        );
    }

    parseFilterToQuery(filters) {
        const filtersQuery = Object.entries(filters)
            .reduce((acc, val) => {
                acc = `${acc}${val[0]}=${val[1]}&amp;`;
                return acc;
            }, '')
            .slice(0, -5);
        console.log('*** filter', filtersQuery);
        return filtersQuery;
    }

    createLink(key) {
        const {filters} = this.props;
        const filtersQuery = this.parseFilterToQuery(filters);
        const link = `${reportLinks[key]}?${filtersQuery}`;
        return link;
    }
}

export default enhance(Filters);
