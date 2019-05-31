let regNumber: RegExp = /^[0-9]*$/;
let regString: RegExp = /^[A-za-z]*$/;
let regStringUC: RegExp = /^[A-Z]*$/;
let regStringLC: RegExp = /^[a-z]*$/;
// let regStringWithSpace: RegExp = /[\s]*[a-zA-Z]{1,}[\s]*$/;
let regStringWithSpace: RegExp = /^[A-za-z\ ]*$/;
let regStringNumber: RegExp = /^[A-Za-z0-9]*$/;
let regStringNumberWithSpace: RegExp = /^[A-Za-z0-9 ]*$/;
let regURL: RegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

const isValid = (value: string, regex: RegExp): boolean => {
    if (regex.test(value)) {
        return true;
    }
    return false;
}


export const validate = (value: string, type: number | string): boolean => {
    switch (type) {
        case 0:
        case 'string': {
            return isValid(value, regStringWithSpace);
        }
        case 1:
        case 'number': {
            return isValid(value, regNumber);
        }
        case 3:
        case 'URL': {
            return isValid(value, regURL);
        }
        case 5:
        case 'address': {
            return isValid(value, regStringNumber);
        }
        default: {
            return false
        }
    }

}
