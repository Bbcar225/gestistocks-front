import LoginForm from "../organisms/forms/LoginForm.tsx";

export default function HomePage() {
	return <div
		className='w-screen h-screen flex justify-center bg-gray-300'
	>
		<div
			className='content-center w-2/6'
		>
			<LoginForm/>
		</div>
	</div>
}