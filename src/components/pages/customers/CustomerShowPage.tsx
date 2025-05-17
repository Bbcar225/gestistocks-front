import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Card, Col, Descriptions, DescriptionsProps, Row} from "antd";
import {useCustomerGetOne} from "../../../hooks/Api/tenant/CustomerHookAPI.ts";
import {useParams} from "react-router-dom";
import {FaEdit} from "react-icons/fa";
import {isMobile} from "react-device-detect";
import dayjs from "dayjs";
import {formatDate} from "../../../constants/dateConstant.ts";
import {useRoutesCustomer} from "../../../routes/customerRoutes.ts";

export default function CustomerShowPage() {
	const {setSidebar} = useAppStore()
	const {customer: customerId} = useParams()
	const [customer, setCustomer] = useState<CustomerInterface | undefined>(undefined)
	const reqCustomerGetOne = useCustomerGetOne({
		id: customerId
	})
	const routesCustomer = useRoutesCustomer()
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Détails clients'})
	}, [setSidebar]);
	
	useEffect(() => {
		if (reqCustomerGetOne.isSuccess) {
			const res = reqCustomerGetOne.data
			const customer = res.data
			setCustomer(customer)
		}
	}, [reqCustomerGetOne.data, reqCustomerGetOne.isSuccess]);
	
	return <Row>
		<Col span={24}>
			<Card
				title={<>
					Informations du client
					<Button
						type='link'
						icon={<FaEdit/>}
						onClick={() => {
							if (customer) {
								return routesCustomer.goToEdit({id: customer.id})
							}
						}}
					/>
				</>}
			>
				{customer && <CustomerDescriptions customer={customer}/>}
			</Card>
		</Col>
	</Row>
}

export const CustomerDescriptions = ({customer}: { customer: CustomerInterface }) => {
	const items: DescriptionsProps['items'] = [
		{
			key: '1',
			label: 'Nom complet',
			children: <p>{customer.name}</p>,
		},
		{
			key: '2',
			label: 'Pays',
			children: <p>{customer.country}</p>,
		},
		{
			key: '3',
			label: 'Ville',
			children: <p>{customer.city}</p>,
		},
		{
			key: '4',
			label: 'Adresse',
			children: <p>{customer.address}</p>,
		},
		{
			key: '5',
			label: 'Date',
			children: <p>{dayjs(customer.created_at).format(formatDate)}</p>,
		},
	];
	
	return <Descriptions
		items={items}
		column={isMobile ? 1 : 3}
	/>;
}

