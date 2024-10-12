'use client';

import React from 'react';
import { useBulkDeleteCategories } from '@/features/categories/api/use-bulk-delete-categories';
import { useGetCategories } from '@/features/categories/api/use-get-categories';
import { useNewCategory } from '@/features/categories/hooks/use-new-category';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/data-table';

import { columns } from './columns';

const CategoriesPage = () => {
   const newCategory = useNewCategory();
   const deleteCategories = useBulkDeleteCategories();
   const categoriesQuery = useGetCategories();
   const categories = categoriesQuery.data || [];

   const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;

   return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
         <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
               <CardTitle className="text-xl line-clamp-1">Categories page</CardTitle>
               <Button onClick={newCategory.onOpen} size="sm">
                  <Plus className="size-4 mr-2" /> Add new
               </Button>
            </CardHeader>
            <CardContent>
               <DataTable
                  columns={columns}
                  data={categories}
                  onDelete={rows => {
                     const ids = rows.map(r => r.original.id);
                     deleteCategories.mutate({ ids });
                  }}
                  disabled={isDisabled}
               />
            </CardContent>
         </Card>
      </div>
   );
};

export default CategoriesPage;
