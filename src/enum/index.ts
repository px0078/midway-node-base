
export enum DISABLE {
  false = 0,
  true,
}

export enum USER_STATUS {
  enable = 0,
  disable,
  annul
}

export enum GENDER {
  unknown = 0,
  male,
  female
}

export enum FROM {
  none = 0,
  wechat,
  qq,
  mobile,
  pc,
  mac,
  other
}

export enum ORDER_STATUS {
  no_pay = 0,
  no_emit,
  no_sign,
  no_comment,
  done
}

export enum ORDER_TYPE {
  paper = 0
}

export enum SUBJECT_STATUS {
  enable = 0,
  disable,
  annul
}

export enum WALLET_STATUS {
  enable = 0,
  disable,
  annul
}