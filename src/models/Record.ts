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
import Game from '../models/Game';
import User from '../models/User';

// user는 postgreSQL의 예약어라 사용이 불가합니다.
@Entity({ name: 'record' })
export default class Record extends BaseEntity {
	@Column({ primary: true })
	@ManyToOne(() => Game)
	@JoinColumn({ name: 'game_id', referencedColumnName: 'game_id' })
	game_id: number;

	@Column({ primary: true })
	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
	user_id: number;

	@Column({ name: 'rating1' })
	rating_1: number;

	@Column({ name: 'rating2' })
	rating_2: number;
}
