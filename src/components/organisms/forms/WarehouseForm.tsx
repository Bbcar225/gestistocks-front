import {Button, Col, Flex, Form, Input, notification, Row} from "antd";
import {useEffect} from "react";
import {successCreate, successUpdate} from "../../../constants/messagesConstant.ts";
import {useWarehouseCreate, useWarehouseUpdate} from "../../../hooks/Api/tenant/WarehouseHookAPI.ts";
import {useWarehouseStore} from "../../../store/useWarehouseStore.ts";
import {config} from "../../../constants/notifcationConstant.ts";

export default function WarehouseForm({onSuccess, ...props}: { onSuccess?: () => void; }) {
	const [form] = Form.useForm();
	const reqWarehouseCreate = useWarehouseCreate()
	const [api, contextHolder] = notification.useNotification(config);
	const {warehouse} = useWarehouseStore()
	const reqWarehouseUpdate = useWarehouseUpdate(Number(warehouse?.id))
	
	const handleFinish = (values: WarehouseFormDataInterface) => {
		if (warehouse) {
			return reqWarehouseUpdate.mutate(values)
		}
		
		return reqWarehouseCreate.mutate(values)
	}
	
	useEffect(() => {
		if (reqWarehouseCreate.isSuccess) {
			const res = reqWarehouseCreate.data
			
			api.success({
				message: res.message,
				description: successCreate
			})
			
			form.resetFields()
			
			onSuccess?.()
		}
	}, [api, form, reqWarehouseCreate.data, reqWarehouseCreate.isSuccess]);
	
	useEffect(() => {
		if (reqWarehouseUpdate.isSuccess) {
			const res = reqWarehouseUpdate.data
			
			api.success({
				message: res.message,
				description: successUpdate
			})
			
			onSuccess?.()
		}
	}, [api, form, reqWarehouseUpdate.data, reqWarehouseUpdate.isSuccess]);
	
	useEffect(() => {
		if (warehouse) {
			form.setFieldsValue({
				name: warehouse.name,
				location: warehouse.location
			})
		} else {
			form.resetFields()
		}
	}, [form, warehouse]);
	
	return <Form
		form={form}
		layout="vertical"
		onFinish={handleFinish}
		disabled={reqWarehouseCreate.isLoading || reqWarehouseUpdate.isLoading}
		{...props}
	>
		<Row>
			<Col span={24}>
				<Form.Item<WarehouseFormDataInterface>
					label="Nom"
					name="name"
					rules={[{required: true}]}
				>
					<Input/>
				</Form.Item>
			</Col>
			
			<Col span={24}>
				<Form.Item<WarehouseFormDataInterface>
					label="Localisation"
					name="location"
					rules={[{required: true}]}
				>
					<Input.TextArea
					/>
				</Form.Item>
			</Col>
			
			<Flex justify='center' className='w-screen'>
				<Button
					type="primary"
					htmlType="submit"
					className='w-1/2'
					loading={reqWarehouseCreate.isLoading || reqWarehouseUpdate.isLoading}
				>
					Valider
				</Button>
			</Flex>
		</Row>
		{contextHolder}
	</Form>
}