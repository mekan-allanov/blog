// src/components/PostForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Post } from "../lib";
import { usePostStore } from "../stores/usePostStore";

const postSchema = z.object({
	title: z.string().min(1, "Title is required").max(100, "Title is too long"),
	content: z.string().min(1, "Content is required"),
});

type PostForm = z.infer<typeof postSchema>;

interface PostFormProps {
	post?: Post;
	isEditing?: boolean;
}

export function PostForm({ post, isEditing }: PostFormProps) {
	const navigate = useNavigate();
	const { createPost, updatePost } = usePostStore();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<PostForm>({
		resolver: zodResolver(postSchema),
		defaultValues: {
			title: post?.title || "",
			content: post?.content || "",
		},
	});

	const onSubmit = async (data: PostForm) => {
		try {
			if (isEditing && post) {
				await updatePost(post.id, data);
			} else {
				await createPost(data);
			}
			navigate("/");
		} catch (error) {
			console.error("Failed to save post:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			<div>
				<label htmlFor='title' className='block text-sm font-medium text-gray-700'>
					Title
				</label>
				<input
					type='text'
					{...register("title")}
					className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
					placeholder='Enter post title'
				/>
				{errors.title && <p className='mt-2 text-sm text-red-600'>{errors.title.message}</p>}
			</div>

			<div>
				<label htmlFor='content' className='block text-sm font-medium text-gray-700'>
					Content
				</label>
				<textarea
					{...register("content")}
					rows={8}
					className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
					placeholder='Write your post content here...'
				/>
				{errors.content && <p className='mt-2 text-sm text-red-600'>{errors.content.message}</p>}
			</div>

			<div className='flex justify-end'>
				<button type='button' onClick={() => navigate("/")} className='mr-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50'>
					Cancel
				</button>
				<button
					type='submit'
					disabled={isSubmitting}
					className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'>
					{isSubmitting ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
				</button>
			</div>
		</form>
	);
}
