import React, {Component} from "react";

import PropTypes from "prop-types";
import {Col, Select} from "antd";

const {Option} = Select;

class FormSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controlValue: '' + (this.props.value || '')
        };
    }

    static propTypes = {
        onChangeCallback: PropTypes.func
    };

    onChange = (value) => {
        this.setState({
            controlValue: value + ''
        });

        typeof this.props.onChangeCallback === 'function' && this.props.onChangeCallback(this.props.controlName, value)
    };

    //handleSelectAll = (value) => {
    //    if (value && value.length && value.includes("all")) {
    //        if (value.length === all.length + 1) {
    //            return [];
    //        }
    //        return [...all];
    //    }
    //    return value;
    //}

    render() {
        const {cellClass, controlName, span, placeholder, options, dropdownClassName, className, disabled, value, multi, selectAll, appendTo} = this.props;

        //console.log('controlValue', controlName, '#', options, '#', this.state.controlValue, '#', value);

        let slct = <>
            <Select
                name={controlName}
                disabled={disabled || null}
                dropdownClassName={dropdownClassName || "select_dropdown_v1"}
                className={(className || "") + " w_100p FormSelect" + (placeholder ? " custom_placeholder" : " no_placeholder") + (value.length || this.state.controlValue.length ? "" : " _empty")}
                placeholder=""
                onChange={this.onChange}
                value={value}
                mode={multi ? "multiple" : null}
                getPopupContainer={triggerNode => triggerNode.parentNode}
                open={multi}
            >
                {selectAll && <Option key="all" value={controlName + "All"}>{selectAll}</Option>}
                {(options && options.length) ? options.map((e, i) =>
                    <Option key={i} value={e}>{e}</Option>) : null}
            </Select>
            {placeholder ? <div className="float_placeholder">{placeholder}</div> : null}
        </>

        return (
            span === null ?
                <>
                    {slct}
                </>
                :
                <Col className={cellClass || ''} span={span}>
                    {slct}
                </Col>
        );
    }
}

export default FormSelect;
