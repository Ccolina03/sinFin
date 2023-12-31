import { Module } from '@nestjs/common';
import {ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
    //async configuration. forRoot is sync.
    imports: [MongooseModule.forRootAsync({
        //Access useFactory by injecting ConfigService
        //allows to generate config objects based on specs, performs async taks, and inject other services
        useFactory: (ConfigService: ConfigService) => ({
            uri: ConfigService.get('MONGODB_URI') //acceses the .env file from the microservice where imported on
        }),
        inject: [ConfigService], //dependencies to to be injected into the useFactory
    })
    
    
    ]
})
export class DatabaseModule {
    //To allow modules to provide their Mongoose models to the DatabaseModule i.e. provide ReservationDocument
    static forFeature(models: ModelDefinition[]) { //array of Mongoose Models to be used 
        return MongooseModule.forFeature(models);
    }
}
