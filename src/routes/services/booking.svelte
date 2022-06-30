<script context="module">
    export async function load({ fetch }) {
        const res = await fetch(`/api/booking/hours`);
        const data = await res.json();
        if (res.ok) {
            return {
                props: {
                    data,
                },
            };
        }

        return {
            status: res.status,
            error: new Error(data),
        };
    }
</script>

<script>
    import { slide } from "svelte/transition";
    import { Datepicker } from "svelte-calendar";
    import { goto } from "$app/navigation";
    import Button from "$lib/Button.svelte";
    import Card from "$lib/Card.svelte";
    import { bookStore } from "../../stores/statusStore";

    export let data;
    let store;
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    let fullDate;
    let hour;
    
    let errors = {
        between: false,
        tooEarly: false,
        tooLate: false,
        name: false,
        email: false,
        lName: false,
        phone: false,
    };

    let bookData = {
        name: "",
        lName: "",
        email: "",
        phone: "",
        date: null,
    };

    /* --->  Verify if selected date is already booked  <--- */

    const between = (newBook) => {
        const bookingDate = new Date(newBook).getTime();
        return data.some((obj) => {
            const begDate = new Date(obj.begHour).getTime();//165348
            const end = new Date(obj.begHour);
            const endHour = end;
            endHour.setHours(end.getHours() + 2);
            const endDate = endHour.getTime();
            return bookingDate >= begDate && bookingDate < endDate;
        });
    };

    /* --->  Verify if selected date is before opening hours  <--- */

    const tooEarly = (newBook) => {
        const bookingDate = new Date(newBook);

        return bookingDate.getHours() < 8 || (bookingDate.getDate() === today.getDate() && bookingDate.getHours() < today.getHours());
    };

    /* --->  Verify if selected date is after opening hours  <--- */

    const tooLate = (newBook) => {
        const bookingDate = new Date(newBook);

        return bookingDate.getHours() > 15;
    };

    /* --->  Format booking date upon choosing an hour <--- */

    const validateDate = () => {
        errors.between = false;
        errors.tooEarly = false;
        errors.tooLate = false;

        const bookingDate = new Date($store?.selected);
        const month = bookingDate?.getMonth();
        const year = bookingDate?.getFullYear();
        const day = bookingDate?.getDate();
        fullDate = new Date(year, month, day, hour, 0, 0).getTime();
        if (!between(fullDate) && !tooEarly(fullDate) && !tooLate(fullDate)) {
            bookData.date = fullDate;
        }
        if (between(fullDate)) {
            fullDate = "";
            errors.between = true;
        }
        if (tooEarly(fullDate)) {
            fullDate = "";
            errors.tooEarly = true;
        }
        if (tooLate(fullDate)) {
            fullDate = "";
            errors.tooLate = true;
        }
    };

    /* --->  Validate all the form fields before posting  <--- */

    const validateFields = () => {
        errors.name = false;
        errors.email = false;
        errors.lName = false;
        errors.phone = false;
        if (bookData.name.length <= 1) {
            errors.name = true;
        }
        if (!bookData.email.includes("@") && !bookData.email.includes(".")) {
            errors.email = true;
        }
        if (bookData.lName.length <= 1) {
            errors.lName = true;
        }
        if (bookData.phone.length <= 1) {
            errors.subj = true;
        }
    };

    /* --->  Render only free hours in select  <--- */
    const allHours = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
    ];

    $: freeHours = allHours.filter((hour) => {
        const bookingDate = new Date($store?.selected);
        const month = bookingDate?.getMonth();
        const year = bookingDate?.getFullYear();
        const day = bookingDate?.getDate();
        const fDate = new Date(year, month, day, hour, 0, 0).getTime();
        if (!between(fDate) && !tooEarly(fDate) && !tooLate(fDate)) {
            return true;
        } else {
            return false;
        }
    });


    /* --->  Handle the book button click  <--- */

    const handleClick = () => {
        validateFields();
        validateDate();
        if (
            errors.name ||
            errors.email ||
            errors.lName ||
            errors.phone ||
            errors.between ||
            errors.tooEarly ||
            errors.tooLate
        ) {
            console.log("some errors are left");
        } else {
            postRequest(bookData);
            $bookStore.posting = true;
            $bookStore.posted = false;
            $bookStore.failed = false;
        }
    };

    /* --->  Post request to booking api <--- */

    const postRequest = async (newBooking) => {
        if (!errors.between && !errors.tooEarly && !errors.tooLate) {
            const res = await fetch(`/api/booking`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(newBooking),
            });
            if (res.ok) {
                $bookStore.posted = true;
                $bookStore.posting = false;
                $bookStore.failed = false;
                $bookStore.response = await res.json();
                return res;
            } else {
                $bookStore.posted = false;
                $bookStore.posting = false;
                $bookStore.failed = true;
                throw new Error("Could not POST");
            }
        }
    };
</script>

<Card hoverable>
    <div class="booking-container" out:slide>
        <h2 class="title">Please click below to select a date</h2>
        <div class="form-container">
            <Datepicker start={today} end={nextWeek} bind:store />
            <div class="form-element">
                <label for="hour">Please Choose a free hour</label>
                <select name="hour" id="hour" bind:value={hour}>
                    {#each freeHours as hour}
                        <option value={hour}>{hour}</option>
                    {/each}
                </select>
            </div>
            <div class="form-element">
                <label for="name">Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="John"
                    bind:value={bookData.name}
                />
            </div>
            <div class="form-element">
                <label for="lName">Last Name</label>
                <input
                    type="text"
                    id="lName"
                    placeholder="Doe"
                    bind:value={bookData.lName}
                />
            </div>
            <div class="form-element">
                <label for="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="johndoe@gmail.com"
                    bind:value={bookData.email}
                />
            </div>
            <div class="form-element">
                <label for="phoneNumber">Phone Number</label>
                <input
                    type="text"
                    id="phoneNumber"
                    placeholder="123-456-7891"
                    bind:value={bookData.phone}
                />
            </div>
            <Button
                on:click={(e) => handleClick(e)}
                disabled={$bookStore.posting ||
                    $bookStore.posted ||
                    $bookStore.failed}
                content="BOOK"
                primary
            />
        </div>
    </div>
</Card>

{#if $bookStore.posting}
    {goto("/services/pending")}
{/if}

<style>
    label {
        font-size: 1.2rem;
        color: #6b6969;
        margin: 0.5rem 0;
    }

    input {
        margin: 0.5rem 0;
        padding: 0.6rem 0.4rem;
        width: 100%;
    }

    select {
        padding: 0.4rem 0.4rem;
    }

    .booking-container {
        display: flex;
        flex-direction: column;
        justify-content: left;
        align-items: left;
    }
    .form-element {
        margin: 0.5rem 0;
    }
</style>
