import React from 'react';
import Select from 'react-select';
import cn from 'classnames';
import {connect} from 'react-redux';
import {changeLocale} from '../../store/user';
import './style.scss';

const enhance = connect(
    ({user}) => ({locale: user.locale, langs: user.langs}),
    {changeLocale}
);

const LangSwitcher = ({
                          langs,
                          changeLocale,
                          classList = ['lang-switcher']
                      }) => (
    <div className={cn([...classList])}>
        <Select
            options={langs}
            classNamePrefix='lang-select'
            defaultValue={langs[0]}
            onChange={(val) => {
                (changeLocale(val.value))
            }}
        />
    </div>
);

export default enhance(LangSwitcher);
