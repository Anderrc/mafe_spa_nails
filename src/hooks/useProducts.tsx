'use client';
import { ServicesState } from '@/models/useStore';
import { useEffect, useState } from 'react';

const useProducts = () => {
	const [products, setProducts] = useState<ServicesState[] | []>([]);
	const [isLoading, setIsLoading] = useState(true);

	const getProducts = async () => {
		setIsLoading(true);
		const response = await fetch('/api/services', { method: 'GET' });
		const data = await response.json();
		setIsLoading(false);
		return data.data;
	};

	useEffect(() => {
		getProducts().then(data => setProducts(data));
	}, []);

	return { products, isLoading };
};

export default useProducts;

