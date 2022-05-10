<script context="module">
    export async function load({params}){
        const url = params.result;
        return {
            props: {
                url,
            }
        }
    };

</script>
<script>
    import { bookStore } from '../../stores/statusStore';
    import { goto } from '$app/navigation';

    export let url;


$: if($bookStore.failed){
    goto("/services/failed");
}else if($bookStore.posted){
    goto("/services/success");
}else if($bookStore.posting){
    goto("/services/pending");
};
</script>

<div class="result-container">
    <h2 class="title">Thanks for choosing us, {url === "pending" && "please wait while we process your booking" 
    || url === "success" && "your booking has been successfully processed, we will contact you shortly!"
    || url === "failed" && "your booking has failed, we apologize for any inconvenience. Please refresh the page and try again. If the problem persists, contact us."}</h2>
</div>

<style>

</style>