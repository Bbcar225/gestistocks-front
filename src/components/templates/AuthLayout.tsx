import React, {useState} from 'react';
import {Button, Layout, Menu, MenuProps, Space, theme} from 'antd';
import {Outlet} from "react-router-dom";
import {AiOutlineMenuFold, AiOutlineMenuUnfold} from "react-icons/ai";
import {FaUserCircle} from "react-icons/fa";
import Title from "antd/es/typography/Title";

const {Header, Content, Footer, Sider} = Layout;

const siderStyle: React.CSSProperties = {
	overflow: 'auto',
	height: '100vh',
	position: 'sticky',
	insetInlineStart: 0,
	top: 0,
	bottom: 0,
	scrollbarWidth: 'thin',
	scrollbarGutter: 'stable',
};

const items: MenuProps['items'] = [
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
	<FaUserCircle/>,
].map((icon, index) => ({
	key: String(index + 1),
	icon: icon,
	label: `nav ${index + 1}`,
}));

export default function AuthLayout() {
	const {
		token: {colorBgContainer},
	} = theme.useToken();
	const [collapsed, setCollapsed] = useState(false);
	
	return (
		<Layout>
			<Sider
				breakpoint="lg"
				collapsedWidth="0"
				onBreakpoint={(broken) => setCollapsed(broken)}
				onCollapse={(collapsed) => setCollapsed(collapsed)}
				trigger={null}
				collapsible
				collapsed={collapsed}
				style={siderStyle}
			>
				<div className="demo-logo-vertical"/>
				<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items}/>
			</Sider>
			<Layout>
				<Header style={{padding: "0px 10px", margin: 0, background: colorBgContainer}} className='flex items-stretch'>
					<Space align='center' className='mt-3'>
						<Button
							type="text"
							icon={collapsed ? <AiOutlineMenuUnfold/> : <AiOutlineMenuFold/>}
							onClick={() => setCollapsed(!collapsed)}
							size='large'
							style={{
								fontSize: '25px'
							}}
						/>
						
						<Title level={4}>
							Tableau de bord
						</Title>
					</Space>
				</Header>
				<Content style={{margin: '5px 5px 0'}}>
					<Outlet/>
				</Content>
				<Footer style={{textAlign: 'center'}}>
					Gestistocks ©{new Date().getFullYear()} Created by Boubacar LY
				</Footer>
			</Layout>
		</Layout>
	);
};
