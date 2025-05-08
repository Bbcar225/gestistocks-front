import {UploadChangeParam} from "antd/es/upload";

export const normFile = (e: UploadChangeParam) => {
	if (Array.isArray(e)) {
		return e;
	}
	return e?.fileList;
};

export const filterOptionSelect = (input: string, option?: BaseOptionType) => {
	const normalize = (text: string) =>
		text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
	
	const normalizedInput = normalize(input);
	const normalizedLabel = normalize(option?.label ?? "");
	
	return normalizedLabel.includes(normalizedInput);
}