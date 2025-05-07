import {Select} from "antd";
import {useUnitGetAll} from "../../../hooks/Api/tenant/UnitHookAPI.ts";
import {useEffect, useState} from "react";
import {useUnitStore} from "../../../store/useUnitStore.ts";

export default function SelectUnit({...props}) {
	const reqGetData = useUnitGetAll()
	const [options, setOptions] = useState<BaseOptionType[]>([]);
	const {setFieldQueryParams, resetQueryParams} = useUnitStore()
	
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
					label: item.name,
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