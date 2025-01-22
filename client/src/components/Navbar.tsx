import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className='p-4 text-white bg-blue-500'>
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
