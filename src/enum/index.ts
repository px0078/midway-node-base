
enum DISABLE {
  false = 0,
  true,
}

enum USER_STATUS {
  enable = 0,
  disable,
  annul
}

enum GENDER {
  unknown = 0,
  male,
  female
}

enum FROM {
  none = 0,
  wechat,
  qq,
  mobile,
  pc,
  mac,
  other
}

enum ORDER_STATUS {
  no_pay = 0,
  no_emit,
  no_sign,
  no_comment,
  done
}

enum ORDER_TYPE {
  paper = 0
}

enum SUBJECT_STATUS {
  enable = 0,
  disable,
  annul
}

enum WALLET_STATUS {
  enable = 0,
  disable,
  annul
}