import {ReactNode, useState} from 'react';
import {Layout, theme} from 'antd';
import {Navigate, Outlet} from "react-router-dom";
import HeaderLayout from "./Header.tsx";
import Sidebar from "./Sidebar.tsx";
import {useTokenStore} from "../../store/useUserStore.ts";

export default function AuthLayout() {
	const {
		token: {borderRadiusLG},
	} = theme.useToken();
	const [collapsed, setCollapsed] = useState(false);
	
	return <AuthOnlyRoute>
		<Layout>
			<Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
			<Layout>
				<HeaderLayout collapsed={collapsed} setCollapsed={setCollapsed}/>
				<Layout.Content
					style={{
						borderRadius: borderRadiusLG,
						margin: '20px 7px 0',
					}}
				>
					<Outlet/>
				</Layout.Content>
				<Layout.Footer style={{textAlign: 'center'}}>
					Gestistocks ©{new Date().getFullYear()} Created by Boubacar LY
				</Layout.Footer>
			</Layout>
		</Layout>
	</AuthOnlyRoute>
};


export const AuthOnlyRoute = ({children}: { children: ReactNode }) => {
	const {token} = useTokenStore()
	
	if (!token) {
		return <Navigate to="/" replace/>;
	}
	
	return children;
};