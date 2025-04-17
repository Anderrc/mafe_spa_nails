'use client';
import Reservations from '@/components/pages/ts';
import { Suspense } from 'react';

const Page = () => {
	return (
		<Suspense>
			<Reservations />
		</Suspense>
	);
};

export default Page;

