import {ErrorMessage, Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../../redux/users-reducer";

const usersSearchFormValidate = (values: FilterType) => {
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

type PropsType = {
	onFilterChanged:(filter:FilterType) => void,
};
const UsersSearchForm:React.FC<PropsType> = ({onFilterChanged}) => {
	const onSubmit = (values: FilterType, { setSubmitting }:{setSubmitting:(isSubmitting: boolean) => void}) => {
		onFilterChanged(values);
		setSubmitting(false);
	}

	return <div>
		<Formik
			initialValues={{ term: '', }}
			validate={usersSearchFormValidate}
			onSubmit={onSubmit}
		>
			{({ isSubmitting }) => (
				<Form>
					<Field type="text" name="term" />
					<ErrorMessage name="email" component="div" />
					<button type="submit" disabled={isSubmitting}>
						Submit
					</button>
				</Form>
			)}
		</Formik>

	</div>
};

export default React.memo(UsersSearchForm);