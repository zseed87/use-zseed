import { ChangeEvent, Dispatch, useState } from "react";

const useInput = (
	initialValue?: string
): [
	{ value: string | undefined; onChange: (e: ChangeEvent<HTMLInputElement>) => void },
	string | undefined,
	Dispatch<string>
] => {
	const [value, setValue] = useState(initialValue);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return [
		{
			value,
			onChange,
		},
		value ? `${value}`.trim() : undefined,
		setValue,
	];
};

export default useInput;
