export interface NavigationItem {
  readonly href: `#${string}`;
  readonly label: string;
}

export const primaryNavigation = Object.freeze([
  { href: '#recursos', label: 'Recursos' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#para-quem', label: 'Para quem' },
] satisfies readonly NavigationItem[]);

export const headerContent = Object.freeze({
  loginLabel: 'Entrar',
  signupLabel: 'Criar conta',
});
