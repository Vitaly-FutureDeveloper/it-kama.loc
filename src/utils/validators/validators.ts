export type FieldValidatorType = (value:string) => string | undefined;

export const required: FieldValidatorType = (value:string): string | undefined => {
	const ERR_MSG = "Поле не должно быть пустым";
	return value ? undefined : ERR_MSG;
};

export const maxLenghtCreator = (maxLenght:number): FieldValidatorType => (value) => {
	const ERR_MSG = `Поле должно содержать максимум ${maxLenght} символов`;
	return (value.length <= maxLenght) ? undefined : ERR_MSG;
};