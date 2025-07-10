import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Col, Flex, Row} from "antd";
import {IoIosAddCircle} from "react-icons/io";
import {useCustomerStore} from "../../../store/useCustomerStore.ts";
import {useCustomerGetAll} from "../../../hooks/Api/tenant/CustomerHookAPI.ts";
import useRoutesCustomer from "../../../hooks/routes/CustomerRoutesHook.ts";
import CustomerTable from "../../molecules/Tables/CustomerTable.tsx";
import CustomerFilter from "../../organisms/Filters/CustomerFilter.tsx";
import {cleanQueryParams} from "../../../utils/reqApiUtils.ts";

export default function CustomerIndexPage() {
	const {setSidebar} = useAppStore()
	const [customers, setCustomers] = useState<CustomerInterface[]>([])
	const {queryParams, setFieldPagination, setCustomer} = useCustomerStore()
	const reqCustomerGetAll = useCustomerGetAll({
		queryParams: cleanQueryParams(queryParams)
	})
	const routesCustomer = useRoutesCustomer()
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Clients'})
		setCustomer(undefined)
	}, [setCustomer, setSidebar]);
	
	useEffect(() => {
		if (reqCustomerGetAll.isSuccess) {
			const data = reqCustomerGetAll.data?.data
			setFieldPagination({field: 'total', value: data.meta.total})
			setCustomers(data?.data || [])
		}
	}, [reqCustomerGetAll.data, reqCustomerGetAll.isSuccess, setFieldPagination]);
	
	return <Row>
		<Col span={24} className='mb-4'>
			<Flex justify='end'>
				<Button
					type="primary"
					icon={<IoIosAddCircle/>}
					onClick={() => routesCustomer.goToCreate()}
				>
					Nouveau client
				</Button>
			</Flex>
		</Col>
		
		<Col span={24}>
			<CustomerTable customers={customers} loading={reqCustomerGetAll.isLoading}/>
		</Col>
		
		<CustomerFilter/>
	</Row>
}

