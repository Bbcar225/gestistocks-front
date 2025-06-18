import {Table} from "antd";
import dayjs from "dayjs";
import {formatDate} from "../../../constants/dateConstant.ts";
import {tablePagination} from "../../../constants/tableConstant.ts";

export default function UserTable({users, ...props}: { users: UserInterface[] }) {
	return <Table
		columns={[
			{
				key: 'ID',
				title: 'ID',
				render: (_, row) => {
					return row.id
				}
			},
			{
				key: 'Nom complet',
				title: 'Nom complet',
				render: (_, row) => {
					return row.name
				}
			},
			{
				key: 'Email',
				title: 'Email',
				render: (_, row) => {
					return row.email
				}
			},
			{
				key: 'Date',
				title: 'Date',
				render: (_, row) => {
					return dayjs(row.created_at).format(formatDate)
				}
			}
		]}
		dataSource={users}
		rowKey={(record) => record.id}
		className='text-nowrap'
		scroll={{
			x: true
		}}
		pagination={{
			...tablePagination,
		}}
		{...props}
	/>
}