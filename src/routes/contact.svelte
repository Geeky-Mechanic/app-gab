<script>
import Card from '$lib/Card.svelte';
import Input from '$lib/Inputs.svelte';
import Button from '$lib/Button.svelte';

import { slide } from 'svelte/transition';
import { writable } from 'svelte/store';

/* --->  Form contents  <--- */

let items = [
{
    id: 1,
    label:"Name", 
    type:"text", 
    name: "contact-name",
    placeholder: "John",
}, 

{
    id: 2,
    label:"Last Name", 
    type: "text", 
    name: "contact-lname",
    placeholder: "Doe",
}, 

{
    id: 3,
    label: "Email", 
    type:"email", 
    name: "contact-email",
    placeholder: "johndoe@gmail.com",
},

{
    id: 4,
    label: "Subject", 
    type: "text", 
    name: "contact-subj",
    placeholder: "What's this issue about?",
}, 

{
    id: 5,
    label: "Describe your issue",
    type: "textarea", 
    cols:"60", 
    rows: "10", 
    name: "contact-desc",
    placeholder: "Describe as thouroughly and precisely as possible",
},
];

/* --->  Input values handling  <--- */

let data = {
    name: "",
    email: "",
    lname: "",
    subj: "",
    desc: "",
};

/* --->  Field validation handling  <--- */

let errors = {
    name: false,
    email: false,
    lname: false,
    subj: false,
    desc: false,
};

let posting = false;
let posted = false;
let failed = false;
let promise;

const validateFields = () => {
    errors.name = false;
    errors.email = false;
    errors.lname = false;
    errors.subj = false;
    errors.desc = false;
    if(data.name.length <= 1){
        errors.name = true;
    }
    if (!data.email.includes("@") && !data.email.includes(".")){
        errors.email = true;
    }
    if (data.lname.length <= 1) {
        errors.lname = true;
    }
    if (data.subj.length <= 1) {
        errors.subj = true;
    }
    if (data.desc.length <= 10) {
        errors.desc = true;
    }
};

/* --->  Event handlers  <--- */

const handleClick =() => {
    validateFields();
    if(errors.name || errors.email || errors.lname || errors.subj || errors.desc){
        console.log("some errors are left");
        posting = false;
        posted = false;
        failed = true;
    }else {
        postForm();
        posting = true;
        posted = false;
        failed = false;
    }
    console.log(data);
    console.log(errors);
};

const postForm = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}contact`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data), 
        });
        if(res.ok){
            posting = false;
            posted = true;
            failed = false;
            return res;
        }
        else {
            posting = false;
            posted = false;
            failed = true;
            throw new Error('Could not POST');
        }
};

</script>

<div out:slide>
<Card hoverable>
    <div class="contact-container">
        <h2 class="contact-title">Contact Us</h2>
        <div class="contact-content">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab sint consequuntur velit qui nostrum atque placeat perferendis numquam beatae, sed magni omnis et vitae dolorum, ipsa quis voluptate similique explicabo?</p>
        </div>
        <div class="secondary-container">
            <div class="form-container">
                <div class="form-element">
                    <label for="1">Name</label>
                    <input type="text" name="name" id="1" placeholder="John" bind:value={data.name} />
                    {#if errors.name}
                        <p class="errorMsg">Name is missing</p>
                    {/if}
                </div>
                <div class="form-element">
                    <label for="2">Last Name</label>
                    <input type="text" name="lname" id="2" placeholder="Doe" bind:value={data.lname} />
                    {#if errors.lname}
                        <p class="errorMsg">Last Name is missing</p>
                    {/if}
                </div>
                <div class="form-element">
                    <label for="3">Email</label>
                    <input type="email" name="email" id="3" placeholder="johndoe@gmail.com" bind:value={data.email} />
                    {#if errors.email}
                        <p class="errorMsg">Email is incorrect or missing</p>
                    {/if}
                </div>
                <div class="form-element">
                    <label for="4">Subject</label>
                    <input type="text" name="subj" id="4" placeholder="What's this issue about?" bind:value={data.subj} >
                    {#if errors.subj}
                        <p class="errorMsg">Subject is missing</p>
                    {/if}
                </div>
                <div class="form-element">
                    <label for="5">Description</label>
                    <textarea name="desc" id="5" rows="10" cols="60" placeholder="Describe as thouroughly and precisely as possible" bind:value={data.desc} />
                    {#if errors.desc}
                        <p class="errorMsg">Description is missing</p>
                    {/if}
                </div> 
                <Button on:click={handleClick} content="SEND" secondary />
            </div>
            <img src="https://firebasestorage.googleapis.com/v0/b/charger-project.appspot.com/o/question.png?alt=media&token=21067d71-ae51-4924-9246-09032c0cd60c"
            alt="thinking" />
        </div>
        {#if posting}
            <p class="promise-pending">Sending your inquiry</p>
        {:else if posted }
            <p class="promise-confirmed">Sent, thank you for choosing us!</p>
        {:else if failed}
            <p class="promise-failed">Posting has failed, please validate the form fields</p>            
        {/if}
    </div>
</Card>
</div>
<style>
.contact-container {
    display: flex;
    justify-content: center;
    align-items:flex-start;
    flex-direction: column;
}

.secondary-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.form-container {
    display: flex;
    justify-content: center;
    align-items: left;
    flex-direction: column;
    margin-right: 200px;
}

img { 
    width: 30%;
    height: 30%;
}

label {
    font-size: 1.2rem;
    color: #6B6969;
    margin: 0.5rem 0;
}

input {
    margin: 0.5rem 0;
    padding: 0.6rem 0.4rem;
    width: 100%;
}

textarea {
    margin: 0.5rem 0;
    padding: 0.6rem 0.4rem;
    width: 100%;
}

.errorMsg {
    color: red;
}

.promise-pending {
    color: blue;
}

.promise-confirmed {
    color: green;
}

.promise-failed {
    color: red;
}

</style>