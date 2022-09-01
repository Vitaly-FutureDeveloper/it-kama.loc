import {ErrorMessage, Field, Form, Formik, FormikErrors} from "formik";
import React from "react";
import {FilterType} from "../../../redux/users-reducer";

const usersSearchFormValidate:any = (values: FilterType) => {
	const errors = {};
	// if (!values.email) {
	// 	errors.email = 'Required';
	// } else if (
	// 	!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
	// ) {
	// 	errors.email = 'Invalid email address';
	// }
	return errors;
}
type FormType = {
	term:string,
	friend: "true" | "false" | "null",
};
type PropsType = {
	onFilterChanged:(filter:FilterType) => void,
};
const UsersSearchForm:React.FC<PropsType> = ({onFilterChanged}) => {
	const onSubmit = (values: FormType, { setSubmitting }:{setSubmitting:(isSubmitting: boolean) => void}) => {
		const filter:FilterType = {
			term: values.term,
			friend: values.friend === "null" ? null : values.friend === "true" ? true : false,
		};
		debugger;
		onFilterChanged(filter);
		setSubmitting(false);
	}

	return <div>
		<Formik
			initialValues={{ term: "", friend: "null"}}
			validate={usersSearchFormValidate}
			onSubmit={onSubmit}
		>
			{({ isSubmitting }) => (
				<Form>
					<Field type="text" name="term" />
					<ErrorMessage name="email" component="div" />
					<Field name="friend" as="select">
						<option value="null">Все</option>
						<option value="true">В друзьях</option>
						<option value="false">Не в друзьях</option>
					</Field>
					<button type="submit" disabled={isSubmitting}>
						Submit
					</button>
				</Form>
			)}
		</Formik>

	</div>
};

export default React.memo(UsersSearchForm);