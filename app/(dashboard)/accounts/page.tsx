'use client';

import React from 'react';
import { useBulkDeleteAccounts } from '@/features/accounts/api/use-bulk-delete';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/data-table';

import { columns } from './columns';

const AccountsPage = () => {
   const newAccount = useNewAccount();
   const deleteAccounts = useBulkDeleteAccounts();
   const accountsQuery = useGetAccounts();
   const accounts = accountsQuery.data || [];

   const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

   return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
         <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
               <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
               <Button onClick={newAccount.onOpen} size="sm">
                  <Plus className="size-4 mr-2" /> Add new
               </Button>
            </CardHeader>
            <CardContent>
               <DataTable
                  columns={columns}
                  data={accounts}
                  onDelete={rows => {
                     const ids = rows.map(r => r.original.id);
                     deleteAccounts.mutate({ ids });
                  }}
                  disabled={isDisabled}
               />
            </CardContent>
         </Card>
      </div>
   );
};

export default AccountsPage;
