import React from 'react';

import './style.scss'

const Sidebar = (props) => {
    return (
        <div className="sidebar-nav">
            <div className="sidebar-nav__container">
                <div className="sidebar-nav__backdrop"></div>
                <div className="sidebar-nav__float">
                    <div className="nav-group top" style={{marginTop: '178px'}}><a aria-current="page"
                                                                                   className="submenu-link active"
                                                                                   href="/applications">Список
                        заявок</a></div>
                    <div className="nav-group middle"></div>
                    <div className="nav-group bottom"></div>
                </div>
                <div className="sidebar-nav__detail">
                    <div className="nav-group top">
                        <div className="nav-item home">
                            <div className="lang-switcher">
                                <div className=" css-2b097c-container">
                                    <div className="lang-select__control css-yk16xz-control">
                                        <div
                                            className="lang-select__value-container lang-select__value-container--has-value css-1hwfws3">
                                            <div
                                                className="lang-select__single-value css-1uccc91-singleValue">Русский
                                            </div>
                                            <div className="css-1g6gooi">
                                                <div className="lang-select__input" style={{display: 'inline-block'}}>
                                                    <input autoCapitalize="none" autoComplete="off"
                                                           autoCorrect="off" id="react-select-2-input"
                                                           spellCheck="false" tabIndex="0" type="text"
                                                           aria-autocomplete="list" defaultValue=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lang-select__indicators css-1wy0on6"><span
                                            className="lang-select__indicator-separator css-1okebmr-indicatorSeparator"></span>
                                            <div aria-hidden="true"
                                                 className="lang-select__indicator lang-select__dropdown-indicator css-tlfecz-indicatorContainer">
                                                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true"
                                                     focusable="false" className="css-19bqh2r">
                                                    <path
                                                        d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                 data-icon="angle-double-right"
                                 className="svg-inline--fa fa-angle-double-right fa-w-14 " role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor"
                                      d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"></path>
                            </svg>
                        </div>
                        <div className="nav-item search">
                            <div className="search-nav"><span
                                className="ant-input-search ant-input-search-enter-button ant-input-group-wrapper"><span
                                className="ant-input-wrapper ant-input-group"><input placeholder="поиск"
                                                                                     className="ant-input"
                                                                                     type="text" defaultValue=""/><span
                                className="ant-input-group-addon"><button type="button"
                                                                          className="ant-btn ant-input-search-button ant-btn-primary"><i
                                aria-label="icon: search" className="anticon anticon-search"><svg
                                viewBox="64 64 896 896" focusable="false" className="" data-icon="search"
                                width="1em" height="1em" fill="currentColor" aria-hidden="true"><path
                                d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg></i></button></span></span></span><span
                                className="search-nav__text">Искать можно по имени, фамилии или номеру телефона</span>
                            </div>
                        </div>
                        <div className="nav-item"><span className="nav-item__label">Создать заявку</span></div>
                    </div>
                    <div className="nav-group middle">
                        <div className="nav-item active"><span className="nav-item__label">Заявки</span>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right"
                                 className="svg-inline--fa fa-chevron-right fa-w-10 nav-item__icon" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path fill="currentColor"
                                      d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="nav-group middle">
                        <div className="nav-item"><span className="nav-item__label">Новости</span></div>
                        <div className="nav-item"><span className="nav-item__label">Старая система</span></div>
                    </div>
                    <div className="nav-group bottom">
                        <div className="nav-item user">
                            <div className="user__label-container"><p className="user__user-name"> DEMO</p><span
                                className="user__status">Менеджер по продажам</span></div>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right"
                                 className="svg-inline--fa fa-chevron-right fa-w-10 nav-item__icon" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path fill="currentColor"
                                      d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
                            </svg>
                        </div>
                        <div className="nav-item"><span className="nav-item__label">Выйти</span></div>
                    </div>
                </div>
                <div className="sidebar-nav__redline">
                    <div className="nav-group top">
                        <div className="nav-button logo">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.175 16.561">
                                <path id="Path_20" data-name="Path 20" fill="#fff"
                                      d="M13.967,10.93l1.711.883a9.141,9.141,0,0,1-1.932,2.65,7.246,7.246,0,0,1-2.484,1.546,9.064,9.064,0,0,1-3.091.552,7.454,7.454,0,0,1-6.017-2.539A8.641,8.641,0,0,1,0,8.281,8.608,8.608,0,0,1,1.822,2.926,7.621,7.621,0,0,1,8.06,0a7.725,7.725,0,0,1,6.4,3.036,8.2,8.2,0,0,1,1.711,5.355H2.1a6.3,6.3,0,0,0,1.767,4.471,5.625,5.625,0,0,0,4.2,1.767,6.65,6.65,0,0,0,2.319-.442,6.554,6.554,0,0,0,1.932-1.1A8.554,8.554,0,0,0,13.967,10.93Zm0-4.251a7.076,7.076,0,0,0-1.159-2.595,5.282,5.282,0,0,0-2.043-1.546,6.213,6.213,0,0,0-2.65-.607A5.736,5.736,0,0,0,4.14,3.423,6.878,6.878,0,0,0,2.263,6.68Z"/>
                            </svg>
                        </div>
                        <div className="nav-button search">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search"
                                 className="svg-inline--fa fa-search fa-w-16 nav-button__child" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor"
                                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                            </svg>
                        </div>
                        <div className="nav-button">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle"
                                 className="svg-inline--fa fa-plus-circle fa-w-16 nav-button__child" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor"
                                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="nav-group middle">
                        <div className="nav-button active">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clipboard-list"
                                 className="svg-inline--fa fa-clipboard-list fa-w-12 nav-button__child" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path fill="currentColor"
                                      d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="nav-group middle">
                        <div className="nav-button">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="newspaper"
                                 className="svg-inline--fa fa-newspaper fa-w-18 nav-button__child" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path fill="currentColor"
                                      d="M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z"></path>
                            </svg>
                        </div>
                        <div className="nav-button">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                 data-icon="arrow-alt-circle-right"
                                 className="svg-inline--fa fa-arrow-alt-circle-right fa-w-16 nav-button__child"
                                 role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor"
                                      d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zM140 300h116v70.9c0 10.7 13 16.1 20.5 8.5l114.3-114.9c4.7-4.7 4.7-12.2 0-16.9l-114.3-115c-7.6-7.6-20.5-2.2-20.5 8.5V212H140c-6.6 0-12 5.4-12 12v64c0 6.6 5.4 12 12 12z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="nav-group bottom">
                        <div className="nav-button">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-astronaut"
                                 className="svg-inline--fa fa-user-astronaut fa-w-14 nav-button__child" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor"
                                      d="M64 224h13.5c24.7 56.5 80.9 96 146.5 96s121.8-39.5 146.5-96H384c8.8 0 16-7.2 16-16v-96c0-8.8-7.2-16-16-16h-13.5C345.8 39.5 289.6 0 224 0S102.2 39.5 77.5 96H64c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16zm40-88c0-22.1 21.5-40 48-40h144c26.5 0 48 17.9 48 40v24c0 53-43 96-96 96h-48c-53 0-96-43-96-96v-24zm72 72l12-36 36-12-36-12-12-36-12 36-36 12 36 12 12 36zm151.6 113.4C297.7 340.7 262.2 352 224 352s-73.7-11.3-103.6-30.6C52.9 328.5 0 385 0 454.4v9.6c0 26.5 21.5 48 48 48h80v-64c0-17.7 14.3-32 32-32h128c17.7 0 32 14.3 32 32v64h80c26.5 0 48-21.5 48-48v-9.6c0-69.4-52.9-125.9-120.4-133zM272 448c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm-96 0c-8.8 0-16 7.2-16 16v48h32v-48c0-8.8-7.2-16-16-16z"></path>
                            </svg>
                        </div>
                        <div className="nav-button">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-out-alt"
                                 className="svg-inline--fa fa-sign-out-alt fa-w-16 nav-button__child" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor"
                                      d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
