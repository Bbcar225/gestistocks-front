import {Button, Col, Flex, Form, Input, notification, Row} from "antd";
import {useEffect} from "react";
import {successCreate} from "../../../constants/textsConstant.ts";
import {config} from "../../../constants/notifcationConstant.ts";
import {useSupplyCreate} from "../../../hooks/Api/tenant/SupplyHookAPI.ts";
import {useSupplyStore} from "../../../store/useSupplyStore.ts";
import SelectCity from "../../molecules/Selects/SelectCity.tsx";
import {useWatch} from "antd/es/form/Form";
import SelectCountry from "../../molecules/Selects/SelectCountry.tsx";

export default function SupplyForm({onSuccess, ...props}: { onSuccess?: () => void; }) {
	const [form] = Form.useForm();
	const reqSupplyCreate = useSupplyCreate()
	const [notificationInstance, contextHolder] = notification.useNotification(config);
	const {supply} = useSupplyStore()
	
	const selectedCountry = useWatch('country', form);
	
	const handleFinish = (values: SupplyFormData) => {
		if (supply) {
			// return reqWarehouseUpdate.mutate(values)
		}
		
		console.log(`/Users/boubacarly/Sites/localhost/perso/gestistock2/front/src/components/organisms/Forms/SupplyForm.tsx:24`, `values =>`, values)
		
		return
		
		return reqSupplyCreate.mutate(values)
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
		if (supply) {
			form.setFieldsValue({
				name: supply.name,
			})
		} else {
			form.resetFields()
		}
	}, [form, supply]);
	
	useEffect(() => {
		form.setFieldValue('city', undefined)
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
					<SelectCountry/>
				</Form.Item>
			</Col>
			
			<Col span={12}>
				<Form.Item<SupplyFormData>
					label="Ville"
					name="city"
					rules={[{required: true, max: 1, type: 'array'}]}
				>
					<SelectCity
						filterFn={(country) => country.name === selectedCountry?.[0]}
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