import React, {useState} from 'react';
import {Layout, Menu} from 'antd';
import {Outlet} from "react-router-dom";

const {Content, Sider} = Layout;

const siderStyle: React.CSSProperties = {
	position: 'sticky',
	top: 0,
	bottom: 0,
	height: '100vh',
	overflow: 'auto',
	scrollbarWidth: 'thin',
	scrollbarGutter: 'stable',
};

export default function AuthLayout() {
	const [collapsed, setCollapsed] = useState(false); // Gère l'état de la sidebar
	
	return (
		<Layout hasSider>
			<Sider
				style={siderStyle}
				breakpoint="lg"
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<div className="demo-logo-vertical"/>
				<Menu mode="vertical" defaultSelectedKeys={['4']} items={[]}/>
			</Sider>
			<Layout>
				<Content style={{overflow: 'initial'}}>
					<Outlet/>
				</Content>
			</Layout>
		</Layout>
	);
};