import { Dto } from '@/model';
import { request } from '../request';

export function fetchQueryUser(condition: any) {
  return request.get<Dto.Page<Dto.User>>('/user/page', { params: condition });
}

export function fetchRemoveUser(params: { ids: string[] }) {
  return request.delete(`/user?ids=${params.ids.join(',')}`, {});
}

interface UserActionForm {
  username: string;
  nickname: string;
  email: string;
  password: string;
}

export function fetchRegisterUser(user: Partial<UserActionForm>) {
  return request.post('/user/signup', user);
}

export function fetchSaveUser(user: Partial<Dto.User>) {
  return request.post('/user', user);
}

export function fetchUpdateUser(user: Partial<Dto.User>) {
  console.log(user);
  return request.put('/user', user);
}

export function fetchUpdateProfile(user: any) {
  return request.post('/user/profile', user);
}

export function fetchResetUser(id: string) {
  return request.put('/user/reset' + `/${id}/123456`, {});
}

export function fetchPasswordUser(password: string) {
  return request.post('/user/password', { password });
}
