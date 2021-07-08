import { Dispatch, useState } from "react";

const useDateTime = (
	initialValue: any | null
): [
	{
		value: any | null;
		onChange: (value: any | null) => void;
	},
	any | null,
	Dispatch<any | null>
] => {
	const [value, setValue] = useState(initialValue);
	const onChange: (value: any | null) => void = value => {
		setValue(value);
	};

	return [
		{
			value,
			onChange,
		},
		value,
		setValue,
	];
};

export default useDateTime;
