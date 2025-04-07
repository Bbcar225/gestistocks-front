import Title from "antd/es/typography/Title";
import {Menus} from "./Menus.tsx";
import {Layout} from "antd";
import React from "react";

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

export default function Sidebar({collapsed, setCollapsed}: {
	collapsed: boolean,
	setCollapsed: (collapsed: boolean) => void
}) {
	return <Layout.Sider
		breakpoint="lg"
		collapsedWidth="0"
		onBreakpoint={(broken) => setCollapsed(broken)}
		onCollapse={(collapsed) => setCollapsed(collapsed)}
		trigger={null}
		collapsible
		collapsed={collapsed}
		style={siderStyle}
	>
		<div style={{
			textAlign: 'center',
			position: 'sticky',
			top: 0,
			background: '#001529',
			zIndex: 10
		}}>
			<Title className='text-center' style={{color: 'white'}}>
				BM
			</Title>
		</div>
		<div
			style={{
				flexGrow: 1,
				overflow: 'auto'
			}}
		>
			<Menus/>
		</div>
	</Layout.Sider>
}