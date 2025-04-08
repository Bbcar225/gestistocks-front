import {create} from "zustand";

interface SidebarStoreInterface {
	sidebar: AppStoreInterface,
	setSidebar: ({field, value}: { field: keyof SidebarStoreInterface['sidebar'], value: string }) => void
}

export const useSidebarStore = create<SidebarStoreInterface>((set) => ({
	sidebar: {
		title: "Tableau de bord"
	},
	setSidebar: ({field, value}) =>
		set((state) => ({
			sidebar: {
				...state.sidebar,
				[field]: value,
			},
		})),
}))