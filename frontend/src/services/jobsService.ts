const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const fetchJobs = async () => {
  const response = await fetch(`${API_URL}/api/jobs`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) {
    throw new Error('فشل في جلب الوظائف');
  }
  return response.json();
};

export const fetchJobById = async (id: string) => {
  const response = await fetch(`${API_URL}/api/jobs/${id}`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) {
    throw new Error('فشل في جلب الوظيفة');
  }
  return response.json();
};

export const createJob = async (jobData: any) => {
  const response = await fetch(`${API_URL}/api/jobs`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(jobData)
  });
  if (!response.ok) {
    throw new Error('فشل في إضافة الوظيفة');
  }
  return response.json();
};
