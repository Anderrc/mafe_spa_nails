import React from 'react';

export const ModalLoading = ({isLoading}: { isLoading: boolean }) => {
  if (!isLoading) return null;
	return (
		<div className='fixed top-0 left-0 z-50 w-screen h-screen bg-gray-900/50 flex items-center justify-center'>
			<div className='flex justify-center items-center'>
				<div className='animate-spin rounded-full h-32 w-32 border-t-3 border-6 border-blue-500' />
			</div>
		</div>
	);
};

