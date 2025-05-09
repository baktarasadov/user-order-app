import { Injectable } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';

@Injectable()
export class EntityMapper {
    toEntity<T, V>(request: V, entityClass: ClassConstructor<T>): T {
        return request as unknown as T;
    }

    toDto<T, V>(entity: T, dtoClass: ClassConstructor<V>): V {
        return plainToInstance(dtoClass, entity, { excludeExtraneousValues: true });
    }

    toDtos<T, V>(entities: T[], dtoClass: ClassConstructor<V>): V[] {
        return entities.map((entity) => this.toDto(entity, dtoClass));
    }
}