export type IsFree = 'true' | 'false';
export type ActivationMode = 'active' | 'timed' | 'disabled';

export type ActivationOptions = {
  activationMode: ActivationMode;
  startDate?: string;
  endDate?: string;
};

export type SitePopupOptions = {
  headline: string;
  text: string;
  imageUrl: string;
  imageTitle: string;
  isFree: IsFree;
} & ActivationOptions;