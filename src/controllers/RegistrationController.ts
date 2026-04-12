import {
    RegisterSellerCmd,
    RegisterSellerUsecase,
} from '../features/registration/RegisterSellerUsecase'

export class RegistrationController {
    constructor(private registerSellerUsecase: RegisterSellerUsecase) {}

    async registerSeller(cmd: RegisterSellerCmd) {
        return await this.registerSellerUsecase.execute(cmd)
    }
}
