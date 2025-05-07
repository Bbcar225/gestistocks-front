import {notification, Switch} from "antd";
import {productQueriesClients, useProductActiveStock} from "../../hooks/Api/tenant/ProductHookAPI.ts";
import {useEffect, useState} from "react";
import {config} from "../../constants/notifcationConstant.ts";
import {successUpdate} from "../../constants/messagesConstant.ts";
import {useQueryClient} from "react-query";

export default function ToggleActiveStock({stock, ...props}: { stock: StockInterface }) {
	const reqProductActiveStock = useProductActiveStock(stock.product_id, stock.id)
	const [checked, setChecked] = useState<boolean>(false)
	const [notificationInstance, contextHolder] = notification.useNotification(config);
	const queryClient = useQueryClient()
	
	useEffect(() => {
		setChecked(stock.active)
	}, [stock]);
	
	useEffect(() => {
		if (reqProductActiveStock.status === 'success') {
			setChecked(true)
			notificationInstance.success({
				message: successUpdate
			})
			queryClient.invalidateQueries(productQueriesClients.useProductGetOne).then()
			window.scrollTo(0, 0);
		}
	}, [notificationInstance, queryClient, reqProductActiveStock.status]);
	
	return <>
		<Switch
			checked={checked}
			disabled={stock.quantity <= 0 || stock.active}
			onChange={() => reqProductActiveStock.mutate()}
			{...props}
		/>
		{contextHolder}
	</>
}