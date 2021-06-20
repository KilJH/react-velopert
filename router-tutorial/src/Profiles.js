import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import Profile from './Profile';
import WithRouterSample from './WithRouterSample';
import RouterHookSample from './RouterHookSample';

function Profiles() {
	return (
		<div>
			<h3>유저 목록</h3>
			<ul>
				<li>
					<NavLink
						to='/profiles/velopert'
						activeStyle={{ background: 'black', color: 'white' }}
					>
						velopert
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/profiles/zknock'
						activeStyle={{ background: 'black', color: 'white' }}
					>
						zknock
					</NavLink>
				</li>
			</ul>

			<Route
				path='/profiles'
				exact
				render={() => <div>유저를 선택해주세요.</div>}
			/>
			<Route path='/profiles/:username' component={Profile} />
			<WithRouterSample />
			<RouterHookSample />
		</div>
	);
}

export default Profiles;
