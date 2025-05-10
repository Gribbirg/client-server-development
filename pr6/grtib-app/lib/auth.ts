export type User = {
  name: string;
  roles: string[];
  rights: string[];
};

export const isAuthenticated = (user?: User) => !!user;

export const isAllowed = (user: User, rights: string[]) =>
  rights.some((right) => user.rights.includes(right));

export const hasRole = (user: User, roles: string[]) =>
  roles.some((role) => user.roles.includes(role)); 