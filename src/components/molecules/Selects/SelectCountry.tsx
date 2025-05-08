import {Select} from "antd";
import {useEffect, useState} from "react";
import {useFormDataGetCountries} from "../../../hooks/Api/app/FormDataHookAPI.ts";

export default function SelectCategory({...props}) {
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
		filterOption={(input, option) => {
			const normalize = (text: string) =>
				text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
			
			const normalizedInput = normalize(input);
			const normalizedLabel = normalize(option?.label ?? "");
			
			return normalizedLabel.includes(normalizedInput);
		}}
		mode="tags"
		{...props}
	/>
}