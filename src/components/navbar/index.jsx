import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Sidebar from './sidebar';
import Topbar from './topbar';

class Navbar extends Component {
    static propTypes = {
        innerWidth: PropTypes.number
    };

    state = {width: window.innerWidth};

    render() {
        //const bar = this.props.innerWidth > 1200 ? <Sidebar sidebarHovered={this.props.sidebarHovered} updateSidebarState={this.props.updateSidebarState} /> : <Topbar />;
        //return <>{bar}</>;

        return (
            <div className="sidebar">
                <div className="sidebar__header">
                    <div className="sidebar__button-wrapper">
                        <div className="sidebar__button __home label-nohover">
                            <div className="sidebar__button-icon home">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.175 16.561">
                                    <path id="Path_20" data-name="Path 20" fill="#fff"
                                          d="M13.967,10.93l1.711.883a9.141,9.141,0,0,1-1.932,2.65,7.246,7.246,0,0,1-2.484,1.546,9.064,9.064,0,0,1-3.091.552,7.454,7.454,0,0,1-6.017-2.539A8.641,8.641,0,0,1,0,8.281,8.608,8.608,0,0,1,1.822,2.926,7.621,7.621,0,0,1,8.06,0a7.725,7.725,0,0,1,6.4,3.036,8.2,8.2,0,0,1,1.711,5.355H2.1a6.3,6.3,0,0,0,1.767,4.471,5.625,5.625,0,0,0,4.2,1.767,6.65,6.65,0,0,0,2.319-.442,6.554,6.554,0,0,0,1.932-1.1A8.554,8.554,0,0,0,13.967,10.93Zm0-4.251a7.076,7.076,0,0,0-1.159-2.595,5.282,5.282,0,0,0-2.043-1.546,6.213,6.213,0,0,0-2.65-.607A5.736,5.736,0,0,0,4.14,3.423,6.878,6.878,0,0,0,2.263,6.68Z"></path>
                                </svg>
                            </div>
                            <div className="sidebar__button-label label-nohover sidebar__fix-wrapper dt-only">
                                <div className="sidebar__fix">
                                    <div className="sidebar__fix-lang">
                                        <div className=" css-2b097c-container">
                                            <div className="lang-select__control css-yk16xz-control">
                                                <div
                                                    className="lang-select__value-container lang-select__value-container--has-value css-1hwfws3">
                                                    <div
                                                        className="lang-select__single-value css-1uccc91-singleValue">Русский
                                                    </div>
                                                    <div className="css-b8ldur-Input">
                                                        <div className="lang-select__input"><input autoCapitalize="none"
                                                                                                   autoComplete="off"
                                                                                                   autoCorrect="off"
                                                                                                   id="react-select-10-input"
                                                                                                   spellCheck="false"
                                                                                                   tabIndex="0"
                                                                                                   type="text"
                                                                                                   readOnly
                                                                                                   aria-autocomplete="list"
                                                                                                   value=""/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="lang-select__indicators css-1hb7zxy-IndicatorsContainer">
													<span
                                                        className="lang-select__indicator-separator css-1okebmr-indicatorSeparator"></span>
                                                    <div aria-hidden="true"
                                                         className="lang-select__indicator lang-select__dropdown-indicator css-tlfecz-indicatorContainer">
                                                        <svg height="20" width="20" viewBox="0 0 20 20"
                                                             aria-hidden="true" focusable="false"
                                                             className="css-6q0nyr-Svg">
                                                            <path
                                                                d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sidebar__fix-button"></div>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar__button button-submenu dt-only">
                            <a href="/garage_empty" className="sidebar__button-icon add"></a>
                            <div className="sidebar__button-label">Рассчитать</div>
                        </div>
                        <div className="sidebar__button active button-submenu">
                            <a href="/orders" className="sidebar__button-icon copy"></a>
                            <div className="sidebar__button-label">Заявки</div>
                        </div>
                        <div className="sidebar__button label-nohover dt-only">
                            <div className="sidebar__button-icon search"></div>
                            <div className="sidebar__button-label">
                                <div className="sidebar__search">
                                    <div className="sidebar__search-form"><input className="sidebar__search-input"
                                                                                 placeholder="Найти заявку"/>
                                        <button className="sidebar__search-button"></button>
                                    </div>
                                    <p className="sidebar__search-tip">Поиск по имени, фамилии<br/>или номеру телефона
                                    </p></div>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar__button-wrapper dt-only">
                        <div className="sidebar__button button-submenu">
                            <div className="sidebar__button-icon bank"></div>
                            <div className="sidebar__button-label">Банки</div>
                        </div>
                        <div className="sidebar__button">
                            <div className="sidebar__button-icon news"></div>
                            <div className="sidebar__button-label">Новости</div>
                        </div>
                    </div>
                    <div className="sidebar__button-wrapper">
                        <div className="sidebar__button button-submenu">
                            <div className="sidebar__button-icon charts"></div>
                            <div className="sidebar__button-label">Отчеты</div>
                        </div>
                        <div className="sidebar__button button-submenu dt-only">
                            <div className="sidebar__button-icon settings"></div>
                            <div className="sidebar__button-label">Настройки</div>
                        </div>
                        <div className="sidebar__button button-submenu">
                            <div className="sidebar__button-icon avatar">
                                <div className="avatar-initials">ОХ</div>
                            </div>
                            <div className="sidebar__button-label">
                                <div className="sidebar__user">
                                    <div className="sidebar__button-label dt-hidden">Профиль</div>
                                    <div className="sidebar__user-name dt-only">Одри Хепберн</div>
                                    <div className="sidebar__user-role dt-only">Менеджер по продажам<br/>ДЦ Дружба</div>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar__button dt-only">
                            <div className="sidebar__button-icon exit"></div>
                            <div className="sidebar__button-label">Выйти</div>
                        </div>
                    </div>
                </div>
                <div className="sidebar__header-line">
                    <div className="sidebar__header-mobile dt-hidden">
                        <div className="sidebar__header-title">Заявки</div>
                    </div>
                </div>
                <div className="sidebar__body">
                    <ul className="sidebar__body-list">
                        <li className="submenu-item submenu-item__empty"></li>
                        <li className="submenu-item submenu-item__empty"></li>
                        <li className="submenu-item"><a className="submenu-link" title="Заявки в работе"
                                                        href="/active-orders">Заявки в работе</a></li>
                        <li className="submenu-item"><a className="submenu-link" title="Список заявок"
                                                        href="/list-orders">Список заявок</a></li>
                        <li className="submenu-item"><a className="submenu-link" title="Lost"
                                                        href="/lost-orders">Lost</a></li>
                    </ul>
                </div>
                <div className="sidebar__backdrop"></div>
            </div>
        )

    }
}

export default Navbar;
