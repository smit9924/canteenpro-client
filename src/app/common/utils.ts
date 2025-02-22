// @param: string --> any of the string that need to be check
// @return: boolean --> whether string is null, undefined or empty("")
export function isNullOrEmpty(str: string): boolean {
    const check: boolean = (str === "" || str === null || str === undefined);
    return check;
}

// @param: string --> any of the variable that need to be check
// @return: boolean --> whether variable is null or undefined
export function isNullOrUndefined(obj: any): boolean {
    const check: boolean = (obj === null || obj === undefined);
    return check;
}