import {request} from '../request';
import {Dto} from '@/model';

export function fetchQueryHonour(condition: any) {
    return request.post<Dto.Page<Dto.Honour>>('/honour/page', condition);
}

export function fetchRemoveHonour(params: { ids: string[] }) {
    return request.delete(`/honour?ids=${params.ids.join(",")}`, {});
}

export function fetchSaveHonour(Honour: Partial<Dto.Honour>) {
    return request.post('/honour', Honour);
}

export function fetchUpdateHonour(Honour: Partial<Dto.Honour>) {
    return request.put('/honour', Honour);
}
