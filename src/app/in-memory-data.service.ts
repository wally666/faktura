import { InMemoryDbService } from 'angular-in-memory-web-api';

import * as Models from './models'

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // console.log("[InMemoryDataService]createDb")

    //let product: Product = { id: 1, name: 'produkt', unit: { id: 1, name: 'kg' } };

    let seller: Models.Contractor = { id: 1, name: 'Janusz Bzdyra handel art. przemysłowymi, usługi motoryzacyje' };

    let contractors: Array<Models.Contractor> = [
      seller,
    ]

    let units: Array<Models.Unit> = [
      { id: 1, name: "kg" },
      { id: 2, name: "szt." },
      { id: 3, name: "op." },
    ]

    let products: Array<Models.Product> = [
            { id: 1, name: "Śruby", unit: units[1] },
            { id: 2, name: "Śruby fi6", unit: units[1] },
            { id: 3, name: "Filtr paliwa", unit: units[2] },
            { id: 4, name: "Śruby 6x12", unit: units[1] },
    ];

    let documents: Array<Models.Document> = [
      { id: 1, type: { id: 1, name: 'Faktura' }, number: "143/16", creationDate: new Date('2017-01-01 12:30'), 
        seller: seller, contractor: contractors[1], products: [
          { id: 1, /*document: Document,*/ product: products[0], unit: units[0], quantity: 100, unitPriceWithTax: 14.99, tax: 23, },
          { id: 2, /*document: Document,*/ product: products[2], unit: units[1], quantity: 101, unitPriceWithTax: 4.99, tax: 7, }
        ], /*paymentType: PaymentType, paymentDeadline: Date, notes?: string,*/
      },
      { id: 2, type: { id: 1, name: 'Faktura' }, number: "144/16", creationDate: new Date('2017-01-01 15:30'), 
        seller: seller, contractor: contractors[1], products: [], /*paymentType: PaymentType, paymentDeadline: Date, notes?: string,*/
      },
    ];

    return { contractors, products, documents };
  }
}
