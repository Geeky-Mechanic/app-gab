<script>
import Card from '$lib/Card.svelte';
import Form from '$lib/Form.svelte';
import Button from '$lib/Button.svelte';
import { slide } from 'svelte/transition';

let items = [
{
    label:"Name", 
    type:"text", 
    name: "contact-name",
    placeholder: "John",
}, 

{
    label:"Last Name", 
    type: "text", 
    name: "contact-lname",
    placeholder: "Doe",
}, 

{
    label: "Email", 
    type:"email", 
    name: "contact-email",
    placeholder: "johndoe@gmail.com",
},

{
    label: "Subject", 
    type: "text", 
    name: "contact-subj",
    placeholder: "What's this issue about?",
}, 

{
    label: "Describe your issue",
    type: "textarea", 
    cols:"60", 
    rows: "10", 
    name: "contact-desc",
    placeholder: "Describe as thouroughly and precisely as possible",
},
];

let style = "blue";
</script>
<div out:slide>
<Card hoverable>
    <div class="contact-container">
        <h2 class="contact-title">Contact Us</h2>
        <div class="contact-content">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab sint consequuntur velit qui nostrum atque placeat perferendis numquam beatae, sed magni omnis et vitae dolorum, ipsa quis voluptate similique explicabo?</p>
        </div>
        <div class="secondary-container">
        <Form {items} {style} content="SEND" secondary />
        <img src="https://firebasestorage.googleapis.com/v0/b/charger-project.appspot.com/o/question.png?alt=media&token=21067d71-ae51-4924-9246-09032c0cd60c"
        alt="thinking" />
        </div>
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
    justify-content: center;
    align-items: center;
}

img { 
    width: 30%;
    height: 30%;
}
</style>