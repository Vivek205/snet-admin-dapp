let regNumber: RegExp = /^[0-9]*$/;
let regString: RegExp = /^[A-za-z]*$/;
let regStringUC: RegExp = /^[A-Z]*$/;
let regStringLC: RegExp = /^[a-z]*$/;
// let regStringWithSpace: RegExp = /[\s]*[a-zA-Z]{1,}[\s]*$/;
let regStringWithSpace: RegExp = /^[A-za-z\ ]*$/;
let regStringNumber: RegExp = /^[A-Za-z0-9]*$/;
let regStringNumberWithSpace: RegExp = /^[A-Za-z0-9 ]*$/;
let regURL: RegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

/** validate the string with custom RegExp */
const isValid = (value: string, regex: RegExp): boolean => {
    if (regex.test(value)) {
        return true;
    }
    return false;
}

/**return: whether the string is a valid number */
export const isValidNumber = (value: string): boolean | string | number => {
    let trimmed: number = parseFloat(value.trim());
    if (isNaN(trimmed)) {
        return false;
    };
    return trimmed;
}

/** value: string to validated
 *  allowedChars: array of special characters to be allowed explicitly
 *  return string without any special characters except the allowed ones
 */
export const removeSplChars = (value: string, allowedChars?: string[]) => {
    let reg = /[^0-9a-zA-Z]/;
    if (allowedChars !== undefined) {
        reg = new RegExp(`[^0-9a-zA-z\\${allowedChars.join('\\')}]`);
    }
    console.log('regex', reg);
    let removed = value.replace(reg, '');
    return removed;
}


