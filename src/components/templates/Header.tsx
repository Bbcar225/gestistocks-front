import {Button, Space, theme} from "antd";
import {AiOutlineMenuFold, AiOutlineMenuUnfold} from "react-icons/ai";
import Title from "antd/es/typography/Title";
import {Header} from "antd/es/layout/layout";

export default function HeaderLayout({collapsed, setCollapsed}: {
	collapsed: boolean,
	setCollapsed: (collapsed: boolean) => void
}) {
	const {
		token: {colorBgContainer},
	} = theme.useToken();
	
	return <Header
		style={{
			padding: "0px 10px",
			margin: 0,
			background:
			colorBgContainer,
			height: '55px',
			position: 'sticky',
			top: 0,
		}}
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
			
			<Title level={4}>
				Tableau de bord
			</Title>
		</Space>
	</Header>
}