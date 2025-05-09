import {Button, Col, Flex, Form, Input, notification, Row, Switch} from "antd";
import {config} from "../../../constants/notifcationConstant.ts";
import SelectPosition from "../../molecules/Selects/SelectPosition.tsx";
import {useSupplyCreateContact, useSupplyUpdateContact} from "../../../hooks/Api/tenant/SupplyHookAPI.ts";
import {useSupplyStore} from "../../../store/useSupplyStore.ts";
import {useEffect} from "react";
import {successCreate, successUpdate} from "../../../constants/textsConstant.ts";

export function ContactForm({onSuccess, contact, ...props}: { onSuccess?: () => void, contact?: ContactInterface }) {
	const [form] = Form.useForm();
	const [notificationInstance, contextHolder] = notification.useNotification(config);
	const {supply} = useSupplyStore()
	const reqSupplyCreateContact = useSupplyCreateContact(Number(supply?.id))
	const reqSupplyUpdateContact = useSupplyUpdateContact(Number(supply?.id), Number(contact?.id))
	
	const handleFinish = (values: ContactFormData) => {
		const formData: ContactFormData = {
			...values,
			position_id: Number(values.position?.value)
		}
		
		if (formData?.position) {
			delete formData.position
		}
		
		if (contact) {
			return reqSupplyUpdateContact.mutate(formData)
		}
		
		return reqSupplyCreateContact.mutate(formData)
	}
	
	useEffect(() => {
		if (reqSupplyCreateContact.status === 'success') {
			notificationInstance.success({
				message: successCreate
			})
			form.resetFields()
			onSuccess?.()
		}
	}, [form, notificationInstance, reqSupplyCreateContact.status]);
	
	useEffect(() => {
		if (reqSupplyUpdateContact.status === 'success') {
			notificationInstance.success({
				message: successUpdate
			})
			onSuccess?.()
		}
	}, [form, notificationInstance, reqSupplyUpdateContact.status]);
	
	useEffect(() => {
		if (contact) {
			form.setFieldsValue({
				name: contact.name,
				phoneNumber: contact.phoneNumber,
				position: {
					label: contact?.position?.name,
					value: contact?.position?.id
				},
			})
			
			if (contact?.is_whatsapp !== null) {
				form.setFieldValue('is_whatsapp', contact.is_whatsapp)
			}
		}
	}, [contact, form]);
	
	return <Form
		form={form}
		layout="vertical"
		onFinish={handleFinish}
		{...props}
	>
		{contextHolder}
		<Row gutter={[0, 0]}>
			<Col span={24}>
				<Form.Item<ContactFormData>
					label="Nom complet"
					name="name"
					rules={[{required: true}]}
				>
					<Input/>
				</Form.Item>
			</Col>
			
			<Col span={24}>
				<Form.Item<ContactFormData>
					label="Numéro de téléphone"
					name="phoneNumber"
					rules={[{required: true}]}
				>
					<Input type="tel"/>
				</Form.Item>
			</Col>
			
			<Col span={24}>
				<Form.Item<ContactFormData>
					label="Poste"
					name="position"
				>
					<SelectPosition
						labelInValue={true}
					/>
				</Form.Item>
			</Col>
			
			<Col span={24}>
				<Form.Item<ContactFormData>
					label="WhatsApp"
					name="is_whatsapp"
				>
					<Switch/>
				</Form.Item>
			</Col>
			
			<Flex justify='center' className='w-screen'>
				<Button
					type="primary"
					htmlType="submit"
					className='w-1/2'
					loading={reqSupplyCreateContact.isLoading || reqSupplyUpdateContact.isLoading}
				>
					Valider
				</Button>
			</Flex>
		</Row>
	</Form>
}