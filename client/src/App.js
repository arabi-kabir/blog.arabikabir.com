import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./components/auth/Login";
import PostCreate from "./pages/post/PostCreate";
import PostView from "./pages/post/PostView";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/post-create" element={<PostCreate />} />
				<Route path="/post/:id" element={<PostView />} />
			</Routes>
		</Router>
	);
}

export default App;
