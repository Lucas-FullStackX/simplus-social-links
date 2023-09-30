export interface Tool {
	name: string;
	active: boolean;
	created_at: string;
	url: string;
	logo: string;
}

export interface BadgeInfo {
	text: string;
	variant: 'radiant' | 'secondary';
}

export enum LINK_TYPE {
	TWITTER = 'twitter',
	LINKEDIN = 'linkedin',
	FACEBOOK = 'facebook',
	PINTEREST = 'pinterest',
	EMAIL = 'email'
}
