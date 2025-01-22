import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NewPost } from "./pages/NewPost";
import { Register } from "./pages/Register";

function App() {
	return (
		<BrowserRouter>
			<div className='flex flex-col max-w-4xl min-h-screen px-4 py-8 mx-auto sm:px-6 lg:px-8'>
				<Navbar />
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/' element={<Home />} />
					<Route path='/new-post' element={<NewPost />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
