import React from 'react';
import debounce from 'lodash.debounce';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from 'antd';

const DEF_CLASS = 'nav-item';
const DEF_ICON_CLASS = 'nav-item__icon';

const clickHandler = ({ id, fid, name }, onClick) => debounce(() => onClick({ id, fid, name }), 300);
const overHandler = ({ id, fid, name }, onOver) => debounce(() => onOver({ id, fid, name }), 300);
const outHandler = ({ id, fid, name }, onOver) => debounce(() => onOver({ id, fid, name }), 300);
const leaveHandler = ({ id, fid, name }, onOver) => debounce(() => onOver({ id, fid, name }), 300);

const UserItem = ({
	id,
	fid, // family-id for menu group
	name,
	onClick = () => {},
	onMouseOver = () => {},
	onMouseLeave = () => {},
	onMouseOut = () => {},
	classList = [],
	childClassList = [],
	childType = 'icon',
	src,
	active,
    label,
    userName,
	roles = []
}) => {
	let child = null;
	if (childType === 'img') {
		child = <img src={src} alt='' className={cn([DEF_ICON_CLASS, ...childClassList])} />;
	}
	if (childType === 'icon') {
		child = <FontAwesomeIcon icon={src} className={cn([DEF_ICON_CLASS, ...childClassList])} />;
	}

	return (
		<div
			onClick={clickHandler({ id, fid, name }, onClick)}
			onMouseOver={overHandler({ id, fid, name }, onMouseOver)}
			onMouseOut={outHandler({ id, fid, name, type: 'out' }, onMouseOut)}
			onMouseLeave={leaveHandler({ id, fid, name, type: 'leave' }, onMouseLeave)}
			className={cn([DEF_CLASS, ...classList, { active }])}
        >
            <div className="user__label-container">
			<p className='user__user-name'>{userName}</p>
				<span className='user__status'>{roles[0]}
					{/*roles.length > 1 && <Badge
						count={roles.length}
						style={{
							marginLeft:5,
							backgroundColor: 'rgb(205, 38, 38)',
							color: '#fff',
						}}
					/>
					*/}
				</span>                
            </div>
			{child}
		</div>
	);
};

export default UserItem;
