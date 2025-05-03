import {Button, Col, Flex, Form, Input, InputNumber, notification, Row} from "antd";
import SelectUnit from "../../molecules/SelectUnit.tsx";
import {useProductCreateUnitEquivalence} from "../../../hooks/Api/tenant/ProductHookAPI.ts";
import {useEffect} from "react";
import {config} from "../../../constants/notifcationConstant.ts";
import {successCreate} from "../../../constants/messagesConstant.ts";

export default function UnitEquivalenceForm({onSuccess, product, ...props}: {
	onSuccess?: (data: { unitEquivalence?: UnitEquivalenceInterface }) => void;
	product: ProductInterface
}) {
	const [form] = Form.useForm();
	const reqProductCreateUnitEquivalence = useProductCreateUnitEquivalence(product.id)
	const [api, contextHolder] = notification.useNotification(config);
	
	const handleFinish = (values: UnitEquivalenceFormDataInterface) => {
		return reqProductCreateUnitEquivalence.mutate(values)
	}
	
	useEffect(() => {
		if (reqProductCreateUnitEquivalence.status === 'success') {
			form.resetFields()
			api.success({
				message: successCreate
			})
			onSuccess?.({unitEquivalence: reqProductCreateUnitEquivalence.data?.data})
		}
	}, [reqProductCreateUnitEquivalence.data, reqProductCreateUnitEquivalence.status]);
	
	return <Form
		form={form}
		layout="vertical"
		{...props}
		onFinish={handleFinish}
		disabled={reqProductCreateUnitEquivalence.isLoading}
	>
		{contextHolder}
		<Row gutter={[12, 12]}>
			<Col span={8}>
				<Form.Item
					label="Unité de base"
				>
					<Input
						value={product.unit.name}
						disabled={true}
						className="font-bold text-center !text-red-600"
					/>
				</Form.Item>
			</Col>
			
			<Col span={8}>
				<Form.Item<UnitEquivalenceFormDataInterface>
					label="Unité de destination"
					name="unit_id"
					rules={[{required: true}]}
				>
					<SelectUnit/>
				</Form.Item>
			</Col>
			
			<Col span={8}>
				<Form.Item<UnitEquivalenceFormDataInterface>
					label="Valeur de l'unité"
					name="value"
					rules={[{required: true}]}
				>
					<InputNumber
						min={0.0000001}
						style={{width: "100%"}}
					/>
				</Form.Item>
			</Col>
			
			<Flex justify='center' className='w-screen'>
				<Button
					type="primary"
					htmlType="submit"
					className='w-1/2'
					loading={reqProductCreateUnitEquivalence.isLoading}
				>
					Valider
				</Button>
			</Flex>
		</Row>
	</Form>
}