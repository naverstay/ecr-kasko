import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";

class SelectFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            selected: [],
            list: [
                'ДЦ Дружба',
                'ДЦ Маргарита-Тест',
                'Автоград Тюмень KIA',
                'Inchcape JLR Центр',
                'ДЦ Дружба',
                'ДЦ Маргарита-Тест',
                'Автоград Тюмень KIA',
                'Автоград Тюмень KIA',
                'ДЦ Дружба',
                'ДЦ Маргарита-Тест',
                'Автоград Тюмень KIA',
                'ДЦ Дружба',
                'ДЦ Маргарита-Тест',
                'Автоград Тюмень KIA',
                'Inchcape JLR Центр',
                'ДЦ Дружба',
                'ДЦ Маргарита-Тест',
                'Автоград Тюмень KIA',
                'Автоград Тюмень KIA',
                'ДЦ Дружба',
                'ДЦ Маргарита-Тест',
                'Автоград Тюмень KIA'
            ]
        };
    }

    static propTypes = {
        selectAll: PropTypes.string,
        options: PropTypes.array,
        name: PropTypes.string
    };

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    selectAll() {
        let {options} = this.props;
        let selected = options.map((o, i) => i);
        this.setState({selected: selected});
    }

    toggleOpened() {
        this.setState({opened: !this.state.opened});
    }

    clickHandler(ind) {
        let {selected} = this.state;
        let index = selected.indexOf(ind);

        if (index > -1) {
            selected.splice(index, 1);
        } else {
            selected.push(ind);
        }

        this.setState({selected: selected});
    }

    formControlCallback = (name, value) => {
        console.log('formControlCallback', name, value);

        if (name in this.state) {
            let obj = {}
            obj[name] = value

            this.setState(obj)
        } else {
            switch (name) {
                case 'carForTaxi':
                    this.setState({carForTaxi: value})
                    break

            }
        }
    };

    render() {
        let {options, selectAll, name, nameShort, tip} = this.props;
        let {selected, opened} = this.state;

        return (
            <div className={"fullscreen-select__container" + (opened ? ' __opened' : '')}>
                {opened ?
                    <>
                        <div className="sidebar__filter-header">
                            <div className="sidebar__filter-back" onClick={() => {
                                this.toggleOpened();
                            }}>Назад
                            </div>
                            <div className="sidebar__filter-title">{nameShort}</div>
                        </div>
                        <div className="sidebar__filter-body">
                            <ul className={'fullscreen-select__options'}>
                                {selectAll && <li className={'fullscreen-select__item'} onClick={() => {
                                    this.selectAll();
                                }}>{selectAll}</li>}
                                {options.map((l, i) => <li
                                    className={'fullscreen-select__item' + (selected.indexOf(i) > -1 ? ' __active' : '')}
                                    onClick={() => {
                                        this.clickHandler(i);
                                    }} key={i}>{l}</li>)}
                            </ul>
                        </div>
                        <div className="sidebar__filter-footer">
                            <div className="fullscreen-select__counter">
                                Выбрано {selected.length} из {options.length}
                            </div>
                            {tip && <div className="fullscreen-select__tip">{tip}</div>}
                        </div>
                    </>
                    :
                    <div onClick={() => {
                        this.toggleOpened();
                    }} className="fullscreen-select">
                        <div
                            className={"ant-select w_100p FormSelect custom_placeholder ant-select-single" + (selected.length ? '' : ' _empty')}>
                            <div className="ant-select-selector">
                                <span
                                    className="ant-select-selection-item">{options.filter((o, i) => selected.indexOf(i) > -1).join(', ')}</span>
                            </div>
                            <span className="ant-select-arrow" unselectable="on" aria-hidden="true">
                            <span role="img" aria-label="down" className="anticon anticon-down"><svg
                                viewBox="64 64 896 896" focusable="false" className="" data-icon="down" width="1em"
                                height="1em" fill="currentColor" aria-hidden="true"><path
                                d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg></span>
                        </span>
                        </div>
                        <div className="float_placeholder">{name}</div>
                    </div>
                }
            </div>
        );
    }
}

export default SelectFilter;
