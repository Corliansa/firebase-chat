import userStore from "../firebase";
import { TextField, Button } from "@mui/material";
import { useRef, useState } from "react";
import Register from "./Register";

function App() {
	const login: any = userStore((state) => state.login);

	const [error, setError] = useState("");
	const userRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);

	const [page, setPage] = useState(true);

	const logIn = () => {
		setError("");
		if (userRef.current?.value && passRef.current?.value) {
			login(userRef.current?.value, passRef.current?.value).catch(
				(error: any) => setError(error?.code)
			);
		} else {
			setError("Please fill out all fields");
		}
	};

	return page ? (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "lightgrey",
				height: "100%",
			}}
		>
			<h1>Login</h1>
			<hr />
			<p>{error.replace("auth/", "").replace(/-/g, " ")}</p>
			<br />
			<TextField label="Email" type="email" inputRef={userRef} />
			<hr />
			<TextField
				label="Password"
				type="password"
				inputRef={passRef}
				onKeyDown={(e) => {
					if (e.key === "Enter") logIn();
				}}
			/>
			<br />
			<Button variant="outlined" onClick={() => logIn()}>
				Login
			</Button>
			<hr />
			<Button onClick={() => setPage((page) => !page)}>No account?</Button>
		</div>
	) : (
		<Register />
	);
}

export default App;
