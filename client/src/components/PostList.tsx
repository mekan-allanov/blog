// src/components/PostList.tsx
import { useEffect } from "react";
import { usePostStore } from "../stores/usePostStore";
import { useAuthStore } from "../stores/useAuthStore";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

export function PostList() {
	const { posts, isLoading, error, fetchPosts, deletePost } = usePostStore();
	const currentUser = useAuthStore(state => state.user);

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-64'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600'></div>
			</div>
		);
	}

	if (error) {
		return <div className='text-center text-red-600 p-4'>{error}</div>;
	}

	if (!posts.length) {
		return <div className='text-center text-gray-500 p-4'>No posts yet. Be the first to create one!</div>;
	}

	return (
		<div className='space-y-6'>
			{posts.map(post => (
				<article key={post.id} className='bg-white shadow rounded-lg p-6'>
					<div className='flex justify-between items-start'>
						<div>
							<h2 className='text-xl font-semibold text-gray-900'>
								<Link to={`/posts/${post.id}`} className='hover:text-indigo-600'>
									{post.title}
								</Link>
							</h2>
							<div className='mt-1 text-sm text-gray-500'>
								Posted by {post.author.name} • {formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}
							</div>
						</div>
						{currentUser?.id === post.author.id && (
							<div className='flex space-x-2'>
								<Link to={`/posts/${post.id}/edit`} className='text-sm text-indigo-600 hover:text-indigo-500'>
									Edit
								</Link>
								<button onClick={() => deletePost(post.id)} className='text-sm text-red-600 hover:text-red-500'>
									Delete
								</button>
							</div>
						)}
					</div>
					<div className='mt-4 text-gray-700'>{post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}</div>
					{post.content.length > 200 && (
						<Link to={`/posts/${post.id}`} className='mt-2 inline-block text-indigo-600 hover:text-indigo-500'>
							Read more
						</Link>
					)}
				</article>
			))}
		</div>
	);
}
