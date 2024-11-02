import React from 'react';
import { Upload } from 'lucide-react';
import { useCSVReader } from 'react-papaparse';

import { Button } from '@/components/ui/button';

interface UploadButtonProps {
   onUpload: (results: any) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onUpload }) => {
   const { CSVReader } = useCSVReader();

   return (
      <CSVReader onUploadAccepted={onUpload}>
         {({ getRootProps }: any) => (
            <Button size="sm" className="w-full lg:w-auto" {...getRootProps()}>
               <Upload className="size-4 mr-2" />
               Import
            </Button>
         )}
      </CSVReader>
   );
};

export default UploadButton;
