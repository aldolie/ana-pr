import {
    Table, Model, PrimaryKey, Column, AutoIncrement, DataType, DefaultScope, Scopes, AllowNull,
    ForeignKey, BelongsTo
} from "sequelize-typescript";
import {User} from "./User";

@DefaultScope({
    attributes: ['id', 'userId', 'bankName', 'accountName', 'accountNumber', 'paymentProof', 'priviledge', 'status', 'respondedAt', 'expiredAt']
})
@Scopes({
  priviledge: {
    attributes: [ 'id', 'userId', 'priviledge', 'expiredAt']
  }
})
@Table({
  tableName: 'subscription'
})
export class Subscription extends Model<Subscription> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column({field: 'user_id', type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @AllowNull(false)
    @Column({field: 'bank_name', type: DataType.STRING})
    bankName: string;

    @AllowNull(false)
    @Column({field: 'account_name', type: DataType.STRING})
    accountName: string;

    @AllowNull(false)
    @Column({field: 'account_number', type: DataType.STRING})
    accountNumber: string;

    @AllowNull(false)
    @Column({field: 'payment_proof', type: DataType.TEXT})
    paymentProof: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    priviledge: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    status: number;

    @AllowNull(true)
    @Column({field: 'responded_at', type: DataType.DATE})
    respondedAt: Date;

    @AllowNull(true)
    @Column({field: 'expired_at', type: DataType.DATE})
    expiredAt: Date;
}