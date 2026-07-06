export class AuthRoutes {
    public static get GET_CURRENT_USER() {
        return '/user/@me';
    }

    public static get REGISTER_USER() {
        return '/user/register';
    }

    public static get LOGIN_USER() {
        return '/user/login';
    }

    public static get LOGOUT_USER() {
        return '/user/logout';
    }
}
