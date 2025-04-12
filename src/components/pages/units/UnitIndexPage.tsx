import {useEffect, useState} from "react";
import {useSidebarStore} from "../../../store/useAppStore.ts";
import {Button, Col, Flex, Row, Space, Table} from "antd";
import {useUnitGetAll} from "../../../hooks/Api/tenant/UnitHookAPI.ts";
import {tablePagination} from "../../../constants/tableConstant.ts";
import {IoIosAddCircle} from "react-icons/io";
import {useUnitStore} from "../../../store/useUnitStore.ts";

export default function UnitIndexPage() {
	const {setSidebar} = useSidebarStore()
	const reqUnitGetAll = useUnitGetAll()
	const [units, setUnits] = useState<UnitInterface[]>([])
	const {pagination, queryParams, setFieldPagination, setFieldQueryParams} = useUnitStore()
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Unités'})
	}, [setSidebar]);
	
	useEffect(() => {
		if (reqUnitGetAll.isSuccess) {
			const data = reqUnitGetAll.data.data
			setFieldPagination({field: 'total', value: data.meta.total})
			setUnits(data.data || [])
		}
	}, [reqUnitGetAll.data, reqUnitGetAll.isSuccess, setFieldPagination]);
	
	return <Row gutter={[24, 12]}>
		<Col span={24}>
			<Flex justify='end'>
				<Button
					type="primary"
					icon={<IoIosAddCircle/>}
				>Nouvelle unité</Button>
			</Flex>
		</Col>
		
		<Col span={24}>
			<Table
				className="text-nowrap"
				rowKey={(row) => row.id}
				loading={reqUnitGetAll.isLoading}
				pagination={{
					...tablePagination,
					total: pagination.total,
					current: queryParams.page,
					pageSize: queryParams.per_page,
				}}
				dataSource={units}
				columns={[
					{
						key: 'id',
						title: 'ID',
						render: (_, row) => row.id
					},
					{
						key: 'name',
						title: 'Nom',
						render: (_, row) => row.name
					},
					{
						key: 'sort_name',
						title: 'Nom court',
						render: (_, row) => row.sort_name
					},
					{
						key: 'options',
						title: 'Options',
						render: () => <Space
							direction='horizontal'
						>
						</Space>
					},
				]}
				onChange={(pagination) => {
					setFieldQueryParams({field: 'page', value: pagination.current})
					setFieldQueryParams({field: 'per_page', value: pagination.pageSize})
				}}
			/>
		</Col>
	</Row>
}