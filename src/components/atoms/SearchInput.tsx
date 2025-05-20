import { useEffect, useMemo, useState } from "react";
import { Input } from "antd";
import { debounce } from "lodash";
import { BiSearch } from "react-icons/bi";
import { useLocation } from "react-router-dom";

export default function SearchInput({ handleChange, defaultValue, resetSearch, ...props }: any) {
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const location = useLocation();
  
  const debounceSearch = useMemo(() => {
    const loadOptions = (value: string) => {
      handleChange(value);
    };
    return debounce(loadOptions, 800);
  }, [handleChange]);
  
  useEffect(() => {
    setSearchTerm(defaultValue);
  }, [resetSearch, defaultValue]);
  
  useEffect(() => {
    setSearchTerm(undefined);
  }, [location]);
  
  return (
    <Input
      value={searchTerm}
      onChange={(event) => {
        setSearchTerm(event.target.value);
        debounceSearch(event.target.value);
      }}
      suffix={<BiSearch />}
      type="search"
      allowClear
      placeholder="Rechercher"
      {...props}
    />
  );
}
