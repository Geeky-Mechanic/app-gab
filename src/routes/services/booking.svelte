<script context="module">
export async function load({ fetch }) {
    const res = await fetch("/services/book.json");
    const { data } = await res.json();

    if(res.ok) {
        return {
            props: {
                data
            }
        }
    }


    return {
        status: res.status,
        error: new Error('WTF'),
    }
};
</script>

<script>
import { slide } from 'svelte/transition';
import { InlineCalendar, Datepicker } from 'svelte-calendar';
import dayjs from 'dayjs';
export let data;
let store;
const today = new Date();

const freeHours = () => {
    let booked = data?.hours;
    
};

</script>

<div class="booking-container" out:slide>
    <Datepicker start={today} bind:store />
    {dayjs($store?.selected).format('MM/DD/YYYY')}
</div>


<style>
.booking-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

</style>