import {Select} from "antd";
import {useEffect, useState} from "react";
import {useCategoryGetAll} from "../../../hooks/Api/tenant/CategoryHookAPI.ts";
import {filterOptionSelect} from "../../../utils/formUtils.ts";

export default function SelectCategory({...props}) {
	const reqGetData = useCategoryGetAll({
		queryParams: {
			per_page: 5000000
		}
	})
	const [options, setOptions] = useState<BaseOptionType[]>([]);
	
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
		filterOption={filterOptionSelect}
		placeholder='Catégories'
		{...props}
	/>
}