import {Button, Col, Flex, Form, Input, InputNumber, notification, Row} from "antd";
import SelectUnit from "../../molecules/SelectUnit.tsx";
import {useProductCreateUnitEquivalence} from "../../../hooks/Api/tenant/ProductHookAPI.ts";
import {useEffect} from "react";
import {config} from "../../../constants/notifcationConstant.ts";
import {successCreate} from "../../../constants/messagesConstant.ts";
import {useProductStore} from "../../../store/useProductStore.ts";

export default function UnitEquivalenceForm({onSuccess, ...props}: {
	onSuccess?: (data: { unitEquivalence?: UnitEquivalenceInterface }) => void;
}) {
	const {product} = useProductStore()
	const [form] = Form.useForm();
	const reqProductCreateUnitEquivalence = useProductCreateUnitEquivalence(Number(product?.id))
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
			<Col xs={24} sm={12}>
				<Form.Item
					label="Unité de base"
				>
					<Input
						value={`1 ${product?.unit.name} fait`}
						disabled={true}
						className="font-bold text-center !text-red-600"
					/>
				</Form.Item>
			</Col>
			
			<Col xs={24} sm={12}>
				<Form.Item<UnitEquivalenceFormDataInterface>
					label="Valeur de l'unité"
					name="value"
					rules={[{required: true}]}
				>
					<InputNumber
						placeholder="Valeur d'équivalence"
						min={0.0000001}
						addonAfter={<Form.Item<UnitEquivalenceFormDataInterface>
							name="unit_id"
							rules={[{required: true}]}
							noStyle
						>
							<SelectUnit
								placeholder="Unité de destination"
								className="w-[230px]"
							/>
						</Form.Item>}
						style={{width: '100%'}}
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