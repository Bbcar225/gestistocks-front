import {config} from "../../../constants/notifcationConstant.ts";
import {notification} from "antd";

export default function useAlertNotification() {
	const [notificationInstance, contextHolder] = notification.useNotification(config);
	
	return {
		contextHolder,
		notificationInstance
	}
}