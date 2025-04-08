import React from 'react'
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod';
import { Input } from '../ui/input';
import { authFormSchema } from '@/lib/utils';

const formSchema = authFormSchema('sign-up');
interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

export default function CustomInput({ control, name, label, placeholder }: CustomInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <div className='flex flex-col gap-4'>
          <FormLabel className=''>
            {label}
          </FormLabel>

          <div>
            <FormControl>
              <Input
                  id={label}
                  placeholder={placeholder}
                  type={name === 'password' ? 'password' : 'text'}
                  {...field}
                  className='bg-transparent rounded-md !broder-none shadow-none'
              />
            </FormControl>
            <FormMessage className='text-red-600 mt-2' />
          </div>
        </div>
      )}
    />
  )
}
