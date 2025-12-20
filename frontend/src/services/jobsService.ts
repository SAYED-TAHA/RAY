import { API_URL, getHeaders } from '@/utils/api';

export const fetchJobs = async () => {
  const response = await fetch(`${API_URL}/api/jobs`, {
    headers: getHeaders('application/json')
  });
  if (!response.ok) {
    throw new Error('فشل في جلب الوظائف');
  }
  return response.json();
};

export const fetchJobById = async (id: string) => {
  const response = await fetch(`${API_URL}/api/jobs/${id}`, {
    headers: getHeaders('application/json')
  });
  if (!response.ok) {
    throw new Error('فشل في جلب الوظيفة');
  }
  return response.json();
};

export const createJob = async (jobData: any) => {
  const response = await fetch(`${API_URL}/api/jobs`, {
    method: 'POST',
    headers: getHeaders('application/json'),
    body: JSON.stringify(jobData)
  });
  if (!response.ok) {
    throw new Error('فشل في إضافة الوظيفة');
  }
  return response.json();
};
