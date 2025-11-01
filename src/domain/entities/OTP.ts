export class OTP {
    constructor(

        public readonly phone: string,
        public readonly code: string,
        public readonly ttlSeconds: number

    ) { }
}