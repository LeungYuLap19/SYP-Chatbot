'use client'
import React, { useState } from 'react'
import Logo from '../global/Logo'
import Link from 'next/link'
import { Form } from '../ui/form'
import { authFormSchema, showToast } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomInput from './CustomInput';
import { useRouter } from 'next/navigation'
import { createAccount, createUser, getUserByUID, signInAccount } from '@/lib/actions/auth/firebaseAuth.action'
import { storeToCookies } from '@/lib/actions/cookies/cookies.action'
import { COOKIES_KEY_USERDATA, DAYS_TO_EXPIRE, ERROR_TOAST_TITLE } from '@/constants'
import CustomButton from '../global/CustomButton'

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
    setLoading(true);
    const authResult = type === 'sign-in' ? 
      await signInAccount({ email: values.email, password: values.password }) :
      await createAccount({ email: values.email, password: values.password });

    if (authResult.data) {
      const uid = authResult.data;
      const fsResult = type === 'sign-in' ?
        await getUserByUID({ uid: uid }) :
        await createUser({ uid: uid, username: values.username!, email: values.email });
      if (fsResult.data) {
        const userData = fsResult.data;
        const cookiesResult = await storeToCookies<UserData>({ key: COOKIES_KEY_USERDATA, data: userData, daysToExpire: DAYS_TO_EXPIRE });
        if (cookiesResult.data) {
          router.push('/chatroom');
        }
        else if (cookiesResult.error) {
          showToast({ title: ERROR_TOAST_TITLE, description: cookiesResult.error.message });
        }
      }
      else if (fsResult.error) {
        showToast({ title: ERROR_TOAST_TITLE, description: fsResult.error.message });
      }
    }
    else if (authResult.error) {
      showToast({ title: ERROR_TOAST_TITLE, description: authResult.error.message });
    }
    form.reset();
    setLoading(false);
  } 

  return (
    <div className='w-[70%] flex flex-col gap-4 max-sm:w-[80%]'>
      <Logo />

      <div className='flex flex-col gap-2 mb-4'>
        <p className='text-2xl font-semibold'>
          { type === 'sign-in' ? 'Sign In' : 'Sign Up' }
        </p>

        <p className='text-sm'>
          {
            type === 'sign-in' ?
            'Welcome back!  Enter your details to continue.':
            'Enter your details to continue.'
          }
        </p>
      </div>

      <div className='mb-6'>
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

            <CustomButton 
              loading={loading} 
              type={'submit'} 
              label={type === 'sign-in' ? 'Sign In' : 'Sign Up'} 
              className='rounded-md bg-gray-200'
            />
					</form>
				</Form>
      </div>

      <div className='flex w-full gap-1 text-sm'>
        <p className=''>
          {
						type === 'sign-in' ?
						"Don't have an account?" :
						"Already have an account?"
					}
        </p>

        <Link
          className='font-semibold underline'
          href={ type === 'sign-in' ? '/sign-up' : 'sign-in' }
        >
          { type === 'sign-in' ? 'Sign Up' : 'Sign In' }
        </Link>
      </div>
    </div>
  )
}
