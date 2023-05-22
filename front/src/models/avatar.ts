export interface propValues {
    propValueEn: string;
    propValueFr: string;
}

export type radioProperty = {
    propNameFr: string;
    propNameEn: string;
    propType: string;
    propGroups: string;
    propNameSnakeCase: string;
    propValues: propValues[];
    selectedValueEn?: string;
}

