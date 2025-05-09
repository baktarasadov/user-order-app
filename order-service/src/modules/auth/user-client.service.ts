import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserClientService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBIT_URL],
                queue: 'user_queue',
                queueOptions: { durable: true },
            },
        });
    }

    async verifyToken(token: string) {
        return this.client.send({ cmd: 'verify_token' }, { token }).toPromise();
    }
}
