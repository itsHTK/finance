import React from 'react';
import { insertAccountSchema } from '@/db/schema';
import AccountsForm from '@/features/accounts/components/accounts-form';
import { useCreateAccount } from '@/features/accounts/hooks/use-create-account';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';
import { z } from 'zod';

import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
} from '@/components/ui/sheet';

const formSchema = insertAccountSchema.pick({
   name: true,
});

type FormValues = z.input<typeof formSchema>;

const NewAccountSheet = () => {
   const { isOpen, onClose } = useNewAccount();

   const mutation = useCreateAccount();

   const onSubmit = (values: FormValues) => {
      mutation.mutate(values, {
         onSuccess: () => {
            onClose();
         },
      });
   };

   return (
      <Sheet open={isOpen} onOpenChange={onClose}>
         <SheetContent>
            <SheetContent className="space-y-4">
               <SheetHeader>
                  <SheetTitle>New Account</SheetTitle>
                  <SheetDescription>
                     Create a new account to track your transactions.
                  </SheetDescription>
               </SheetHeader>
               <AccountsForm
                  onSubmit={onSubmit}
                  disabled={mutation.isPending}
                  defaultValues={{
                     name: '',
                  }}
               />
            </SheetContent>
         </SheetContent>
      </Sheet>
   );
};

export default NewAccountSheet;
