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
@Entity({ name: 'find_opponent' })
export default class FindOpponent extends BaseEntity {
	@Column({ primary: true })
	@ManyToOne(() => Game)
	@JoinColumn({ name: 'game_id', referencedColumnName: 'game_id' })
	game_id: number;

	@Column({ primary: true })
	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
	user_id: number;

	@CreateDateColumn({ name: 'created_at' })
	created_at: Date;
}
