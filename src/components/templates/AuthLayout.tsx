import {useState} from 'react';
import {Layout, theme} from 'antd';
import {Outlet} from "react-router-dom";
import HeaderLayout from "./Header.tsx";
import Sidebar from "./Sidebar.tsx";

export default function AuthLayout() {
	const {
		token: {borderRadiusLG},
	} = theme.useToken();
	const [collapsed, setCollapsed] = useState(false);
	
	return <Layout>
		<Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
		<Layout>
			<HeaderLayout collapsed={collapsed} setCollapsed={setCollapsed}/>
			<Layout.Content
				style={{
					borderRadius: borderRadiusLG,
					margin: '7px 7px 0',
				}}
			>
				<Outlet/>
			</Layout.Content>
			<Layout.Footer style={{textAlign: 'center'}}>
				Gestistocks ©{new Date().getFullYear()} Created by Boubacar LY
			</Layout.Footer>
		</Layout>
	</Layout>;
};
