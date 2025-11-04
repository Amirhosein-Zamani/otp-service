export const includeIf = (condition: boolean, obj: Record<string, any> = {}) =>
    condition ? obj : {};