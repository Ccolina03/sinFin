import { Module } from '@nestjs/common'
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationRepository } from './reservations.repository';
import { DatabaseModule } from '@app/common';
import { ReservationDocument, ReservationSchema } from './models/reservations.schema';
import { LoggerModule } from '@app/common'
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  //In the object we provide the name which is the injection token that we used to inject this model so can be found in ReservationRepository 
  //in the object we also provide the ReservationSchema
  imports: [DatabaseModule,
            DatabaseModule.forFeature([{ name: ReservationDocument.name, schema: ReservationSchema}]),
            LoggerModule,
            ConfigModule.forRoot({
              isGlobal: true,        //making Global so ConfigModule is avaialble to anyone who needs it
              validationSchema: Joi.object({
                  MONGODB_URI: Joi.string().required(),
                  PORT: Joi.number().required(),
              })
            })
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository]
})
export class ReservationsModule {}
