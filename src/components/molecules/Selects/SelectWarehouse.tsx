import {Select} from "antd";
import {useEffect, useState} from "react";
import {useWarehouseGetAll} from "../../../hooks/Api/tenant/WarehouseHookAPI.ts";
import {useWarehouseStore} from "../../../store/useWarehouseStore.ts";

export default function SelectWarehouse({...props}) {
	const {setFieldQueryParams, resetQueryParams, queryParams} = useWarehouseStore()
	const reqGetData = useWarehouseGetAll({queryParams})
	const [options, setOptions] = useState<BaseOptionType[]>([]);
	
	useEffect(() => {
		setFieldQueryParams({field: 'per_page', value: 5000000});
		
		return () => {
			resetQueryParams()
		};
	}, [resetQueryParams, setFieldQueryParams]);
	
	
	useEffect(() => {
		if (reqGetData.isSuccess) {
			const res = reqGetData.data
			const data = res.data.data
			const options: BaseOptionType[] = data.map((item) => {
				return {
					label: `${item.name} - ${item.location}`,
					value: item.id
				}
			})
			
			setOptions(options)
		}
	}, [reqGetData.data, reqGetData.isSuccess]);
	
	return <Select
		loading={reqGetData.isLoading}
		options={options}
		showSearch
		{...props}
	/>
}