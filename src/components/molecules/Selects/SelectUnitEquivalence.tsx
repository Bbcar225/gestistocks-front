import {Select} from "antd";
import {useEffect, useState} from "react";
import {filterOptionSelect} from "../../../utils/formUtils.ts";
import {useProductGetAllUnitEquivalence} from "../../../hooks/Api/tenant/ProductHookAPI.ts";

export default function SelectUnitEquivalence({productId, labelInValue = false, unitEquivalences, ...props}: {
	productId?: number,
	labelInValue?: boolean,
	unitEquivalences?: UnitEquivalenceInterface[]
}) {
	const reqGetData = useProductGetAllUnitEquivalence({
		id: productId,
		enabled: unitEquivalences === undefined
	})
	const [options, setOptions] = useState<BaseOptionType[]>([]);
	
	useEffect(() => {
		if (reqGetData.isSuccess) {
			const res = reqGetData.data
			const data = res.data
			const options: BaseOptionType[] = data.map((item) => {
				return {
					label: item.unit.name,
					value: item.unit.id
				}
			})
			
			setOptions(options)
		}
	}, [reqGetData.data, reqGetData.isSuccess]);
	
	useEffect(() => {
		if (unitEquivalences && unitEquivalences?.length > 0) {
			const options: BaseOptionType[] = unitEquivalences.map((item) => {
				return {
					label: item.unit.name,
					value: item.unit.id
				}
			})
			
			setOptions(options)
		}
	}, [unitEquivalences]);
	
	return <Select
		loading={reqGetData.isLoading}
		options={options}
		showSearch
		filterOption={filterOptionSelect}
		labelInValue={labelInValue}
		{...props}
	/>
}