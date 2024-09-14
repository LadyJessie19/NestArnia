import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './customers.entity';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      age: 25,
    },
    {
      id: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
      age: 40,
    },
  ];

  create(createCustomerDto: CreateCustomerDto) {
    const [customer] = [...this.customers].sort((a, b) => b.id - a.id);
    const newCustomer = { id: customer.id + 1, ...createCustomerDto };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  findAll(age?: number) {
    if (age) {
      const filteredCustomers = this.customers.filter(
        (customer) => customer.age === age,
      );
      if (filteredCustomers.length === 0) {
        throw new NotFoundException('Nenhum cliente com essa idade no banco');
      }
      return filteredCustomers;
    }
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((customer) => customer.id === id);
    if (!customer) {
      throw new NotFoundException(
        `O cliente com o id: ${id} não foi encontrado`,
      );
    }
    return customer;
  }

  update(id: number, bodyRequest: UpdateCustomerDto) {
    const index = this.customers.findIndex((customer) => customer.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `O cliente com o id: ${id} não foi encontrado`,
      );
    }
    this.customers[index] = { ...this.customers[index], ...bodyRequest };
    return this.customers[index];
  }

  remove(id: number) {
    const index = this.customers.findIndex((customer) => customer.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `O cliente com o id: ${id} não foi encontrado`,
      );
    }
    this.customers.splice(index, 1);
    return 'O cliente foi deletado com sucesso!';
  }
}
