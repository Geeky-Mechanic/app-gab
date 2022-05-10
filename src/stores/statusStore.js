import { writable } from 'svelte/store';

const bookStore = writable(
    {
    posting : false,
    posted : false,
    failed : false,
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
