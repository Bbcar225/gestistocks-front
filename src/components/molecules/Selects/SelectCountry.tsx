import {Select} from "antd";
import {useEffect, useState} from "react";
import {useFormDataGetCountries} from "../../../hooks/Api/app/FormDataHookAPI.ts";
import {filterOptionSelect} from "../../../utils/formUtils.ts";

export default function SelectCountry({...props}) {
	const reqGetData = useFormDataGetCountries()
	const [options, setOptions] = useState<BaseOptionType[]>([]);
	
	useEffect(() => {
		if (reqGetData.isSuccess) {
			const res = reqGetData.data
			const data = res.data
			
			const options: BaseOptionType[] = data.map((item) => {
				return {
					label: item.name,
					value: item.name
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
		{...props}
	/>
}