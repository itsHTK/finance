'use client';

import React, { useState } from 'react';
import {
   ColumnDef,
   flexRender,
   getCoreRowModel,
   getPaginationRowModel,
   Row,
   useReactTable,
} from '@tanstack/react-table';
import { Trash } from 'lucide-react';

import { useConfirm } from '@/hooks/use-confirm';
import { Button } from '@/components/ui/button';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
   onDelete: (rows: Row<TData>[]) => void;
   disabled?: boolean;
}

export function DataTable<TData, TValue>({
   columns,
   data,
   onDelete,
   disabled,
}: DataTableProps<TData, TValue>) {
   const [ConfirmDialog, confirm] = useConfirm(
      'Are you sure?',
      'Your are about to perform a bulk delete.'
   );

   const [rowSelection, setRowSelection] = React.useState({});

   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onRowSelectionChange: setRowSelection,
      state: {
         rowSelection,
      },
   });

   return (
      <div>
         <ConfirmDialog />
         <div className="flex items-center py-4">
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
               <Button
                  disabled={disabled}
                  size="sm"
                  variant="outline"
                  className="ml-auto font-normal text-xs"
                  onClick={async () => {
                     const ok = await confirm();
                     if (ok) {
                        onDelete(table.getFilteredSelectedRowModel().rows);
                        table.resetRowSelection();
                     }
                  }}
               >
                  <Trash className="size-4 mr-2" />
                  Delete ({table.getFilteredSelectedRowModel().rows.length})
               </Button>
            )}
         </div>
         <div className="rounded-md border">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map(headerGroup => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                           return (
                              <TableHead key={header.id}>
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                         header.column.columnDef.header,
                                         header.getContext()
                                      )}
                              </TableHead>
                           );
                        })}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map(row => (
                        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                           {row.getVisibleCells().map(cell => (
                              <TableCell key={cell.id}>
                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                           No results.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
         <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
               {table.getFilteredSelectedRowModel().rows.length} of{' '}
               {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <Button
               variant="outline"
               size="sm"
               onClick={() => table.previousPage()}
               disabled={!table.getCanPreviousPage()}
            >
               Previous
            </Button>
            <Button
               variant="outline"
               size="sm"
               onClick={() => table.nextPage()}
               disabled={!table.getCanNextPage()}
            >
               Next
            </Button>
         </div>
      </div>
   );
}
