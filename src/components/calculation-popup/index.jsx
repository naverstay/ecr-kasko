import React, {Component} from "react";
import {Row, Col, Switch, Button} from "antd";

import './style.scss';
import PropTypes from "prop-types";
import InsurancePolicy from "../insurance-policy";
import TrustedInfo from "../trusted-info";

//import KaskoCarSelect from "../kasko-car-select";
import KaskoCarSelectNew from "../kasko-car-select-new";
import ClientQuestionnaire from "../client-questionnaire";
import DriverInfo from "../driver-info";
import ClientInfo from "../client-info";
import ClientInfoNew from "../client-info-new";
import DriverCount from "../driver-count";
import KaskoCarSelectOsago from "../kasko-car-select-osago";

class CalculationPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carFound: void 0,
            showCarFields: true,
            fullCalculation: this.props.fullCalculation || false,
            showClientFields: false,
            toggleClientFields: false,
            calculationPopupOpened: false,
            formBusy: false,
            useOCR: false,
            hasFranchise: true,
            carCredit: true,
            carMark: '',
            carPrice: 0,
            carModel: '',
            carEquipment: '',
            carNumber: '',
            carYear: '',
            markList: [
                "Hyundai",
                "Mazda"
                //"Mercedes-Benz"
            ],
            modelList: [
                "Sonata",
                "Solaris",
                "CX-5",
                "CX-9"
            ],
            equipmentList: [
                "2.0 MPI - 6AT",
                "Comfort",
                "Sport",
                "Executive",
                "GT S Sports Car"
            ]
        };
    }

    static propTypes = {
        children: PropTypes.node,
        innerWidth: PropTypes.number,
        popupCloseFunc: PropTypes.func,
        updatePaymentState: PropTypes.func,
        fullCalculation: PropTypes.bool,
        offersList: PropTypes.array
    };

    onUseOCRChange = e => {
        this.setState({
            useOCR: e.target.checked
        });
    };

    onToggleClientFields = e => {
        this.setState({
            showClientFields: !this.state.showClientFields
        });
    };

    onToggleCarFields = e => {
        this.setState({
            showCarFields: !this.state.showCarFields
        });
    };

    onCalculationTypeChange = (checked) => {
        this.setState({fullCalculation: checked})
    }

    onOtherChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    }

    render() {
        let {popupCloseFunc, step, allFields, updatePaymentState, osago} = this.props

        let driverOptions = [];

        if (step > 1 || this.state.showCalculationOffers) {
            driverOptions = ['Фомин Сергей М.', 'Фомина Алла К.', 'Фомина Марина Ф.']
        }

        return (
            <div className="calculation-popup">
                <div className="calculation-popup__close" onClick={popupCloseFunc}/>

                {!osago ? <div
                    className={"kasko-car-select__calculation" + (allFields || this.state.fullCalculation ? ' active' : '')}>
                    <span className="kasko-car-select__calculation--text">Предварительный расчет</span>
                    <Switch checked={allFields || this.state.fullCalculation}
                            className="kasko-car-select__calculation--switch" onChange={this.onCalculationTypeChange}/>
                    <span className="kasko-car-select__calculation--text">Окончательный расчет</span>
                </div> : null}

                {
                    (!osago && allFields) ?
                        <>
                            <h1 className="kasko-main__title"><span>Поля к заполнению</span></h1>
                            {/*<ClientInfo fullCalculation={this.state.fullCalculation}/>*/}
                            <ClientInfoNew fullCalculation={this.state.fullCalculation}/>
                        </>
                        : null
                }

                <Row gutter={20}>
                    <Col span={3}/>
                    <Col span={18}>
                        <div className="driver-info__caption">Добавить контактных лиц в полис</div>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col span={3}/>
                    <Col span={18}>
                        <InsurancePolicy/>
                    </Col>
                </Row>

                <div className="kasko-car-select__form">
                    <h1 onClick={allFields ? this.onToggleCarFields : null}
                        className={"kasko-main__title" + (allFields ? (this.state.showCarFields ? " expanded" : " collapsed") : "")}>
                        <span>Автомобиль</span></h1>

                    {/*<KaskoCarSelect hideOffers={true} allFields={true}/>*/}
                    {/*{!osago ?*/}
                    <KaskoCarSelectNew hideOffers={true} allFields={allFields}
                                       expanded={(step === void 0) || this.state.showCarFields}
                                       fullCalculation={false}/>
                    {/*	: */}
                    {/*	<KaskoCarSelectOsago hideOffers={true} allFields={allFields} expanded={(step === void 0) || this.state.showCarFields} fullCalculation={this.state.fullCalculation}/>*/}
                    {/*}*/}

                </div>

                <div className="kasko-car-select__form">
                    <Row gutter={20}>
                        <Col span={3}/>
                        <Col span={18}>
                            <h1 onClick={allFields ? this.onToggleClientFields : null}
                                className={"kasko-main__title" + (allFields ? (this.state.showClientFields ? " expanded" : " collapsed") : "")}>
                                <span>Анкета и документы</span>
                                <span className={"kasko-main__title--id"}>ID 123456</span>
                            </h1>
                        </Col>
                    </Row>

                    {
                        ((step === void 0) || (step !== 2) || this.state.showClientFields) ?
                            <>
                                {/*<div className={"kasko-car-select__controls ant-row-center align_center"}>*/}
                                {/*	<Checkbox checked={this.state.useOCR ? "checked" : null}*/}
                                {/*				onChange={this.onUseOCRChange}>Не распознавать документы</Checkbox>*/}
                                {/*</div>*/}
                                <ClientQuestionnaire/>
                                <DriverCount className={"mt_60"} step={step} driverOptions={driverOptions}/>
                            </>
                            : null
                    }

                    <DriverInfo showAddBlock={true} wholeName={true} osago={osago} calculationSave={updatePaymentState}
                                expanded={(step !== 2) || this.state.showClientFields}
                                fullCalculation={this.state.fullCalculation}/>

                </div>

                <div className="kasko-car-select__form">
                    <h1 className={"kasko-main__title"}><span>Доверенные лица</span></h1>

                    <TrustedInfo wholeName={true} osago={osago}/>

                </div>

                <Row className="kasko-car-select__controls ant-row-center" gutter={20}>
                    <Col span={3}>
                        <div onClick={() => updatePaymentState} className="ant-btn btn_green fz_14 w_100p">
                            <span>Отмена</span></div>
                    </Col>
                    <Col span={6}>
                        <Button onClick={() => updatePaymentState} className={"ant-btn-primary btn_middle"}>Получить
                            расчет</Button>
                    </Col>
                    <Col span={3}/>
                </Row>
            </div>
        );
    }
}

export default CalculationPopup;
