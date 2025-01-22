import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className='bg-blue-500 text-white p-4'>
			<Link to='/' className='p-2'>
				Home
			</Link>
			<Link to='/new-post' className='p-2'>
				New Post
			</Link>
		</nav>
	);
};

export default Navbar;
