import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Col, Flex, Row} from "antd";
import {IoIosAddCircle} from "react-icons/io";
import {usePurchaseGetAll} from "../../../hooks/Api/tenant/PurchaseHookAPI.ts";
import PurchaseTable from "../../molecules/Tables/PurchaseTable.tsx";
import {usePurchaseStore} from "../../../store/usePurchaseStore.ts";
import useRoutesPurchase from "../../../hooks/routes/PurchaseRoutesHook.ts";

export default function PurchaseIndexPage() {
	const {setSidebar} = useAppStore()
	const {queryParams, setFieldPagination} = usePurchaseStore()
	const reqPurchaseGetAll = usePurchaseGetAll({
		queryParams
	})
	const [purchases, setPurchases] = useState<PurchaseInterface[]>([])
	const routesPurchase = useRoutesPurchase()
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Achats'})
	}, [setSidebar]);
	
	useEffect(() => {
		if (reqPurchaseGetAll.status === 'success') {
			const res = reqPurchaseGetAll.data
			const data = res?.data
			setFieldPagination({
				field: 'total',
				value: data?.meta?.total || 0
			})
			const purchases = data?.data || []
			setPurchases(purchases)
		}
	}, [reqPurchaseGetAll.status, reqPurchaseGetAll.data]);
	
	return <Row
		gutter={[12, 12]}
	>
		<Col span={24} className='mb-4'>
			<Flex justify='end'>
				<Button
					type="primary"
					icon={<IoIosAddCircle/>}
					onClick={routesPurchase.goToCreate}
				>
					Nouvel achat
				</Button>
			</Flex>
		</Col>
		
		<Col span={24}>
			<PurchaseTable
				purchases={purchases}
				loading={reqPurchaseGetAll.isLoading}
			/>
		</Col>
	</Row>
}