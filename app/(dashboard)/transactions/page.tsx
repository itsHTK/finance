'use client';

import React from 'react';
import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions';
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions';
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/data-table';

import { columns } from './columns';

const TransactionsPage = () => {
   const newTransaction = useNewTransaction();
   const deleteTransactions = useBulkDeleteTransactions();
   const transactionsQuery = useGetTransactions();
   const transactions = transactionsQuery.data || [];

   const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

   return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
         <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
               <CardTitle className="text-xl line-clamp-1">Transactions page</CardTitle>
               <Button onClick={newTransaction.onOpen} size="sm">
                  <Plus className="size-4 mr-2" /> Add new
               </Button>
            </CardHeader>
            <CardContent>
               <DataTable
                  columns={columns}
                  data={transactions}
                  onDelete={rows => {
                     const ids = rows.map(r => r.original.id);
                     deleteTransactions.mutate({ ids });
                  }}
                  disabled={isDisabled}
               />
            </CardContent>
         </Card>
      </div>
   );
};

export default TransactionsPage;
