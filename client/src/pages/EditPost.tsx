import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostForm } from "../components/PostForm";
import { usePostStore } from "../stores/usePostStore";

export function EditPost() {
	const { id } = useParams<{ id: string }>();
	const post = usePostStore(state => state.posts.find(p => p.id === id));

	if (!post) {
		return <div>Post not found</div>;
	}

	return <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'></div>;
}
