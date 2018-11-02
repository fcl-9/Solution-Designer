export interface ExecuteResponse {
    ColumnMetaData: ColumnMetaDatum[];
    DebugInfo:      string;
    ErrorMessage:   null;
    IsSuccess:      boolean;
    Row:            Array<Array<boolean | number | string>>;
}

export interface ColumnMetaDatum {
    DefaultValue:    string;
    Direction:       number;
    IsAutoIncrement: boolean;
    IsDefault:       boolean;
    IsNull:          boolean;
    IsPrimary:       boolean;
    IsUnique:        boolean;
    ItemName:        string;
    Lenght:          number;
    Offset:          number;
    ParentName:      string;
    SchemaName:      string;
    Type:            number;
}
