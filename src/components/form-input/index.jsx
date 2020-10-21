import React, {Component} from "react";

import PropTypes from "prop-types";
import {Col, Input} from "antd";

class FormInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controlValue: this.props.value || ''
        };
    }

    static propTypes = {
        onChangeCallback: PropTypes.func
    };

    onChange = (e) => {
        const val = e.target.value

        this.setState({
            controlValue: val
        });

        typeof this.props.onChangeCallback === 'function' && this.props.onChangeCallback(this.props.controlName, val)
    };

    render() {
        const {value, controlName, span, placeholder, inputmask, className, colClassName, maxLength, disabled, inputRef} = this.props;

        let inp = <>
            <Input name={controlName}
                   disabled={disabled || null}
                   ref={inputRef || null}
                   maxLength={maxLength}
                   data-inputmask={inputmask ? inputmask : null}
                   className={(className || "") + " w_100p" + (placeholder ? " custom_placeholder" : " no_placeholder") + ((this.state.controlValue + '').length ? "" : " _empty")}
                   value={this.state.controlValue}
                   onChange={this.onChange} defaultValue={value}/>
            {placeholder ? <div className="float_placeholder">{placeholder}</div> : null}
        </>

        return (
            span === null ?
                <>
                    {inp}
                </>
                :
                <Col span={span} className={colClassName}>
                    {inp}
                </Col>
        );
    }
}

export default FormInput;
