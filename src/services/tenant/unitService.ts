import service from "../../providers/AxiosProvider.ts";

const unitService = {
	getAll: async (params: RequestApiInterface = {}): Promise<ResponseApiInterface<ResponsePaginateInterface<UnitInterface[]>>> => {
		return service.get(`/tenant/units`, {params})
	},
	create: async (data: UnitFormDataInterface):Promise<ResponseApiInterface<UnitInterface>> => {
		return service.post(`/tenant/units`, data)
	}
}

export default unitService