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
import FindOpponent from '../models/FindOpponent';
import Record from '../models/Record';
import Log from '../models/Log';
import Game from '../models/Game';
// user는 postgreSQL의 예약어라 사용이 불가합니다.
@Entity({ name: 'chobo_user' })
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn({ name: 'user_id' })
	user_id: number;

	@Column({ name: 'user_name' })
	user_name: string;

	@Column({ name: 'is_login', default: false })
	is_login: boolean;

	@ManyToOne(() => Game)
	@JoinColumn({ name: 'game_id', referencedColumnName: "game_id" })
	game_id: number;

	@OneToMany(() => FindOpponent, findOpponent => findOpponent.user_id)
	find_opponents: FindOpponent[];

	@OneToMany(() => Record, record => record.user_id)
	records: Record[];

	@OneToMany(() => Log, log => log.user_a_id)
	logs1: Log[];

	@OneToMany(() => Log, log => log.user_b_id)
	logs2: Log[];
}
