import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class GroupFiltersPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'query') {
      let filters: Record<string, any> = {};
      let global: string | undefined = value.global;

      if (typeof value.filters === 'string') {
        try {
          filters = JSON.parse(value.filters);

          if ('global' in filters) {
            global = filters.global;
            delete filters.global;
          }
        } catch (e) {
          filters = {};
        }
      } else {
        Object.keys(value).forEach((key) => {
          if (key !== 'results' && key !== 'global') {
            filters[key] = value[key];
          }
        });
      }

      return {
        results: value.results ? Number(value.results) : 10,
        global,
        filters,
      };
    }

    return value;
  }
}
