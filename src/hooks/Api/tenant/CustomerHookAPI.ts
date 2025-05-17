import {useMutation, useQuery} from "react-query";
import customerService from "../../../services/tenant/customerService.ts";

export const customerQueriesClients = {
	useCustomerGetAll: 'useCustomerGetAll',
	useCustomerGetOne: 'useCustomerGetOne'
}

export const useCustomerGetAll = (params?: HookApiInterface) => {
	return useQuery(
		[customerQueriesClients.useCustomerGetAll, params?.queryParams],
		() => customerService.GetAll(params?.queryParams),
		{
			enabled: params?.enabled
		}
	)
}

export const useCustomerCreate = () => {
	return useMutation(customerService.Create)
}

export const useCustomerUpdate = (id: number) => {
	return useMutation<ResponseApiInterface<CustomerInterface>, never, CustomerFormData>((formData) => customerService.Update(id, formData))
}

export const useCustomerGetOne = (params?: HookApiInterface) => {
	return useQuery(
		[customerQueriesClients.useCustomerGetOne, params?.queryParams, params?.id],
		() => customerService.GetOne(Number(params?.id)),
		{
			enabled: params?.enabled
		}
	)
}

export const useCustomerCreateContact = (customerId: number) => {
	return useMutation<ResponseApiInterface<ContactInterface>, never, ContactFormData>((formData) => customerService.CreateContact(customerId, formData))
}

export const useCustomerUpdateContact = (customerId: number, contactId: number) => {
	return useMutation<ResponseApiInterface<ContactInterface>, never, ContactFormData>((formData) => customerService.UpdateContact(customerId, contactId, formData))
}