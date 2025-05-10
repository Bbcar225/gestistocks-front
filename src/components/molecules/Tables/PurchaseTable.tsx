import {Button, Space, Table, Typography} from "antd";
import {tablePagination} from "../../../constants/tableConstant.ts";
import SupplierFormModal from "../../organisms/Modals/SupplierFormModal.tsx";
import {useState} from "react";
import {useSupplierStore} from "../../../store/useSupplierStore.ts";
import {formatPrice} from "../../../utils/priceUtils.ts";
import dayjs from "dayjs";
import {formatDate} from "../../../constants/dateConstant.ts";
import {FaEye} from "react-icons/fa";
import {useRoutesPurchase} from "../../../routes/purchaseRoutes.ts";
import {usePurchaseStore} from "../../../store/usePurchaseStore.ts";

export default function PurchaseTable({purchases, ...props}: { purchases: PurchaseInterface[] }) {
	const [openModalSupplier, setOpenModalSupplier] = useState(false)
	const {setSupplier} = useSupplierStore()
	const reqRoutesPurchase = useRoutesPurchase()
	const {setFieldQueryParams, pagination, queryParams} = usePurchaseStore()
	
	return <>
		<Table
			columns={[
				{
					key: "ID",
					title: "ID",
					render: (_, row) => {
						return row.id
					}
				},
				{
					key: "Référence",
					title: "Référence",
					render: (_, row) => {
						return row.reference
					}
				},
				{
					key: "Fournisseur",
					title: "Fournisseur",
					render: (_, row) => {
						return <Typography.Link
							onClick={() => {
								setOpenModalSupplier(true)
								setSupplier(row.supplier)
							}}
						>
							{row.supplier.name}
						</Typography.Link>
					}
				},
				{
					key: "Nombre de produit",
					title: "Nombre de produit",
					render: (_, row) => {
						return row.items_count
					}
				},
				{
					key: "Montant total",
					title: "Montant total",
					render: (_, row) => {
						return formatPrice(row.total_price)
					}
				},
				{
					key: "Date",
					title: "Date",
					render: (_, row) => {
						return dayjs(row.date).format(formatDate)
					}
				},
				{
					key: "Options",
					title: "Options",
					render: (_, row) => {
						return <Space>
							<Button
								icon={<FaEye/>}
								type="primary"
								onClick={() => reqRoutesPurchase.goToShow({id: row.id})}
							/>
						</Space>
					}
				},
			]}
			dataSource={purchases}
			rowKey={(record) => record.id}
			className='text-nowrap'
			scroll={{
				x: true
			}}
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
		
		<SupplierFormModal
			isOpenModal={openModalSupplier}
			onClose={() => {
				setOpenModalSupplier(false)
			}}
		/>
	</>
}