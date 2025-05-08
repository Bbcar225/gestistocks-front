import {Button, Space, Table} from "antd";
import Link from "antd/es/typography/Link";
import dayjs from "dayjs";
import {formatDate} from "../../../constants/dateConstant.ts";
import {FaEdit} from "react-icons/fa";

export default function ContactTable({contacts, ...props}: { contacts: ContactInterface[] }) {
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
				key: 'Téléphone',
				title: 'Téléphone',
				render: (_, row) => {
					return <Link
						href={`tel:${row.phoneNumber}`}
					>
						{row.phoneNumber}
					</Link>
				}
			},
			{
				key: 'Poste',
				title: 'Poste',
				render: (_, row) => {
					return row.position.name
				}
			},
			{
				key: 'Date',
				title: 'Date',
				render: (_, row) => {
					return dayjs(row.created_at).format(formatDate)
				}
			},
			{
				key: 'Options',
				title: 'Option',
				render: (_, row) => {
					return <Space>
						<Button
							icon={<FaEdit/>}
							onClick={() => {
							}}
						/>
					</Space>
				}
			},
		]}
		dataSource={contacts}
		rowKey={(record) => record.id}
		className='text-nowrap'
		scroll={{
			x: true
		}}
		{...props}
	/>
}