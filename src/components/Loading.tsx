import loadingImage from "../loading.png";

function App() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#111",
				height: "100%",
			}}
		>
			<img src={loadingImage} alt="loading" />
		</div>
	);
}

export default App;
