<script context="module">
    export async function load({ params }) {
        const url = params.result;
        return {
            props: {
                url,
            },
        };
    }
</script>

<script>
    import { bookStore } from "../../stores/statusStore";
    import { goto } from "$app/navigation";

    export let url;

    $: if ($bookStore.failed) {
        goto("/services/failed");
    } else if ($bookStore.posted) {
        goto("/services/success");
    }

    let hour;
    let date;
    let month;
    let year;

    function getAppointement() {
        const begHour = $bookStore.response?.begHour;
        const begDate = new Date(JSON.parse(begHour));
        hour = begDate.getHours();
        date = begDate.getDate();
        month = begDate.getMonth();
        year = begDate.getFullYear();
        return `${year}-${month}-${date} at ${hour} ${hour < 12 ? "am" : "pm"}`;
    }
</script>

<div class="result-container">
    <h2 class="title">
        Thanks for choosing us, {(url === "pending" &&
            "please wait while we process your booking") ||
            (url === "success" &&
                "your booking has been successfully processed, we will contact you shortly!") ||
            (url === "failed" &&
                "your booking has failed, we apologize for any inconvenience. Please refresh the page and try again. If the problem persists, contact us.")}
    </h2>
    {#if $bookStore.posted && $bookStore.response}
        {#await getAppointement()}
            <p class="booking-info">
                Please wait while we process the date of the booking...
            </p>
        {:then bookdate}
            <p class="booking-info">
                Your appointement has been successfully scheduled on <strong
                    >{bookdate}</strong
                >. We will contact you shortly to confirm.
            </p>
            <img
                src="https://firebasestorage.googleapis.com/v0/b/charger-project.appspot.com/o/event_available_FILL0_wght400_GRAD0_opsz48.svg?alt=media&token=4e998957-543d-43db-ba57-6b878893a1e3"
                alt="booked calendar"
            />
        {/await}
    {/if}
</div>

<style>
    .result-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 50px;
    }
    img {
        width: 300px;
    }
</style>
