import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Loading from "./components/Loading";
import userStore from "./firebase";

function App() {
	const [user, loading]: any = userStore((state) => [
		state.user,
		state.loading,
	]);

	return (
		<div className="App">
			{loading ? <Loading /> : user ? <Home /> : <Login />}
		</div>
	);
}

export default App;
