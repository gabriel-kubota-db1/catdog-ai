import { AbilityBuilder, createMongoAbility, MongoAbility } from '@casl/ability';
import { User } from '@/context/AuthContext';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type Subjects = 'Pet' | 'AdoptionRequest' | 'all';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export function defineAbilityFor(user: User | null) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (user) {
    if (user.role === 'admin') {
      can('manage', 'all'); // Admin can do anything
    } else {
      can('read', 'Pet');
      can('create', 'AdoptionRequest');
    }
  } else {
    // Guest users
    can('read', 'Pet');
  }

  return build();
}

// Re-export `Can` component for convenience
import { createContextualCan } from '@casl/react';
import React from 'react';

export const AbilityContext = React.createContext<AppAbility>(defineAbilityFor(null));
export const Can = createContextualCan(AbilityContext.Consumer);
