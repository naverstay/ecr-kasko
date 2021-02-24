import React, {Component} from "react";
import {Col, Row, Upload, message} from "antd";
import './style.scss';
import PropTypes from "prop-types";

const {Dragger} = Upload;

class PolicyUpload extends Component {
    static propTypes = {
        children: PropTypes.node,
        allFields: PropTypes.bool,
        innerWidth: PropTypes.number
    };

    render() {
        const {kasko, osago} = this.props

        const uploadProps = {
            name: 'file',
            multiple: true,
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange(info) {
                const {status} = info.file;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            }
        };

        return (
            <div className="client-questionnaire">
                <Row gutter={20}>
                    <Col span={3}/>
                    <Col span={9}>
                        <Dragger className="client-questionnaire__upload small__" {...uploadProps}>
                            <div className="client-questionnaire__upload--icon"/>
                            <div className="client-questionnaire__upload--info">
                                <div className="client-questionnaire__upload--text"
                                >Выберите документ <br/> или перетяните его сюда
                                </div>
                                {/*<div className="client-questionnaire__upload--hint">*/}
                                {/*	Принимаются файлы в форматах <br/>*/}
                                {/*	png, jpg, pdf не тяжелее 10 Мб*/}
                                {/*</div>*/}
                            </div>
                        </Dragger>
                    </Col>
                    <Col span={9}>
                        <ul className="client-questionnaire__faq">
                            {kasko ?
                                <>
                                    <li className="client-questionnaire__faq--item">
                                        <div className="client-questionnaire__faq--title">Полис е-КАСКО</div>
                                        <p>Требуется скан полиса с двух сторон</p>
                                    </li>
                                    <li className="client-questionnaire__faq--item">
                                        <div className="client-questionnaire__faq--title">Счет на оплату е-КАСКО</div>
                                        <p>Требуется скан полиса с двух сторон</p>
                                    </li>
                                </>
                                : null
                            }

                            {osago ?
                                <li className="client-questionnaire__faq--item">
                                    <div className="client-questionnaire__faq--title">Полис е-ОСАГО</div>
                                    <p>Требуется скан полиса с двух сторон</p>
                                </li>
                                : null
                            }
                        </ul>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PolicyUpload;
