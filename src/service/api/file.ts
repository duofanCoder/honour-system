import { request } from '../request';
import { Dto } from '@/model';

export function fetchFileUpload(data: FormData) {
  return request.post<Array<Dto.File>>('/file/upload', data);
}

export function fetchFileDownload(data: number) {
  if ((data = 1)) {
    request.get('/file/download/user', {});
  } else {
    request.get('/file/download/honour', {});
  }
}
