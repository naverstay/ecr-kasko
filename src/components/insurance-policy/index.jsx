import React, {Component} from "react";
import {Checkbox, Row, Col} from "antd";
import './style.scss';
import PropTypes from "prop-types";

class InsurancePolicy extends Component {
    static propTypes = {
        children: PropTypes.node,
        allFields: PropTypes.bool,
        innerWidth: PropTypes.number
    };

    render() {
        const {disableKasko} = this.props;

        return (
            <div className="insurance-policy">
                <table className="insurance-policy__table">
                    <thead>
                    <tr>
                        <th className="insurance-policy__table--col-1">Фамилия имя отчество</th>
                        <th className="insurance-policy__table--col-2">ОСАГО</th>
                        <th className={"insurance-policy__table--col-3" + (disableKasko ? " __disabled" : "")}>КАСКО</th>
                        {/*<th className="insurance-policy__table--col-4">&nbsp;</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <div className="insurance-policy__name">Фомин Сергей Михайлович</div>
                            <div className="insurance-policy__info __allow">Есть все данные</div>
                            {/*<Row gutter={20} className="insurance-policy__options">*/}
                            {/*	<Col className="check_v3">*/}
                            {/*		<Checkbox>Страхователь</Checkbox>*/}
                            {/*	</Col>*/}
                            {/*	<Col className="check_v3">*/}
                            {/*		<Checkbox>Собственник</Checkbox>*/}
                            {/*	</Col>*/}
                            {/*</Row>*/}
                        </td>
                        <td className="check_v3">
                            <Checkbox/>
                        </td>
                        <td className="check_v3">
                            <Checkbox disabled={disableKasko}/>
                        </td>
                        {/*<td>&nbsp;</td>*/}
                    </tr>
                    <tr>
                        <td>
                            <div className="insurance-policy__name">Фомина Марина Владимировна</div>
                            <div className="insurance-policy__info __disallow">Заполните Водительское удостоверение</div>
                            {/*<Row gutter={20} className="insurance-policy__options">*/}
                            {/*	<Col className="check_v3">*/}
                            {/*		<Checkbox>Страхователь</Checkbox>*/}
                            {/*	</Col>*/}
                            {/*	<Col className="check_v3">*/}
                            {/*		<Checkbox>Собственник</Checkbox>*/}
                            {/*	</Col>*/}
                            {/*</Row>*/}
                        </td>
                        <td className="check_v3">
                            <Checkbox/>
                        </td>
                        <td className="check_v3">
                            <Checkbox disabled={disableKasko}/>
                        </td>
                        {/*<td>&nbsp;</td>*/}
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default InsurancePolicy;
