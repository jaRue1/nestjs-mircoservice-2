import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { Model } from "mongoose"
// this interacts with Mongo DB
@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name)private readonly productModel: Model<ProductDocument>){
    
  }

// get all products
  async all(){
    return this.productModel.find().exec();
  }
}
