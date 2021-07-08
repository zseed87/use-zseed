import { Dispatch, useState } from "react";

const useDateTime = (
	initialValue?: [string, string]
): [
	{
		value?: [string, string];
		onChange: (e: [string, string]) => void;
	},
	[string, string] | undefined,
	Dispatch<[string, string] | undefined>
] => {
	const [value, setValue] = useState(initialValue);
	const onChange: (value: [string, string]) => void = value => {
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
