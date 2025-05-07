import {Select} from "antd";
import {useEffect, useState} from "react";
import {useCategoryGetAll} from "../../../hooks/Api/tenant/CategoryHookAPI.ts";
import {useCategoryStore} from "../../../store/useCategoryStore.ts";

export default function SelectCategory({...props}) {
	const reqGetData = useCategoryGetAll()
	const [options, setOptions] = useState<BaseOptionType[]>([]);
	const {setFieldQueryParams, resetQueryParams} = useCategoryStore()
	
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