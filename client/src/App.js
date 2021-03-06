import React, { Fragment, useEffect } from "react";
import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Routes from "./components/Routing/Routes";

//redux
import { Provider } from "react-redux";
import store from "./store/store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./store/actions/Auth";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}
const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route component={Routes} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
