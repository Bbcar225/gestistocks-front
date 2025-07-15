import {useState} from "react";
import SelectInfiniteScroll from "../../atoms/SelectInfinitScroll.tsx";
import saleService from "../../../services/tenant/saleService.ts";
import {BaseSelectProps} from "rc-select/lib/BaseSelect";
import {cleanQueryParams} from "../../../utils/reqApiUtils.ts";

export default function SelectScrollInfiniteSale({additionalQueryParams = {}, ...props}: Partial<BaseSelectProps> & {
	additionalQueryParams?: SaleQueryParamsInterface,
}) {
	const [link, setLink] = useState<string | undefined>(undefined);
	
	async function getData({search, page}: RequestApiInterface) {
		const params = cleanQueryParams({
			search,
			per_page: 10,
			page,
			sort_by: 'name',
			sort_direction: 'asc',
			...additionalQueryParams
		});
		
		return saleService.GetAll(params).then(({data: res}): BaseOptionType[] => {
			const data = res.data
			const links = res.links;
			setLink(links.next);
			return data.map(item => {
				return {
					label: item.reference,
					value: item.id
				};
			});
		});
	}
	
	return <SelectInfiniteScroll
		hasMore={link}
		fetchOptions={getData}
		allowClear
		placeholder="Ventes"
		{...props}
	/>;
}