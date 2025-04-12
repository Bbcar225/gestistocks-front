import {useEffect} from "react";
import {useSidebarStore} from "../../../store/useAppStore.ts";
import {Button, Col, Form, Input, notification, Row} from "antd";
import {useUnitCreate} from "../../../hooks/Api/tenant/UnitHookAPI.ts";
import {successCreate} from "../../../constants/messages.ts";

export default function PurchaseCreatePage() {
	const {setSidebar} = useSidebarStore()
	const [form] = Form.useForm();
	const reqUnitCreate = useUnitCreate()
	const [api, contextHolder] = notification.useNotification();
	
	const handleFinish = (values: UnitFormDataInterface) => {
		return reqUnitCreate.mutate(values)
	}
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Nouvelle unité'})
	}, [setSidebar]);
	
	useEffect(() => {
		if (reqUnitCreate.isSuccess) {
			const res = reqUnitCreate.data
			
			api.success({
				message: res.message,
				description: successCreate
			})
			form.resetFields()
		}
	}, [reqUnitCreate.data, reqUnitCreate.isSuccess]);
	
	return <Row gutter={[24, 12]}>
		<Col span={24}>
			<Form
				form={form}
				layout="vertical"
				onFinish={handleFinish}
				disabled={reqUnitCreate.isLoading}
				noValidate
			>
				<Form.Item<UnitFormDataInterface>
					label="Nom"
					name="name"
					rules={[{required: true}]}
				>
					<Input/>
				</Form.Item>
				
				<Form.Item<UnitFormDataInterface>
					label="Nom court"
					name="sort_name"
					rules={[{required: true}]}
				>
					<Input/>
				</Form.Item>
				
				<Form.Item label={null}>
					<Button type="primary" htmlType="submit">
						Valider
					</Button>
				</Form.Item>
			</Form>
		</Col>
		{contextHolder}
	</Row>
}