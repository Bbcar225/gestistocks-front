import service from "../../providers/AxiosProvider.ts";

const supplyService = {
	GetAll: (params?: RequestApiInterface): Promise<ResponseApiInterface<ResponsePaginateInterface<SupplyInterface[]>>> => {
		return service.get(`/tenant/suppliers`, {params})
	}
}

export default supplyService