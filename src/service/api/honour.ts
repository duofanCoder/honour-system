import { Dto } from '@/model';
import { request } from '../request';

export function fetchQueryHonour(condition: any) {
  return request.get<Dto.Page<Dto.Honour>>('/honour/page', { params: condition });
}

export function fetchRemoveHonour(params: { ids: string[] }) {
  return request.delete(`/honour?ids=${params.ids.join(',')}`, {});
}

export function fetchSaveHonour(honour: Partial<Dto.Honour>) {
  return request.post('/honour', honour);
}

export function fetchHonour(id: string) {
  return request.get('/honour/' + id);
}

export function fetchUpdateHonour(honour: Partial<Dto.Honour>) {
  return request.put('/honour', honour);
}

export function fetchRecommendHonour(id: string, recommend: string) {
  return request.get(`/honour/recommend`, { params: { id, recommend } });
}

export function fetchApproveHonour(id: string, approve: string) {
  return request.get(`/honour/approve`, { params: { id, approve } });
}
