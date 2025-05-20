import {Button, Card, Col, DatePicker, Drawer, Flex, FloatButton, Form, Row} from "antd";
import {isMobile} from "react-device-detect";
import {useEffect, useState} from "react";
import {useAppStore} from "../../store/useAppStore.ts";
import SelectScrollInfiniteCustomer from "../molecules/Selects/SelectScrollInfiniteCustomer.tsx";
import SelectContact from "../molecules/Selects/SelectContact.tsx";
import ProductsCard from "../molecules/ProductsCard.tsx";
import SearchInput from "../atoms/SearchInput.tsx";
import SelectCategory from "../molecules/Selects/SelectCategory.tsx";
import {FaShoppingCart} from "react-icons/fa";
import {BsCartCheckFill, BsCartXFill} from "react-icons/bs";

export default function PosPage() {
	const {setSidebar} = useAppStore()
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Système POS'})
	}, [setSidebar]);
	
	return <Row gutter={[12, 12]}>
		<Col span={isMobile ? 24 : 8}>
			<Card>
				<Form.Item
					label="Date"
					layout='vertical'
					required
				>
					<DatePicker className='w-full'/>
				</Form.Item>
				
				<Form.Item
					label="Client"
					layout='vertical'
					required
				>
					<SelectScrollInfiniteCustomer/>
				</Form.Item>
				
				<Form.Item
					label="Contact"
					layout='vertical'
					required
				>
					<SelectContact customerId={1} enabled={false}/>
				</Form.Item>
			</Card>
		</Col>
		
		<Col span={isMobile ? 24 : 16}>
			<Row gutter={[12, 12]}>
				<Col span={24}>
					<FilterProductsCart/>
				</Col>
				
				<Col span={24}>
					<Card
						styles={{
							body: {
								padding: '10px'
							}
						}}
					>
						<ProductsCard/>
					</Card>
				</Col>
			</Row>
		</Col>
		
		<ResumeCart/>
	</Row>
}

const ResumeCart = () => {
	const [open, setOpen] = useState(false);
	
	const showDrawer = () => {
		setOpen(true);
	};
	
	const onClose = () => {
		setOpen(false);
	};
	
	return (
		<>
			<FloatButton
				icon={<FaShoppingCart className='!w-[25px] !h-[25px] !ml-[-3px]'/>}
				badge={{count: 5, color: '#FD7E14'}}
				type='primary'
				className='!w-[55px] !h-[55px]'
				onClick={showDrawer}
			/>
			<Drawer
				title="Panier"
				closable={{'aria-label': 'Close Button'}}
				onClose={onClose}
				open={open}
				footer={
					<Row gutter={[12, 12]}>
						<Col span={12}>
							<Button
								type='primary'
								className='w-full'
								icon={<BsCartCheckFill/>}
							>
								Valider
							</Button>
						</Col>
						
						<Col span={12}>
							<Button
								className='w-full'
								icon={<BsCartXFill/>}
								variant='outlined'
								color='danger'
							>
								Vider le panier
							</Button>
						</Col>
					</Row>
				}
			>
				dcew
			</Drawer>
		</>
	);
};

const FilterProductsCart = () => {
	return <Card>
		<Flex justify='space-around' className='!w-full' gap='small'>
			<SearchInput/>
			
			<SelectCategory
				className='w-full'
				allowClear={true}
			/>
		</Flex>
	</Card>
}