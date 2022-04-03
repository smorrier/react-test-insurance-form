import { MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { IPackage } from "../../../../@types/Package";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import zod from "zod"
import "./CustomerForm.css"
import axios from "../../../../constants/axios";

interface IForm {
	data: { 
		[key: string]: string
	},
	errors: { 
		[key: string]: string
	},
}

const validationMap: any = {
	email: zod.string().email(),
	age: zod.preprocess(
		(x) => x ? parseFloat(x as string) : x,
		zod.number().positive().int().gt(0)
	),
	gender: zod.enum(["Male", "Female", "Other"])
}

export default function CustomerForm({selectedPackage}: { selectedPackage: IPackage | null }) {
	const [form, setForm] = useState<IForm>({ data: {}, errors: {} })
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, id?: string) => {
		let idToUse = id || e.target.id
		setForm({ ...form, data: { ...form.data, [idToUse]: e.target.value }})
	}
	const onBlur = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, id?: string) => {
		let idToUse = id || e.target.id
		const result: any = validationMap[idToUse].safeParse(e.target.value)
		if (!result.success) {
			setForm({ ...form, errors: { ...form.errors, [idToUse]: result.error.issues[0].message}})
		} else {
			setForm({ ...form, errors: { ...form.errors, [idToUse]: "" }})
		}
	}
	const onSubmit = () => {
		const result = zod.object(validationMap).safeParse(form.data)
		if(!result.success) {
			const newErrors: any = {}
			result.error.issues.forEach((issue) => {
				newErrors[issue.path[0]] = issue.message
			})
			return setForm({ ...form, errors: newErrors })
		}
		axios.post('/', form.data)
	}

	if(!selectedPackage?.id) {
		return null
	}

	return (
		<div className="CustomerForm">
			<div>Answer the questions below to proceed</div>
			<TextField 
				label="What's your email?"
				id="email"
				value={form.data.email || ""}
				onChange={onChange}
				onBlur={onBlur}
				error={!!form.errors.email}
				helperText={form.errors.email}
			/>
			<TextField
				label="How old are you?"
				id="age"
				value={form.data.age || ""}
				type="number"
				InputProps={{ inputProps: { min: 1, step: 1 } }}
				onChange={onChange}
				onBlur={onBlur}
				error={!!form.errors.age}
				helperText={form.errors.age}
			/>
			<TextField
				label="What is your gender?"
				id="gender"
				value={form.data.gender || ""}
				onChange={(e) => onChange(e, "gender")}
				onBlur={(e) => onBlur(e, "gender")}
				select
				error={!!form.errors.gender}
				helperText={form.errors.gender}
			>
				<MenuItem value="Male">Male</MenuItem>
				<MenuItem value="Female">Female</MenuItem>
				<MenuItem value="Other">Other</MenuItem>
			</TextField>
			<div className="SubmitButtonContainer">
				<PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
			</div>
		</div>
	)
}