import service from "../../providers/AxiosProvider.ts";

const warehouseService = {
	GetAll: (params: RequestApiInterface = {}): Promise<ResponseApiInterface<ResponsePaginateInterface<WarehouseInterface[]>>> => {
		return service.get(`/tenant/warehouses`, {params});
	},
	Create: (data: WarehouseFormDataInterface): Promise<ResponseApiInterface<WarehouseInterface>> => {
		return service.post(`/tenant/warehouses`, data);
	},
	Update: (id: number, data: WarehouseFormDataInterface): Promise<ResponseApiInterface<WarehouseInterface>> => {
		return service.put(`/tenant/warehouses/${id}`, data);
	},
}

export default warehouseService