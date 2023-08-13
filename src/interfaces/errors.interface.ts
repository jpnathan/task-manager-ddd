interface RequestErrorOutput {
    statusCode: number,
    payload: object,
}

export interface RequestError extends Error {
    status: number,
    output: RequestErrorOutput,
    name: string,
    statusCode: number,
}