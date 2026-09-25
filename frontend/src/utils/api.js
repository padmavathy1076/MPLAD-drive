import axios from 'axios';

const API_BASE = 'http://localhost:5001/api';

export const getProjects = () => axios.get(`${API_BASE}/projects`);
export const getModelStats = () => axios.get(`${API_BASE}/model-stats`);
export const predictFraud = (data) => axios.post(`${API_BASE}/predict`, data);
export const auditCSV = (formData) => axios.post(`${API_BASE}/audit-csv`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});