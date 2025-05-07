import {Card, Flex, notification} from 'antd';
import {Button, Form, Input} from 'antd';
import {useNavigate} from "react-router-dom";
import {useAuthTenantService} from "../../../hooks/Api/tenant/AuthHookAPI.ts";
import {useEffect} from "react";
import {useTokenStore, useUserStore} from "../../../store/useUserStore.ts";
import {useRoutesIndex} from "../../../routes";

export default function LoginForm() {
	const [form] = Form.useForm<LoginFormDataInterface>();
	const navigate = useNavigate()
	const reqAuthTenantService = useAuthTenantService()
	const {setUser, user} = useUserStore()
	const {setToken} = useTokenStore()
	const {goToDashboard} = useRoutesIndex()
	
	const onFinish = (values: LoginFormDataInterface) => {
		return reqAuthTenantService.mutate(values)
	};
	
	useEffect(() => {
		if (reqAuthTenantService.status === 'success') {
			const {data} = reqAuthTenantService.data
			setUser(data.user)
			setToken(data.access_token)
		}
		
		if (reqAuthTenantService.status === 'error') {
			notification.error({
				message: "Échec de connexion"
			})
		}
	}, [navigate, reqAuthTenantService.data, reqAuthTenantService.status, setToken, setUser]);
	
	useEffect(() => {
		if (user) {
			return goToDashboard()
		}
	}, [goToDashboard, user]);
	
	return <Card
		className="w-[100%]"
	>
		<Form
			form={form}
			onFinish={onFinish}
			autoComplete="off"
			layout='vertical'
			initialValues={{
				email: "tenant1@example.com",
				password: "password"
			}}
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
				<Button
					type="primary"
					htmlType="submit"
					className='w-1/2'
					loading={reqAuthTenantService.isLoading}
				>
					Connexion
				</Button>
			</Flex>
		</Form>
	</Card>
}