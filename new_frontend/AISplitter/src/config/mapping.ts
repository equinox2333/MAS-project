// import '@eva-design/eva/mapping.json';
import type { CustomSchemaType } from '@eva-design/dss';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

const mapping: DeepPartial<CustomSchemaType> = {
  components: {
    Input: {
      meta: {
        variantGroups: {
          size: {
            small: {
              default: false,
            },
            medium: {
              default: false,
            },
            large: {
              default: true,
            },
          },
        },
      },
    },
  },
};

export default mapping as CustomSchemaType;
