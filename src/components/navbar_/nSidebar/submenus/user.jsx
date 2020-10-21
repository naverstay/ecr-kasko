import React from 'react';
import {FormattedMessage} from 'react-intl';
import {useSelector} from 'react-redux'
import './user.scss';


const getList = data => data.map(item => <li className="sidenav-user__item">{item}</li>);

const UserLink = props => {
    const {roles, dealers} = useSelector(state => state.user);

    const rolesList = getList(Object.values(roles));
    const dealersList = getList(Object.values(dealers));

    return (
        <div className="sidenav-user--wrapper">
            <div className='sidenav-user'>
                <h5>
                    <FormattedMessage id={'user.profile'}/>
                </h5>
                <h5>
                    <FormattedMessage id={'user.role'}/>
                </h5>
                <ul class="sidenav-user__list">
                    {rolesList}
                </ul>
                <h5>
                    <FormattedMessage id={'user.dealers'}/>
                </h5>
                <ul class="sidenav-user__list">
                    {dealersList}
                </ul>
            </div>
        </div>
    );
};

export default UserLink;
