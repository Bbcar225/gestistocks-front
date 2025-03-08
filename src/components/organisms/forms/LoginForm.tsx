import {Card, FormProps} from 'antd';
import {Button, Checkbox, Form, Input} from 'antd';

type FieldType = {
	username?: string;
	password?: string;
	remember?: string;
};

export default function LoginForm() {
	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		console.log('Success:', values);
	};
	
	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	
	return <Card
		className="w-[100%]"
	>
		<Form
			initialValues={{remember: true}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			layout='vertical'
		>
			<Form.Item<FieldType>
				label="Username"
				name="username"
				rules={[{required: true, message: 'Please input your username!'}]}
			>
				<Input/>
			</Form.Item>
			
			<Form.Item<FieldType>
				label="Password"
				name="password"
				rules={[{required: true, message: 'Please input your password!'}]}
			>
				<Input.Password/>
			</Form.Item>
			
			<Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
				<Checkbox>Remember me</Checkbox>
			</Form.Item>
			
			<Form.Item label={null}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	</Card>
}