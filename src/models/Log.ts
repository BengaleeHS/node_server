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
import User from '../models/User';
import Game from '../models/Game';

// user는 postgreSQL의 예약어라 사용이 불가합니다.
@Entity({ name: 'log' })
export default class Log extends BaseEntity {
	@PrimaryGeneratedColumn({ name: 'log_id' })
	log_id: number;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_a_id', referencedColumnName: 'user_id' })
	user_a_id: number;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_b_id', referencedColumnName: 'user_id' })
	user_b_id: number;

	@ManyToOne(() => Game)
	@JoinColumn({ name: 'game_id', referencedColumnName: 'game_id' })
	game_id: number;

	@Column({ name: 'a_point' })
	a_point: number;

	@Column({ name: 'b_point' })
	b_point: number;

	@CreateDateColumn({ name: 'created_at' })
	created_at: Date;
}
