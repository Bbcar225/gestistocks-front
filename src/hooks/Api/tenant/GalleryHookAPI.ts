import {useQuery} from "react-query";
import galleryService from "../../../services/tenant/galleryService.ts";
import useGalleryStore from "../../../store/useGalleryStore.ts";

export const galleryQueriesClients = {
	useGalleryGetAll: 'useGalleryGetAll'
}

export const useGalleryGetAll = (params?: HookApiInterface) => {
	const {queryParams} = useGalleryStore()
	
	return useQuery(
		[galleryQueriesClients.useGalleryGetAll, queryParams],
		() => galleryService.GetAll(queryParams),
		{enabled: params?.enabled}
	)
}