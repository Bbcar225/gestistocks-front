import {useState} from "react";
import SelectInfiniteScroll from "../../atoms/SelectInfinitScroll.tsx";
import saleService from "../../../services/tenant/saleService.ts";

export default function SelectScrollInfiniteSale({...props}) {
	const [link, setLink] = useState<string | undefined>(undefined);
	
	async function getData({search, page}: RequestApiInterface) {
		const params = {
			search,
			perPage: 10,
			page,
			sort_by: 'name',
			sort_direction: 'asc',
		};
		
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