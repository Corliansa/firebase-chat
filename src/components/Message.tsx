import userStore from "../firebase";
import { toSvg } from "jdenticon";

function App({ data }: any) {
	const user: any = userStore((state) => state.user);
	const date = new Date(data?.date?.seconds * 1000);
	const today = new Date();
	const isToday = date.getDate() === today.getDate();
	const isYesterday = date.getDate() === today.getDate() - 1;
	const isSameYear = date.getFullYear() === today.getFullYear();
	const options: any = { hour: "numeric", minute: "numeric" };
	!isToday &&
		!isYesterday &&
		isSameYear &&
		Object.assign(options, {
			...options,
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	const isCurrentUser = user?.uid === data?.uid;
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				alignSelf: isCurrentUser ? "flex-end" : "flex-start",
				flexDirection: isCurrentUser ? "row-reverse" : "row",
			}}
		>
			<div
				style={{
					backgroundColor: "#222",
					borderRadius: 24,
					width: 30,
					height: 30,
					padding: 4,
					margin: 4,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
				dangerouslySetInnerHTML={{ __html: toSvg(data.uid, 24) }}
			/>
			<div
				style={{
					backgroundColor: isCurrentUser ? "#333" : "#333",
					padding: 8,
					borderRadius: 6,
					margin: 4,
					display: "flex",
					flexDirection: "column",
				}}
			>
				<p style={{ textAlign: isCurrentUser ? "right" : "left" }}>
					{data.text}
				</p>
				<p
					style={{
						fontSize: 10,
						textAlign: isCurrentUser ? "right" : "left",
						paddingLeft: 6,
						color: "#aaa",
					}}
				>
					{isYesterday && "Yesterday"}{" "}
					{data?.date?.seconds ? date.toLocaleString("en-UK", options) : ""}
				</p>
			</div>
		</div>
	);
}

export default App;
