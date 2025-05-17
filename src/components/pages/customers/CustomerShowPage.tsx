import {useEffect} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Card, Col, Descriptions, DescriptionsProps, Row, Spin} from "antd";
import {customerQueriesClients, useCustomerGetOne} from "../../../hooks/Api/tenant/CustomerHookAPI.ts";
import {useParams} from "react-router-dom";
import {FaEdit} from "react-icons/fa";
import {isMobile} from "react-device-detect";
import dayjs from "dayjs";
import {formatDate} from "../../../constants/dateConstant.ts";
import {useRoutesCustomer} from "../../../routes/customerRoutes.ts";
import ContactTable from "../../molecules/Tables/ContactTable.tsx";
import {RiUserAddFill} from "react-icons/ri";
import ContactFormModal from "../../organisms/Modals/ContactFormModal.tsx";
import {useCustomerStore} from "../../../store/useCustomerStore.ts";
import {useQueryClient} from "react-query";

export default function CustomerShowPage() {
	const {setSidebar} = useAppStore()
	const {customer: customerId} = useParams()
	const {customer, setCustomer} = useCustomerStore()
	const reqCustomerGetOne = useCustomerGetOne({
		id: customerId
	})
	const routesCustomer = useRoutesCustomer()
	const {openModal, setOpenModal} = useAppStore()
	const queryClient = useQueryClient()
	
	useEffect(() => {
		setSidebar({field: 'title', value: `Détails clients ${customer ? `: ${customer?.name}` : ''}`})
	}, [customer, setSidebar]);
	
	useEffect(() => {
		if (reqCustomerGetOne.isSuccess) {
			const res = reqCustomerGetOne.data
			const customer = res.data
			setCustomer(customer)
		}
	}, [reqCustomerGetOne.data, reqCustomerGetOne.isSuccess]);
	
	return <Spin spinning={reqCustomerGetOne.isLoading}>
		<Row gutter={[12, 12]}>
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
			
			<Col span={24}>
				<Card
					title='Contacts du client'
					extra={<>
						<Button
							type='link'
							icon={<RiUserAddFill/>}
							onClick={() => {
								setOpenModal(true)
							}}
						>
							Nouveau contact
						</Button>
					</>}
				>
					{customer && <ContactTable contacts={customer.contacts || []}/>}
				</Card>
			</Col>
			
			<ContactFormModal
				openModal={openModal}
				onClose={() => {
					setOpenModal(false)
				}}
				onSuccess={() => {
					queryClient.invalidateQueries(customerQueriesClients.useCustomerGetOne).then()
				}}
			/>
		</Row>
	</Spin>
}

export const CustomerDescriptions = ({customer}: { customer: CustomerInterface }) => {
	const items: DescriptionsProps['items'] = [
		{
			label: 'ID',
			children: <p>{customer.id}</p>,
		},
		{
			label: 'Nom complet',
			children: <p>{customer.name}</p>,
		},
		{
			label: 'Pays',
			children: <p>{customer.country}</p>,
		},
		{
			label: 'Ville',
			children: <p>{customer.city}</p>,
		},
		{
			label: 'Adresse',
			children: <p>{customer.address}</p>,
		},
		{
			label: 'Date',
			children: <p>{dayjs(customer.created_at).format(formatDate)}</p>,
		},
	];
	
	return <Descriptions
		items={items.map((item, index) => ({...item, key: index}))}
		column={isMobile ? 1 : 3}
	/>;
}
