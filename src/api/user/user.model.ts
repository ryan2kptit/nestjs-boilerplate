import { UserStatus } from './user.constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema({
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
})
export class User {
  @Prop({ length: 255, unique: true, nullable: true })
  name: string;

  @Prop({ length: 255, unique: true, nullable: true })
  email: string;

  @Prop({ length: 200, nullable: true, select: false })
  password: string;

  @Prop({ enum: UserStatus, default: UserStatus.ACTIVE })
  status: number;

  @Prop({ length: 14, nullable: true })
  phone: string;

  @Prop({ name: 'last_login', nullable: true })
  lastLogin: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
