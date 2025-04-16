import {Button, Space, theme} from "antd";
import {AiOutlineMenuFold, AiOutlineMenuUnfold} from "react-icons/ai";
import Title from "antd/es/typography/Title";
import {Header} from "antd/es/layout/layout";
import {useSidebarStore} from "../../store/useAppStore.ts";

export default function HeaderLayout({collapsed, setCollapsed}: {
	collapsed: boolean,
	setCollapsed: (collapsed: boolean) => void
}) {
	const {
		token: {colorBgContainer},
	} = theme.useToken();
	const {sidebar} = useSidebarStore()
	
	return <Header
		style={{
			padding: "0px 10px",
			margin: 0,
			background: colorBgContainer,
			height: '50px',
			position: 'sticky',
			top: 0,
			zIndex: 10000
		}}
		className='shadow-lg'
	>
		<Space align='center'>
			<Button
				type="text"
				icon={collapsed ? <AiOutlineMenuUnfold/> : <AiOutlineMenuFold/>}
				onClick={() => setCollapsed(!collapsed)}
				size='large'
				style={{
					fontSize: '25px'
				}}
			/>
			
			<Title level={4}>{sidebar.title}</Title>
		</Space>
	</Header>
}