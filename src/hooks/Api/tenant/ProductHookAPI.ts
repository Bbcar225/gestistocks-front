import {useMutation, useQuery} from "react-query";
import productService from "../../../services/tenant/productService.ts";

export const productQueriesClients = {
	useProductGetAll: 'useProductGetAll',
	useProductGetOne: 'useProductGetOne'
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

export const useProductUpdateUnitEquivalence = (productId: number, unitEquivalenceId: number) => {
	return useMutation<ResponseApiInterface<UnitEquivalenceInterface>, never, UnitEquivalenceFormDataInterface>((formData) => productService.UpdateUnitEquivalence(productId, unitEquivalenceId, formData))
}

export const useProductCreateStock = (productId: number) => {
	return useMutation<ResponseApiInterface<StockInterface>, never, StockFormDataInterface>((formData) => productService.CreateStock(productId, formData))
}

export const useProductActiveStock = (productId: number, stockId: number) => {
	return useMutation(() => productService.ActiveStock(productId, stockId))
}

export const useProductGetOne = (params?: HookApiInterface) => {
	return useQuery(
		[productQueriesClients.useProductGetOne, params?.id],
		() => productService.GetOne(Number(params?.id)),
		{
			enabled: params?.enabled
		}
	)
}

export const useProductUpdate = (id: number) => {
	return useMutation<ResponseApiInterface<ProductInterface>, never, ProductFormDataInterface>((formData) => productService.Update(id, formData))
}