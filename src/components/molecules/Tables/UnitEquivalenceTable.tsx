import {Button, Space, Table} from "antd";
import {notDefined} from "../../../constants/textsConstant.ts";
import dayjs from "dayjs";
import {FaEdit} from "react-icons/fa";
import {useAppStore} from "../../../store/useAppStore.ts";
import unitEquivalenceStore from "../../../store/useUnitEquivalenceStore.ts";
import {formatDate} from "../../../constants/dateConstant.ts";

export default function UnitEquivalenceTable({unitEquivalences, unit, ...props}: {
	unitEquivalences?: UnitEquivalenceInterface[],
	unit?: UnitInterface
}) {
	const {setOpenModal} = useAppStore()
	const {setUnitEquivalence} = unitEquivalenceStore()
	
	return <Table
		columns={[
			{
				key: "Unité de base",
				title: "Unité de base",
				render: () => {
					return unit ? `1 ${unit.name}` : notDefined
				}
			},
			{
				key: "Équivalence",
				title: "Équivalence",
				render: (_, row) => {
					return `${row.value} ${row.unit.name}`
				}
			},
			{
				key: "Date",
				title: "Date",
				render: (_, row) => {
					return dayjs(row.created_at).format(formatDate)
				}
			},
			{
				key: "Options",
				title: "Options",
				render: (_, row) => {
					return <Space>
						<Button
							icon={<FaEdit/>}
							onClick={() => {
								setOpenModal()
								setUnitEquivalence(row)
							}}
						/>
					</Space>
				}
			},
		]}
		dataSource={unitEquivalences}
		rowKey={(record) => record.id}
		scroll={{
			x: true
		}}
		className="text-nowrap"
		{...props}
	/>
}