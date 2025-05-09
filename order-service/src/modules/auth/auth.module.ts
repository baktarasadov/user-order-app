import { Module } from '@nestjs/common';
import { UserClientService } from './user-client.service';

const providers = [UserClientService]
const exportss = [UserClientService]
@Module({
    providers,
    exports: exportss,
})
export class AuthModule { }
