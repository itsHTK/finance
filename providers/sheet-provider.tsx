'use client';

import React from 'react';
import EditAccountSheet from '@/features/accounts/components/edit-account-sheet';
import NewAccountSheet from '@/features/accounts/components/new-account-sheet';
import EditCategorySheet from '@/features/categories/components/edit-category-sheet';
import NewCategorySheet from '@/features/categories/components/new-category-sheet';

const SheetProvider = () => {
   return (
      <>
         <NewAccountSheet />
         <EditAccountSheet />
         <NewCategorySheet />
         <EditCategorySheet />
      </>
   );
};

export default SheetProvider;
