export interface IMenuItem {
  id: string;
  label: string;
  icon: string;
  routerLink?: string;
  items?: IMenuItem[];
}
