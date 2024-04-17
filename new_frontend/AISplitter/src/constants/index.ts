export enum PriorityEnum {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export const PriorityEnumMapping: Record<PriorityEnum, { label: string; color: string }> = {
  [PriorityEnum.Low]: {
    label: 'Low',
    color: 'text-hint-color',
  },
  [PriorityEnum.Medium]: {
    label: 'Medium',
    color: 'text-warning-color',
  },
  [PriorityEnum.High]: {
    label: 'High',
    color: 'text-danger-color',
  },
};

export enum StorageKeyEnum {
  Theme = 'THEME',
}
