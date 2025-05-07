import {Table} from "antd";
import {formatPrice} from "../../../utils/priceUtils.ts";
import dayjs from "dayjs";
import ToggleActiveStock from "../ToggleActiveStock.tsx";

export default function StockTable({data, unit, ...props}: {
	data: StockInterface[],
	unit?: UnitInterface,
}) {
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
				key: 'Dépôt',
				title: 'Dépôt',
				render: (_, row) => {
					return row.warehouse.name
				}
			},
			{
				key: 'Quantité',
				title: 'Quantité',
				render: (_, row) => {
					return `${row.quantity} ${unit?.name || ""}`
				}
			},
			{
				key: 'Prix de vente',
				title: 'Prix de vente',
				render: (_, row) => {
					return formatPrice(row.price)
				}
			},
			{
				key: 'Active',
				title: 'Active',
				render: (_, row) => {
					return <ToggleActiveStock
						stock={row}
					/>
				}
			},
			{
				key: 'Date',
				title: 'Date',
				render: (_, row) => {
					return dayjs(row.created_at).format('DD-MM-YYYY à HH:mm')
				}
			},
		]}
		dataSource={data}
		rowKey={row => row.id}
		scroll={{
			x: true,
		}}
		className="text-nowrap"
		{...props}
	/>
}