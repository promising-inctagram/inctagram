export const validation = {
  agreeToTerms: 'Please agree to the terms and conditions',
  email: 'The email must match the format example@example.com',
  password: {
    maxLength: "Password length can't be more than 20 characters",
    minLength: "Password length can't be less than 6 characters",
    mustContainLetter: 'Password must contain at least one uppercase and lowercase letter',
    mustContainNumber: 'Password must contain at least one number',
    mustContainSpecSymbols:
      'Password must contain at least one special symbol: ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
    noWhiteSpace: 'Whitespace characters are not allowed',
  },
  passwordsMatch: 'Passwords must match',
  requiredField: 'Required field',
  userName: {
    allowedSymbols: 'Username may contain symbols: 0-9, A-Z, a-z, _ or -',
    maxLength: "Username length can't be more than 30 characters",
    minLength: "Username length can't be less than 6 characters",
  },
}
