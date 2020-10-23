import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import cn from 'classnames';

const FilterSelection = ({options, filtersChange}) => {
    changeHandler = e => {
        const selectedValue = e.value === '-1' ? '' : e.value;
        filtersChange(selectedValue);
    };

    return (
        <div className='filter-gropup'>
            <Select
                options={options}
                defaultValue={options[0]}
                classNamePrefix='filter-gropup__select'
                onChange={changeHandler}
            />
        </div>
    );
};
