// src/pages/Register.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuthStore } from "../stores/useAuthStore";

const registerSchema = z
	.object({
		name: z.string().min(2, "Name must be at least 2 characters"),
		email: z.string().email("Invalid email address"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

type RegisterForm = z.infer<typeof registerSchema>;

export function Register() {
	const navigate = useNavigate();
	const register = useAuthStore(state => state.register);
	const {
		register: registerField,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterForm>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterForm) => {
		try {
			await register({
				name: data.name,
				email: data.email,
				password: data.password,
			});
			navigate("/");
		} catch (error) {
			console.error("Registration failed:", error);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Create your account</h2>
				</div>
				<form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
					<div className='rounded-md shadow-sm -space-y-px'>
						<div>
							<label htmlFor='name' className='sr-only'>
								Name
							</label>
							<input
								{...registerField("name")}
								type='text'
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Full name'
							/>
							{errors.name && <p className='mt-2 text-sm text-red-600'>{errors.name.message}</p>}
						</div>
						<div>
							<label htmlFor='email' className='sr-only'>
								Email address
							</label>
							<input
								{...registerField("email")}
								type='email'
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Email address'
							/>
							{errors.email && <p className='mt-2 text-sm text-red-600'>{errors.email.message}</p>}
						</div>
						<div>
							<label htmlFor='password' className='sr-only'>
								Password
							</label>
							<input
								{...registerField("password")}
								type='password'
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Password'
							/>
							{errors.password && <p className='mt-2 text-sm text-red-600'>{errors.password.message}</p>}
						</div>
						<div>
							<label htmlFor='confirmPassword' className='sr-only'>
								Confirm Password
							</label>
							<input
								{...registerField("confirmPassword")}
								type='password'
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Confirm password'
							/>
							{errors.confirmPassword && <p className='mt-2 text-sm text-red-600'>{errors.confirmPassword.message}</p>}
						</div>
					</div>

					<div>
						<button
							type='submit'
							disabled={isSubmitting}
							className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'>
							{isSubmitting ? "Creating account..." : "Sign up"}
						</button>
					</div>
				</form>
				<div className='text-center'>
					<Link to='/login' className='text-indigo-600 hover:text-indigo-500'>
						Already have an account? Sign in
					</Link>
				</div>
			</div>
		</div>
	);
}
