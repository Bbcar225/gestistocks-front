import React, {useEffect, useMemo, useState} from "react";
import {Input} from "antd";
import {debounce} from "lodash";
import {BiSearch} from "react-icons/bi";
import {useLocation} from "react-router-dom";
import {InputProps} from "antd/es/input/Input";

export default function SearchInput({
	                                    handleChange, defaultValue, onClear, ...props
                                    }: Partial<InputProps> & {
	handleChange?: (value?: string) => void;
	defaultValue?: string;
	onClear?: () => void;
}) {
	const [searchTerm, setSearchTerm] = useState<string | undefined>(defaultValue);
	const location = useLocation();
	
	const debouncedHandleChange = useMemo(() => {
		return debounce((value?: string) => {
			handleChange?.(value?.trim() === '' ? undefined : value);
		}, 800);
	}, [handleChange]);
	
	useEffect(() => {
		setSearchTerm(defaultValue);
	}, [defaultValue]);
	
	useEffect(() => {
		setSearchTerm(undefined);
	}, [location]);
	
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSearchTerm(value);
		debouncedHandleChange(value);
	};
	
	const handleClear = () => {
		onClear?.();
		setSearchTerm(undefined);
		handleChange?.(undefined);
	};
	
	return (
		<Input
			value={searchTerm}
			onChange={handleInputChange}
			suffix={<BiSearch/>}
			type="search"
			allowClear
			placeholder="Rechercher"
			onPressEnter={(e) => e.preventDefault()}
			{...props}
			onClear={handleClear}
		/>
	);
}
