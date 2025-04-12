import {Navigate, Outlet} from "react-router-dom";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import {useTokenStore} from "../../store/useUserStore.ts";
import {ReactNode} from "react";

export function GuestLayout() {
	
	return <Layout>
		<Content>
			<Outlet/>
		</Content>
	</Layout>
}

export const PublicOnlyRoute = ({children}: { children: ReactNode }) => {
	const {token} = useTokenStore()
	
	if (token) {
		return <Navigate to="/" replace/>;
	}
	
	return children;
};