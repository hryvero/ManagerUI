export interface User{
    id: string,
    name: string,
    age: number,
    email: string,
    workingPosition: WorkPosition;

}

export enum WorkPosition{
    JUNIOR,
    MIDDLE,
    SENIOR,
    QA,
    PROJECT_MANAGER
}