import {Button, Col, Flex, Form, Input, notification, Row} from "antd";
import {useEffect} from "react";
import {successCreate, successUpdate} from "../../../constants/textsConstant.ts";
import {config} from "../../../constants/notifcationConstant.ts";
import {useSupplierCreate, useSupplierUpdate} from "../../../hooks/Api/tenant/SupplierHookAPI.ts";
import {useSupplierStore} from "../../../store/useSupplierStore.ts";
import SelectCity from "../../molecules/Selects/SelectCity.tsx";
import {useWatch} from "antd/es/form/Form";
import SelectCountry from "../../molecules/Selects/SelectCountry.tsx";

export default function SupplierForm({onSuccess, ...props}: { onSuccess?: () => void; }) {
	const [form] = Form.useForm();
	const reqSupplierCreate = useSupplierCreate()
	const [notificationInstance, contextHolder] = notification.useNotification(config);
	const {supplier} = useSupplierStore()
	const reqSupplierUpdate = useSupplierUpdate(Number(supplier?.id))
	
	const selectedCountry = useWatch('country', form);
	
	const handleFinish = (values: SupplierFormData) => {
		const formData = {
			...values,
			country: values.country?.[0],
			city: values.city?.[0]
		}
		
		if (supplier) {
			return reqSupplierUpdate.mutate(formData)
		}
		
		return reqSupplierCreate.mutate(formData)
	}
	
	useEffect(() => {
		if (reqSupplierCreate.isSuccess) {
			const res = reqSupplierCreate.data
			
			notificationInstance.success({
				message: res.message,
				description: successCreate
			})
			
			form.resetFields()
			
			onSuccess?.()
		}
	}, [notificationInstance, form, reqSupplierCreate.data, reqSupplierCreate.isSuccess]);
	
	useEffect(() => {
		if (reqSupplierUpdate.isSuccess) {
			const res = reqSupplierUpdate.data
			
			notificationInstance.success({
				message: res.message,
				description: successUpdate
			})
			
			onSuccess?.()
		}
	}, [notificationInstance, form, reqSupplierUpdate.data, reqSupplierUpdate.isSuccess]);
	
	useEffect(() => {
		if (supplier) {
			form.setFieldsValue({
				name: supplier.name,
				country: [supplier.country],
				city: [supplier.city],
				address: supplier.address
			})
		} else {
			form.resetFields()
		}
	}, [form, supplier]);
	
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
			<Col span={12}>
				<Form.Item<SupplierFormData>
					label="Nom complet"
					name="name"
					rules={[{required: true}]}
				>
					<Input/>
				</Form.Item>
			</Col>
			
			<Col span={12}>
				<Form.Item<SupplierFormData>
					label="Pays"
					name="country"
					rules={[{required: true, max: 1, type: 'array'}]}
				>
					<SelectCountry
						mode="tags"
					/>
				</Form.Item>
			</Col>
			
			<Col span={12}>
				<Form.Item<SupplierFormData>
					label="Ville"
					name="city"
					rules={[{required: true, max: 1, type: 'array'}]}
				>
					<SelectCity
						filterFn={(country) => country.name === selectedCountry?.[0] || country.name === supplier?.country}
					/>
				</Form.Item>
			</Col>
			
			<Col span={12}>
				<Form.Item<SupplierFormData>
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
					loading={reqSupplierCreate.isLoading}
				>
					Valider
				</Button>
			</Flex>
		</Row>
		{contextHolder}
	</Form>
}