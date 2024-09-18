'use client'
import React, { useState } from 'react'
import Logo from '../global/Logo'
import Link from 'next/link'
import { Form } from '../ui/form'
import { authFormSchema } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import CustomInput from './CustomInput';
import { useRouter } from 'next/navigation'

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    router.push('/home')
  } 

  return (
    <div className='w-[70%] flex flex-col gap-2 max-sm:w-[80%]'>
      <Logo />

      <div className=''>
        <p>
          { type === 'sign-in' ? 'Sign In' : 'Sign Up' }
        </p>

        <p>
          {
            type === 'sign-in' ?
            'Welcome back!  Enter your details to continue.':
            'Enter your details to continue.'
          }
        </p>
      </div>

      <div className=''>
        <Form { ...form }>
					<form onSubmit={ form.handleSubmit(onSubmit) }>
						<div className='flex flex-col gap-7 mb-10'>
							{
								type === 'sign-up' &&
                <CustomInput 
                  control={form.control} name='username'
                  label='Username' placeholder='Enter your username'
                />
							}
							<CustomInput 
								control={form.control} name='email'
								label='Email' placeholder='Enter your email'
							/>

							<CustomInput
								control={form.control} name='password'
								label='Password' placeholder='Enter your password'
							/>
						</div>

						<Button
							disabled={loading}
							type='submit' 
							className=''
						>
							{ type === 'sign-in' ? 'Sign In' : 'Sign Up' }
						</Button>
					</form>
				</Form>
      </div>

      <div className='flex w-full gap-1'>
        <p className=''>
          {
						type === 'sign-in' ?
						"Don't have an account?" :
						"Already have an account?"
					}
        </p>

        <Link
          className=''
          href={ type === 'sign-in' ? '/sign-up' : 'sign-in' }
        >
          { type === 'sign-in' ? 'Sign Up' : 'Sign In' }
        </Link>
      </div>
    </div>
  )
}
