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
import Record from '../models/Record';
import Log from '../models/Log';
import FindOpponent from '../models/FindOpponent';

// user는 postgreSQL의 예약어라 사용이 불가합니다.
@Entity({ name: 'game' })
export default class Game extends BaseEntity {
	@PrimaryGeneratedColumn({ name: 'game_id' })
	game_id: number;

	@Column({ name: 'game_name' })
	game_name: string;

	@Column({ name: 'rating_type' })
	rating_type: number;

	@Column({ name: 'matching_range' })
	matching_range: number;

	@Column({ name: 'matching_duration' })
	matching_duration: number;

	@OneToMany(() => FindOpponent, findOpponent => findOpponent.game_id)
	find_opponents: FindOpponent[];

	@OneToMany(() => Record, record => record.game_id)
	records: Record[];

	@OneToMany(() => Log, log => log.game_id)
	logs: Log[];
}
