import {request} from "@/service/request";
import {Dto} from "@/model";

/**
 * @name 文件上传模块
 */
// * 图片上传
export const uploadImg = (params: FormData) => {
    return request.post<Dto.File[]>(`/file/add`, params);
};

