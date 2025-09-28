import { Injectable } from '@nestjs/common';
import {PrismaClient} from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: "postgresql://dev:password@localhost:5434/pokedex?schema=public"
                }
            }
        });
    }
}
