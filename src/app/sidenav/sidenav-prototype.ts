export interface NavItem {
    displayName?: string;
    disabled?: boolean;
    external?: boolean;
    expanded?: boolean;
    chip?: boolean;
    iconName?: string;
    parent?: string;
    chipContent?: string;
    chipClass?: string;
    subtext?: string;
    route?: string;
    children?: NavItem[];
    ddType?: string;
}