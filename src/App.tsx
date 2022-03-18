import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import userStore from "./firebase";

function App() {
	const [user, loading]: any = userStore((state) => [
		state.user,
		state.loading,
	]);

	return (
		<div className="App">{loading ? null : user ? <Home /> : <Login />}</div>
	);
}

export default App;
