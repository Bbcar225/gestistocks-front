import {Button, Col, Flex, Form, Input, notification, Row} from "antd";
import {useUnitCreate, useUnitUpdate} from "../../../hooks/Api/tenant/UnitHookAPI.ts";
import {useEffect} from "react";
import {successCreate, successUpdate} from "../../../constants/messages.ts";
import {useUnitStore} from "../../../store/useUnitStore.ts";

export default function UnitForm({onSuccess, ...props}: { onSuccess?: () => void; }) {
	const [form] = Form.useForm();
	const reqUnitCreate = useUnitCreate()
	const [api, contextHolder] = notification.useNotification();
	const {unit} = useUnitStore()
	const reqUnitUpdate = useUnitUpdate(Number(unit?.id))
	
	const handleFinish = (values: UnitFormDataInterface) => {
		if (unit) {
			return reqUnitUpdate.mutate(values)
		}
		
		return reqUnitCreate.mutate(values)
	}
	
	useEffect(() => {
		if (reqUnitCreate.isSuccess) {
			const res = reqUnitCreate.data
			
			api.success({
				message: res.message,
				description: successCreate
			})
			form.resetFields()
			
			onSuccess?.()
		}
	}, [api, form, reqUnitCreate.data, reqUnitCreate.isSuccess]);
	
	useEffect(() => {
		if (reqUnitUpdate.isSuccess) {
			const res = reqUnitUpdate.data
			
			api.success({
				message: res.message,
				description: successUpdate
			})
			
			onSuccess?.()
		}
	}, [api, form, reqUnitUpdate.data, reqUnitUpdate.isSuccess]);
	
	useEffect(() => {
		if (unit) {
			form.setFieldsValue({
				name: unit.name,
				sort_name: unit.sort_name
			})
		} else {
			form.resetFields()
		}
	}, [form, unit]);
	
	return <Form
		form={form}
		layout="vertical"
		onFinish={handleFinish}
		disabled={reqUnitCreate.isLoading || reqUnitUpdate.isLoading}
		noValidate
		{...props}
	>
		<Row>
			<Col span={24}>
				<Form.Item<UnitFormDataInterface>
					label="Nom"
					name="name"
					rules={[{required: true}]}
				>
					<Input/>
				</Form.Item>
			</Col>
			
			<Col span={24}>
				<Form.Item<UnitFormDataInterface>
					label="Nom court"
					name="sort_name"
					rules={[{required: true}]}
				>
					<Input/>
				</Form.Item>
			</Col>
			
			<Flex justify='center' className='w-screen'>
				<Button
					type="primary"
					htmlType="submit"
					className='w-1/2'
					loading={reqUnitCreate.isLoading || reqUnitUpdate.isLoading}
				>
					Valider
				</Button>
			</Flex>
		</Row>
		{contextHolder}
	</Form>
}