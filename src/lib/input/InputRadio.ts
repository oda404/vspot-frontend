
export type RadioOption = {
    value: string;
    display: string;
    icon?: any;
    image_url?: string;
    description?: string | { translation: string; args: any };
    selected: boolean;
};
