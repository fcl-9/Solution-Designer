export interface CreateConnectionResponse {
    Account:            string;
    Atributes:          Atribute[];
    DebugInfo:          string;
    ErrorMessage:       string;
    ImpersonateAccount: boolean;
    IsSuccess:          boolean;
    Password:           string;
    TrustedConnection:  boolean;
    UserName:           string;
    Validated:          boolean;
    sql:                string;
}

export interface Atribute {
    Desc:         string;
    ExtendedName: string;
    IsEncrypted:  boolean;
    IsOptional:   boolean;
    IsReadOnly:   boolean;
    Key:          string;
    List:         string;
    Value:        string;
}
