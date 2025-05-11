import React, {useMemo, useState} from "react";
import debounce from "lodash/debounce";
import {Select, Spin} from "antd";

export default function SelectInfiniteScroll({
	                                             fetchOptions,
	                                             hasMore,
	                                             debounceTimeout = 400,
	                                             ...props
                                             }: IInfiniteSelectProps) {
	const [fetching, setFetching] = useState<boolean>(false);
	const [options, setOptions] = useState<BaseOptionType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [search, setSearch] = useState<string | undefined>(undefined);
	const [currentPage, setCurrentPage] = useState<number>(1);
	
	const debounceFetcher = useMemo(() => {
		const loadOptions = (value: string) => {
			setOptions([]);
			setSearch(value);
			setFetching(true);
			fetchOptions({search: value})
				.then((newOptions) => {
					setOptions(newOptions);
					setCurrentPage(2);
					setFetching(false);
				})
				.finally(() => setLoading(false));
		};
		return debounce(loadOptions, debounceTimeout);
	}, [fetchOptions, debounceTimeout]);
	
	const fetchOnFocus = () => {
		if (!options.length) {
			debounceFetcher("");
		}
	};
	
	const onScroll = async (event: React.UIEvent<HTMLDivElement>) => {
		const target = event.currentTarget;
		if (!loading && target.scrollTop + target.offsetHeight === target.scrollHeight) {
			if (hasMore) {
				setLoading(true);
				fetchOptions({search, page: currentPage})
					.then((newOptions) => {
						setCurrentPage((prev) => prev + 1);
						setOptions((prev) => [...prev, ...newOptions]);
					})
					.finally(() => setLoading(false));
			}
		}
	};
	
	return (
		<Select
			showSearch
			allowClear
			onPopupScroll={onScroll}
			labelInValue={true}
			filterOption={false}
			onSearch={debounceFetcher}
			notFoundContent={fetching ? <Spin size="small"/> : "No results"}
			onFocus={fetchOnFocus}
			onClear={() => debounceFetcher("")}
			{...props}
		>
			{options.map((item, key) => {
				return <Select.Option key={key} value={item.value} disabled={item.disabled}>
					{item.label}
				</Select.Option>;
			})}
			{loading && (
				<Select.Option disabled className="!text-center my-2" value="">
					<Spin size="small"/>
				</Select.Option>
			)}
		</Select>
	);
}
