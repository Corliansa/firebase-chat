import userStore from "../firebase";
import { Button, TextField } from "@mui/material";
import {
	getFirestore,
	collection,
	orderBy,
	onSnapshot,
	query,
	limit,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";

function App() {
	const [user, logout]: any = userStore((state) => [state.user, state.logout]);
	const db = getFirestore();
	const [chats, setChats] = useState([]);
	const end: any = useRef(null);

	useEffect(() => {
		const unsubscribe: any = [];
		if (user) {
			const q = query(
				collection(db, "chats"),
				orderBy("date", "desc"),
				limit(25)
			);
			unsubscribe.push(
				onSnapshot(q, (snapshot) => {
					const chats: any = snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));
					setChats(chats);
				})
			);
		}
		return unsubscribe.map((sub: any) => sub);
	}, []);

	const inputRef = useRef<HTMLInputElement>(null);
	const send = () => {
		if (!user) return;
		if (inputRef.current?.value) {
			addDoc(collection(db, "chats"), {
				text: inputRef.current?.value,
				uid: user.uid,
				date: serverTimestamp(),
			})
				.then(() => {
					inputRef.current!.value = "";
					end.current!.scrollIntoView({ behavior: "smooth" });
				})
				.catch((error: any) => {
					console.error(error);
				});
		}
	};

	return (
		<div
			style={{
				backgroundColor: "darkgrey",
				color: "#fff",
				height: "100vh",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					padding: 10,
					backgroundColor: "#000",
				}}
			>
				<h2>Welcome, {user?.email}</h2>
				<Button disabled={!user} onClick={() => logout()}>
					Logout
				</Button>
			</div>
			<div
				style={{
					flex: 1,
					overflowY: "scroll",
					display: "flex",
					flexDirection: "column-reverse",
					backgroundColor: "#111",
					padding: 10,
				}}
			>
				<span ref={end} />
				{chats.map((chat: any) => (
					<Message key={chat.id} data={chat} />
				))}
			</div>
			<div
				style={{
					display: "flex",
					padding: 10,
					backgroundColor: "#000",
				}}
			>
				<TextField
					inputRef={inputRef}
					label="Enter a message..."
					variant="outlined"
					style={{
						width: "100%",
						paddingRight: 8,
					}}
					inputProps={{
						style: { color: "white", backgroundColor: "#222", borderRadius: 4 },
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							send();
						}
					}}
				/>
				<Button onClick={send} variant="outlined">
					Send
				</Button>
			</div>
		</div>
	);
}

export default App;
