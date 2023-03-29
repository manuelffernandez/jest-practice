export type CartItems = Record<string, number>;

export interface CheckoutResponse {
  success: boolean;
  error?: string;
}

const sleep = async (time: number): Promise<void> => {
  // eslint-disable-next-line promise/param-names
  await new Promise(res => setTimeout(res, time));
};

export async function checkout(items: CartItems): Promise<CheckoutResponse> {
  const modifier = Object.keys(items).length > 0 ? 'success' : 'error';
  const url = `/checkout-${modifier}.json`;
  await sleep(500);
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(items),
  });
  const data = await response.json();
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!data.success) {
    throw new Error(data.error);
  }
  return data as CheckoutResponse;
}
