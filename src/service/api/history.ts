import { Dto } from '@/model';
import { request } from '../request';

export function fetchQueryHistory(condition: any) {
  return request.get<Dto.Page<Dto.History>>('/history/page', { params: condition });
}

export function fetchRemoveHistory(params: { ids: string[] }) {
  return request.delete(`/history?ids=${params.ids.join(',')}`, {});
}

export function fetchSaveHistory(history: Partial<Dto.History>) {
  return request.post('/history', history);
}

export function fetchHistory(id: string) {
  return request.get('/history/' + id);
}

export function fetchUpdateHistory(history: Partial<Dto.History>) {
  return request.put('/history', history);
}

export function fetchRecommendHistory(id: string, recommend: string) {
  return request.get(`/history/recommend`, { params: { id, recommend } });
}

export function fetchApproveHistory(id: string, approve: string) {
  return request.get(`/history/approve`, { params: { id, approve } });
}
