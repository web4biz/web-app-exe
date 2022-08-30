import { ref, computed }            from 'vue';
import { Loading }                  from 'quasar';
import { defineStore }              from 'pinia';

import { dataService }          from 'src/services/data.service';
import { ISalesRepRef }         from './salesrep';

interface ICustParam {
    limit?:         number;
    offset?:        number;
    sort?:          string;
    Country?:       string;
    PostalCode?:    string;
    Name?:          string;
    SalesRep?:      string;
}

export interface ICustLinks {
    rel:            string;
    href:           string;
}

export interface ICustList {
    id:             string;
    url:            string;
    Country?:       string;
    Name?:          string;
    City?:          string;
    links:          Array<ICustLinks>;
}

export interface ICustomer {
    id:             string;
    url:            string;
    Country?:       string;
    Name?:          string;
    CustNum:        number;
    Address?:       string;
    Address2?:      string;
    City?:          string;
    State?:         string;
    PostalCode?:    string;
    Contact?:       string;
    Phone?:         string;
    SalesRep?:      string;
    CreditLimit?:   number;
    Balance?:       number;
    Terms?:         string;
    Discount?:      number;
    Comments?:      string;
    Fax?:           string;
    EmailAddress?:  string;
    Flags?:         string;
    eSalesRep?:     ISalesRepRef;
    links:          Array<ICustLinks>;
}

export const useCustomerStore = defineStore('customer', () => {
    const _list         = ref([]);
    const record        = ref( {
        eSalesrep:      {
            Region:         '',
            RepName:        '',
        },
    } );

    const list      = computed( () => _list.value );

    async function getCustList( param: ICustParam ) {
        Loading.show( { message: 'Loading data ...' } );
        _list.value     = await dataService.getData( { coll: 'Customers', param } );
        Loading.hide();
    }

    async function selectRecord( row: ICustList ) {
        Loading.show( { message: 'Loading data ...' } );
        record.value    = await dataService.getRecord( { coll: 'Customers', id: row.id } );
        Loading.hide();
    }

    return {
        _list,
        record,
        list,
        getCustList,
        selectRecord,
    };
});
