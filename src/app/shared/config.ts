// export const SERVER_URL: string = 'http://si-ramesh86:8080/TMS2/'; //dev server
//export const SERVER_URL: string = 'http://10.221.31.34:8080/TMS2/'; //prod server
export const SERVER_URL: string = 'http://172.24.1.204:8080/TMS2/'; //IT server

export const STATE: any = {
    NOT_FILLED: '0',
    SAVED: '1',
    SUBMITTED: '2',
    APPROVED: '3',
    REJECTED: '4'
};

export const ROLES: any = {
    USER: '0',
    APPROVER: '1',
    ADMIN: '2'
}