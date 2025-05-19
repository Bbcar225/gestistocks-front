import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Card, Col, Row, Spin, Steps} from "antd";
import CustomerForm from "../../organisms/Forms/CustomerForm.tsx";
import {ContactForm} from "../../organisms/Forms/ContactForm.tsx";
import {useCustomerStore} from "../../../store/useCustomerStore.ts";
import {useSupplierStore} from "../../../store/useSupplierStore.ts";
import {CustomerDescriptions} from "./CustomerShowPage.tsx";
import {FaArrowRight} from "react-icons/fa";
import {useRoutesCustomer} from "../../../routes/customerRoutes.ts";
import {useParams} from "react-router-dom";
import {useCustomerGetOne} from "../../../hooks/Api/tenant/CustomerHookAPI.ts";
import useAlertNotification from "../../../hooks/Api/app/useNotification.ts";
import {successUpdate} from "../../../constants/textsConstant.ts";

export default function CustomerCreatePage() {
	const {setSidebar} = useAppStore()
	const {customer: customerId} = useParams()
	const [current, setCurrent] = useState(0);
	const {customer, setCustomer} = useCustomerStore()
	const reqCustomerGetOne = useCustomerGetOne({
		id: customerId
	})
	const {setSupplier} = useSupplierStore()
	const routesCustomer = useRoutesCustomer()
	const {notificationInstance, contextHolder} = useAlertNotification()
	
	const steps = [
		{
			title: "Client",
			content: <CustomerForm
				onSuccess={(data) => {
					if (data?.customer) {
						setCustomer(data?.customer)
						setSupplier(undefined)
						notificationInstance.success({
							message: data.message,
							description: successUpdate
						})
						next()
					}
				}}
			/>,
		},
		{
			title: 'Contacts',
			content: <ContactForm
				onSuccess={() => {
					next()
				}}
			/>,
		},
		{
			title: 'Résumé',
			content: <Row>
				<Col span={24}>
					{customer && <CustomerDescriptions customer={customer}/>}
				</Col>
				
				<Col span={24} className='!text-center !mt-3'>
					<Button
						icon={<FaArrowRight/>}
						onClick={routesCustomer.goToIndex}
					>
						Retour à la liste
					</Button>
				</Col>
			</Row>,
		},
	];
	
	const items = steps.map((item) => ({itemkey: item.title, title: item.title}));
	
	function next() {
		setCurrent(current + 1);
	}
	
	const onChange = (value: number) => {
		setCurrent(value);
	};
	
	useEffect(() => {
		setSidebar({field: 'title', value: `Mise à jour de client ${customer ? ` : ${customer.name}` : ''}`})
	}, [customer, setSidebar]);
	
	useEffect(() => {
		if (reqCustomerGetOne.isSuccess) {
			const res = reqCustomerGetOne.data
			const customer = res.data
			setCustomer(customer)
		}
	}, [reqCustomerGetOne.data, reqCustomerGetOne.isSuccess]);
	
	return <Spin spinning={reqCustomerGetOne.isLoading}>
		<Row>
			<Col span={24}>
				<Card
					title={<Steps
						className='!mt-2 !sm:mt-0'
						current={current}
						items={items}
						onChange={onChange}/>}
				>
					{steps[current].content}
				</Card>
			</Col>
		</Row>
		{contextHolder}
	</Spin>
}

