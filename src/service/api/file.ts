import { getToken } from '@/utils';
import axios from 'axios';
import { request } from '../request';
import { Dto } from '@/model';

export function fetchFileUpload(data: FormData) {
  return request.post<Array<Dto.File>>('/file/upload', data);
}

export function fetchFileDownload(data: number) {
  if (data == 1) {
    axios
      .get('api/v1/file/download/user', {
        responseType: 'blob',
        baseURL: 'http://127.0.0.1:8080/',
        headers: {
          Authorization: getToken(),
        },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '用户信息.xlsx'); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
  } else {
    axios
      .get('api/v1/file/download/honour', {
        responseType: 'blob',
        baseURL: 'http://127.0.0.1:8080/',
        headers: {
          Authorization: getToken(),
        },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '荣誉信息.xlsx'); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
  }
}
