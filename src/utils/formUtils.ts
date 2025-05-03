import {UploadChangeParam} from "antd/es/upload";

export const normFile = (e: UploadChangeParam) => {
	if (Array.isArray(e)) {
		return e;
	}
	return e?.fileList;
};