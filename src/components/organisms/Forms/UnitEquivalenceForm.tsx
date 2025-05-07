import {Button, Col, Flex, Form, Input, InputNumber, notification, Row} from "antd";
import SelectUnit from "../../molecules/Selects/SelectUnit.tsx";
import {
	useProductCreateUnitEquivalence,
	useProductUpdateUnitEquivalence
} from "../../../hooks/Api/tenant/ProductHookAPI.ts";
import {useEffect} from "react";
import {config} from "../../../constants/notifcationConstant.ts";
import {successCreate, successUpdate} from "../../../constants/textsConstant.ts";
import {useProductStore} from "../../../store/useProductStore.ts";

export default function UnitEquivalenceForm({onSuccess, unitEquivalence, ...props}: {
	onSuccess?: (data: { unitEquivalence?: UnitEquivalenceInterface }) => void;
	unitEquivalence?: UnitEquivalenceInterface
}) {
	const {product} = useProductStore()
	const [form] = Form.useForm();
	const reqProductCreateUnitEquivalence = useProductCreateUnitEquivalence(Number(product?.id))
	const [api, contextHolder] = notification.useNotification(config);
	const reqProductUpdateUnitEquivalence = useProductUpdateUnitEquivalence(Number(product?.id), Number(unitEquivalence?.id))
	
	const handleFinish = (values: UnitEquivalenceFormDataInterface) => {
		if (unitEquivalence) {
			return reqProductUpdateUnitEquivalence.mutate(values)
		}
		
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
	
	useEffect(() => {
		if (reqProductUpdateUnitEquivalence.status === 'success') {
			api.success({
				message: successUpdate
			})
			onSuccess?.({unitEquivalence: reqProductUpdateUnitEquivalence.data?.data})
		}
	}, [reqProductUpdateUnitEquivalence.data, reqProductUpdateUnitEquivalence.status]);
	
	useEffect(() => {
		if (unitEquivalence) {
			form.setFieldsValue({
				value: unitEquivalence.value,
				unit_id: unitEquivalence.unit_id
			})
		} else {
			form.resetFields()
		}
	}, [unitEquivalence]);
	
	return <Form
		form={form}
		layout="vertical"
		onFinish={handleFinish}
		{...props}
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
								className="w-[180px]"
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
					loading={reqProductCreateUnitEquivalence.isLoading || reqProductUpdateUnitEquivalence.isLoading}
				>
					Valider
				</Button>
			</Flex>
		</Row>
	</Form>
}