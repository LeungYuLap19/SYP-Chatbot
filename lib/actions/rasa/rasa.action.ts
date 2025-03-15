// http://localhost:5005/webhooks/rest/webhook
'use server'
import axios from 'axios';
import { getHttpError } from '../errors/apiErrorsHandler';

export async function botResponse(message: Message): Promise<Result<null | RasaCustom>> {
  try {
    const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
      sender: 'user',
      message: message.text
    });
    // console.log(response.data);
    if (response.data[0]?.custom) {
      return { data: response.data[0].custom };
    }
    return { data: null };
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Send Message Error:', error.response.status, error.response.statusText);
      const errorMessage = getHttpError(error.response.status);
      return { error: errorMessage };
    }

    console.error('Send Message Error:', error.message);
    return {
      error: { errorCode: 'network/error', message: 'Network error. Please check your connection.' },
    };
  }
}