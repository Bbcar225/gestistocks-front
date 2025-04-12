import service from "../../providers/AxiosProvider.ts";

const unitService = {
	getAll: async (params: RequestApiInterface = {}): Promise<ResponseApiInterface<ResponsePaginateInterface<UnitInterface[]>>> => {
		return service.get(`/tenant/units`, {params})
	}
}

export default unitService