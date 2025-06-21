import {
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

type ExtractWhere<TFindUniqueArgs> = TFindUniqueArgs extends { where: infer W }
  ? W
  : never;

export abstract class BaseRepository<
  TEntity,
  TFindUniqueArgs extends { where: Record<string, any> },
  TFindManyArgs,
  TCreateArgs,
  TUpdateArgs,
  TDeleteArgs,
  TCountArgs,
  TUpsertArgs,
  TDelegate extends {
    findUnique(args: TFindUniqueArgs): Promise<TEntity | null>;
    findUniqueOrThrow?(args: TFindUniqueArgs): Promise<TEntity>;
    findMany(args?: TFindManyArgs): Promise<TEntity[]>;
    create(args: TCreateArgs): Promise<TEntity>;
    update(args: TUpdateArgs): Promise<TEntity>;
    delete(args: TDeleteArgs): Promise<TEntity>;
    count(args?: TCountArgs): Promise<number>;
    upsert?(args: TUpsertArgs): Promise<TEntity>;
  },
> {
  constructor(protected readonly model: TDelegate) {}

  protected handleError(error: any): never {
    if (error?.code === 'P2002') {
      throw new ConflictException('Duplicate entry');
    }
    throw error;
  }

  public async findById(
    where: ExtractWhere<TFindUniqueArgs>,
    args?: Omit<TFindUniqueArgs, 'where'>
  ): Promise<TEntity | null> {
    try {
      return await this.model.findUnique({
        ...(args || {}),
        where,
      } as unknown as TFindUniqueArgs);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async findByIdOrThrow(
    where: ExtractWhere<TFindUniqueArgs>,
    args?: Omit<TFindUniqueArgs, 'where'>
  ): Promise<TEntity> {
    if (typeof this.model.findUniqueOrThrow === 'function') {
      try {
        return await this.model.findUniqueOrThrow({
          ...(args || {}),
          where,
        } as unknown as TFindUniqueArgs);
      } catch (error) {
        this.handleError(error);
      }
    }
    const entity = await this.findById(where, args);
    if (!entity) {
      throw new NotFoundException(`Entity not found by: ${JSON.stringify(where)}`);
    }
    return entity;
  }

  public async findAll(args?: TFindManyArgs): Promise<TEntity[]> {
    return this.model.findMany(args);
  }

  public async create(args: TCreateArgs): Promise<TEntity> {
    try {
      return await this.model.create(args);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async update(args: TUpdateArgs): Promise<TEntity> {
    try {
      return await this.model.update(args);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async delete(args: TDeleteArgs): Promise<TEntity> {
    try {
      return await this.model.delete(args);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async count(args?: TCountArgs): Promise<number> {
    return this.model.count(args);
  }

  public async upsert(args: TUpsertArgs): Promise<TEntity> {
    if (typeof this.model.upsert !== 'function') {
      throw new Error('upsert not supported by this delegate');
    }
    try {
      return await this.model.upsert(args);
    } catch (error) {
      this.handleError(error);
    }
  }

  public withTransaction<TNewDelegate extends TDelegate>(
    client: TNewDelegate
  ): BaseRepository<
    TEntity,
    TFindUniqueArgs,
    TFindManyArgs,
    TCreateArgs,
    TUpdateArgs,
    TDeleteArgs,
    TCountArgs,
    TUpsertArgs,
    TNewDelegate
  > {
    return new (this.constructor as new (
      model: TNewDelegate
    ) => BaseRepository<
      TEntity,
      TFindUniqueArgs,
      TFindManyArgs,
      TCreateArgs,
      TUpdateArgs,
      TDeleteArgs,
      TCountArgs,
      TUpsertArgs,
      TNewDelegate
    >)(client);
  }
}
