import {Table, Model, PrimaryKey, Column, AutoIncrement, Length, DataType, IsEmail, Scopes, DefaultScope, Unique, AllowNull } from "sequelize-typescript";


@DefaultScope({
  attributes: ['id', 'email', 'role', 'priviledge']
})
@Scopes({
  full: {
    attributes: [ 'id', 'email', 'password', 'role', 'priviledge', 'activationToken', 'active', 'name', 'dateOfBirth', 'country', 'region', 'postalCode', 'phoneNumber']
  }
})
@Table
export class User extends Model<User> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Unique
  @IsEmail
  @Length({min: 1, max: 255, msg: 'wrong length'})
  @Column(DataType.TEXT)
  email: string;


  @AllowNull(false)
  @Column(DataType.INTEGER)
  role: number;

  
  @AllowNull(false)
  @Column(DataType.INTEGER)
  priviledge: number;

  
  @AllowNull(false)
  @Length({min: 1, max: 255, msg: 'wrong length'})
  @Column
  password: string;

  @Column({field: 'activation_token', type: DataType.STRING })
  activationToken: string;


  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  active: boolean;

  @AllowNull(true)
  @Column(DataType.TEXT)
  name: string;

  @AllowNull(true)
  @Column({field: 'date_of_birth', type: DataType.DATEONLY})
  dateOfBirth: Date;

  @AllowNull(true)
  @Column(DataType.TEXT)
  country: string;


  @AllowNull(true)
  @Column(DataType.TEXT)
  region: string;


  @AllowNull(true)
  @Column({field: 'postal_code', type: DataType.TEXT})
  postalCode: string;

  @AllowNull(true)
  @Column({field: 'phone_number', type: DataType.TEXT})
  phoneNumber: string;

}