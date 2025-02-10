export const profileSettingPage = {
  deletePhoto: {
    bodyTitle: 'Вы уверены, что хотите удалить фото?',
    dialogTitle: 'Удалить фото',
    noButton: 'Нет',
    yesButton: 'Да',
  },
  profilePhoto: {
    addProfilePhoto: 'Добавить фото профиля',
    avatarSizeError: 'Размер фото должен быть менее 10 МБ',
    avatarTypeError: 'Формат загружаемой фотографии должен быть PNG или JPEG',
    closeButton: 'Закрыть',
    noButton: 'Нет',
    savePhoto: 'Сохранить',
    selectPhoto: 'Выберите фото',
    yesButton: 'Да',
  },
  settingsForm: {
    labels: {
      aboutMe: 'Обо мне',
      city: 'Выберите свой город',
      country: 'Выберите свою страну',
      dateOfBirth: 'Дата рождения',
      firstName: 'Имя',
      lastName: 'Фамилия',
      userName: 'Никнейм',
    },
    placeholders: {
      aboutMePlaceholder: 'Напишите что-нибудь о себе',
      cityPlaceholder: 'Город',
      countryPlaceholder: 'Страна',
    },
    submitButton: 'Сохранить изменения',
    toastMessages: {
      error: 'Ошибка! Сервер недоступен!',
      success: 'Ваши настройки сохранены!',
    },
    validation: {
      aboutMe: {
        allowedSymbols:
          'Информация обо мне должна содержать символы: 0-9, A-Z, a-z, А-Я, а-я + спец символы',
        maxLength: 'Максимальное количество символов 200',
        minLength: 'Минимальное количество символов 1',
      },
      ageValidationMessage:
        'Пользователь младше 13 не может создать профиль. <1>Политика конфиденциальности</1>',
      dateOfBirth: 'Введите корректный формат даты dd/MM/yyyy',
      firstName: {
        allowedSymbols: 'Имя может содержать символы: A-Z, a-z, А-Я, а-я',
        maxLength: 'Максимальное количество символов 50',
        minLength: 'Минимальное количество символов 1',
      },
      lastName: {
        allowedSymbols: 'Фамилия может содержать символы: A-Z, a-z, А-Я, а-я',
        maxLength: 'Максимальное количество символов 50',
        minLength: 'Минимальное количество символов 1',
      },
      linkPolicy: 'Политика конфиденциальности',
      userName: {
        allowedSymbols: 'Имя пользователя может содержать символы: 0-9, A-Z, a-z, _ ; -',
        maxLength: 'Максимальное количество символов 30',
        minLength: 'Минимальное количество символов 6',
      },
    },
  },

  tabs: {
    accountManagement: 'Управление аккаунтом',
    devices: 'Устройства',
    generalInformation: 'Основная информация',
    myPayments: 'Мои платежи',
  },
}
