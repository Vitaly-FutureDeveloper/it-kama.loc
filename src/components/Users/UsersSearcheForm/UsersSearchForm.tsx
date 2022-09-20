import React from "react";
import {useSelector} from "react-redux";
import {ErrorMessage, Field, Form, Formik} from "formik";

import {FilterType} from "../../../redux/users-reducer";
import {getUsersFilter} from "../../../redux/users-selectors";

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
type FriendFormType = "true" | "false" | "null";
type FormType = {
	term:string,
	friend: FriendFormType,
};
type PropsType = {
	onFilterChanged:(filter:FilterType) => void,
};
const UsersSearchForm:React.FC<PropsType> = ({onFilterChanged}) => {
	const onSubmit = (values: FormType, { setSubmitting }:{setSubmitting:(isSubmitting: boolean) => void}) => {
		const filter:FilterType = {
			term: values.term,
			friend: values.friend === "null" ? null : values.friend === "true",
		};

		onFilterChanged(filter);
		setSubmitting(false);
	}

	const filter = useSelector(getUsersFilter);

	return <div>
		<Formik
			enableReinitialize
			initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType}}
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