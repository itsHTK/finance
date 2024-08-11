'use client';

import React from 'react';
import EditAccountSheet from '@/features/accounts/components/edit-account-sheet';
import NewAccountSheet from '@/features/accounts/components/new-account-sheet';

const SheetProvider = () => {
   return (
      <>
         <NewAccountSheet />
         <EditAccountSheet />
      </>
   );
};

export default SheetProvider;
