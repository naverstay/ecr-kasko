import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

//let TableCell = props => {
//	TableCell.propTypes = {
//		classList: PropTypes.array,
//		children: PropTypes.node,
//		sortable: PropTypes.bool,
//		onMouseEnter: PropTypes.func,
//		onMouseLeave: PropTypes.func,
//		onClick: PropTypes.func
//	};
//
//	const {
//		classList,
//		children,
//		sortable,
//		onMouseEnter,
//		onMouseLeave,
//		onClick
//	} = props;
//
//	const className = cn([
//		...classList,
//		(sortable ? '_sortable' : '')
//	]);
//
//	return (
//		<div className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
//			{children}
//		</div>
//	);
//};
//
//export default TableCell;

class TableCell extends Component {
    static propTypes = {
        classList: PropTypes.array,
        children: PropTypes.node,
        sortable: PropTypes.bool,
        toggleInfoHandle: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onClick: PropTypes.func
    };

    render() {
        let {
            classList,
            children,
            sortable,
            toggleInfoRow,
            toggleInfoHandle,
            onMouseEnter,
            onMouseLeave,
            onClick
        } = this.props;

        if (toggleInfoRow) {
            onClick = this.props.toggleInfoHandle
        }

        const className = cn([
            ...(classList ? classList : []),
            (sortable ? '_sortable' : '')
        ]);

        return (
            <div className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
                {children}
            </div>
        )
    }
};

export default TableCell;

