import {create} from "zustand/index";
import {persist} from "zustand/middleware";

interface UserStoreInterface {
	user?: UserInterface,
	setUser: (user: UserInterface) => void;
}

export const useUserStore = create<UserStoreInterface>()(persist(
	(set) => ({
		user: undefined,
		setUser: (user: UserInterface) =>
			set((state) => ({
				...state,
				user
			}))
	}),
	{
		name: "user",
	}
));

interface TokenStoreInterface {
	token?: string,
	setToken: (token: string) => void
}

export const useTokenStore = create<TokenStoreInterface>()(persist((set) => {
	return {
		token: undefined,
		setToken: (token: string) => {
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