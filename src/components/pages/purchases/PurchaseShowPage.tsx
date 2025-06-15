import {useParams} from "react-router-dom";
import {useAppStore} from "../../../store/useAppStore.ts";
import {usePurchaseGetOne} from "../../../hooks/Api/tenant/PurchaseHookAPI.ts";
import {useEffect, useState} from "react";
import {
	Button,
	Card,
	Col,
	Flex,
	Image,
	Row,
	Spin,
	Table,
	Typography
} from "antd";
import Link from "antd/es/typography/Link";
import {useSupplierStore} from "../../../store/useSupplierStore.ts";
import dayjs from "dayjs";
import {formatDate} from "../../../constants/dateConstant.ts";
import {MdNumbers} from "react-icons/md";
import {TbUserDollar} from "react-icons/tb";
import {BsCalendar2DateFill} from "react-icons/bs";
import {FaEdit} from "react-icons/fa";
import {formatPrice} from "../../../utils/priceUtils.ts";
import useRoutesPurchase from "../../../hooks/routes/PurchaseRoutesHook.ts";
import useRoutesProduct from "../../../hooks/routes/ProductRoutesHook.ts";
import {BiSolidContact} from "react-icons/bi";

export default function PurchaseShowPage() {
	const {setSidebar} = useAppStore()
	const {purchase: purchaseId} = useParams()
	const reqPurchaseGetOne = usePurchaseGetOne({
		id: purchaseId
	})
	const [purchase, setPurchase] = useState<PurchaseInterface | undefined>(undefined)
	const routesPurchase = useRoutesPurchase()
	
	useEffect(() => {
		if (purchase) {
			setSidebar({field: 'title', value: `Détails achat : ${purchase?.reference}`})
		}
	}, [setSidebar, purchase]);
	
	useEffect(() => {
		if (reqPurchaseGetOne.status === 'success') {
			const res = reqPurchaseGetOne.data
			const purchase = res.data
			setPurchase(purchase)
		}
	}, [reqPurchaseGetOne.data, reqPurchaseGetOne.status]);
	
	return <Spin spinning={reqPurchaseGetOne.isLoading}>
		<Row gutter={[12, 12]}>
			<Col span={24}>
				<Card
					title={<>
						Informations globales
						<Button
							type='link'
							icon={<FaEdit/>}
							onClick={() => {
								routesPurchase.goToUpdate({
									id: purchase?.id
								})
							}}
						/>
					</>}
				>
					{purchase && <PurchaseDescriptions purchase={purchase}/>}
				</Card>
			</Col>
			
			<Col span={24}>
				<Card
					title="Liste des produits"
				>
					<PurchaseItems
						items={purchase?.items || []}
					/>
				</Card>
			</Col>
		</Row>
	</Spin>
}

const PurchaseDescriptions = ({purchase}: { purchase: PurchaseInterface }) => {
	const {setOpenModal} = useAppStore()
	const {setSupplier} = useSupplierStore()
	
	return <Flex
		justify='space-between'
		className="flex-col md:flex-row justify-between gap-2 !mx-0 md:!mx-5"
	>
		<div>
			<MdNumbers className='text-[30px]'/>
			Référence
			<Typography.Title level={5}>
				{purchase.reference}
			</Typography.Title>
		</div>
		
		<div>
			<TbUserDollar className='text-[30px]'/>
			Fournisseur
			<Typography.Title level={5}>
				<Link
					onClick={() => {
						setOpenModal(true)
						setSupplier(purchase.supplier)
					}}
				>
					{purchase.supplier.name}
				</Link>
			</Typography.Title>
		</div>
		
		<div>
			<BiSolidContact className='text-[30px]'/>
			Contact
			<Typography.Title level={5}>
				<Link
					href={`tel:${purchase.contact.phoneNumber}`}
				>
					{`${purchase.contact.name} - ${purchase.contact.phoneNumber}`}
				</Link>
			</Typography.Title>
		</div>
		
		<div>
			<BsCalendar2DateFill className='text-[30px]'/>
			Date
			<Typography.Title level={5}>
				{dayjs(purchase.date).format(formatDate)}
			</Typography.Title>
		</div>
	</Flex>
}

const PurchaseItems = ({items, ...props}: { items: PurchaseItem[] }) => {
	const routesProduct = useRoutesProduct()
	
	return <Table
		columns={[
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
					src={row.product.gallery.url}
					alt={row.product.name}
					className="object-cover"
				/>
			},
			{
				key: "name",
				title: "Nom",
				render: (_, row) => <Link
					onClick={() => routesProduct.goToProductShow(row.product)}
				>
					{`${row.product.name} - ${row.product.sku}`}
				</Link>
			},
			{
				key: "quantity",
				title: "Quantité",
				render: (_, row) => {
					return `${row.quantity} ${row.unit.name}`
				}
			},
			{
				key: "unit_price",
				title: "Prix unitaire",
				render: (_, row) => {
					return formatPrice(row.unit_price || 0)
				}
			},
			{
				key: "total_price",
				title: "Prix total",
				render: (_, row) => {
					return formatPrice(row.total_price || 0)
				}
			},
		]}
		dataSource={items}
		className="text-nowrap"
		scroll={{x: true}}
		rowKey={(record) => record.id}
		{...props}
	/>
}