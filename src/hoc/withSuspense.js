import React from "react";
import Spinner from "../components/common/spinners/spinner";


const mapStateToPropsForRedirect = (state) => ({
	isAuth: state.auth.isAuth
});

export const withSuspense = (Component) => {

	return (props) => {
		return <React.Suspense fallback={<Spinner/>}>
			<Component {...props} />
		</React.Suspense>
	};
};