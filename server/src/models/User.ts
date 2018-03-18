import {Table, Model, PrimaryKey, Column, AutoIncrement, Length, DataType, IsEmail, Scopes, DefaultScope, Unique, NotNull } from "sequelize-typescript";


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

  @NotNull
  @Unique
  @IsEmail
  @Length({min: 1, max: 255, msg: 'wrong length'})
  @Column(DataType.TEXT)
  email: string;

  @NotNull
  @Column(DataType.INTEGER)
  role: number;

  @NotNull
  @Column(DataType.INTEGER)
  priviledge: number;

  @NotNull
  @Length({min: 1, max: 255, msg: 'wrong length'})
  @Column
  password: string;

}