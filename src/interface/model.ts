
interface IDate {
  createDate?: Date,
  updateDate?: Date,
}

export interface IAuthUser extends IDate {
  _id: string,
  name: string,
  account: string,
  password: string,
  status: number,
  gender: number,
  remark?: string,
  mobile?: string,
  avatar?: string,
  email?: string,
}

export interface IAuthModule extends IDate {
  _id?: string,
  name: string,
  uri?: string,
  sort?: number,
  parent_id?: string,
  describe?: string,
}

export interface IAuthGroup extends IDate {
  _id: string,
  name: string,
  describe?: string,
  users: [string],
  modules: [string],
  disable: number,
}

export interface IOpenUser extends IDate {
  nickName: string,
  avatarUrl: string,
  gender: number,
  province: string,
  city: string,
  country: string,
  uid: string | number,
  from: number,
}

export interface IPaperForm extends IDate {
  name: string,
  phone: string,
  discipline: number,
  task: number,
  taskSource?: string,
  orderId: string,
  shareId: string,
}

export interface IPaperOrder extends IDate {
  name: string,
  phone: string,
  formId: string,
  address: string,
  status: number,
  type: number,
  amount: number,
  discount: number,
}

export interface IStudySubject extends IDate {
  name: string,
  parentId: string,
  status: number,
  amount: number,
}

export interface IUserWallet extends IDate {
  name: string,
  uid: string,
  status: number,
  amount: number,
}