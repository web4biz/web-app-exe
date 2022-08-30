import { Dialog }           from 'quasar';
import axios                from 'axios';

import debug                from 'debug';
const log                   = debug('app:data.service');

const baseUrl                      = 'http://localhost:9010';

async function getData( { coll, param }: { coll: string, param?: any } ) {
    log( 'getData', coll, param );

    try {
        const data    = await axios.get( `${baseUrl}/web/Entities/${coll}`, { params: param } );

        return ( data && data.data ) || null;
    } catch (err) {
        log( 'ERR getData', err );
        return null;
    }
}

async function getRecord( { coll, id }: { coll: string, id: string } ) {
    log( 'getRecord', coll, id );

    try {
        const data    = await axios.get( `${baseUrl}/web/Entities/${coll}/${id}` );
        return ( data && data.data ) || null;
    } catch (err) {
        log( 'ERR getRecord', err );
        return null;
    }
}

function addRecord( coll, rec ) {
    log( 'add start', coll, rec );

    return new Promise( ( resolve, reject ) => {

        // vue.$socket.client.emit( 'data:add', {
        //     body:       rec.body,
        //     coll
        // }, (res) => {
        //     log( 'response', res );
        //     if (res.error) {
        //         return reject( res.error );
        //     }
        //     resolve( res );
        // } );
    });
}

function updateRecord( {
    coll, body, rootGetters, action,
} ) {
    // const global                = Global( { } );

    log( 'update start', { body, action, coll });
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteRecord( {
    coll, body, rootGetters, action,
} ) {
    return new Promise( ( resolve, reject ) => {
        // const global                = Global( { } );

        Dialog.create( global.Dialog({
            type: 'alert',
            message: 'Möchten Sie den Datensatz wirklich löschen?',
            html: true,
            cancel: true,
        })).onOk(() => {
            log( 'delete start', { body, action, coll } );
        });
    });
}

export const dataService = {
    getData,
    getRecord,
    addRecord,
    updateRecord,
    deleteRecord,
};
