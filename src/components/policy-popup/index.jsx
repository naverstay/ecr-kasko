import React, {Component} from "react";
import {Button, Checkbox, Col, Row, Switch} from "antd";

import './style.scss';
import PropTypes from "prop-types";
//import KaskoCarSelect from "../kasko-car-select";
import KaskoCarSelectNew from "../kasko-car-select-new";
import ClientQuestionnaire from "../client-questionnaire";
import DriverInfo from "../driver-info";
import ClientInfo from "../client-info";
import ClientInfoNew from "../client-info-new";
import DriverCount from "../driver-count";
import KaskoCarSelectOsago from "../kasko-car-select-osago";
import KaskoCarSelect from "../kasko-car-select";
import OsagoCarSelect from "../osago-car-select";
import PolicyUpload from "../policy-upload";
import FormCheckbox from "../form-checkbox";
import PolicyForm from "../policy-form";
import PersonalForm from "../personal-form";
import ReactComment from "../../helpers/reactComment";

class PolicyPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carFound: void 0,
            showCarFields: !this.props.osago,
            fullCalculation: this.props.fullCalculation || false,
            showUpload: false,
            showKasko: this.props.showTab === 1,
            showOsago: this.props.showTab === 2,
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
        showTab: PropTypes.number,
        popupCloseFunc: PropTypes.func,
        popupConfirmation: PropTypes.func,
        fullCalculation: PropTypes.bool,
        offersList: PropTypes.array
    };

    formControlCallback = (name, value) => {
        console.log('formControlCallback', name, value);

        if (name in this.state) {
            let obj = {}
            obj[name] = value

            this.setState(obj)
        }

        switch (name) {
            case 'carModel':
                this.removeActiveField('carModel')
                this.addActiveField('carEquipment')
                break
            case 'carEquipment':
                this.removeActiveField('carEquipment')

                if (!this.state.newCar) {
                    this.addActiveField('carYear')
                }
                break
            case 'carYear':
                this.removeActiveField('carYear')
                this.addActiveField('carNumber')
                break
        }
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

    toggleShowUpload = () => {
        this.setState({showUpload: !this.state.showUpload})
    }

    popupConfirmFunc = () => {
        this.props.popupConfirmation && typeof this.props.popupConfirmation === 'function' && this.props.popupConfirmation()
    }

    render() {
        let {popupCloseFunc, step, allFields, osago} = this.props

        return (
            <div className="calculation-popup">
                <ReactComment text='"ecr-kasko/src/components/policy-popup/index.jsx"'/>

                <div className="calculation-popup__close" onClick={popupCloseFunc}/>
                {/*<h1 className="kasko-main__title"><span>Внести полис вручную</span></h1>*/}

                <h1 onClick={(allFields || osago) ? this.onToggleCarFields : null}
                    className={"kasko-main__title" + ((allFields || osago) ? (this.state.showCarFields ? " expanded" : " collapsed") : "")}>
                    <span>Автомобиль</span></h1>

                {this.state.showCarFields ?
                    osago ? <OsagoCarSelect popup={true} hideOffers={true} allFields={allFields}
                                            expanded={(step === void 0) || this.state.showCarFields}
                                            fullCalculation={this.state.fullCalculation}/>
                        : <KaskoCarSelect popup={true} hideOffers={true} allFields={allFields}
                                          expanded={(step === void 0) || this.state.showCarFields}
                                          fullCalculation={this.state.fullCalculation}/>
                    : null}

                <h1 onClick={allFields ? this.onToggleClientFields : null}
                    className={"kasko-main__title" + (allFields ? (this.state.showClientFields ? " expanded" : " collapsed") : "")}>
                    <span>Страховой полис</span></h1>

                {this.props.showTab ? null :
                    <Row gutter={20} className={"kasko-car-select__controls check_v2 ant-row-center align_center"}>
                        <FormCheckbox onChangeCallback={this.formControlCallback}
                                      text="е-КАСКО"
                                      className=""
                                      value={1}
                                      controlName={'showKasko'}
                                      checked={this.state.showKasko ? true : null}/>

                        <FormCheckbox onChangeCallback={this.formControlCallback}
                                      text="е-ОСАГО"
                                      className=""
                                      value={1}
                                      controlName={'showOsago'}
                                      checked={this.state.showOsago ? true : null}/>
                    </Row>
                }

                {this.state.showKasko ?
                    <>
                        <Row gutter={20}>
                            <Col span={3}/>
                            <Col>
                                <div className={"kasko-car-select__caption"}>Полис е-КАСКО</div>
                            </Col>
                        </Row>
                        <PolicyForm/>
                    </>
                    : null
                }

                {this.state.showOsago ?
                    <>
                        <Row gutter={20}>
                            <Col span={3}/>
                            <Col>
                                <div className={"kasko-car-select__caption"}>Полис е-ОСАГО</div>
                            </Col>
                        </Row>

                        <PolicyForm/>
                    </>
                    : null
                }

                {(this.state.showKasko || this.state.showOsago) ?
                    <Row gutter={20}>
                        <Col span={3}/>
                        <Col>
                            <div onClick={this.toggleShowUpload}
                                 className={"kasko-car-select__caption mb_0" + (this.state.showUpload ? " expanded" : " collapsed")}
                            >Загрузить скан документов
                            </div>
                        </Col>
                    </Row>
                    : null
                }

                {this.state.showUpload && (this.state.showKasko || this.state.showOsago) ?
                    <PolicyUpload kasko={this.state.showKasko} osago={this.state.showOsago}/>
                    : null
                }

                <h1 className={"kasko-main__title"}><span>Личные данные</span></h1>

                <PersonalForm wholeName={true}/>

                <Row className="kasko-car-select__controls" gutter={20}>
                    <Col span={6}/>
                    <Col span={3}>
                        <div className="ant-btn btn_green fz_14 w_100p"><span>Отменить</span></div>
                    </Col>
                    <Col span={6}>
                        <Button onClick={this.popupConfirmFunc}
                                className={"w_100p " + (this.state.formBusy ? "btn_grey" : "ant-btn-primary")}
                        >Сохранить</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PolicyPopup;
