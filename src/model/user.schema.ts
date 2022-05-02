import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

// Prop 데이터베이스 스키마 정의에 대한 클래스
@Schema()
export class User {
  // Prop 데이터베이스 컬렉션 속성 정의
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now() })
  createdDate: Date;
}

// 스키마 생성
export const UserSchema = SchemaFactory.createForClass(User);
