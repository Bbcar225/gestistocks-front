import {Button, Col, Flex, Form, FormProps, InputNumber, notification, Row, Switch} from "antd";
import {config} from "../../../constants/notifcationConstant.ts";
import SelectWarehouse from "../../molecules/Selects/SelectWarehouse.tsx";
import {useProductCreateStock} from "../../../hooks/Api/tenant/ProductHookAPI.ts";
import {useEffect} from "react";
import {successCreate} from "../../../constants/textsConstant.ts";
import SelectScrollInfiniteProduct from "../../molecules/Selects/SelectScrollInfiniteProduct.tsx";
import {isMobile} from "react-device-detect";

interface StockFormProps extends FormProps {
	onSuccess?: () => void;
	product?: ProductInterface;
}

export default function StockForm({onSuccess, product, ...props}: StockFormProps) {
	const [form] = Form.useForm();
	const [notificationInstance, contextHolder] = notification.useNotification(config);
	const reqProductCreateStock = useProductCreateStock(Number(product?.id))
	const productSelected = Form.useWatch('product', form);
	const purchasePrice = Form.useWatch('purchase_price', form)
	
	const handleFinish = (values: StockFormDataInterface) => {
		if (values?.product) {
			delete values.product
		}
		
		if (values.purchase_price) {
			delete values.purchase_price
		}
		
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
	
	useEffect(() => {
		if (product) {
			form.setFieldValue('product', {
				label: `${product.name} - ${product.sku}`,
				value: product.id
			})
		}
	}, [product]);
	
	return <Form
		form={form}
		layout="vertical"
		onFinish={handleFinish}
		initialValues={{
			active: true
		}}
		{...props}
	>
		{contextHolder}
		<Row gutter={isMobile ? 0 : [12, 12]}>
			<Col span={isMobile ? 24 : 8}>
				<Form.Item<StockFormDataInterface>
					label="Produit"
					name="product"
					rules={[{required: true}]}
				>
					<SelectScrollInfiniteProduct
						disabled={productSelected && product}
						allowClear={false}
					/>
				</Form.Item>
			</Col>
			
			{form.getFieldValue('purchase_price') && <Col span={isMobile ? 24 : 8}>
		<Form.Item<StockFormDataInterface>
			label="Prix d'achat"
			name="purchase_price"
		>
		  <InputNumber
			  style={{
								width: "100%",
							}}
			  suffix="Fr"
			  disabled={true}
		  />
		</Form.Item>
	  </Col>}
			
			<Col span={isMobile ? 24 : 8}>
				<Form.Item<StockFormDataInterface>
					label="Dépôt"
					name="warehouse_id"
					rules={[{required: true}]}
				>
					<SelectWarehouse/>
				</Form.Item>
			</Col>
		</Row>
		
		<Row gutter={isMobile ? 0 : [12, 12]}>
			<Col span={isMobile ? 24 : 7}>
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
			
			<Col span={isMobile ? 24 : 7}>
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
			
			<Col span={isMobile ? 24 : 7}>
				<Form.Item<StockFormDataInterface>
					label="Stock faible"
					name="quantity"
				>
					<InputNumber
						style={{
							width: "100%",
						}}
						suffix={`${product?.unit.name}`}
					/>
				</Form.Item>
			</Col>
			
			<Col span={isMobile ? 24 : 3}>
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