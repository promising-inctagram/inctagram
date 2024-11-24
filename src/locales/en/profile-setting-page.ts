export const profileSettingPage = {
  profilePhoto: {
    addProfilePhoto: 'Add a Profile Photo',
    deletePhotoQuestion: 'Are you sure you want to delete the photo?',
    deleteProfilePhoto: 'Delete Photo',
    noButton: 'No',
    savePhoto: 'Save',
    selectPhoto: 'Select from Computer',
    yesButton: 'Да',
  },
  settingsForm: {
    labels: {
      aboutMe: 'About Me',
      city: 'Select your city',
      country: 'Select your country',
      dateOfBirth: 'Date of Birth',
      firstName: 'First Name',
      lastName: 'Last Name',
      userName: 'Username',
    },
    placeholders: {
      aboutMePlaceholder: 'Write something about yourself',
      cityPlaceholder: 'City',
      countryPlaceholder: 'Country',
    },
    submitButton: 'Save Changes',
    toastMessages: {
      error: 'Error! Server is not available!',
      success: 'Your settings are saved!',
    },
    validation: {
      aboutMe: {
        allowedSymbols: 'About me may contain symbols: 0-9, A-Z, a-z, А-Я, а-я + special symbols',
        maxLength: 'Maximum number of characters 200',
        minLength: 'Minimum number of characters 0',
      },
      ageValidationMessage: 'A user under 13 cannot create a profile. <1>Privacy Policy</1>',
      dateOfBirth: 'Enter the correct date format dd/MM/yyyy',
      firstName: {
        allowedSymbols: 'FirstName may contain symbols: A-Z, a-z, А-Я, а-я',
        maxLength: 'Maximum number of characters 50',
        minLength: 'Minimum number of characters 1',
      },
      lastName: {
        allowedSymbols: 'Lastname may contain symbols: A-Z, a-z, А-Я, а-я',
        maxLength: 'Maximum number of characters 50',
        minLength: 'Minimum number of characters 1',
      },
      linkPolicy: 'Privacy Policy',
      userName: {
        allowedSymbols: 'Username may contain symbols: 0-9, A-Z, a-z, _ ; -',
        maxLength: 'Maximum number of characters 30',
        minLength: 'Minimum number of characters 6',
      },
    },
  },
  tabs: {
    accountManagement: 'Account Management',
    devices: 'Devices',
    generalInformation: 'General Information',
    myPayments: 'My Payments',
  },
}
