import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import BlogCreateForm from "./components/blog-form-component/BlogCreateForm";
import Login from "./components/auth/Login";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/blog-create" element={<BlogCreateForm />} />
			</Routes>
		</Router>
	);
}

export default App;
