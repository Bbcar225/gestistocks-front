import {useEffect} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Badge, Card, Col, Descriptions, DescriptionsProps, Divider, Row, Spin, Tag} from "antd";
import {useParams} from "react-router-dom";
import {useProductGetOne} from "../../../hooks/Api/tenant/ProductHookAPI.ts";
import {useProductStore} from "../../../store/useProductStore.ts";
import {isMobile} from "react-device-detect";
import {formatPrice} from "../../../utils/priceUtils.ts";
import dayjs from "dayjs";
import StockTable from "../../molecules/StockTable.tsx";

export default function ProductIndexPage() {
	const {setSidebar} = useAppStore()
	const {product: productId} = useParams()
	const reqProductGetOne = useProductGetOne({
		id: productId
	})
	const {product, setProduct} = useProductStore()
	
	useEffect(() => {
		setSidebar({field: 'title', value: `Détails du produit : ${product?.name}`});
	}, [product, setSidebar]);
	
	useEffect(() => {
		if (reqProductGetOne.status === 'success') {
			const res = reqProductGetOne.data
			const product = res.data
			setProduct(product)
		}
	}, [reqProductGetOne.status, reqProductGetOne.data]);
	
	return <Spin spinning={reqProductGetOne.isLoading}>
		<Row gutter={[12, 12]}>
			<Col span={24}>
				<Card>
					{product && <DescriptionsProduct product={product}/>}
					<Divider/>
					{product && <DescriptionsProductSale product={product}/>}
				</Card>
			</Col>
			
			<Col span={24}>
				{product &&
			<Card
				title="Historique du stock"
			>
			  <StockTable
				  data={product.stocks}
				  unit={product.unit}
			  />
			</Card>}
			</Col>
		</Row>
	</Spin>
}

const DescriptionsProduct = ({product}: { product: ProductInterface }) => {
	const items: DescriptionsProps['items'] = [
		{
			key: 'ID',
			label: 'ID',
			children: <p>{product.id}</p>,
		},
		{
			key: 'Nom du produit',
			label: 'Nom du produit',
			children: <p>{product.name}</p>,
		},
		{
			key: 'SKU',
			label: 'SKU',
			children: <p>{product.sku}</p>,
		},
		{
			key: 'Catégorie',
			label: 'Catégorie',
			children: <p>{product.category.name}</p>,
		},
		{
			key: '5',
			label: 'Active',
			children: <Tag color={product.active ? 'green-inverse' : 'red-inverse'}>{product.active ? 'Oui' : 'Non'}</Tag>,
		},
	];
	
	return <Descriptions
		title="Informations globales"
		items={items}
		column={isMobile ? 1 : 3}
	/>
}

const DescriptionsProductSale = ({product}: { product: ProductInterface }) => {
	const items: DescriptionsProps['items'] = [
		{
			key: 'Unité',
			label: 'Unité',
			children: <p>{product.unit.name}</p>,
		},
		{
			key: 'Prix de vente',
			label: 'Prix de vente',
			children: <p>{formatPrice(product?.stock?.price || 0)}</p>,
		},
		{
			key: 'Quantité en stock',
			label: 'Quantité en stock',
			children: <p>{`${product?.stock?.quantity} ${product.unit.name}`}</p>,
		},
		{
			key: 'Dépot du stock',
			label: 'Dépot du stock',
			children: <p>{product?.stock?.warehouse.name}</p>,
		},
		{
			key: 'Date',
			label: 'Date',
			children: <p>{dayjs(product?.stock?.created_at).format('DD-MM-YYYY à HH:mm')}</p>,
		},
		{
			key: 'Santé du stock',
			label: 'Santé du stock',
			children: <Badge status='processing' color={product?.stock?.quantity < 2 ? 'green' : 'red'}/>,
		},
	];
	
	return <Descriptions
		title="Informations de vente"
		items={items}
		column={isMobile ? 1 : 3}
	/>
}