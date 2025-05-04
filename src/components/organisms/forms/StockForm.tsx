import {Col, Form, InputNumber, notification, Row} from "antd";
import {config} from "../../../constants/notifcationConstant.ts";

export default function StockForm({onSuccess, product, ...props}: {
	onSuccess?: () => void;
	product: ProductInterface
}) {
	const [form] = Form.useForm();
	const [notificationInstance, contextHolder] = notification.useNotification(config);
	
	const handleFinish = (values: StockFormDataInterface) => {
		console.log(`/Users/boubacarly/Sites/localhost/perso/gestistock2/front/src/components/organisms/forms/StockForm.tsx:12`, `values =>`, values)
	}
	
	return <Form
		form={form}
		layout="vertical"
		{...props}
		onFinish={handleFinish}
		disabled={false}
	>
		{contextHolder}
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<Form.Item<StockFormDataInterface>
					label="Dépôt"
					name="warehouse_id"
					rules={[{required: true}]}
				>
				</Form.Item>
			</Col>
			
			<Col span={12}>
				<Form.Item<StockFormDataInterface>
					label="Prix de vente"
					name="price"
					rules={[{required: true}]}
				>
				</Form.Item>
			</Col>
			
			<Col span={12}>
				<Form.Item<StockFormDataInterface>
					label="Quantité du stock"
					name="quantity"
					rules={[{required: true}]}
				>
					<InputNumber
						style={{
							width: "100%",
						}}
					/>
				</Form.Item>
			</Col>
			
			<Col span={12}>
				<Form.Item<StockFormDataInterface>
					label="Active ?"
					name="active"
					rules={[{required: true}]}
				>
				</Form.Item>
			</Col>
		</Row>
	</Form>
}