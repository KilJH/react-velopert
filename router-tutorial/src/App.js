import About from './About';
import Home from './Home';
import { Route, Link, Switch } from 'react-router-dom';
import Profiles from './Profiles';
import HistorySample from './HistorySample';

function App() {
	return (
		<div className='App'>
			<ul>
				<li>
					<Link to='/'>홈</Link>
				</li>
				<li>
					<Link to='/about'>소개</Link>
				</li>
				<li>
					<Link to='/profiles'>프로필 목록</Link>
				</li>
				<li>
					<Link to='/history'>예제</Link>
				</li>
			</ul>
			<hr />
			<Switch>
				<Route path='/' component={Home} exact />
				<Route path='/about' component={About} />
				<Route path='/profiles' component={Profiles} />
				<Route path='/history' component={HistorySample} />
				<Route
					render={({ location }) => (
						<div>
							<h2>존재하지 않는 페이지입니다.</h2>
							<p>{location.pathname}</p>
						</div>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
