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
export let data;
console.log(data);
</script>

<div class="booking" out:slide>
    {#each data as post}
    <p>{post.title}</p>
    {/each}
</div>


<style>

</style>