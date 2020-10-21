import React from 'react';
import cn from 'classnames';
import {Input} from 'antd';

const {Search} = Input;


const SearchNavItem = ({onSearch, classList = []}) => {
    return (
        <div className={cn(['search-nav', ...classList])}>
            <Search placeholder='поиск' onSearch={onSearch} enterButton/>
            <span className="search-nav__text">Искать можно по имени, фамилии или номеру телефона</span>
        </div>
    );
};

export default SearchNavItem;
