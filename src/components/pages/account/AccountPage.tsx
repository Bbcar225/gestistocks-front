import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {useAuthAccount} from "../../../hooks/Api/tenant/AuthHookAPI.ts";
import {Button, Card, Col, Descriptions, DescriptionsProps, Row, Spin, Image, Typography} from "antd";
import {FaEdit} from "react-icons/fa";
import {isMobile} from "react-device-detect";
import dayjs from "dayjs";
import {formatDate} from "../../../constants/dateConstant.ts";
import UserTable from "../../molecules/Tables/UserTable.tsx";
import useRoutesAccount from "../../../hooks/routes/AccountRoutesHook.ts";
import {useUserStore} from "../../../store/useUserStore.ts";

export default function AccountPage() {
	const {setSidebar} = useAppStore()
	const {tenant, setTenant} = useUserStore()
	const reqAuthAccount = useAuthAccount()
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Mon compte'})
	}, [setSidebar]);
	
	useEffect(() => {
		if (reqAuthAccount.status === 'success') {
			const res = reqAuthAccount.data
			const tenant = res.data
			setTenant(tenant)
		}
	}, [reqAuthAccount.data, reqAuthAccount.status]);
	
	return <Spin spinning={reqAuthAccount.isLoading}>
		{tenant && <Row gutter={[12, 12]}>
	  <Col span={24}>
		<Card>
		  <AccountDescriptions tenant={tenant}/>
		</Card>
	  </Col>

	  <Col span={24}>
		<Card
			title="Liste des utilisateurs"
		>
		  <UserTable
			  users={tenant.users}
		  />
		</Card>
	  </Col>
	</Row>}
	</Spin>;
}

const AccountDescriptions = ({tenant}: { tenant: TenantInterface }) => {
	const routesAccount = useRoutesAccount()
	const [expanded, setExpanded] = useState(false);
	
	const items: DescriptionsProps['items'] = [
		{
			key: "Nom de l'entreprise",
			label: "Nom de l'entreprise",
			children: <p>{tenant.name}</p>,
		},
		{
			key: "Téléphone",
			label: "Téléphone",
			children: <p>{tenant.phoneNumber}</p>,
		},
		{
			key: "Email",
			label: "Email",
			children: <p>{tenant.email}</p>,
		},
		{
			key: "Adresse",
			label: "Adresse",
			children: <p>{tenant.address}</p>,
		},
		{
			key: "Notice de facture",
			label: "Notice de facture",
			children: <Typography.Paragraph
				ellipsis={{
					rows: 1,
					expandable: 'collapsible',
					expanded,
					onExpand: (_, info) => setExpanded(info.expanded),
					symbol: (expanded) => expanded ? "Réduire" : "Développer"
				}}
			>
				{tenant.notice_invoice}
			</Typography.Paragraph>,
		},
		{
			key: "Date",
			label: "Date",
			children: <p>{dayjs(tenant.created_at).format(formatDate)}</p>,
		},
		{
			key: "Logo",
			label: "Logo",
			children: <Image
				src={tenant.gallery.url}
				alt={`Logo ${tenant.name}`}
				width={30}
				height={30}
			/>,
		},
	];
	
	return <Descriptions
		title={<>
			Informations globales
			<Button
				type='link'
				icon={<FaEdit/>}
				onClick={routesAccount.goToUpdate}
			/>
		</>}
		items={items}
		column={isMobile ? 1 : 3}
	/>
}