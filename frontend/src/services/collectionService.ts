const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Collection {
  id: string;
  name: string;
  season: string;
  status: 'draft' | 'active' | 'archived';
  discount: number;
  itemCount: number;
  image: string;
  createdAt: string;
}

export async function fetchCollections(): Promise<Collection[]> {
  try {
    const response = await fetch(`${API_URL}/api/collections`);
    if (!response.ok) throw new Error('فشل جلب المجموعات');
    return await response.json();
  } catch (error) {
    console.error('خطأ في جلب المجموعات:', error);
    return [];
  }
}

export async function saveCollection(collection: Collection): Promise<Collection> {
  try {
    const response = await fetch(`${API_URL}/api/collections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collection)
    });
    if (!response.ok) throw new Error('فشل حفظ المجموعة');
    return await response.json();
  } catch (error) {
    console.error('خطأ في حفظ المجموعة:', error);
    throw error;
  }
}

export async function deleteCollection(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/collections/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('فشل حذف المجموعة');
  } catch (error) {
    console.error('خطأ في حذف المجموعة:', error);
    throw error;
  }
}
