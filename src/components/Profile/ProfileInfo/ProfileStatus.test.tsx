import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("Profile status component", () => {
	test("status from props should be in the state", () => {
		const component = create(<ProfileStatus status="it-kama.com" />);
		const instance = component.getInstance();
		expect(instance.state.status).toBe("it-kama.com");
	});
	test("After creation span should be displayed", () => {
		const component = create(<ProfileStatus status="it-kama.com" />);
		const root = component.root;
		const span = root.findByType("span");
		expect(span).not.toBeNull();
	});

	test("After creation span shouldn't be displayed", () => {
		const component = create(<ProfileStatus status="it-kama.com" />);
		const root = component.root;

		expect(() => {
			const input = root.findByType("input");
		}).toThrow();
	});

	test("Input should be displayed in editMode instead of span", () => {
		const component = create(<ProfileStatus status="it-kama.com" />);
		const root = component.root;
		const span = root.findByType("span");
		span.props.onDoubleClick();
		const input = root.findByType("input");
		expect(input.props.value).toBe("it-kama.com");
	});

	test("Callback shoud be called", () => {
		const mockCallback = jest.fn()
		const component = create(<ProfileStatus status="it-kama.com" updateStatus={mockCallback} />);
		const instance = component.getInstance();
		instance.deactivateEditMode()
		expect(mockCallback.mock.calls.length).toBe(1);
	});
});