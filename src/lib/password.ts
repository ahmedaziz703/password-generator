export const generatePassword = (
  length: number,
  options: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  }
) => {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let chars = "";
  if (options.uppercase) chars += uppercaseChars;
  if (options.lowercase) chars += lowercaseChars;
  if (options.numbers) chars += numberChars;
  if (options.symbols) chars += symbolChars;

  if (chars === "") chars = lowercaseChars; // Fallback to lowercase if nothing selected

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
};

export const calculateStrength = (
  password: string,
  options: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  }
): number => {
  if (!password) return 0;
  
  let strength = 0;
  
  // Length contribution
  strength += Math.min(password.length / 20, 1) * 25;
  
  // Character types contribution
  if (options.uppercase) strength += 25;
  if (options.lowercase) strength += 25;
  if (options.numbers) strength += 25;
  if (options.symbols) strength += 25;
  
  return Math.min(strength, 100);
};