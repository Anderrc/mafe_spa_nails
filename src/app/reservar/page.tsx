'use client';
import Reservations from '@/components/pages/Reservations';
import { ReCaptchaProvider } from 'next-recaptcha-v3';
import { Suspense } from 'react';

const Page = () => {
	return (
		<Suspense>
			<ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
				<Reservations />
			</ReCaptchaProvider>
		</Suspense>
	);
};

export default Page;

