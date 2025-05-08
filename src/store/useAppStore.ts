import {create} from "zustand";

interface SidebarStoreInterface {
	sidebar: AppStoreInterface,
	openModal: boolean,
	typeModal: TModal
	
	setSidebar: ({field, value}: { field: keyof SidebarStoreInterface['sidebar'], value: string }) => void,
	setOpenModal: () => void,
	setTypeModal: (type: TModal) => void
}

export const useAppStore = create<SidebarStoreInterface>((set) => {
	return {
		sidebar: {
			title: "Tableau de bord",
		},
		openModal: false,
		typeModal: undefined,
		
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
					openModal: !state.openModal,
					typeModal: state.openModal ? undefined : state.typeModal
				}
			})
		},
		setTypeModal: (type: TModal) => {
			return set((state) => {
				return {
					...state,
					typeModal: type
				}
			})
		}
	}
})