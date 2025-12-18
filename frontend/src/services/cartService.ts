const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  const storedTokens = localStorage.getItem('authTokens');
  if (storedTokens) {
    try {
      const parsed = JSON.parse(storedTokens);
      if (parsed?.accessToken) return parsed.accessToken;
    } catch {
      // ignore
    }
  }
  return localStorage.getItem('authToken');
};

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  subtotal: number;
}

export interface Cart {
  _id?: string;
  userId: string;
  items: CartItem[];
  total: number;
  itemCount: number;
  updatedAt?: string;
}

export const getCart = async (): Promise<Cart> => {
  try {
    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/api/cart`, { headers });
    if (!response.ok) throw new Error('Failed to fetch cart');
    return await response.json();
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const addToCart = async (productId: string, quantity: number = 1): Promise<Cart> => {
  try {
    const token = getAccessToken();
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/api/cart/add`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ productId, quantity })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add item to cart');
    }

    const data = await response.json();
    return data.cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCartItem = async (productId: string, quantity: number): Promise<Cart> => {
  try {
    const token = getAccessToken();
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/api/cart/update`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ productId, quantity })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update cart item');
    }

    const data = await response.json();
    return data.cart;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const removeFromCart = async (productId: string): Promise<Cart> => {
  try {
    const token = getAccessToken();
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/api/cart/remove`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ productId })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to remove item from cart');
    }

    const data = await response.json();
    return data.cart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const clearCart = async (): Promise<Cart> => {
  try {
    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/api/cart/clear`, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error('Failed to clear cart');
    const data = await response.json();
    return data.cart;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};
