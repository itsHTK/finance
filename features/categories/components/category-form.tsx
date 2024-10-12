import React from 'react';
import { insertCategorySchema } from '@/db/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = insertCategorySchema.pick({
   name: true,
});

type FormValues = z.input<typeof formSchema>;

interface CategoriesFormProps {
   id?: string;
   defaultValues?: FormValues;
   onSubmit: (values: FormValues) => void;
   onDelete?: () => void;
   disabled?: boolean;
}

const CategoryForm: React.FC<CategoriesFormProps> = ({
   id,
   disabled,
   onDelete,
   onSubmit,
   defaultValues,
}) => {
   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: defaultValues,
   });

   const handleSubmit = (values: FormValues) => {
      onSubmit(values);
   };

   const handleDelete = () => {
      onDelete?.();
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
            <FormField
               name="name"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Name</FormLabel>
                     <FormControl>
                        <Input
                           disabled={disabled}
                           placeholder="e.g. Food, Travel, etc."
                           {...field}
                        />
                     </FormControl>
                  </FormItem>
               )}
            />
            <Button className="w-full" disabled={disabled}>
               {!!id ? 'Save Changes' : 'Create category'}
            </Button>
            {!!id && (
               <Button
                  onClick={handleDelete}
                  type="button"
                  disabled={disabled}
                  className="w-full"
                  variant="outline"
               >
                  <Trash className="size-4 mr-2" />
                  Delete Category
               </Button>
            )}
         </form>
      </Form>
   );
};

export default CategoryForm;
