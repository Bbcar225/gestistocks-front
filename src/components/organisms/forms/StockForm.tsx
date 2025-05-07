import {Button, Col, Flex, Form, InputNumber, notification, Row, Switch} from "antd";
import {config} from "../../../constants/notifcationConstant.ts";
import SelectWarehouse from "../../molecules/Selects/SelectWarehouse.tsx";
import {useProductCreateStock} from "../../../hooks/Api/tenant/ProductHookAPI.ts";
import {useEffect} from "react";
import {successCreate} from "../../../constants/textsConstant.ts";
import {useProductStore} from "../../../store/useProductStore.ts";

export default function StockForm({onSuccess, ...props}: {
	onSuccess?: () => void;
}) {
	const [form] = Form.useForm();
	const {product} = useProductStore()
	const [notificationInstance, contextHolder] = notification.useNotification(config);
	const reqProductCreateStock = useProductCreateStock(Number(product?.id))
	
	const handleFinish = (values: StockFormDataInterface) => {
		return reqProductCreateStock.mutate(values)
	}
	
	useEffect(() => {
		if (reqProductCreateStock.status === 'success') {
			const res = reqProductCreateStock.data
			
			notificationInstance.success({
				message: res.message,
				description: successCreate
			})
			
			form.resetFields()
			
			onSuccess?.()
		}
	}, [reqProductCreateStock.data, reqProductCreateStock.status]);
	
	return <Form
		form={form}
		layout="vertical"
		{...props}
		onFinish={handleFinish}
		disabled={false}
		initialValues={{
			active: true
		}}
	>
		{contextHolder}
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<Form.Item<StockFormDataInterface>
					label="Dépôt"
					name="warehouse_id"
					rules={[{required: true}]}
				>
					<SelectWarehouse/>
				</Form.Item>
			</Col>
			
			<Col span={12}>
				<Form.Item<StockFormDataInterface>
					label="Prix de vente"
					name="price"
					rules={[{required: true}]}
				>
					<InputNumber
						style={{
							width: "100%",
						}}
						suffix={`Fr / ${product?.unit.name}`}
					/>
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
						suffix={`${product?.unit.name}`}
					/>
				</Form.Item>
			</Col>
			
			<Col span={12}>
				<Form.Item<StockFormDataInterface>
					label="Stock de vente ?"
					name="active"
				>
					<Switch defaultChecked/>
				</Form.Item>
			</Col>
			
			<Flex justify='center' className='w-screen'>
				<Button
					type="primary"
					htmlType="submit"
					className='w-1/2'
					loading={false}
				>
					Valider
				</Button>
			</Flex>
		</Row>
	</Form>
}