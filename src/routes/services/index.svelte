<script>
import Card from '$lib/Card.svelte';
import Form from '$lib/Form.svelte';
import Button from '$lib/Button.svelte';

import { goto } from '$app/navigation';
import { slide } from 'svelte/transition';

const days = ["1", "2", "3", "4", "5", "6", "7", "8"];

const hours = ["1", "2", "3", "4", "5", "6", "7", "8"];

let items = [
    {
        label: "Name",
        type: "text",
        name: "services-name",
        placeholder: "John",
    },
    {
        label: "Last Name",
        type: "text",
        name: "services-lname",
        placeholder: "Doe",
    },
    {
        label: "email",
        type: "email",
        name: "services-email",
        placeholder: "johndoe@gmail.com",
    },
    {
        label: "Phone Number",
        type: "text",
        name: "services-number",
        placeholder: "819-856-1234",
    },
    {
        label: "Address",
        type: "text",
        name: "services-address",
        placeholder: "123 Rue des Pins, Val-d'Or",
    },
    {
        label: "Year",
        type: "select",
        name: "services-year",
        options: ["2022"],
    },
    {
        label: "Month",
        type: "select",
        name: "services-month",
        options: ["May", "June", "July"],
    },
    {
        label: "Day",
        type: "select",
        name: "services-day",
        options: days,
    },
    {
        label: "Hour",
        type: "select",
        name: "services-hours",
        options: hours,
    },
];

const handleNavigate = () => {
    goto("/services/booking");
};

</script>

<div out:slide>
<Card>
<div class="services-container">
    <div class="text-wrapper">
        <h2 class="services-title">Our Services</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Quo, alias? Atque, alias aut recusandae nobis cumque deleniti doloremque eaque eum asperiores odit id. 
            Quas, itaque earum. Hic, labore fugit! Aliquam!
        </p>
    </div>
    <Card hoverable colored small>
        <div class="services-links">
            <p>Place your reservation NOW!</p>
            <img src="https://firebasestorage.googleapis.com/v0/b/charger-project.appspot.com/o/calendar_add_on_FILL0_wght400_GRAD0_opsz48.svg?alt=media&token=efc2ac91-33ed-46e8-ad94-683e7e6201ba"
            alt="agenda">
            <Button on:click={handleNavigate} primary content="RESERVE" />
        </div>
    </Card>
</div>
</Card>
</div>


<style>

.text-wrapper {
    text-align: center;
    margin:0 auto 5rem;
    max-width: 75%;
}

.services-links {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}
</style>