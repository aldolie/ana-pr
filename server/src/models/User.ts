import {Table, Model, PrimaryKey, Column, AutoIncrement, Length, DataType, IsEmail, Scopes, DefaultScope, Unique } from "sequelize-typescript";


@DefaultScope({
  attributes: ['id', 'email', 'role', 'priviledge']
})
@Scopes({
  full: {
    attributes: [ 'id', 'email', 'password', 'role', 'priviledge' ]
  }
})
@Table
export class User extends Model<User> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Unique
  @IsEmail
  @Length({min: 1, max: 255, msg: 'wrong length'})
  @Column(DataType.TEXT)
  email: string;

  @Column(DataType.INTEGER)
  role: number;

  @Column(DataType.INTEGER)
  priviledge: number;

  @Length({min: 1, max: 255, msg: 'wrong length'})
  @Column
  password: string;

}