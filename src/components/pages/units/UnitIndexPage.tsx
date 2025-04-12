import {useEffect} from "react";
import {useSidebarStore} from "../../../store/useAppStore.ts";
import {Space, Table} from "antd";

export default function UnitIndexPage() {
	const {setSidebar} = useSidebarStore()
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Unités'})
	}, [setSidebar]);
	
	return <>
		<Table
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
					render: (_, row) => <Space
						direction='horizontal'
					>
					
					</Space>
				},
			]}
			dataSource={[]}
		/>
	</>
}