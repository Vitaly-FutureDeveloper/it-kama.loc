import React from "react";
import Spinner from "../components/common/spinners/spinner";


export const withSuspense = (Component) => {

	return (props) => {
		return <React.Suspense fallback={<Spinner/>}>
			<Component {...props} />
		</React.Suspense>
	};
};