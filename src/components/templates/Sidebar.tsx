import Title from "antd/es/typography/Title";
import {Menus} from "./Menus.tsx";
import {Image, Layout, Space} from "antd";
import React from "react";
import {useUserStore} from "../../store/useUserStore.ts";
import useRoutesIndex from "../../hooks/routes/IndexRoutesHook.ts";

const siderStyle: React.CSSProperties = {
	overflow: 'auto',
	height: '100vh',
	position: 'sticky',
	insetInlineStart: 0,
	top: 0,
	bottom: 0,
	scrollbarWidth: 'thin',
	scrollbarGutter: 'stable',
	zIndex: 1000
};

export default function Sidebar({collapsed, setCollapsed}: {
	collapsed: boolean,
	setCollapsed: (collapsed: boolean) => void
}) {
	const {tenant, user} = useUserStore()
	const routesIndex = useRoutesIndex()
	
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
		<div
			style={{
				textAlign: 'center',
				position: 'sticky',
				top: 0,
				background: '#001529',
				zIndex: 10,
				marginBottom: 7
			}}
		>
			<Space
				className='px-1 py-2 cursor-pointer'
				onClick={routesIndex.goToDashboard}
			>
				<Image
					src={tenant?.gallery?.url}
					preview={false}
					width={45}
					height={45}
					className='!rounded-full !object-cover'
				/>
				
				<Title
					level={5}
					className='!text-white !m-0'
					ellipsis={{
						rows: 2
					}}
				>
					{user?.name}
				</Title>
			</Space>
		</div>
		<div
			style={{
				flexGrow: 1,
				overflow: 'auto'
			}}
		>
			<Menus collapsed={collapsed} setCollapsed={setCollapsed}/>
		</div>
	</Layout.Sider>
}