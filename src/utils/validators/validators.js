export const required = (value) => {
	const ERR_MSG = "Поле не должно быть пустым";
	return value ? undefined : ERR_MSG;
};

export const maxLenghtCreator = (maxLenght) => (value) => {
	const ERR_MSG = `Поле должно содержать максимум ${maxLenght} символов`;
	return (value.length <= maxLenght) ? undefined : ERR_MSG;
};