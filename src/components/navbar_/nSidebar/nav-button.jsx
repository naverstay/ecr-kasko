import React from 'react';
import cn from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


const DEF_CLASS = 'nav-button';
const DEF_CHILD_CLASS = 'nav-button__child';
const clickHandler = ({id, fid, name}, onClick) => () => onClick({id, fid, name});

const NavButton = ({
                       id,
                       fid, // family-id for menu group 
                       name,
                       onClick = () => {
                       },
                       classList = [],
                       childClassList = [],
                       childType,
                       src,
                       active,
                       children
                   }) => {

    let child = null;
    if (childType === 'img') {
        child = <img
            src={src}
            alt=''
            className={cn([DEF_CHILD_CLASS, ...childClassList])}/>;
    }
    if (childType === 'icon') {
        child = <FontAwesomeIcon
            icon={src}
            className={cn([DEF_CHILD_CLASS, ...childClassList])}/>;
    }

    return (
        <div
            onClick={clickHandler({id, fid, name}, onClick)}
            className={cn([DEF_CLASS, ...classList, {active}])}
        >
            {child || children}
        </div>
    );
}

export default NavButton;
