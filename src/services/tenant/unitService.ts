import service from "../../providers/AxiosProvider.ts";

const unitService = {
	getAll: async (params: RequestApiInterface = {}): Promise<ResponseApiInterface<ResponsePaginateInterface<UnitInterface[]>>> => {
		return service.get(`/tenant/units`, {params})
	},
	create: async (data: UnitFormDataInterface): Promise<ResponseApiInterface<UnitInterface>> => {
		return service.post(`/tenant/units`, data)
	},
	getOne: async (id: number, params: RequestApiInterface = {}): Promise<ResponseApiInterface<UnitInterface>> => {
		return service.get(`/tenant/units/${id}`, {params})
	},
	update: async (id: number, data: UnitFormDataInterface): Promise<ResponseApiInterface<UnitInterface>> => {
		return service.put(`/tenant/units/${id}`, data)
	}
}

export default unitService