import {Navigate, Outlet} from "react-router-dom";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import {useTokenStore, useUserStore} from "../../store/useUserStore.ts";
import {ReactNode} from "react";

export function GuestLayout() {
	return <PublicOnlyRoute>
		<Layout>
			<Content>
				<Outlet/>
			</Content>
		</Layout>
	</PublicOnlyRoute>
}

export const PublicOnlyRoute = ({children}: { children: ReactNode }) => {
	const {token} = useTokenStore()
	const {user} = useUserStore()
	
	if (token) {
		return <Navigate to={`/${user?.userable.slug}/dashboard`} replace/>;
	}
	
	return children;
};