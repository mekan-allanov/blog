// src/pages/Home.tsx
import { Link } from "react-router-dom";
import { PostList } from "../components/PostList";
import { useAuthStore } from "../stores/useAuthStore";

export function Home() {
	const user = useAuthStore(state => state.user);

	return (
		<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			<div className='flex justify-between items-center mb-8'>
				<h1 className='text-3xl font-bold text-gray-900'>Blog Posts</h1>
				{user && (
					<Link to='/posts/new' className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700'>
						New Post
					</Link>
				)}
			</div>
			<PostList />
		</div>
	);
}
