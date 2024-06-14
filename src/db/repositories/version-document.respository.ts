import { Version } from './../entities/version.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class VersionsRepository extends Repository<Version> {
  constructor(private dataSource: DataSource) {
    super(Version, dataSource.createEntityManager());
  }

  async findVersionsForDocument(
    documentId: number | string,
  ): Promise<Version[]> {
    const allVersions = await this.createQueryBuilder('versions')
      .where('versions.documentId = :documentId', {
        documentId: documentId,
      })
      .getMany();

    return allVersions;
  }

  async findVersionForDocument(
    // documentId: number | string,
    id: number,
  ): Promise<Version> {
    // console.log(id);
    return await this.createQueryBuilder('versions')
      // .where('version.documentId = :documentId', { documentId })
      // .andWhere('version.id = :id', { id })
      .where('versions.id = :id', { id })
      .getOne();
  }
}
