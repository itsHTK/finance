'use client';

import React from 'react';
import { useOpenCategory } from '@/features/categories/hooks/use-open-category';
import { Edit, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ActionsProps {
   id: string;
}

const Actions: React.FC<ActionsProps> = ({ id }) => {
   const { onOpen } = useOpenCategory();
   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <Button variant="ghost" className="size-8 p-0">
               <MoreHorizontal className="size-4" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
               <Edit className="size-4 mr-2" />
               Edit
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default Actions;
