'use server'
import { cookies } from 'next/headers';
import { getCookiesError } from '../errors/apiErrorsHandler';

// Store to Cookies
export async function storeToCookies<T>(key: string, data: T, daysToExpire: number = 7): Promise<Result<boolean>> {
  try {
    const jsonData = JSON.stringify(data);
    const expires = new Date();
    expires.setTime(expires.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));

    cookies().set(key, jsonData, {
      path: '/',
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: expires,
    });

    return { data: true }; // Success
  } catch (error: any) {
    console.error('Store to Cookies Error:', error);
    return { error: getCookiesError(error) }; // Error case
  }
}

// Get from Cookies
export async function getFromCookies<T>(key: string): Promise<Result<T | null>> {
  try {
    const jsonData = cookies().get(key);
    if (jsonData && jsonData.value) {
      const parsedData = JSON.parse(jsonData.value) as T;
      return { data: parsedData }; // Success
    }
    return { data: null }; // Cookie not found, return null
  } catch (error: any) {
    console.error('Get From Cookies Error:', error);
    return { error: getCookiesError(error) }; // Error case
  }
}

// Remove from Cookies
export async function removeFromCookies(key: string): Promise<Result<boolean>> {
  try {
    cookies().delete(key);
    return { data: true }; // Success
  } catch (error: any) {
    console.error('Remove From Cookies Error:', error);
    return { error: getCookiesError(error) }; // Error case
  }
}
