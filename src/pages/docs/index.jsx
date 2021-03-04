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
import TrustedInfo from "../../components/trusted-info";

class Docs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anketaProduct: 0,
            trustedInfoCount: 0,
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
            nameWasChanged: true,
            equalsRealAddress: true,
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

    addTrustedInfo = e => {
        this.setState({
            trustedInfoCount: this.state.trustedInfoCount + 1
        });
    };

    onRemoveTrastedInfo = e => {
        this.setState({
            trustedInfoCount: this.state.trustedInfoCount - 1
        });
    };

    render() {
        let {step} = this.props;
        let trustedInfoArray = [];
        const productList = ['Кредит', 'ОСАГО', 'КАСКО', 'Сервис'];
        const PhoneMask = "'mask': '[+7] (999)-999-99-99', 'showMaskOnHover': 'false'";
        const dateFormatMask = "'mask': '99.99.9999', 'showMaskOnHover': 'false'";

        let anketaOptions = <Radio.Group className={"w_100p"} defaultValue={this.state.anketaProduct}
                                         onChange={this.onAnketaProductChange}>
            <Row className={"ant-row-center"} gutter={20}>
                {
                    productList.map((c, i) =>
                        <Col key={i}><Radio value={i}>{c}</Radio></Col>
                    )
                }
            </Row>
        </Radio.Group>;

        for (let i = 0; i < this.state.trustedInfoCount; i++) {
            trustedInfoArray.push(<TrustedInfo key={i} removeCallback={this.onRemoveTrastedInfo}
                                               wholeName={true} index={i + 1}/>);
        }

        let clientDocs = <>
            <Row className="mb_15" gutter={20}>
                <Col span={3}/>

                <Col span={6}>
                    <div className="docs__frame-load _completed">
                        <span>Паспорт</span>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="docs__frame-load _completed">
                        <span>Водительское удостоверение</span>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="docs__frame-load _completed">
                        <span>СНИЛС</span>
                    </div>
                </Col>

                <Col span={3}/>
            </Row>

            <Row className="mb_20" gutter={20}>
                <Col span={3}/>

                <Col span={6}>
                    <div className="docs__frame-load _completed">
                        <span>ИНН</span>
                    </div>
                </Col>

                <Col span={6}>
                    <label className="docs__frame-load">
                        <input className={'hide'} type="file"/>
                        <span>Загрузить документ</span>
                    </label>
                </Col>

                <Col span={3}/>
            </Row>
        </>

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
                        <div className="docs__frame">
                            <Row className="mb_60" gutter={20}>
                                <Col span={3}/>

                                <Col span={6}>
                                    <div className="docs__frame-avatar">
                                        <div className="docs__frame-avatar_wrapper">
                                            <img src="./users/masha.jpg" alt=""/>
                                        </div>
                                        <label className="docs__frame-avatar_load">
                                            <input className={'hide'} type="file"/>
                                        </label>
                                    </div>
                                </Col>

                                <Col span={9}>
                                    <div className="docs__frame-name">
                                        Константинопольская
                                        Мария Константиновна
                                    </div>
                                    <div className="docs__frame-contact"> +7 (916) 222-22-22</div>
                                    <div className="docs__frame-contact"> konstantinopolskaya@gmail.com</div>
                                </Col>

                                <Col className={'ant-col-mla'} span={3}>
                                    <div className="text_right">
                                        <div className="docs__frame-status _active">Активный</div>
                                        <p className="text1">
                                            <span className="color_gray fz_12">Клиент с <br/>20.01.20
                                            </span>
                                        </p>
                                    </div>
                                </Col>
                                <Col span={3}/>
                            </Row>

                            {clientDocs}
                        </div>

                        <div className="docs__frame _active">
                            <h1 onClick={this.onToggleAnketa}
                                className={"kasko-main__title" + (this.state.openAnketa ? " expanded" : " collapsed")}>
                                <span>Анкета клиента</span></h1>

                            {this.state.openAnketa ?
                                <>
                                    <div className="mb_45">
                                        <div
                                            className="kasko-car-select__controls radio_v2 mt_5 mb_0">{anketaOptions}</div>
                                    </div>

                                    {
                                        this.state.anketaProduct === 0 ?
                                            <>

                                                <Row className="kasko-car-select__controls mb_0" gutter={20}>
                                                    <Col span={3}/>
                                                    <Col span={18}>
                                                        <div className="driver-info__caption">Личная информация</div>
                                                    </Col>
                                                </Row>

                                                <Row className="kasko-car-select__controls" gutter={20}>
                                                    <Col span={3}/>
                                                    <FormInput span={12} onChangeCallback={this.formControlCallback}
                                                               placeholder="Фамилия, имя, отчество"
                                                               controlName={'clientWholeName'}
                                                               value={this.state.clientWholeName}/>

                                                    <FormCheckbox span={6} onChangeCallback={this.formControlCallback}
                                                                  text="Ранее ФИО было изменено"
                                                                  value={1}
                                                                  className="checkbox_middle check_v6"
                                                                  controlName={'nameWasChanged'}
                                                                  checked={this.state.nameWasChanged}/>

                                                </Row>

                                                <Row className="kasko-car-select__controls" gutter={20}>
                                                    <Col span={3}/>
                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder="Дата рождения"
                                                               inputmask={dateFormatMask}
                                                               controlName={'clientBirthday'}
                                                               value={this.state.clientBirthday}/>
                                                </Row>

                                                <Row className="kasko-car-select__controls mb_60" gutter={20}>
                                                    <Col span={3}/>

                                                    <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                                                options={this.state.clientFamilyStatusList}
                                                                placeholder="Семейное положение"
                                                                controlName={'clientFamilyStatus'}
                                                                value={this.state.clientFamilyStatus}/>

                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder="Кол-во детей младше 21"
                                                               controlName={'clientChildrenCount'} value={''}/>

                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder="Кол-во иждивенцев"
                                                               controlName={'clientEncmbranceCount'} value={''}/>

                                                </Row>


                                                <Row className="kasko-car-select__controls mb_0" gutter={20}>
                                                    <Col span={3}/>
                                                    <Col span={18}>
                                                        <div className="driver-info__caption">Контакты</div>
                                                    </Col>
                                                </Row>

                                                <Row
                                                    className={"kasko-car-select__controls mb_60"}
                                                    gutter={20}>
                                                    <Col span={3}/>
                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder="Мобильный телефон"
                                                               controlName={'clientPhone'}
                                                               value={this.state.clientPhone}/>

                                                    <FormInput span={12} onChangeCallback={this.formControlCallback}
                                                               placeholder="Емейл"
                                                               controlName={'clientEmail'}
                                                               value={this.state.clientEmail}/>
                                                </Row>


                                                <Row className="kasko-car-select__controls mb_0" gutter={20}>
                                                    <Col span={3}/>
                                                    <Col span={12}>
                                                        <div className="driver-info__caption">Паспорт</div>
                                                    </Col>
                                                    <FormCheckbox span={6} onChangeCallback={this.formControlCallback}
                                                                  text="Гражданин РФ"
                                                                  value={1}
                                                                  className="check_v6"
                                                                  controlName={'citizenRF'}
                                                                  checked={this.state.citizenRF}/>
                                                </Row>

                                                <Row className="kasko-car-select__controls" gutter={20}>
                                                    <Col span={3}/>
                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder={"Серия, номер"}
                                                               controlName={'clientPassportSeries'}
                                                               value={''}/>

                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder={"Дата выдачи"}
                                                               controlName={'clientPassportDateStart'}
                                                               value={''}/>

                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder={"Код подразделения"}
                                                               controlName={'clientPassportDepartmentCode'}
                                                               value={''}/>
                                                </Row>

                                                <Row className="kasko-car-select__controls" gutter={20}>
                                                    <Col span={3}/>
                                                    <FormInput span={18} onChangeCallback={this.formControlCallback}
                                                               placeholder={"Кем выдан"}
                                                               controlName={'clientPassportDepartment'}
                                                               value={''}/>
                                                </Row>

                                                <Row className="kasko-car-select__controls mb_60" gutter={20}>
                                                    <Col span={3}/>
                                                    <FormInput span={12} onChangeCallback={this.formControlCallback}
                                                               placeholder="Место рождения"
                                                               controlName={'clientBirthLocation'}
                                                               value={''}/>
                                                </Row>


                                                <Row className="kasko-car-select__controls mb_0" gutter={20}>
                                                    <Col span={3}/>
                                                    <Col span={12}>
                                                        <div className="driver-info__caption">Адрес регистрации
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row className="kasko-car-select__controls" gutter={20}>
                                                    <Col span={3}/>
                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder="Индекс"
                                                               controlName={'clientAddressPostCode'}
                                                               value={''}/>
                                                </Row>

                                                <Row className="kasko-car-select__controls " gutter={20}>
                                                    <Col span={3}/>

                                                    <FormInput span={18} onChangeCallback={this.formControlCallback}
                                                               placeholder="Адрес" controlName={'clientAddress'}
                                                               value={''}/>
                                                </Row>

                                                <Row className="kasko-car-select__controls mb_60" gutter={20}>
                                                    <Col span={3}/>

                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder={"Дата регистрации"}
                                                               controlName={'clientAddressRegDate'}
                                                               value={''}/>

                                                    <FormCheckbox span={10} onChangeCallback={this.formControlCallback}
                                                                  text="Фактическое место жительства совпадает с&nbsp;адресом регистрации"
                                                                  value={1}
                                                                  className="checkbox_middle check_v6"
                                                                  controlName={'equalsRealAddress'}
                                                                  checked={this.state.equalsRealAddress}/>
                                                </Row>


                                                <Row className="kasko-car-select__controls mb_0" gutter={20}>
                                                    <Col span={3}/>
                                                    <Col span={18}>
                                                        <div className="driver-info__caption"
                                                        >Статус и тип недвижимости по адресу проживания
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row className="kasko-car-select__controls mb_60" gutter={20}>
                                                    <Col span={3}/>

                                                    <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                                                options={this.state.propertyStatusList}
                                                                placeholder="Статус недвижимости"
                                                                controlName={'propertyStatus'}
                                                                value={this.state.propertyStatus}/>
                                                </Row>


                                                <Row className="kasko-car-select__controls mb_0" gutter={20}>
                                                    <Col span={3}/>
                                                    <Col span={18}>
                                                        <div className="driver-info__caption"
                                                        >Второй документ
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row className="kasko-car-select__controls" gutter={20}>
                                                    <Col span={3}/>

                                                    <FormSelect span={12} onChangeCallback={this.formControlCallback}
                                                                options={this.state.secondDocList}
                                                                placeholder="Тип документа" controlName={'secondDoc'}
                                                                value={this.state.secondDoc}/>
                                                </Row>

                                                <DriverLicense prepend={
                                                    <Row className="kasko-car-select__controls" gutter={20}>
                                                        <Col span={3}/>
                                                        <FormInput span={12} onChangeCallback={this.formControlCallback}
                                                                   placeholder={"Кем выдан"}
                                                                   controlName={'clientSecondDocDepartment'}
                                                                   value={''}/>
                                                    </Row>
                                                }/>


                                                <Row className="kasko-car-select__controls mt_60 mb_0" gutter={20}>
                                                    <Col span={3}/>
                                                    <Col span={18}>
                                                        <div className="driver-info__caption"
                                                        >Профессиональная деятельность клиента
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row className="kasko-car-select__controls" gutter={20}>
                                                    <Col span={3}/>

                                                    <FormSelect span={6} onChangeCallback={this.formControlCallback}
                                                                options={this.state.clientEducationList}
                                                                placeholder="Образование"
                                                                controlName={'clientEducation'}
                                                                value={this.state.clientEducation}/>

                                                    <FormSelect span={12} onChangeCallback={this.formControlCallback}
                                                                options={this.state.clientSocialStatusList}
                                                                placeholder="Социальный статус"
                                                                controlName={'clientSocialStatus'}
                                                                value={this.state.clientSocialStatus}/>
                                                </Row>

                                                <Row className="kasko-car-select__controls" gutter={20}>
                                                    <Col span={3}/>

                                                    <FormInput span={18} onChangeCallback={this.formControlCallback}
                                                               placeholder="Юридическое название места работы"
                                                               controlName={'clientOrganizationLocation'} value={''}/>
                                                </Row>

                                                <Row className="kasko-car-select__controls" gutter={20}>
                                                    <Col span={3}/>

                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder="Телефон офиса"
                                                               controlName={'clientOrganizationPhone'}
                                                               value={''}/>


                                                </Row>

                                                <Row className="kasko-car-select__controls" gutter={20}>
                                                    <Col span={3}/>

                                                    <FormInput span={12} onChangeCallback={this.formControlCallback}
                                                               placeholder="Название должности"
                                                               controlName={'clientPostName'} value={''}/>
                                                </Row>


                                                <Row className="kasko-car-select__controls" gutter={20}>
                                                    <Col span={3}/>

                                                    <FormSelect span={12} onChangeCallback={this.formControlCallback}
                                                                options={this.state.clientSocialStatusList}
                                                                placeholder="Характер должности"
                                                                controlName={'clientPostType'}
                                                                value={this.state.clientPostType}/>
                                                </Row>

                                                <Row className="kasko-car-select__controls" gutter={20}>
                                                    <Col span={3}/>

                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder="Дата начала работы в этой организации"
                                                               controlName={'clientPostStart'} value={''}/>

                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder="Общий трудовой стаж с"
                                                               controlName={'clientPostTotal'} value={''}/>

                                                </Row>


                                                <Row className="kasko-car-select__controls mt_60 mb_0" gutter={20}>
                                                    <Col span={3}/>
                                                    <Col span={18}>
                                                        <div className="driver-info__caption"
                                                        >Доход в месяц
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row className="kasko-car-select__controls" gutter={20}>
                                                    <Col span={3}/>

                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder="Доход по основному месту работы"
                                                               controlName={'clientMainIncome'} value={''}/>

                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder="Дополнительный доход"
                                                               controlName={'clientAdditionalIncome'} value={''}/>

                                                </Row>


                                                <Row className="kasko-car-select__controls mt_60 mb_0" gutter={20}>
                                                    <Col span={3}/>
                                                    <Col span={18}>
                                                        <div className="driver-info__caption"
                                                        >Расходы в месяц
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row className="kasko-car-select__controls" gutter={20}>
                                                    <Col span={3}/>

                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder="Обязательные платежи"
                                                               controlName={'clientObligatoryPayments'} value={''}/>

                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder="Погашение ипотеки"
                                                               controlName={'clientMortgageRepayment '} value={''}/>

                                                    <FormInput span={6} onChangeCallback={this.formControlCallback}
                                                               placeholder="Погашение прочих кредитов "
                                                               controlName={'clientOtherLoans'} value={''}/>

                                                </Row>


                                                <Row className="kasko-car-select__controls mt_60 mb_0" gutter={20}>
                                                    <Col span={3}/>
                                                    <Col span={18}>
                                                        <div className="driver-info__caption"
                                                        >Собственность
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row className="kasko-car-select__controls mt_15 mb_30 ant-row-center"
                                                     gutter={20}>
                                                    <Col span={6}>
                                                        <Button className="driver-info__add gl_link w_100p btn-action"
                                                        >Недвижимость</Button>
                                                    </Col>
                                                </Row>

                                                <Row className="kasko-car-select__controls ant-row-center" gutter={20}>
                                                    <Col span={6}>
                                                        <Button className="driver-info__add gl_link w_100p btn-action"
                                                        >Автомобиль</Button>
                                                    </Col>
                                                </Row>

                                                <Row className="kasko-car-select__controls mt_60 mb_0" gutter={20}>
                                                    <Col span={3}/>
                                                    <Col span={18}>
                                                        <div className="driver-info__caption"
                                                        >Документы клиента
                                                        </div>
                                                    </Col>
                                                </Row>

                                                {clientDocs}

                                            </>

                                            : this.state.anketaProduct === 1 ? <>
                                                <DriverInfo showAddBlock={true} wholeName={true}
                                                            driverInfoUpdate={this.driverInfoCallback}
                                                            expanded={true}
                                                            fullCalculation={true}/>

                                            </>
                                            : this.state.anketaProduct === 2 ? <>
                                                    <Row className="kasko-car-select__controls mt_60 mb_0" gutter={20}>
                                                        <Col span={3}/>
                                                        <Col span={18}>
                                                            <div className="driver-info__caption"
                                                            >КАСКО
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </>
                                                : <>
                                                    <Row className="kasko-car-select__controls mt_60 mb_0" gutter={20}>
                                                        <Col span={3}/>
                                                        <Col span={18}>
                                                            <div className="driver-info__caption"
                                                            >Сервис
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </>

                                    }
                                </>
                                : null
                            }

                        </div>

                        <div className="docs__frame _active">
                            <h1 onClick={this.onToggleTrusted}
                                className={"kasko-main__title" + (this.state.openTrusted ? " expanded" : " collapsed")}>
                                <span>{this.state.anketaProduct ? 'Водители' : 'Доверенные лица'}</span></h1>

                            {this.state.openTrusted ?
                                <div className={"mt_45"}>
                                    <TrustedAnketa driver={!!this.state.anketaProduct}
                                                   removeCallback={this.onRemoveTrastedInfo}
                                                   disabled={true} index={0}
                                                   wholeName={'Ларин Кирилл Олегович'}/>

                                    <TrustedAnketa driver={!!this.state.anketaProduct}
                                                   removeCallback={this.onRemoveTrastedInfo}
                                                   disabled={true} index={0}
                                                   wholeName={'Константинопольский Константин Константинович'}/>

                                    <TrustedAnketa driver={!!this.state.anketaProduct}
                                                   removeCallback={this.onRemoveTrastedInfo}
                                                   disabled={true} index={0}
                                                   wholeName={'Иванова Марина Игоревна'}/>

                                    <TrustedAnketa driver={!!this.state.anketaProduct}
                                                   removeCallback={this.onRemoveTrastedInfo}
                                                   disabled={true} index={0}
                                                   wholeName={'Петров Петр Петрович'}/>

                                    <Row className="kasko-car-select__controls mt_60 mb_30 ant-row-center"
                                         gutter={20}>
                                        <Col span={6}>
                                            <Button className="driver-info__add gl_link w_100p btn-action"
                                            >{this.state.anketaProduct ? 'Водитель' : 'Доверенное лицо'}</Button>
                                        </Col>
                                    </Row>

                                </div>
                                : null
                            }
                        </div>
                    </Col>

                    <Col span={4} className="kasko-aside">
                        <AsideBlock>
                            <KaskoNotices noticeList={[{title: 'Понедельник, 20.02.19', list: []}]}/>
                        </AsideBlock>

                        {this.state.anketaProduct === 0 ?
                            <>
                                <AsideBlock>
                                    <DocsCompleteness docList={[
                                        {
                                            name: 'Личная информация',
                                            check: true
                                        },
                                        {
                                            name: 'Доверенные лица',
                                            check: true
                                        },
                                        {
                                            name: 'Работа',
                                            check: true
                                        },
                                        {
                                            name: 'Финансы и собственность',
                                            check: true
                                        },
                                        {
                                            name: 'Гражданство и статус',
                                            check: true
                                        },
                                        {
                                            name: 'Подписать документы',
                                            check: false
                                        }
                                    ]}/>
                                </AsideBlock>
                                <AsideBlock>
                                    <DocsCompleteness docList={[
                                        {
                                            name: 'Личная информация',
                                            check: true
                                        },
                                        {
                                            name: 'Доверенные лица',
                                            check: true
                                        }
                                    ]}/>
                                </AsideBlock>
                            </>
                            : this.state.anketaProduct === 1 ?
                                <>
                                    <AsideBlock>
                                        <DocsCompleteness docList={[
                                            {
                                                name: 'Личная информация',
                                                check: true
                                            },
                                            {
                                                name: 'Доверенные лица',
                                                check: true
                                            }
                                        ]}/>
                                    </AsideBlock>
                                </> :
                                <>
                                    <AsideBlock>
                                        <DocsCompleteness docList={[
                                            {
                                                name: 'Личная информация',
                                                check: true
                                            },
                                            {
                                                name: 'Доверенные лица',
                                                check: true
                                            }
                                        ]}/>
                                    </AsideBlock>
                                </>
                        }
                    </Col>
                </Row>
            </>
        );
    }
}

export default Docs
