import LoginForm from "../organisms/Forms/LoginForm.tsx";

export default function HomePage() {
	return <div
		className='w-screen h-screen flex justify-center bg-gray-300'
	>
		<div
			className='content-center w-5/6 md:w-2/6'
		>
			<LoginForm/>
		</div>
	</div>
}