export type User = {
    id: number;
    login: string;
    password: string | null;
}
export interface IAuthProvider {
    user: User | null;
    isAuthenticated: boolean;
    signIn: (data: any) => Promise<boolean | null>;
    signOut: (data: any) => boolean | null;
    updateUser: (data: any) => Promise<boolean | null>;
}