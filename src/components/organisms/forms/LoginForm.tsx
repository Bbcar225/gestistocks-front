import {Card, Flex} from 'antd';
import {Button, Form, Input} from 'antd';
import {useNavigate} from "react-router-dom";

export default function LoginForm() {
	const [form] = Form.useForm<LoginFormInterface>();
	const navigate = useNavigate()
	
	const onFinish = (values: LoginFormInterface) => {
		console.log('Success:', values);
		return navigate('/123/dashboard')
	};
	
	return <Card
		className="w-[100%]"
	>
		<Form
			form={form}
			initialValues={{
				email: 'boubacarly93@gmail.com',
				password: '123'
		}}
			onFinish={onFinish}
			autoComplete="off"
			layout='vertical'
		>
			<Form.Item
				label="Adresse email"
				name="email"
				rules={[{required: true}]}
			>
				<Input type='email'/>
			</Form.Item>
			
			<Form.Item
				label="Mot de passe"
				name="password"
				rules={[{required: true}]}
			>
				<Input.Password/>
			</Form.Item>
			
			<Flex justify='center'>
				<Button type="primary" htmlType="submit" className='w-1/2'>
					Connexion
				</Button>
			</Flex>
		</Form>
	</Card>
}