import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Card, Col, Row, Steps} from "antd";
import CustomerForm from "../../organisms/Forms/CustomerForm.tsx";
import {ContactForm} from "../../organisms/Forms/ContactForm.tsx";
import {useCustomerStore} from "../../../store/useCustomerStore.ts";
import {useSupplierStore} from "../../../store/useSupplierStore.ts";

export default function CustomerCreatePage() {
	const {setSidebar} = useAppStore()
	const [current, setCurrent] = useState(0);
	const {customer, setCustomer} = useCustomerStore()
	const {setSupplier} = useSupplierStore()
	
	const steps = [
		{
			title: "Client",
			content: <CustomerForm
				onSuccess={(data) => {
					if (data?.customer) {
						setCustomer(data?.customer)
						setSupplier(undefined)
						next()
					}
				}}
			/>,
		},
		{
			title: 'Contacts',
			content: <ContactForm
				onSuccess={() => {
					console.log(customer)
				}}
			/>,
		},
		
	];
	
	const items = steps.map((item) => ({itemkey: item.title, title: item.title}));
	
	function next() {
		setCurrent(current + 1);
	}
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Nouveau client'})
	}, [setSidebar]);
	
	return <Row>
		<Col span={24}>
			<Card
				title={<Steps current={current} items={items}/>}
			>
				{steps[current].content}
			</Card>
		</Col>
	</Row>
}

