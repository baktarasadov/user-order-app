import { RmqOptions, Transport } from '@nestjs/microservices';

export function getRmqOptions(queue: string, withDLX = false): RmqOptions {
    return {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBIT_URL],
            queue,
            queueOptions: withDLX
                ? {
                    durable: true,
                    arguments: {
                        'x-dead-letter-exchange': `${queue}_dlx`,
                    },
                }
                : {
                    durable: true,
                },
        },
    };
}

