import Select from "react-select";
import ToggleButton from "./toggle-button";
import SubMenu from "./SubMenu";
import React from "react";

export const langs = [{label: 'Русский', value: 'ru'}, {label: 'English', value: 'en'}]

export const showAvatar = false

let NoP = e => {
    e.stopPropagation();
    return false;
}

let langChangeHandler = (e) => {
}

export const topNavButtons = [
    {
        name: 'home',
        classList: ['sidebar__button-icon', 'home'],
        link: false,
        noHover: true,
        mobHidden: true,
        children: (
            <div
                className={'sidebar__button-label label-nohover sidebar__fix-wrapper'}
                onClick={NoP}
            >
                <div className='sidebar__fix'>
                    <div className='sidebar__fix-lang'>
                        <Select
                            options={langs}
                            classNamePrefix='lang-select'
                            defaultValue={langs[0]}
                            onChange={langChangeHandler}
                        />
                    </div>
                    <ToggleButton/>
                </div>
            </div>
        ),
        customIcon: <img src='e.svg' alt='ecredit' className='inner-image'/>
    },
    {
        name: 'add',
        classList: ['sidebar__button-icon', 'add'],
        link: true,
        submenu: [
            {to: '', title: '', classList: ['submenu-item', 'submenu-item__empty']},
            {to: '/calculate-credit', title: 'Кредит', classList: ['submenu-item']},
            {to: '/calculate-osago', title: 'е-ОСАГО', classList: ['submenu-item']},
            {to: '/calculate-kasko', title: 'е-КАСКО', classList: ['submenu-item']}
        ],
        label: <div className={'sidebar__button-label'}>Рассчитать</div>,
        path: 'https://auto.e-credit.one/#calculation',
        component: SubMenu
    },
    {
        name: 'copy',
        classList: ['sidebar__button-icon', 'copy'],
        link: true,
        submenu: [
            {to: '', title: '', classList: ['submenu-item', 'submenu-item__empty']},
            {to: '', title: '', classList: ['submenu-item', 'submenu-item__empty']},
            {to: '/active-orders', title: 'Заявки в работе', classList: ['submenu-item']},
            {to: '/list-orders', title: 'Список заявок', classList: ['submenu-item']},
            {to: '/lost-orders', title: 'Lost', classList: ['submenu-item']}
        ],
        label: <div className={'sidebar__button-label'}>Заявки</div>,
        path: '/',
        component: SubMenu
    },
    {
        name: 'search',
        classList: ['sidebar__button-icon', 'search'],
        link: false,
        noHover: true,
        label: (
            <div className={'sidebar__button-label'}>
                <div className='sidebar__search'>
                    <div className='sidebar__search-form'>
                        <input
                            className='sidebar__search-input'
                            placeholder='Найти заявку'
                        />
                        <button className='sidebar__search-button'/>
                    </div>
                    <p className='sidebar__search-tip'>
                        Поиск по имени, фамилии
                        <br/>
                        или номеру телефона
                    </p>
                </div>
            </div>
        )
    }
    //{
    //	name: 'empty',
    //	classList: ['sidebar__button-icon', 'empty'],
    //	link: false,
    //},
];

export const midNavButtons = [
    //{
    //	name: 'empty',
    //	classList: ['sidebar__button-icon', 'empty'],
    //	link: false,
    //},
    {
        name: 'bank',
        classList: ['sidebar__button-icon', 'bank'],
        link: true,
        submenu: [
            {to: '', title: '', classList: ['submenu-item', 'submenu-item__empty']},
            {to: '', title: '', classList: ['submenu-item', 'submenu-item__empty']},
            {to: '', title: '', classList: ['submenu-item', 'submenu-item__empty']},
            {to: '', title: '', classList: ['submenu-item', 'submenu-item__empty']},
            {to: '', title: '', classList: ['submenu-item', 'submenu-item__empty']},
            {to: '', title: '', classList: ['submenu-item', 'submenu-item__empty']},
            {to: '/list-banks', title: 'Банки', classList: ['submenu-item']},
            {to: '/list-market', title: 'Маркет', classList: ['submenu-item']}
        ],
        label: <div className={'sidebar__button-label'}>Банки</div>,
        path: '/',
        component: SubMenu
    },
    {
        name: 'news',
        classList: ['sidebar__button-icon', 'news'],
        link: true,
        label: <div className={'sidebar__button-label'}>Новости</div>,
        path: '/'
    }
];

export const bottomNavButtons = [
    //{
    //	name: 'empty',
    //	classList: ['sidebar__button-icon', 'empty'],
    //	link: false,
    //},
    {
        name: 'charts',
        classList: ['sidebar__button-icon', 'charts'],
        link: false,
        listClassName: 'align-bottom',
        submenu: [
            {to: '/sales-performance', title: 'Эффективность продаж', classList: ['submenu-item']},
            {to: '/profit', title: 'Доходность', classList: ['submenu-item']},
            {to: '/employee-performance', title: 'Эффективность сотрудников', classList: ['submenu-item']},
            {to: '/bank-efficiency', title: 'Эффективность банков', classList: ['submenu-item']},
            {to: '/sales-reconciliation', title: 'Сверка продаж', classList: ['submenu-item']},
            {to: '/marketing', title: 'Маркетинг', classList: ['submenu-item']},
            {to: '/plan-and-fact', title: 'План/факт', classList: ['submenu-item']}
        ],
        label: <div className={'sidebar__button-label'}>Отчеты</div>,
        component: SubMenu
    },
    //{
    //	name: 'cart',
    //	classList: ['sidebar__button-icon', 'cart'],
    //	link: true,
    //	path: '/',
    //},
    {
        name: 'settings',
        classList: ['sidebar__button-icon', 'settings'],
        link: true,
        listClassName: 'align-bottom',
        submenu: [
            {to: '/account-settings', title: 'Настройка аккаунта', classList: ['submenu-item']},
            {to: '/fee-settings', title: 'Настройки комиссий', classList: ['submenu-item']},
            {to: '/target-settings', title: 'Настройки целевых показателей', classList: ['submenu-item']},
            {to: '/tramp-settings', title: 'Трампограмма', classList: ['submenu-item']}
        ],
        label: <div className={'sidebar__button-label'}>Настройки</div>,
        path: '/',
        component: SubMenu
    }
    //{
    //	name: 'user',
    //	classList: ['sidebar__button-icon', 'user'],
    //	link: true,
    //	path: '/',
    //	children: <img src='e.svg' alt='ecredit' className='inner-image'/>,
    //},
];

export const accountSubMenu = [
    {to: '/profile', title: 'Профиль', classList: ['submenu-item']},
    {to: '/role', title: 'Роль:', classList: ['submenu-item', 'submenu-item__parent']},
    {to: '/sales-manager', title: 'Менеджер по продажам', classList: ['submenu-item', 'submenu-item__child']},
    {to: '/credit-manager', title: 'Кредитный специалист', classList: ['submenu-item', 'submenu-item__child']},
    {to: '/dc-director', title: 'Директор ДЦ', classList: ['submenu-item', 'submenu-item__child']},
    {to: '/roks', title: 'РОКС', classList: ['submenu-item', 'submenu-item__child']},
    {to: '/fi-director', title: 'Директор F&I', classList: ['submenu-item', 'submenu-item__child']},
    {to: '/rom', title: 'РОМ', classList: ['submenu-item', 'submenu-item__child']},
    {to: '/admin', title: 'Администратор', classList: ['submenu-item', 'submenu-item__child']},
    {to: '/dc', title: 'Дилерский центр:', classList: ['submenu-item', 'submenu-item__parent']},
    {to: '/dc-1', title: 'Дружба', classList: ['submenu-item', 'submenu-item__child']},
    {to: '/dc-2', title: 'Тест Дилер 1', classList: ['submenu-item', 'submenu-item__child']},
    {to: '/dc-3', title: 'Тест Дилер 2', classList: ['submenu-item', 'submenu-item__child']}
];
