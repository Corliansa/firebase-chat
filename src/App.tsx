import userStore from "./firebase";
import "./App.css";
import { TextField, Button } from "@mui/material";
import { useRef, useState } from "react";

function App() {
	const [user, login, logout, register]: any = userStore((state) => [
		state.user,
		state.login,
		state.logout,
		state.register,
	]);

	const [error, setError] = useState("");
	const userRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);

	return (
		<div className="App">
			<h1>Hello!</h1>
			{user && (
				<div>
					<h2>Welcome, {user?.email}</h2>
					<Button disabled={!user} onClick={() => logout()}>
						Logout
					</Button>
				</div>
			)}
			<p>{error}</p>
			{!user && (
				<div>
					<TextField label="Email" type="email" inputRef={userRef} />
					<br />
					<TextField label="Password" type="password" inputRef={passRef} />
					<div>
						<Button
							onClick={() => {
								setError("");
								login(userRef.current?.value, passRef.current?.value).catch(
									(error: any) => setError(error?.code)
								);
							}}
						>
							Login
						</Button>
						<Button
							onClick={() => {
								setError("");
								register(userRef.current?.value, passRef.current?.value).catch(
									(error: any) => setError(error?.code)
								);
							}}
						>
							Register
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
