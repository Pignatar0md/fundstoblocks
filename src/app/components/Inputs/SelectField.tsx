import { ChangeEventHandler } from "react";

export default function SelectField({
	label,
	selectName,
	bordered = true,
	options,
	defaultSelected,
	handleChange,
}: {
	label: string;
	selectName: string;
	bordered: boolean;
	handleChange: ChangeEventHandler<HTMLSelectElement>;
	options: { value: string; text: string }[];
	defaultSelected: string;
}) {
	const isBordered = bordered
		? "border border-gray-200 border-2"
		: "border-hidden";
	return (
		<div className="max-w-2xl mx-auto">
			{!!label && (
				<label
					htmlFor="countries"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
				>
					{label}
				</label>
			)}
			<select
				title={selectName}
				// defaultValue={defaultSelected}
				value={defaultSelected}
				onChange={handleChange}
				className={`${isBordered} mr-8 text-gray-600 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
			>
				{options &&
					options.map(({ value, text }: { value: string; text: string }) => (
						<option key={value} value={value}>
							{text}
						</option>
					))}
			</select>
		</div>
	);
}
