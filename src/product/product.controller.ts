import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service'
@Controller('products')
export class ProductController {

  constructor(private productService: ProductService){} // implementing the product service

  @Get()
  async all(){
    return this.productService.all();
  }
  @EventPattern('hello') // logging the event from rabbitMQ
  async hello(data: string){
    console.log(data)
  }
}
