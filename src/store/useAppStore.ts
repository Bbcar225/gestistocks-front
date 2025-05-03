import {create} from "zustand";

interface SidebarStoreInterface {
	sidebar: AppStoreInterface,
	openModal: boolean,
	
	setSidebar: ({field, value}: { field: keyof SidebarStoreInterface['sidebar'], value: string }) => void,
	setOpenModal: () => void,
}

export const useAppStore = create<SidebarStoreInterface>((set) => {
	return {
		sidebar: {
			title: "Tableau de bord",
		},
		openModal: false,
		
		setSidebar: ({field, value}) => {
			return set((state) => ({
				sidebar: {
					...state.sidebar,
					[field]: value,
				},
			}))
		},
		setOpenModal: () => {
			return set((state) => {
				return {
					...state,
					openModal: !state.openModal
				}
			})
		}
	}
})