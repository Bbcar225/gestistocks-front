import service from "../../providers/AxiosProvider.ts";

const saleService = {
	Create: (data: SaleFormData): Promise<ResponseApiInterface<SaleInterface>> => {
		return service.post(`/tenant/sales`, data)
	},
	GetAll: (params?: RequestApiInterface): Promise<ResponseApiInterface<ResponsePaginateInterface<SaleInterface[]>>> => {
		return service.get(`/tenant/sales`, {params})
	},
	GetOne: (id: number): Promise<ResponseApiInterface<SaleInterface>> => {
		return service.get(`/tenant/sales/${id}`)
	},
	Update: (id: number, data: SaleFormData): Promise<ResponseApiInterface<SaleInterface>> => {
		return service.put(`/tenant/sales/${id}`, data)
	},
	DownloadInvoice: (id: number): Promise<Blob> => {
		return service.get(`/tenant/sales/${id}/invoice`, {
			responseType: 'blob',
		})
	}
}

export default saleService