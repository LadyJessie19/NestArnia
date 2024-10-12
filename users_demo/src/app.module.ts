import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AddressesModule } from './addresses/addresses.module';
import { PetsModule } from './pets/pets.module';
import { EventsModule } from './events/events.module';
import { ImagesModule } from './images/images.module';
import { StaticModule } from './static/static.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    AddressesModule,
    PetsModule,
    EventsModule,
    ImagesModule,
    StaticModule,
  ],
})
export class AppModule {}
