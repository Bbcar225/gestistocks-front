import {Select} from "antd";
import {useEffect, useState} from "react";
import {filterOptionSelect} from "../../../utils/formUtils.ts";
import {useCustomerGetOne} from "../../../hooks/Api/tenant/CustomerHookAPI.ts";

export default function SelectContact({customerId, enabled, disabled, labelInValue, ...props}: {
	customerId: number,
	enabled: boolean,
	disabled?: boolean,
	labelInValue?: boolean
}) {
	const reqGetData = useCustomerGetOne({
		id: customerId,
		enabled
	})
	const [options, setOptions] = useState<BaseOptionType[]>([])
	
	useEffect(() => {
		if (reqGetData.status === 'success') {
			const res = reqGetData.data
			const data = res?.data?.contacts || []
			setOptions(data.map((item) => {
				return {
					label: item.name,
					value: item.id
				}
			}))
		}
	}, [reqGetData.status]);
	
	return <Select
		loading={reqGetData.isLoading}
		disabled={reqGetData.isLoading || disabled}
		options={options}
		showSearch
		filterOption={filterOptionSelect}
		labelInValue={labelInValue}
		placeholder='Contacts'
		{...props}
	/>
}