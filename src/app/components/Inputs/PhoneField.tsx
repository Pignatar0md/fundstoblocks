"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import SelectField from "./SelectField";
import Phone from "../Icons/phone";

export default function PhoneField({
	label,
	value,
	onChange,
}: {
	label?: string;
	value: string;
	onChange: (a: ChangeEvent<HTMLInputElement>) => void;
}) {
	const [phone, setPhone] = useState({ prefix: "", phoneNumber: "" });

	const onPrefixChange = (event: FormEvent<HTMLUListElement>) => {
		console.log(event);

		debugger;
		setPhone({ ...phone, prefix: event.currentTarget + "" });
	};

	const onPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPhone({ ...phone, phoneNumber: event.target.value });
	};

	return (
		<>
			<Phone />
			<div className="w-full max-w-sm min-w-[200px]">
				{!!label ?? (
					<label className="block mb-1 text-sm text-slate-800">
						Enter Phone Number
					</label>
				)}
				<div className="flex items-center">
					<SelectField
						bordered={false}
						label={""}
						handleChange={onPrefixChange}
						options={[
							{ text: "AR", value: "+54" },
							{ text: "PT", value: "+351" },
							{ text: "ES", value: "+34" },
							{ text: "US", value: "+1" },
						]}
						defaultSelected={""}
						value={phone.prefix}
					/>

					<input
						type="text"
						name="phone"
						value={phone.phoneNumber}
						onChange={(event) => onPhoneChange(event)}
						className="w-full h-8 ml-19 bg-transparent placeholder:text-slate-400 text-slate-700 rounded-md px-3 py-2 border-none transition duration-300 ease focus:outline-none focus:shadow-md"
						placeholder="324-456-2323"
					/>
				</div>
			</div>
		</>
	);
}
