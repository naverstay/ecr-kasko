import React from 'react';
import debounce from 'lodash.debounce';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DEF_CLASS = 'nav-item';
const DEF_ICON_CLASS = 'nav-item__icon';
const DEF_LABEL_CLASS= 'nav-item__label'
const clickHandler = ({ id, fid, name }, onClick) => debounce(() => onClick({ id, fid, name }), 0);
const overHandler = ({ id, fid, name }, onOver) => debounce(() => onOver({ id, fid, name }), 0);
const outHandler = ({ id, fid, name }, onOver) => debounce(() => onOver({ id, fid, name }), 0);
const leaveHandler = ({ id, fid, name }, onOver) => debounce(() => onOver({ id, fid, name }), 0);

const NavButton = ({
	id,
	fid, // family-id for menu group
	name,
    onClick = () => { },
    onMouseOver = () => { },
    onMouseLeave = () => { },
    onMouseOut = () => { },
	classList = [],
	childClassList = [],
	childType = 'icon',
	src,
	active,
	label,
	children,
}) => {	
	let child = null;
	if (childType === 'img') {
		child = <img src={src} alt='' className={cn([DEF_ICON_CLASS, ...childClassList])} />;
	}
	if (childType === 'icon') {
		child = <FontAwesomeIcon icon={src} className={cn([DEF_ICON_CLASS, ...childClassList])} />;
	}

	const labelEl = !!label ? <span className={DEF_LABEL_CLASS}>{label}</span> : null;

	return (
		<div
			onClick={clickHandler({ id, fid, name }, onClick)}
			onMouseOver={overHandler({ id, fid, name }, onMouseOver)}
			onMouseOut={outHandler({ id, fid, name, type: 'out' }, onMouseOut)}
			onMouseLeave={leaveHandler({ id, fid, name, type: 'leave' }, onMouseLeave)}
			className={cn([DEF_CLASS, ...classList, { active }])}
		>
			{labelEl}
			{child || children}
		</div>
	);
};

export default NavButton;
