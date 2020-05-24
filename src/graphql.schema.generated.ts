
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum UserRole {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER"
}

export class AddUserInput {
    firstName?: string;
    lastName?: string;
    role?: UserRole;
}

export class Role {
    id?: string;
    name?: string;
}

export class User {
    firstName?: string;
    lastName?: string;
    role?: Role;
}

export abstract class IMutation {
    abstract addUser(addUserInput?: AddUserInput): User | Promise<User>;
}

export abstract class IQuery {
    abstract getUsers(): User[] | Promise<User[]>;
}
