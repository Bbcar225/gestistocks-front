import {useParams} from "react-router-dom";
import {useAppStore} from "../../../store/useAppStore.ts";
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
import dayjs from "dayjs";
import {formatDate} from "../../../constants/dateConstant.ts";
import {MdNumbers} from "react-icons/md";
import {TbUserDollar} from "react-icons/tb";
import {BsCalendar2DateFill} from "react-icons/bs";
import {FaEdit} from "react-icons/fa";
import {formatPrice} from "../../../utils/priceUtils.ts";
import {useRoutesProduct} from "../../../routes/productRoutes.ts";
import {useSaleGetOne} from "../../../hooks/Api/tenant/SaleHookAPI.ts";
import {SaleInterface, SaleItemInterface} from "../../../interfaces/models/SaleInterface";
import {useRoutesSale} from "../../../routes/saleRoutes.ts";
import {useRoutesCustomer} from "../../../routes/customerRoutes.ts";
import {BiSolidContact} from "react-icons/bi";
import {FaMoneyBillTrendUp} from "react-icons/fa6";

export default function SaleShowPage() {
	const {setSidebar} = useAppStore()
	const {sale: saleId} = useParams()
	const reqPurchaseGetOne = useSaleGetOne({
		id: saleId
	})
	const [sale, setSale] = useState<SaleInterface | undefined>(undefined)
	const routesSale = useRoutesSale()
	
	useEffect(() => {
		if (sale) {
			setSidebar({field: 'title', value: `Détails vente : ${sale?.reference}`})
		}
	}, [setSidebar, sale]);
	
	useEffect(() => {
		if (reqPurchaseGetOne.status === 'success') {
			const res = reqPurchaseGetOne.data
			const sale = res.data
			setSale(sale)
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
								routesSale.goToUpdate({
									id: sale?.id
								})
							}}
						/>
					</>}
				>
					{sale && <SaleDescriptions sale={sale}/>}
				</Card>
			</Col>
			
			<Col span={24}>
				<Card
					title="Liste des produits"
				>
					<SaleItems
						items={sale?.items || []}
					/>
				</Card>
			</Col>
		</Row>
	</Spin>
}

const SaleDescriptions = ({sale}: { sale: SaleInterface }) => {
	const routesCustomer = useRoutesCustomer()
	
	return <Flex
		justify='space-between'
		className="flex-col md:flex-row justify-between gap-2 !mx-0 md:!mx-5"
	>
		<div>
			<MdNumbers className='text-[30px]'/>
			Référence
			<Typography.Title level={5}>
				{sale.reference}
			</Typography.Title>
		</div>
		
		<div>
			<FaMoneyBillTrendUp className='text-[30px]'/>
			Prix total
			<Typography.Title level={5}>
				{formatPrice(sale.total_price)}
			</Typography.Title>
		</div>
		
		<div>
			<TbUserDollar className='text-[30px]'/>
			Client
			<Typography.Title level={5}>
				<Link
					onClick={() => routesCustomer.goToShow(({id: sale.customer.id}))}
				>
					{sale.customer.name}
				</Link>
			</Typography.Title>
		</div>
		
		<div>
			<BiSolidContact className='text-[30px]'/>
			Contact
			<Typography.Title level={5}>
				<Link
					href={`tel:${sale.contact.phoneNumber}`}
				>
					{`${sale.contact.name} - ${sale.contact.phoneNumber}`}
				</Link>
			</Typography.Title>
		</div>
		
		<div>
			<BsCalendar2DateFill className='text-[30px]'/>
			Date
			<Typography.Title level={5}>
				{dayjs(sale.date).format(formatDate)}
			</Typography.Title>
		</div>
	</Flex>
}

const SaleItems = ({items, ...props}: { items: SaleItemInterface[] }) => {
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
				key: "origin_price",
				title: "Prix d'origine",
				render: (_, row) => {
					return formatPrice(row.origin_price || 0)
				}
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