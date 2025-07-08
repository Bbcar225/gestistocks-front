import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Col, Flex, Row} from "antd";
import {IoIosAddCircle} from "react-icons/io";
import useSaleStore from "../../../store/useSaleStore.ts";
import {useSaleGetAll} from "../../../hooks/Api/tenant/SaleHookAPI.ts";
import {SaleInterface} from "../../../interfaces/models/SaleInterface";
import SaleTable from "../../molecules/Tables/SaleTable.tsx";
import useRoutesIndex from "../../../hooks/routes/IndexRoutesHook.ts";
import SaleFilter from "../../molecules/SaleFilter.tsx";
import {cleanQueryParams} from "../../../utils/reqApiUtils.ts";

export default function SaleIndexPage() {
	const {setSidebar} = useAppStore()
	const {queryParams, setFieldPagination} = useSaleStore()
	const reqSaleGetAll = useSaleGetAll({
		queryParams: cleanQueryParams(queryParams)
	})
	const [sales, setSales] = useState<SaleInterface[]>([])
	const routesIndex = useRoutesIndex()
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Ventes'})
	}, [setSidebar]);
	
	useEffect(() => {
		if (reqSaleGetAll.status === 'success') {
			const res = reqSaleGetAll.data
			const data = res?.data
			setFieldPagination({
				field: 'total',
				value: data?.meta?.total || 0
			})
			const sales = data?.data || []
			setSales(sales)
		}
	}, [reqSaleGetAll.status, reqSaleGetAll.data]);
	
	return <Row
		gutter={[12, 12]}
	>
		<Col span={24} className='mb-4'>
			<Flex justify='end'>
				<Button
					type="primary"
					icon={<IoIosAddCircle/>}
					onClick={routesIndex.goToPos}
				>
					Nouvel vente
				</Button>
			</Flex>
		</Col>
		
		<Col span={24}>
			<SaleTable sales={sales}/>
		</Col>
		
		<SaleFilter />
	</Row>
}