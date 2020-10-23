import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

let CheckBox = props => {
    CheckBox.propTypes = {
        name: PropTypes.string,
        id: PropTypes.string,
        classList: PropTypes.array,
        children: PropTypes.node,
        radio: PropTypes.bool,
        checked: PropTypes.bool,
        onChange: PropTypes.func
    };

    const {
        name,
        id,
        classList,
        children,
        radio,
        checked,
        onChange
    } = props;
    const className = cn([
        ...classList
    ]);

    return (
        <label className={className}>
            <input
                name={name || null}
                type={radio ? 'radio' : 'checkbox'}
                onChange={onChange || null}
                id={id || null}
                checked={checked}
            />
            <span className='check_text'>
				{children}
			</span>
        </label>
    )
}

export default CheckBox;
