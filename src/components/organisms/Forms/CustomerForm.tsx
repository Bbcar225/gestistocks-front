import {Button, Col, Flex, Form, Input, notification, Row} from "antd";
import {useEffect} from "react";
import {successCreate, successUpdate} from "../../../constants/textsConstant.ts";
import {config} from "../../../constants/notifcationConstant.ts";
import SelectCity from "../../molecules/Selects/SelectCity.tsx";
import {useWatch} from "antd/es/form/Form";
import SelectCountry from "../../molecules/Selects/SelectCountry.tsx";
import {useCustomerCreate, useCustomerUpdate} from "../../../hooks/Api/tenant/CustomerHookAPI.ts";
import {useCustomerStore} from "../../../store/useCustomerStore.ts";
import {isMobile} from "react-device-detect";

export default function CustomerForm({onSuccess, ...props}: {
	onSuccess?: (data?: { customer?: CustomerInterface, message?: string }) => void;
}) {
	const [form] = Form.useForm();
	const reqCustomerCreate = useCustomerCreate()
	const [notificationInstance, contextHolder] = notification.useNotification(config);
	const {customer} = useCustomerStore()
	const reqCustomerUpdate = useCustomerUpdate(Number(customer?.id))
	
	const selectedCountry = useWatch('country', form);
	
	const handleFinish = (values: CustomerFormData) => {
		const formData = {
			...values,
			country: values.country?.[0],
			city: values.city?.[0]
		}
		
		if (customer) {
			return reqCustomerUpdate.mutate(formData)
		}
		
		return reqCustomerCreate.mutate(formData)
	}
	
	useEffect(() => {
		if (reqCustomerCreate.isSuccess) {
			const res = reqCustomerCreate.data
			
			notificationInstance.success({
				message: res.message,
				description: successCreate
			})
			
			form.resetFields()
			
			onSuccess?.({customer: res.data, message: res.message})
		}
	}, [notificationInstance, form, reqCustomerCreate.data, reqCustomerCreate.isSuccess]);
	
	useEffect(() => {
		if (reqCustomerUpdate.isSuccess) {
			const res = reqCustomerUpdate.data
			
			notificationInstance.success({
				message: res.message,
				description: successUpdate
			})
			
			onSuccess?.({customer: res.data, message: res.message})
		}
	}, [notificationInstance, form, reqCustomerUpdate.data, reqCustomerUpdate.isSuccess]);
	
	useEffect(() => {
		if (customer) {
			form.setFieldsValue({
				name: customer.name,
				country: [customer.country],
				city: [customer.city],
				address: customer.address
			})
		} else {
			form.resetFields()
		}
	}, [form, customer]);
	
	return <Form
		form={form}
		layout="vertical"
		onFinish={handleFinish}
		onValuesChange={(changedValues, values) => {
			if (changedValues?.country) {
				form.setFieldsValue({
					...values,
					city: undefined
				})
			}
		}}
		{...props}
	>
		<Row gutter={[12, 12]}>
			<Col span={isMobile ? 24 : 12}>
				<Form.Item<CustomerFormData>
					label="Nom complet"
					name="name"
					rules={[{required: true}]}
				>
					<Input/>
				</Form.Item>
			</Col>
			
			<Col span={isMobile ? 24 : 12}>
				<Form.Item<CustomerFormData>
					label="Pays"
					name="country"
					rules={[{required: true, max: 1, type: 'array'}]}
				>
					<SelectCountry
						mode="tags"
					/>
				</Form.Item>
			</Col>
			
			<Col span={isMobile ? 24 : 12}>
				<Form.Item<CustomerFormData>
					label="Ville"
					name="city"
					rules={[{required: true, max: 1, type: 'array'}]}
				>
					<SelectCity
						filterFn={(country) => country.name === selectedCountry?.[0] || country.name === customer?.country}
					/>
				</Form.Item>
			</Col>
			
			<Col span={isMobile ? 24 : 12}>
				<Form.Item<CustomerFormData>
					label="Adresse"
					name="address"
					rules={[{required: true}]}
				>
					<Input.TextArea
						rows={1}
					/>
				</Form.Item>
			</Col>
			
			<Flex justify='center' className='w-screen'>
				<Button
					type="primary"
					htmlType="submit"
					className='w-1/2'
					loading={reqCustomerCreate.isLoading}
				>
					Valider
				</Button>
			</Flex>
		</Row>
		{contextHolder}
	</Form>
}