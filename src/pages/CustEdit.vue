<template>
    <q-card>
        <q-card-section class="text-white bg-blue">
            <div class="text-h6">Customers</div>
        </q-card-section>
        <q-card-section>
            <q-table
                title="Customers"
                dense
                :rows="list"
                :columns="cols"
                row-key="id"
                :pagination="pagination"
                @row-click="selectRow"
            />
        </q-card-section>
        <q-separator inset />
        <q-card-section>
            <q-scroll-area :style="{height: 'calc(100vh - 570px)' }">
                <q-form class="">
                    <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-6 col-lg-4">
                            <q-input type="number" v-model="record.CustNum" label="Cust. Number" dense />
                            <q-input v-model="record.Name" label="Name" dense />
                            <q-input v-model="record.Address" label="Address" dense />
                            <q-input v-model="record.Address2" label="Address2" dense />
                            <div class="row q-col-gutter-sm">
                                <q-input class="col-3" v-model="record.PostalCode" label="ZIP" dense />
                                <q-input class="col-9" v-model="record.City" label="City" dense />
                            </div>
                            <div class="row q-col-gutter-sm">
                                <q-input class="col-6" v-model="record.Country" label="Country" dense />
                                <q-input class="col-6" v-model="record.State" label="State" dense />
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-lg-4">
                            <q-input v-model="record.SalesRep" label="Sales Rep." dense />
                            <q-input v-model="record.eSalesrep.Region" label="Region" dense />
                            <q-input v-model="record.eSalesrep.RepName" label="Rep. Name" dense />
                        </div>
                        <div class="col-xs-12 col-sm-6 col-lg-4">
                            <q-input type="number" v-model="record.Balance" label="Balance" dense />
                            <q-input type="number" v-model="record.Discount" label="Discount" dense />
                            <q-input type="number" v-model="record.CreditLimit" label="Credit Limit" dense />
                        </div>
                    </div>
                </q-form>
            </q-scroll-area>
        </q-card-section>
    </q-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onMounted }       from 'vue';
import debug                    from 'debug';
import { useCustomerStore }     from '../stores/customer';

const log               = debug('app:CustEdit');

const customerStore       = useCustomerStore();

const record            = computed( () => customerStore.record );

const cols          = [
    { name: 'id', align: 'right', label: 'Cust Num', field: 'id', sortable: true },
    { name: 'name', align: 'left', label: 'Name', field: 'Name', sortable: true },
    { name: 'country', align: 'left', label: 'Country', field: 'Country', sortable: true },
    { name: 'city', align: 'left', label: 'City', field: 'City', sortable: true },
];

const pagination    = {
    rowsPerPage:        10,
};

const { list }        = storeToRefs( customerStore );

function selectRow( event, row ) {
    log( 'select', row );
    customerStore.selectRecord( row );
}

onMounted( async () => {
    await customerStore.getCustList( { limit: 1000 } );
} );
</script>
