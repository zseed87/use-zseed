import { SelectValue } from "antd/lib/select";
import { Dispatch, useState } from "react";

const useSelect = (
	initialValue?: SelectValue
): [
	{ value: SelectValue | undefined; onChange: (value: SelectValue | undefined) => void; allowClear: boolean },
	SelectValue | undefined,
	Dispatch<SelectValue | undefined>
] => {
	const [value, setValue] = useState(initialValue);

	const onChange: (value: SelectValue | undefined) => void = value => {
		setValue(value);
	};

	return [
		{
			value,
			onChange,
			allowClear: true,
		},
		value,
		setValue,
	];
};

export default useSelect;
