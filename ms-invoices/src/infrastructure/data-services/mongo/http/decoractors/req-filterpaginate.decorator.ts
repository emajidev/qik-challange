import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const FilterPaginate = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const res = ctx.switchToHttp().getResponse();

    return res.locals.filterPaginationQuery;
  },
);
