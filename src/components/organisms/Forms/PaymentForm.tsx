import {Button, Col, Flex, Form, InputNumber, notification, Row} from "antd";
import SelectScrollInfiniteCustomer from "../../molecules/Selects/SelectScrollInfiniteCustomer.tsx";
import {formatPrice} from "../../../utils/priceUtils.ts";
import {usePaymentCreate} from "../../../hooks/Api/tenant/PaymentHookAPI.ts";
import {cleanQueryParams} from "../../../utils/reqApiUtils.ts";
import {successCreate} from "../../../constants/textsConstant.ts";
import SelectScrollInfiniteSale from "../../molecules/Selects/SelectScrollInfiniteSale.tsx";

export default function PaymentForm({onSuccess, ...props}: {
	onSuccess?: ({data}: { data?: PaymentInterface }) => void
}) {
	const [form] = Form.useForm();
	const [api, contextHolder] = notification.useNotification();
	const reqPaymentCreate = usePaymentCreate()
	
	const handleFinish = (values: PaymentFormDataInterface) => {
		const formData = cleanQueryParams(values) as unknown as PaymentFormDataInterface;
		
		return reqPaymentCreate.mutate(formData, {
			onSuccess: ({data}) => {
				api.success({
					message: successCreate
				})
				onSuccess?.({data})
				reqPaymentCreate.reset()
				form.resetFields()
			}
		})
	}
	
	return <Form
		form={form}
		layout="vertical"
		onFinish={handleFinish}
		{...props}
	>
		{contextHolder}
		<Row gutter={[12, 12]}>
			<Col span={24}>
				<Form.Item
					name='amount'
					label='Montant'
					rules={[{required: true}]}
				>
					<InputNumber
						formatter={(value) => value ? formatPrice(Number(value), '') : ''}
						className='!w-full'
					/>
				</Form.Item>
			</Col>
			
			<Col span={24}>
				<Form.Item
					name='customer_id'
					label='Client'
					rules={[{required: true}]}
				>
					<SelectScrollInfiniteCustomer
						allowClear={false}
					/>
				</Form.Item>
			</Col>
			
			<Col span={24}>
				<Form.Item
					name='sale_id'
					label='Vente'
				>
					<SelectScrollInfiniteSale
						allowClear={false}
					/>
				</Form.Item>
			</Col>
			
			<Flex justify='center' className='w-full'>
				<Button
					type="primary"
					htmlType="submit"
					className='w-1/2'
					loading={reqPaymentCreate.isLoading}
				>
					Valider
				</Button>
			</Flex>
		</Row>
	</Form>
}