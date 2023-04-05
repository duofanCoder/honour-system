import { request } from '../request';
import { Dto } from '@/model';

export function fetchFileUpload(data: FormData) {
  return request.post<Array<Dto.File>>('/file/upload', data);
}

export function fetchFileDownload(data: number) {
  if ((data = 1)) {
    request.post('/file/download/user', {}, { responseType: 'blob' }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'user.xlsx'); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  } else {
    request.post('/file/download/honour', {}, { responseType: 'blob' }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'honour.xlsx'); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  }
}
