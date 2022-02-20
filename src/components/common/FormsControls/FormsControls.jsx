import React from "react";
import s from "./FormsControls.module.css";

const FormControl = ({input, meta, element, ...props}) => {
	const hasError = meta.error && meta.touched;
	return (
		<div className={s.formControl + " " + s.error}>
			<div>
				{/*<textarea {...props} {...input} />*/}
				{props.children}
			</div>
			{ hasError && <span>{meta.error}</span> }
		</div>
	);
};

export const Textarea = (props) => {
	const {input, meta, child, ...restProps} = props;
	return (
		<FormControl {...props} >
			<input {...restProps} {...input} />
		</FormControl>
	);
};

export const Input = (props) => {
	const {input, meta, child, ...restProps} = props;
	return (
		<FormControl {...props}>
			<input {...restProps} {...input} />
		</FormControl>
	);
};