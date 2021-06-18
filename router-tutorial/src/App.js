import About from './About';
import './App.css';
import Home from './Home';
import { Route, Link } from 'react-router-dom';

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
		</div>
	);
}

export default App;
