import {Button, Col, Flex, Form, Input, notification, Row, Switch} from "antd";
import {config} from "../../../constants/notifcationConstant.ts";
import SelectPosition from "../../molecules/Selects/SelectPosition.tsx";
import {useSupplierCreateContact, useSupplierUpdateContact} from "../../../hooks/Api/tenant/SupplierHookAPI.ts";
import {useSupplierStore} from "../../../store/useSupplierStore.ts";
import {useEffect} from "react";
import {successCreate, successUpdate} from "../../../constants/textsConstant.ts";
import {isMobile} from "react-device-detect";
import {useCustomerStore} from "../../../store/useCustomerStore.ts";
import {useCustomerCreateContact} from "../../../hooks/Api/tenant/CustomerHookAPI.ts";

export function ContactForm({onSuccess, contact, ...props}: {
	onSuccess?: (data?: { contact?: ContactInterface }) => void,
	contact?: ContactInterface
}) {
	const [form] = Form.useForm();
	const [notificationInstance, contextHolder] = notification.useNotification(config);
	const {supplier} = useSupplierStore()
	const reqSupplierCreateContact = useSupplierCreateContact(Number(supplier?.id))
	const reqSupplierUpdateContact = useSupplierUpdateContact(Number(supplier?.id), Number(contact?.id))
	const {customer} = useCustomerStore()
	const reqCustomerCreateContact = useCustomerCreateContact(Number(customer?.id))
	const isLoading = reqSupplierCreateContact.isLoading || reqSupplierUpdateContact.isLoading || reqCustomerCreateContact.isLoading
	
	const handleFinish = (values: ContactFormData) => {
		const formData: ContactFormData = {
			...values,
			position_id: Number(values.position?.value)
		}
		
		if (formData?.position) {
			delete formData.position
		}
		
		if (supplier) {
			if (contact) {
				return reqSupplierUpdateContact.mutate(formData)
			}
			
			return reqSupplierCreateContact.mutate(formData)
		}
		
		if (customer) {
			return reqCustomerCreateContact.mutate(formData)
		}
	}
	
	useEffect(() => {
		if (reqSupplierCreateContact.status === 'success') {
			notificationInstance.success({
				message: successCreate
			})
			form.resetFields()
			onSuccess?.({contact: reqSupplierCreateContact.data?.data})
		}
	}, [form, notificationInstance, reqSupplierCreateContact.status, reqSupplierCreateContact.data]);
	
	useEffect(() => {
		if (reqSupplierUpdateContact.status === 'success') {
			notificationInstance.success({
				message: successUpdate
			})
			
			onSuccess?.({contact: reqSupplierUpdateContact.data?.data})
		}
	}, [form, notificationInstance, reqSupplierUpdateContact.data, reqSupplierUpdateContact.status]);
	
	useEffect(() => {
		if (reqCustomerCreateContact.status === 'success') {
			const res = reqCustomerCreateContact.data
			
			notificationInstance.success({
				message: res.message,
				description: successCreate
			})
			
			form.resetFields()
			
			onSuccess?.({contact: res.data})
		}
	}, [form, notificationInstance, reqCustomerCreateContact.data, reqCustomerCreateContact.status]);
	
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
		<Row gutter={isMobile ? 0 : [12, 12]}>
			<Col span={isMobile ? 24 : 12}>
				<Form.Item<ContactFormData>
					label="Nom complet"
					name="name"
					rules={[{required: true}]}
				>
					<Input/>
				</Form.Item>
			</Col>
			
			<Col span={isMobile ? 24 : 12}>
				<Form.Item<ContactFormData>
					label="Numéro de téléphone"
					name="phoneNumber"
					rules={[{required: true}]}
				>
					<Input type="tel"/>
				</Form.Item>
			</Col>
			
			<Col span={isMobile ? 24 : 12}>
				<Form.Item<ContactFormData>
					label="Poste"
					name="position"
				>
					<SelectPosition
						labelInValue={true}
					/>
				</Form.Item>
			</Col>
			
			<Col span={isMobile ? 24 : 12}>
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
					loading={isLoading}
				>
					Valider
				</Button>
			</Flex>
		</Row>
	</Form>
}