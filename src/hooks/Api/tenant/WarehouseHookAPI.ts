import {useMutation, useQuery} from "react-query";
import warehouseService from "../../../services/tenant/warehouseService.ts";

export const warehouseQueriesClients = {
	useWarehouseGetAll: 'useWarehouseGetAll'
}

export const useWarehouseGetAll = (params?: HookApiInterface & {queryParams: RequestApiInterface}) => {
	return useQuery(
		[warehouseQueriesClients.useWarehouseGetAll, params?.queryParams],
		() => warehouseService.GetAll(params?.queryParams),
		{
			enabled: params?.enabled
		}
	)
}

export const useWarehouseCreate = () => {
	return useMutation<ResponseApiInterface<WarehouseInterface>, unknown, WarehouseFormDataInterface>((formData) => warehouseService.Create(formData))
}

export const useWarehouseUpdate = (id: number) => {
	return useMutation<ResponseApiInterface<WarehouseInterface>, unknown, WarehouseFormDataInterface>((formData) => warehouseService.Update(id, formData))
}