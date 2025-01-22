import { Link } from "react-router-dom";
import { PostList } from "../components/PostList";
import { useAuthStore } from "../stores/useAuthStore";

export function Home() {
	const user = useAuthStore(state => state.user);

	return (
		<div className='mt-10 sm:px-6 lg:px-8'>
			<div className='flex items-center justify-between mb-8'>
				<h1 className='text-3xl font-bold text-gray-900'>Blog Posts</h1>
				{user && (
					<Link to='/posts/new' className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700'>
						New Post
					</Link>
				)}
			</div>
			<PostList />
		</div>
	);
}
