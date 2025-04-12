export interface ErrorMessagesProps {
	errors: Record<string, string[]>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const errorsValidation = (errors: ErrorMessagesProps) => {
	return <Component errors={errors}/>
};

export const Component = ({errors}: { errors: ErrorMessagesProps }) => {
	const allMessages = Object.values(errors).flat();
	
	if (allMessages.length === 0) return null;
	
	return (
		<ul className="text-red-600 list-disc ps-4">
			{allMessages.map((message, index) => (
				<li key={index}>{message}</li>
			))}
		</ul>
	);
};