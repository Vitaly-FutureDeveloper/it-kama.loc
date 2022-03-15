import React from "react";
import s from "./FormsControls.module.css";
import {Field} from "redux-form";

const FormControl = ({input, meta: {touched, error}, element, children}) => {
	const hasError = error && touched;
	return (
		<div className={s.formControl + " " + s.error}>
			<div>
				{children}
			</div>
			{ hasError && <span>{error}</span> }
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

export const createField = (placeholder, name, validators, component, props= {}, text="") => (
		<div>
				<Field name={name}
										 validate={validators}
										 placeholder={placeholder}
										 component={component} {...props} /> {text}
		</div>
);