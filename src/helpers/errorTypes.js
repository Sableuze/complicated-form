export const errorTypesAuth = {
  noPassword: 'Введите пароль',
  noUsername: 'Введите имя пользователя',
  shortUsername: 'Введите не менее пяти символов',
  tooLongUsername: 'Имя пользователя должно быть короче 10 символов',
  shortPassword: 'Пароль должен содержать не менее 6 символов',

};
export const errorTypesLogin = {
  500: 'Неправильный логин или пароль',
};
export const errorTypesRegister = {
  takenUsername: 'Данное имя пользователя уже занято',
  takenEmail: 'Данная почта уже занята',
  wrongPassword: 'Необходима как минимум одна цифра, строчная и заглавная буква',
  wrongUsername: 'Имя пользователя введено некорректно',
};

export const errorTypesSendResetMessage = {
  500: 'sxcsdsda',
};

export const errorTypesMain = {
  noHolder: 'Укажите организатора',
  short: 'Введите не менее трех символов',
  nuNumber: 'Введите номер телефона',
  incompleteNumber: 'Введите номер телефона полностью',
  noEmail: 'Необходимо указать почту',
  wrongEmail: 'Почта введена некорректно',
  noCity: 'Укажите город',
};

export const errorTypesRegular = {
  noName: 'Введите название',
  shortName: 'Название не может быть короче 5 символов',
  tooLongName: 'Название не может быть длиннее 50 символов',
  noDescription: 'Введите описание',
  shortDescription: 'Описание не может быть короче 20 символов',
};
export const errorTypesFiles = {
  noPicture: 'Прикрепите изображение',
};

export const errorTypesDate = {
  moreThanFinish: 'Дата начала не может быть больше даты окончания',
  lessThanStart: 'Дата окончания не может быть меньше даты начала',
  lessThanPreviousDateFinish: 'Значения в этом поле должны быть выше, чем в предыдущем',
  invalidDate: 'Введена некорректная дата',
};
export const errorTypesRating = {
  noRating: 'Укажите рейтинг мероприятия',
};

export const errorTypesAddress = {
  noStreet: 'Укажите улицу',
  noHouse: 'Укажите номер дома',
};
