import {Button, Image, Space, Table, Tag} from "antd";
import {formatPrice} from "../../../utils/priceUtils.ts";
import {FaEye} from "react-icons/fa";
import {tablePagination} from "../../../constants/tableConstant.ts";
import {ColumnType} from "antd/es/table/interface";
import {useProductStore} from "../../../store/useProductStore.ts";
import useRoutesProduct from "../../../hooks/routes/ProductRoutesHook.ts";

export default function ProductTable({loading, products, columns, ...props}: {
	loading?: boolean,
	products: ProductInterface[],
	columns?: ColumnType<ProductInterface>[]
}) {
	const routesProduct = useRoutesProduct()
	const {pagination, queryParams, setFieldQueryParams} = useProductStore()
	
	if (!columns || columns.length <= 0) {
		columns = [
			{
				key: "id",
				title: "ID",
				render: (_, row) => row.id
			},
			{
				key: "image",
				title: "Image",
				render: (_, row) => <Image
					width={70}
					height={70}
					src={row.gallery.url}
					alt={row.name}
					className="object-cover"
				/>
			},
			{
				key: "name",
				title: "Nom",
				render: (_, row) => `${row.name} - ${row.sku}`
			},
			{
				key: "price",
				title: "Prix",
				render: (_, row) => {
					const stock = row.stock
					return formatPrice(stock?.price || 0)
				}
			},
			{
				key: "quantity",
				title: "Quantité",
				render: (_, row) => {
					const stock = row.stock
					const unit = row.unit
					return <Tag
						color={stock?.low_quantity || typeof stock?.low_quantity === 'undefined' ? 'red' : 'green'}
						className='font-bold'
					>
						{`${row.quantity || 0} ${unit.name}`}
					</Tag>
				}
			},
			{
				key: "options",
				title: "Options",
				render: (_, row) => {
					return <Space>
						<Button
							type="primary"
							icon={<FaEye/>}
							onClick={() => routesProduct.goToProductShow(row)}
						/>
					</Space>
				}
			}
		]
	}
	
	return <Table
		className="text-nowrap"
		scroll={{x: true}}
		loading={loading}
		rowKey={(row) => row.id}
		dataSource={products}
		columns={columns}
		pagination={{
			...tablePagination,
			total: pagination.total,
			current: queryParams.page,
			pageSize: queryParams.per_page,
		}}
		onChange={(pagination) => {
			setFieldQueryParams({field: 'page', value: pagination.current})
			setFieldQueryParams({field: 'per_page', value: pagination.pageSize})
		}}
		{...props}
	/>
}