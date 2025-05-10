import {useMutation, useQuery} from "react-query";
import supplierService from "../../../services/tenant/supplierService.ts";

export const supplierQueriesClients = {
	useSupplierGetAll: 'useSupplierGetAll',
	useSupplierGetOne: 'useSupplierGetOne'
}

export const useSupplierGetAll = (params?: HookApiInterface) => {
	return useQuery(
		[supplierQueriesClients.useSupplierGetAll, params?.queryParams],
		() => supplierService.GetAll(params?.queryParams),
		{
			enabled: params?.enabled
		}
	)
}

export const useSupplierCreate = () => {
	return useMutation(supplierService.Create)
}

export const useSupplierUpdate = (id: number) => {
	return useMutation<ResponseApiInterface<SupplierInterface>, never, SupplierFormData>((formData) => supplierService.Update(id, formData))
}

export const useSupplierGetOne = (params?: HookApiInterface) => {
	return useQuery(
		[supplierQueriesClients.useSupplierGetOne, params?.queryParams, params?.id],
		() => supplierService.GetOne(Number(params?.id)),
		{
			enabled: params?.enabled
		}
	)
}

export const useSupplierCreateContact = (supplierId: number) => {
	return useMutation<ResponseApiInterface<ContactInterface>, never, ContactFormData>((formData) => supplierService.CreateContact(supplierId, formData))
}

export const useSupplierUpdateContact = (supplierId: number, contactId: number) => {
	return useMutation<ResponseApiInterface<ContactInterface>, never, ContactFormData>((formData) => supplierService.UpdateContact(supplierId, contactId, formData))
}