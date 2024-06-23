import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { VersionsRepository } from 'src/db/repositories/version-document.respository';
import {
  VersionResponseDto,
  VersionResponseListDto,
} from './dto/version-response.dto';

import { Version } from 'src/db/entities/version.entity';
import { CreateVersionRequestDto } from './dto/create-version-request.dto.ts';
import { UpdateVerionRequestDto } from './dto/update-version-request.dto';

@Injectable()
export class VersionsService {
  constructor(private readonly VersionRepository: VersionsRepository) {}

  async findAll(documentId: string): Promise<VersionResponseListDto> {
    const versions = await this.VersionRepository.findVersionsForDocument(
      documentId,
    );

    const versionDtos = versions.map(
      (version) => new VersionResponseDto(version),
    );

    const result = new VersionResponseListDto();
    result.versions = versionDtos;
    result.metadata = {
      total: versionDtos.length,
    };

    return result;
  }
  // find a detail version for a document
  async findOne(documentId: number | string, id: number): Promise<Version> {
    const version = await this.VersionRepository.findVersionForDocument(
      // documentId,
      id,
    );
    if (!version) {
      throw new NotFoundException(
        `Version ${id} does not belong to the document ${documentId}`,
      );
    }

    return version;
  }

  async create(
    organizationId: number,
    documentId: string,
    request: CreateVersionRequestDto,

    // userId: number,
  ): Promise<Version> {
    // const urlResult = await this.uploadImageFromLocal({});

    const { versionName, createdAt, note, url, type, created_by } = request;
    console.log(url);

    // console.log(documentId);
    // Create a document
    const version = new Version();
    // console.log(documentId);
    version.versionName = versionName;
    version.createdAt = createdAt;
    version.versionId = uuidv4();
    version.note = note;
    version.url = url;
    version.type = type;
    version.created_by = created_by;
    version.documentId = documentId;

    // document.created_by = created_by;

    await this.VersionRepository.manager.transaction(async (manager) => {
      await manager.save(Version, version);
    });

    return version;
  }

  async update(
    organizationId: number,
    documentId: string,
    id: number,
    req: UpdateVerionRequestDto,
  ) {
    const { versionName, createdAt, note } = req;
    const version = await this.VersionRepository.findOne({
      where: { id },
    });

    if (!version) {
      throw new NotFoundException(
        `Version ${id} does not belong to this document`,
      );
    }

    if (versionName) version.versionName = versionName;
    if (createdAt) version.createdAt = createdAt;
    if (note) version.note = note;

    await this.VersionRepository.manager.transaction(async (manager) => {
      await manager.save(Version, version);
    });

    return version;
  }

  async delete(versionId: number): Promise<void> {
    const version = await this.VersionRepository.findOne({
      where: { id: versionId },
    });

    if (!version) {
      throw new NotFoundException(
        `Document ${versionId} does not belong to this document`,
      );
    }

    await this.VersionRepository.manager.transaction(async (manager) => {
      const deletePromises = [];

      deletePromises.push(manager.delete(Version, { id: versionId }));

      await Promise.all(deletePromises);
    });
  }
}
