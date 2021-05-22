import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	CreateDateColumn,
} from 'typeorm';

// user는 postgreSQL의 예약어라 사용이 불가합니다.
@Entity({ name: 'creamo_user' })
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn({ name: 'id' })
	id: number;

	@Column({ name: 'name' })
	name: string;

	@Column({ name: 'email', unique: true })
	email: string;

	@Column({ name: 'password' })
	password: string;

	@Column({ name: 'salt' })
	salt: string;

	@CreateDateColumn({ name: 'created_at' })
	created_at: Date;
}
