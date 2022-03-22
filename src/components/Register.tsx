import userStore from "../firebase";
import { TextField, Button } from "@mui/material";
import { useRef, useState } from "react";

function App() {
	const register: any = userStore((state) => state.register);
	const setLoading: any = userStore((state) => state.setLoading);

	const [error, setError] = useState("");
	const userRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);
	const confRef = useRef<HTMLInputElement>(null);

	const signUp = () => {
		setError("");
		setLoading(1);
		if (passRef.current?.value !== confRef.current?.value) {
			setError("Passwords do not match");
			return;
		}
		if (
			userRef.current?.value &&
			passRef.current?.value &&
			confRef.current?.value
		) {
			register(userRef.current?.value, passRef.current?.value)
				.catch((error: any) => setError(error?.code))
				.then(() => setLoading(0));
		} else {
			setError("Please fill out all fields");
		}
	};

	return (
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
			<h1>Sign up</h1>
			<hr />
			<p>{error.replace("auth/", "").replace(/-/g, " ")}</p>
			<br />
			<TextField label="Email" type="email" inputRef={userRef} />
			<hr />
			<TextField label="Password" type="password" inputRef={passRef} />
			<hr />
			<TextField
				label="Confirm password"
				type="password"
				inputRef={confRef}
				onKeyDown={(e) => {
					if (e.key === "Enter") signUp();
				}}
			/>
			<br />
			<Button variant="outlined" onClick={() => signUp()}>
				Submit
			</Button>
		</div>
	);
}

export default App;
