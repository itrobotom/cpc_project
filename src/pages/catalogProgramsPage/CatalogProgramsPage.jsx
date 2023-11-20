import React from 'react';

import { CatalogPrograms } from '../../components/catalogPrograms/CatalogPrograms';
import { FiltersMain } from '../../components/filters/FilterMain';
import { PopupInstruction } from '../../components/popupInstuction/PopupInstruction';



export function CatalogProgramsPage() {
  

  return (
    <div>
      <PopupInstruction />
      <FiltersMain />
      <CatalogPrograms />
      
    </div>
  );
}
