import { IRole } from "./IRole";

export const IRoleStorage: IRole = {
    roles: ['ADMIN', 'FRUITJOHN', 'VEGETARIANMARY'],
    permissions: {
      permission1: ['create', 'update', 'delete'],
      permission2: ['create', 'update', 'delete'],
    },
    grants: {
      admin: [
        '&user',
        'permission1',
        'permission3',
      ],
      user: ['permission2', 'permission1@create', 'permission3@filter1'],
    },
    
  };