import {useMutation, useQuery} from "react-query";
import productService from "../../../services/tenant/productService.ts";

export const productQueriesClients = {
	useProductGetAll: 'useProductGetAll'
}

export const useProductGetAll = (params?: HookApiInterface) => {
	return useQuery(
		[productQueriesClients.useProductGetAll, params?.queryParams],
		() => productService.GetAll(params?.queryParams),
		{enabled: params?.enabled}
	)
}

export const useProductCreate = () => {
	return useMutation(productService.Create)
}

export const useProductCreateUnitEquivalence = (id: number) => {
	return useMutation<ResponseApiInterface<UnitEquivalenceInterface>, never, UnitEquivalenceFormDataInterface>((formData) => productService.CreateUnitEquivalence(id, formData))
}

export const useProductCreateStock = (productId: number) => {
	return useMutation<ResponseApiInterface<StockInterface>, never, StockFormDataInterface>((formData) => productService.CreateStock(productId, formData))
}