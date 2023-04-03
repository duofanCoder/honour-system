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

export function fetchUpdateHonour(honour: Partial<Dto.Honour>) {
  return request.put('/honour', honour);
}
