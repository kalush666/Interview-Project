export class ValidationUtils {
  public static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public static isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+[1-9]\d{0,14}$/;
    return phoneRegex.test(phone);
  }

  public static sanitizeString(value: any): string | undefined {
    if (typeof value !== "string") return undefined;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  public static removeUndefinedFields<T extends Record<string, any>>(
    obj: T
  ): Partial<T> {
    const cleaned: Partial<T> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined && value !== null) {
        cleaned[key as keyof T] = value;
      }
    }
    return cleaned;
  }

  public static validateMessageLength(
    message: string,
    maxLength: number
  ): boolean {
    return Boolean(
      message && message.trim().length > 0 && message.length <= maxLength
    );
  }

  public static validateNameLength(
    name: string,
    minLength: number,
    maxLength: number
  ): boolean {
    return Boolean(
      name && name.trim().length >= minLength && name.trim().length <= maxLength
    );
  }
}
