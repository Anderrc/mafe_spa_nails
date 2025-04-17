import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	type?: 'button' | 'submit' | 'reset';
	size?: 'lg' | 'md' | 'sm';
	variant?: 'outline' | 'ghost' | 'solid';
}

export const Button: React.FC<ButtonProps> = ({
	type = 'button',
	size = 'md',
	variant = 'solid',
	children,
	...props
}) => {
	const sizeClass = {
		lg: 'px-4 py-2 text-lg',
		md: 'px-3 py-1 text-base',
		sm: 'px-2 py-1 text-sm',
	};

	const variantClass = {
		outline: 'border border-gray-300 bg-white text-gray-700',
		ghost: 'bg-transparent text-gray-700',
		solid: 'bg-black text-yellow-50',
	};

	return (
		<button
			className={`rounded-md ${sizeClass[size]} ${variantClass[variant]}  `}
			type={type}
			{...props}>
			{children}
		</button>
	);
};

