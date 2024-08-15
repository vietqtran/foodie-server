export const isValidPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.length === 10 && phoneNumber.startsWith('0') && !isNaN(Number(phoneNumber.slice(1)))
}
