import {useQuery} from "react-query";
import productService from "../../../services/tenant/productService.ts";

export const productQueriesClients = {
	useProductGetAll: 'useProductGetAll'
}

export const useProductGetAll = (params?: HookApiInterface) => {
	return useQuery(
		[productQueriesClients.useProductGetAll],
		() => productService.GetAll(),
		{enabled: params?.enabled}
	)
}