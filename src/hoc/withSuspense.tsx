import React from "react";
import Spinner from "../components/common/spinners/spinner";


export function withSuspense <WCP>(WrappedComponent: React.ComponentType<WCP>) {

	return (props:WCP) => {
		return <React.Suspense fallback={<Spinner/>}>
			<WrappedComponent {...props} />
		</React.Suspense>
	};
};