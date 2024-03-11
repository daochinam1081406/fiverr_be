import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class JobEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Job ID' })
  job_id: number;

  @Column()
  @ApiProperty({ description: 'Job name' })
  job_name: string;

  @Column()
  @ApiProperty({ description: 'Rating' })
  rating: number;

  @Column()
  @ApiProperty({ description: 'Price' })
  price: number;

  @Column()
  @ApiProperty({ description: 'Image' })
  image: string;

  @Column({ type: 'date' })
  @ApiProperty({ description: 'Description' })
  description: string;

  @Column()
  @ApiProperty({ description: 'Short Description' })
  short_description: string;

  @Column()
  @ApiProperty({ description: 'Job Rating' })
  job_rating: number;

  @Column()
  @ApiProperty({ description: 'Detail Type ID' })
  detail_type_id: number;

  @Column()
  @ApiProperty({ description: 'Creator ID' })
  creator_id: number;
}
@Entity()
export class JobTypeEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Job Type ID' })
  job_type_id: number;

  @Column()
  @ApiProperty({ description: 'Type Name' })
  type_name: number;
}
@Entity()
export class JobDetailTypeEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Job Detail Type ID' })
  job_detail_type_id: number;

  @Column()
  @ApiProperty({ description: 'Detail Name' })
  detail_name: number;

  @Column()
  @ApiProperty({ description: 'Image' })
  image: string;

  @Column()
  @ApiProperty({ description: 'Job Type ID' })
  job_type_id: string;
}
