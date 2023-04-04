export declare namespace Dto {
  // header
  interface File {
    size: number;
    suffix: string;
    createTime: string;
    updateTime: string;
    uploadStartTime: string;
    height: string;
    originalFileName: string;
    fullFilePath: string;
    filePath: string;
    uploadEndTime: string;
  }

  interface Token {
    prefix: string;
    expiration: number;
    token: string;
  }

  interface Page<T> {
    query?: string;
    total?: number;
    pageNum: number;
    data?: Array<T>;
    pageSize: number;
    orderBy?: string;
  }

  interface User {
    id: string;
    name: string;
    username: string;
    password: string;
    createTime: string;
    updateTime: string;
    userType: string;
    age: number;
    role: string;
    clazz: string;
    gender: boolean;
    avatar: string;
    phone: string;
  }

  interface Honour {
    id: string;
    title: string;
    description: string;
    createTime: string;
    updateTime: string;
    actTime: string;
    actTea: User[];
    actUsers: string;
    actStu: User[];
    // 级别
    levelId: string;
    category: string;
    thumbList: string[];
    // 类别
    categoryId: string;
    level: string;
    aproveStatus: string;
    recommendStatus: string;
    createUser: string;
    actUser?: string;
    clazz?: string;
    // 学期
    term?: string;
    actCreateTime?: string;
    actEndTime?: string;
  }

  interface History {
    id: number;
    title: string;
    description: string;
    createTime: string;
    updateTime: string;
    honourId: number;
    reason: string;
    color: string;
    remark: string;
  }

  interface File {
    size: number;
    suffix: string;
    createTime: string;
    updateTime: string;
    uploadStartTime: string;
    height: string;
    originalFileName: string;
    fullFilePath: string;
    filePath: string;
    uploadEndTime: string;
  }

  interface Category {
    id: number;
    name: string;
    icon: string;
  }
}
