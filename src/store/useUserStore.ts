import {create} from "zustand/index";
import {persist} from "zustand/middleware";

interface UserStoreInterface {
	user?: UserInterface,
	tenant?: TenantInterface
	setUser: (user?: UserInterface) => void;
	setTenant: (tenant?: TenantInterface) => void;
}

export const useUserStore = create<UserStoreInterface>()(persist(
	(set) => ({
		user: undefined,
		setUser: (user) =>
			set((state) => ({
				...state,
				user
			})),
		setTenant: (tenant) => {
			return set((state) => {
				return {
					...state,
					tenant
				}
			})
		}
	}),
	{
		name: "user",
	}
));

interface TokenStoreInterface {
	token?: string,
	setToken: (token?: string) => void
}

export const useTokenStore = create<TokenStoreInterface>()(persist((set) => {
	return {
		token: undefined,
		setToken: (token) => {
			set((state) => {
				return {
					...state,
					token
				}
			})
		}
	}
}, {
	name: "token"
}))