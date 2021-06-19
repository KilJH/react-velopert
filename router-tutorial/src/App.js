import About from './About';
import Home from './Home';
import { Route, Link } from 'react-router-dom';
import Profile from './Profile';

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
			</ul>
			<hr />
			<Route path='/' component={Home} exact />
			<Route path='/about' component={About} />
			<Route path='/profiles/:username' component={Profile} />
		</div>
	);
}

export default App;
