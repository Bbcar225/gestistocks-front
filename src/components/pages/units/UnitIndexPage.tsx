import {useEffect} from "react";
import {useSidebarStore} from "../../../store/useAppStore.ts";

export default function UnitIndexPage() {
	const {setSidebar} = useSidebarStore()
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Unités'})
	}, [setSidebar]);
	
	return <>
		<h1>Liste des unités</h1>
	</>
}