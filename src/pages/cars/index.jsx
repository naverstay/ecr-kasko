import React, {Component} from "react";
import {Button, Checkbox, Col, Row, Radio, Input} from "antd";
import AsideBlock from "../../components/aside-block";
import AsideCrumbs from "../../components/aside-crumbs";
import KaskoNotices from "../../components/kasko-notices";
import DocsCompleteness from "../../components/docs-completeness";
import KaskoUser from "../../components/kasko-user";
import KaskoCarInfo from "../../components/kasko-car-info";
import KaskoCarSelect from "../../components/kasko-car-select";
import PropTypes from 'prop-types';

import './style.scss';
import OfferSelect from "../../components/offer-select";
import AuthPopup from "../../components/auth-popup";
import PopupOverlay from "../../components/popup-overlay";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import TabCredit from "../../components/tab-credit";
import CarSelect from "../../components/car-select";
import TabService from "../../components/tab-service";
import TabOffer from "../../components/tab-offer";
import ServiceNotices from "../../components/service-notices";
import AsideBlockProduct from "../../components/aside-block-product";
import KaskoNotice from "../../components/kasko-notice";
import FormInput from "../../components/form-input";
import FormSelect from "../../components/form-select";
import FormCheckbox from "../../components/form-checkbox";
import DriverLicense from "../../components/driver-license";
import TrustedAnketa from "../../components/trusted-anketa";
import DriverInfo from "../../components/driver-info";
import {formatMoney} from "../../helpers/formatMoney";
import {Link} from "react-router-dom";
import VehicleAnketa from "../../components/vehicle-anketa";

class Cars extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anketaProduct: 0,
            clientObligatoryPayments: '',
            clientMortgageRepayment: '',
            clientOtherLoans: '',
            clientBirthLocation: '',
            clientSecondDocDepartment: '',
            clientPassportDepartment: '',
            clientPassportDepartmentCode: '',
            clientPassportDateStart: '',
            clientPassportSeries: '',
            clientWholeName: '',
            clientAddressRegDate: '',
            clientAddressPostCode: '',
            clientEmail: '',
            clientPhone: '',
            clientBirthday: '',
            clientAddress: '',
            propertyStatus: '',
            clientEncmbranceCount: '',
            clientChildrenCount: '',
            clientPostPeriod: '',
            clientPostStart: '',
            clientPostTotal: '',
            clientPostType: '',
            clientMainIncome: '',
            clientAdditionalIncome: '',
            clientOrganizationPhone: '',
            clientOrganizationLocation: '',
            clientEducation: '',
            clientEducationList: [
                "Высшее",
                "Среднее"
            ],
            clientSocialStatus: '',
            clientSocialStatusList: [
                "Пенсионер",
                "Госслужащий"
            ],
            secondDoc: '',
            secondDocList: [
                "Пенсионное удостоверение",
                "Водительское удостоверение"
            ],
            clientFamilyStatus: '',
            clientFamilyStatusList: [
                "Женат/Замужем",
                "Холост",
                "В разводе",
                "Вдовец"
            ],
            propertyStatusList: [
                "Недвиг 1",
                "Недвиг 2",
                "Недвиг 3"
            ],
            citizenRF: true,
            nameWasChanged: false,
            equalsRealAddress: false,
            driverOSAGOInsurant: true,
            openAnketa: false,
            openTrusted: false
        };
    }

    static propTypes = {
        children: PropTypes.node
    };

    driverInfoCallback = (rslt) => {
        if (rslt.hasOwnProperty('driverOSAGOInsurant')) {
            //this.setState(rslt)
        }
    }

    formControlCallback = (name, value) => {
        console.log('formControlCallback', name, value);

        if (name in this.state) {
            let obj = {}
            obj[name] = value

            this.setState(obj)
        } else {
            console.log('no name in state', name);
        }

        switch (name) {
            case 'insuranceCompName':
                let manual = value === this.state.insuranceCompaniesList[this.state.insuranceCompaniesList.length - 1]

                this.setState({
                    insuranceCompName: value,
                    insuranceTaxName: manual ? '' : this.state.insuranceTaxName,
                    manualPriceCheck: manual
                })
                break
            case 'kaskoCash':
                this.setState({kaskoCash: value})
                break
            case 'kaskoDealerBank':
                this.setState({kaskoDealerBank: value})
                break
            case 'kaskoFirstYear':
                this.setState({kaskoFirstYear: value})
                break
        }

    };

    onToggleTrusted = e => {
        this.setState({
            openTrusted: !this.state.openTrusted
        });
    };

    onToggleAnketa = e => {
        this.setState({
            openAnketa: !this.state.openAnketa
        });
    };

    onAnketaProductChange = e => {
        console.log('onAnketaProductChange', e);

        this.setState({anketaProduct: e.target.value});
    };

    render() {
        let {step} = this.props;
        const productList = ['Кредит', 'ОСАГО', 'КАСКО', 'Сервис'];
        const PhoneMask = "'mask': '[+7] (999)-999-99-99', 'showMaskOnHover': 'false'";
        const dateFormatMask = "'mask': '99.99.9999', 'showMaskOnHover': 'false'";

        return (
            <>
                <Row gutter={20} className="kasko-wrapper">
                    <Col span={4} className="kasko-aside">
                        <AsideCrumbs crumbs={['Главная']}/>
                        <AsideBlock>
                            <KaskoUser firstName={'Мария'} lastName={'Константинопольская'}
                                       avatar={'./users/masha.jpg'}
                                       phone={"+ 7 (910) 222-12-12"} docs="" trustees=""
                                       autos=''/>
                        </AsideBlock>

                        <AsideBlock>
                            <KaskoCarInfo step={step} notificationCount={step === 2 ? 1 : step === 3 ? 2 : 0}
                                          carName={step === 1 ? '' : 'Hyundai'}
                                          carModel={step === 1 ? '' : 'Sonata'} image={'Hyundai'}
                                          info={step === 1 ? '' : "2020 Новый"}
                                          price={step === 1 ? '' : "1 534 000 ₽"}/>
                        </AsideBlock>
                    </Col>

                    <Col span={16} className="kasko-main">

                        <VehicleAnketa date={'20.01.20'} number={['а', '000', 'аа', '00']} status={['waiting', 'approved', 'declined']} />

                        <VehicleAnketa date={'-'} number={['с', '065', 'мк', '177']} status={['refused', 'waiting', 'declined']} />

                        <Row className="kasko-car-select__controls mt_30 mb_30 ant-row-center"
                             gutter={20}>
                            <Col span={6}>
                                <Button className="driver-info__add gl_link w_100p btn-action"
                                >Добавить автомобиль</Button>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={4} className="kasko-aside">
                        <AsideBlock>
                            <KaskoNotices noticeList={[{title: 'Понедельник, 20.02.19', list: []}]}/>
                        </AsideBlock>
                    </Col>
                </Row>
            </>
        );
    }
}

export default Cars
