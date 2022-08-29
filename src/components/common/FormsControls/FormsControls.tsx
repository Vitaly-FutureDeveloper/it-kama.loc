import React from "react";
import s from "./FormsControls.module.css";
import {Field, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validators";
import {WrappedFieldMetaProps} from "redux-form/lib/Field";


type FormControlPropsType = {
	meta: WrappedFieldMetaProps,
	children: React.ReactNode,
};

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
	const hasError = touched && error;
	return (
		<div className={s.formControl + " " + (hasError ? s.error : "")}>
			<div>
				{children}
			</div>
			{ hasError && <span>{error}</span> }
		</div>
	);
};


export const Textarea:React.FC<WrappedFieldProps> = (props) => {
	const {input, meta, ...restProps} = props;
	return (
		<FormControl {...props} >
			<input {...input} {...restProps} />
		</FormControl>
	);
};

export const Input:React.FC<WrappedFieldProps> = (props) => {
	const {input, meta, ...restProps} = props;
	return (
		<FormControl {...props}>
			<input {...input} {...restProps} />
		</FormControl>
	);
};
export type GetStringKeys<T> =  Extract <keyof T, string>;

export function createField<FormKeysType extends string> (placeholder:string | undefined,
														name: FormKeysType,
														validators:Array<FieldValidatorType>,
														component:React.FC<WrappedFieldProps>,
														props= {},
														text="")
{
	return <div>
		<Field name={name}
					 validate={validators}
					 placeholder={placeholder}
					 component={component}
					 {...props}
		/> {text}
	</div>
};