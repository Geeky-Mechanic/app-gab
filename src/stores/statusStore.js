import { writable } from 'svelte/store';

const bookStore = writable(
    {
    posting : false,
    posted : false,
    failed : false,
    response : null,
    }
    );

const contactStore = writable(
    {
    posting : false,
    posted : false,
    failed : false,
    }
    );

export { bookStore, contactStore };
