export interface propValues {
    propValueEn: string;
    propValueFr: string;
}

export type radioProperty = {
    propNameFr: string;
    propNameEn: string;
    propNameSnakeCase: string;
    propValues: propValues[];
    selectedValueEn?: string;
}

