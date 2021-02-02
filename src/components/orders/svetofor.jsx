import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './svetofor.scss';
import {Tooltip} from "antd";

class Svetofor extends Component {
    static propTypes = {
        classList: PropTypes.array,
        data: PropTypes.array
    }

    render() {
        const {
            classList,
            data
        } = this.props;

        const className = cn([
            'svetofor-wrapper',
            ...(classList ? classList : [])
        ]);

        return (
            <div className={className}>
                {data.length ?
                    <>
                        {
                            data.map((s, i) => {
                                let cls = cn(['svetofor-item', s.className])

                                let status = s.className ? s.className.replace('svetofor-item', '') : ''

                                let tooltipClassName = cn([
                                    'tooltip_v2',
                                    'tooltip__state' + status
                                ]);

                                return (
                                    s.tooltipWide ?
                                        <div key={i} className="orders-table__tooltip-holder">
                                            <span className={cls}>{s.value || ''}</span>
                                            <div className="orders-table__tooltip orders-table__tooltip--top">
                                                <ul className="orders-table__tooltip-list">
                                                    <li>
                                                        <div
                                                            className={"orders-table__state orders-table__state" + status}>{s.tooltipTitle}</div>
                                                        {s.tooltipList.map((l, i) => <div key={i}
                                                                                          className="orders-table__tooltip-item">{l}</div>
                                                        )}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        : s.tooltipShort ?
                                        <Tooltip key={i} overlayClassName={tooltipClassName} placement="top"
                                                 title={s.tooltipTitle}>
                                            <span className={cls}>{s.value || ''}</span>
                                        </Tooltip>
                                        : <span key={i} className={cls}>{s.value || ''}</span>
                                )
                            })}
                    </>
                    :
                    <>
                        {
                            <Tooltip key={1} overlayClassName={'tooltip_v2 tooltip__state--white'} placement="top"
                                     title={'Не предлагалось'}>
                                <span className={'svetofor-item'}>{''}</span>
                            </Tooltip>
                        }
                    </>
                }
            </div>
        )
    }
}

export default Svetofor;
