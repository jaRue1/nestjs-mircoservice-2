import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product,ProductSchema } from './product.model';
import { HttpModule } from '@nestjs/axios';
// this implements the schema 
@Module({
  imports:[MongooseModule.forFeature([{ name:Product.name, schema: ProductSchema }]),HttpModule,
],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
