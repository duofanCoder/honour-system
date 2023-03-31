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
    total?: number;
    pageNum: number;
    data?: Array<T>;
    pageSize: number;
    orderBy?: string;
  }

  interface User {
    id: number;
    name: string;
    username: string;
    password: string;
    userType: string;
    age: number;
    role: string;
    clazz: string;
    gender: boolean;
    avatar: string;
    phone: string;
  }
  interface Honour {
    id: number;
    title: string;
    description: string;
    createTime: string;
    updateTime: string;
    actTime: string;
    actTea: User[];
    actStu: User[];
    levelId: number;
    grade: string;
    gradeId: number;
    level: string;
    aproveStatus: string;
    recommendStatus: string;
    createUser: string;
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

  interface Perk {
    id: number;
    title: string;
    price: number;
    description: string;
    posterImg: string;
    campaignDetailId: number;
  }

  interface CampaignCard {
    id: number;
    cardImg: string;
    title: string;
    description: string;
    raisedMoney: number;
    goalRaisedMoney: number;
    categaryName: string;
    deadline: Date;
    isAttention: boolean;
    isInProgress: boolean;
  }

  interface PayOrder {
    id: number;
    createTime: string;
    updateTime: string;
    campaignDetail: CampaignDetail;
    campaignIntro: CampaignIntro;
    perk: Perk;
    owner: User;

    campaignDetailId: number;
    perkId: number;
    ownerId: number;
  }
}
