import React from 'react';

import { CatalogPrograms } from '../../components/catalogPrograms/CatalogPrograms';
import { FiltersMain } from '../../components/filters/FilterMain';
import { PopupInstruction } from '../../components/popupInstuction/PopupInstruction';
import { CatalogFavoritePrograms } from '../../components/catalogFavoritePrograms/CatalogFavoritePrograms'


export function CatalogProgramsPage() {
  

  return (
    <div>
      <PopupInstruction />
      <FiltersMain />
      <CatalogPrograms />
      <CatalogFavoritePrograms />
    </div>
  );
}
