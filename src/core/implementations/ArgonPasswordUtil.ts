import { hash, verify } from 'argon2'
import { PasswordUtil } from '../interfaces/PasswordUtil'

export class ArgonPasswordUtil implements PasswordUtil {
    async hash(raw: string): Promise<string> {
        return await hash(raw)
    }

    async verify(raw: string, hashed: string): Promise<boolean> {
        return await verify(hashed, raw)
    }
}
