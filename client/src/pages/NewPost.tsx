import { PostForm } from "../components/PostForm";

export function NewPost() {
	return (
		<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			<h1 className='text-3xl font-bold text-gray-900 mb-8'>Create New Post</h1>
			<PostForm />
		</div>
	);
}
