import {Button, Col, Flex, Form, Input, notification, Row} from "antd";
import {useEffect} from "react";
import {successCreate, successUpdate} from "../../../constants/textsConstant.ts";
import {config} from "../../../constants/notifcationConstant.ts";
import {useSupplyCreate, useSupplyUpdate} from "../../../hooks/Api/tenant/SupplyHookAPI.ts";
import {useSupplyStore} from "../../../store/useSupplyStore.ts";
import SelectCity from "../../molecules/Selects/SelectCity.tsx";
import {useWatch} from "antd/es/form/Form";
import SelectCountry from "../../molecules/Selects/SelectCountry.tsx";

export default function SupplyForm({onSuccess, ...props}: { onSuccess?: () => void; }) {
	const [form] = Form.useForm();
	const reqSupplyCreate = useSupplyCreate()
	const [notificationInstance, contextHolder] = notification.useNotification(config);
	const {supply} = useSupplyStore()
	const reqSupplyUpdate = useSupplyUpdate(Number(supply?.id))
	
	const selectedCountry = useWatch('country', form);
	
	const handleFinish = (values: SupplyFormData) => {
		const formData = {
			...values,
			country: values.country?.[0],
			city: values.city?.[0]
		}
		
		if (supply) {
			return reqSupplyUpdate.mutate(formData)
		}
		
		return reqSupplyCreate.mutate(formData)
	}
	
	useEffect(() => {
		if (reqSupplyCreate.isSuccess) {
			const res = reqSupplyCreate.data
			
			notificationInstance.success({
				message: res.message,
				description: successCreate
			})
			
			form.resetFields()
			
			onSuccess?.()
		}
	}, [notificationInstance, form, reqSupplyCreate.data, reqSupplyCreate.isSuccess]);
	
	useEffect(() => {
		if (reqSupplyUpdate.isSuccess) {
			const res = reqSupplyUpdate.data
			
			notificationInstance.success({
				message: res.message,
				description: successUpdate
			})
			
			onSuccess?.()
		}
	}, [notificationInstance, form, reqSupplyUpdate.data, reqSupplyUpdate.isSuccess]);
	
	useEffect(() => {
		if (supply) {
			form.setFieldsValue({
				name: supply.name,
				country: [supply.country],
				city: [supply.city],
				address: supply.address
			})
		} else {
			form.resetFields()
		}
	}, [form, supply]);
	
	useEffect(() => {
		form.setFieldValue('city', undefined);
	}, [form, selectedCountry]);
	
	return <Form
		form={form}
		layout="vertical"
		onFinish={handleFinish}
		{...props}
	>
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<Form.Item<SupplyFormData>
					label="Nom complet"
					name="name"
					rules={[{required: true}]}
				>
					<Input/>
				</Form.Item>
			</Col>
			
			<Col span={12}>
				<Form.Item<SupplyFormData>
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
				<Form.Item<SupplyFormData>
					label="Ville"
					name="city"
					rules={[{required: true, max: 1, type: 'array'}]}
				>
					<SelectCity
						filterFn={(country) => country.name === selectedCountry?.[0] || country.name === supply?.country}
					/>
				</Form.Item>
			</Col>
			
			<Col span={12}>
				<Form.Item<SupplyFormData>
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
					loading={reqSupplyCreate.isLoading}
				>
					Valider
				</Button>
			</Flex>
		</Row>
		{contextHolder}
	</Form>
}