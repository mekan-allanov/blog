import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import { NewPost } from "./pages/NewPost";
import { Register } from "./pages/Register";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/' element={<Home />} />
				<Route path='/new-post' element={<NewPost />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
