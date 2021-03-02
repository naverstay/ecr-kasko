import React from 'react';
import ReactDOM from 'react-dom';
//import "antd/dist/antd.less"; // todo antd_generated.css imported because of production style disorder (document.getElementsByTagName('style')[1].innerHTML)

import {ConfigProvider} from 'antd';
import ruRU from 'antd/es/locale/ru_RU';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

//import dayjs from 'dayjs';
import * as dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isMoment from 'dayjs/plugin/isMoment';
import badMutable from 'dayjs/plugin/badMutable';
import localeData from 'dayjs/plugin/localeData';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekYear from 'dayjs/plugin/weekYear';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import 'dayjs/locale/ru';

const updateLocale = require('dayjs/plugin/updateLocale');
dayjs.extend(updateLocale);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(weekYear);
dayjs.extend(weekOfYear);
dayjs.extend(isMoment);
dayjs.extend(localeData);
dayjs.extend(badMutable);

dayjs.locale('ru');

dayjs.updateLocale('ru', {
    monthsShort: ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Ноя", "Дек"],
    weekdaysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    weekdaysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
})

ReactDOM.render(
    <ConfigProvider locale={ruRU}>
        <App/>
    </ConfigProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
