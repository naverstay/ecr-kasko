import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Select, {components} from 'react-select';
import {connect} from 'react-redux';
import cn from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCloudDownloadAlt} from '@fortawesome/free-solid-svg-icons';
import {FormattedMessage} from 'react-intl';

import './style.scss';

const reportLinks = [
    {label: 'Выданные кредиты', value: `https://reports.auto.e-credit.one/reports/make-xsl-financed-report`},
    {label: 'Все кредитные заявки', value: `https://reports.auto.e-credit.one/reports/make-xsl-reconciliation-report`},
    {
        label: 'Одобренные кредитные заявки',
        value: `https://reports.auto.e-credit.one/reports/make-xsl-approved-report`
    },
    {label: 'История VIN', value: `https://reports.auto.e-credit.one/reports/make-xsl-vin-report`}
];

const enhance = connect(
    ({filters: {selected}}) => ({selected}),
    {}
);


class ReportSelect extends Component {
    static propTypes = {};
    state = {};

    componentDidMount() {
        const {selected} = this.props;

    }

    componentDidUpdate(prevProps) {

    }

    reportLink(label, url) {
        return <a href={url} className='table__report-download-link'>
            <FontAwesomeIcon icon={faCloudDownloadAlt}/>
            <FormattedMessage
                id='bankefficiency.downloadLink'
                defaultMessage={label}
            />
        </a>
    }

    render() {
        const {
            selected
        } = this.props;

        const options = reportLinks.map(option => {
            const value = this.createLink(option.value);
            return {label: option.label, value};
        });

        return (
            <Select
                options={options}
                value={this.state.currentDateOption}
                classNamePrefix='filter-gropup__select'
                className="select-reports__container"
                onChange={this.selectDateHandler}
                placeholder='Скачать отчет'
                components={{
                    Option: (props) => {
                        const {value, label} = props.data;
                        console.log('$$$ render option', props);
                        return (
                            <a href={value} className='report-download-link'>
                                <FontAwesomeIcon icon={faCloudDownloadAlt} className="report-download-link__icon"/>
                                <span className="report-download-link__label">{label}</span>
                            </a>)
                    }
                }}
            />
        );
    }

    parseFilterToQuery(filters) {
        console.log('!!! filter', filters);
        const filtersQuery = Object.entries(filters)
            .reduce((acc, val) => {
                acc = `${acc}${val[0]}=${val[1]}&amp;`;
                return acc;
            }, '')
            .slice(0, -5);
        console.log('!!! filter', filtersQuery);
        return filtersQuery;
    }

    createLink(baseLink) {
        const {selected} = this.props;
        const filtersQuery = this.parseFilterToQuery(selected);
        const link = `${baseLink}?${filtersQuery}`;
        return link;
    }
}

export default enhance(ReportSelect);
