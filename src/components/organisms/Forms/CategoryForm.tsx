import {Button, Col, Flex, Form, Input, notification, Row} from "antd";
import {useEffect} from "react";
import {successCreate, successUpdate} from "../../../constants/textsConstant.ts";
import {useCategoryCreate, useCategoryUpdate} from "../../../hooks/Api/tenant/CategoryHookAPI.ts";
import {useCategoryStore} from "../../../store/useCategoryStore.ts";

export default function CategoryForm({onSuccess, ...props}: { onSuccess?: () => void; }) {
	const [form] = Form.useForm();
	const [api, contextHolder] = notification.useNotification();
	const {category} = useCategoryStore()
	const reqCategoryCreate = useCategoryCreate()
	const reqCategoryUpdate = useCategoryUpdate(Number(category?.id))
	
	const handleFinish = (values: CategoryFormDataInterface) => {
		if (category) {
			return reqCategoryUpdate.mutate(values)
		}
		
		return reqCategoryCreate.mutate(values)
	}
	
	useEffect(() => {
		if (reqCategoryCreate.isSuccess) {
			const res = reqCategoryCreate.data
			
			api.success({
				message: res.message,
				description: successCreate
			})
			form.resetFields()
			
			onSuccess?.()
		}
	}, [api, form, reqCategoryCreate.data, reqCategoryCreate.isSuccess]);
	
	useEffect(() => {
		if (reqCategoryUpdate.isSuccess) {
			const res = reqCategoryUpdate.data
			
			api.success({
				message: res.message,
				description: successUpdate
			})
			
			onSuccess?.()
		}
	}, [api, form, reqCategoryUpdate.data, reqCategoryUpdate.isSuccess]);
	
	useEffect(() => {
		if (category) {
			form.setFieldsValue({
				name: category.name,
			})
		} else {
			form.resetFields()
		}
	}, [form, category]);
	
	return <Form
		form={form}
		layout="vertical"
		onFinish={handleFinish}
		disabled={reqCategoryCreate.isLoading || reqCategoryUpdate.isLoading}
		noValidate
		{...props}
	>
		<Row>
			<Col span={24}>
				<Form.Item<CategoryFormDataInterface>
					label="Nom"
					name="name"
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
					loading={reqCategoryCreate.isLoading || reqCategoryUpdate.isLoading}
				>
					Valider
				</Button>
			</Flex>
		</Row>
		{contextHolder}
	</Form>
}