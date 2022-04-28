<script>
import { afterUpdate } from 'svelte';

export let pageUrl;

export let items;

let activePage;

let activeItem;

afterUpdate(() => {
    activePage = pageUrl.split("/");
    if(pageUrl === "/"){
        activeItem = items[0].name;
    }
    else if(activePage[1] === "contact"){
        activeItem = items[1].name;
    }
    else if(activePage[1] === "services"){
        activeItem = items[2].name;
    }
});

</script>

<footer>
    <div class="footer-wrapper">
    <div class="footer-content footer-left">
        <span class="left-content">Left</span>
        <span class="left-content">Left</span>
        <span class="left-content">Left</span>
        <span class="left-content">Left</span>
        <span class="left-content">Left</span>
        <span class="left-content">Left</span>
    </div>

    <div class="footer-content footer-center">
        {#each items as item}
        <a href={`/${item.ref}`} class="center-content" class:active={item.name === activeItem}>{item.name}</a>
        {/each}
    </div>
    
    <div class="footer-content footer-right">
        <span class="right-content">Right</span>
        <span class="right-content">Right</span>
        <span class="right-content">Right</span>
        <span class="right-content">Right</span>
        <span class="right-content">Right</span>
        <span class="right-content">Right</span>
    </div>
    </div>
    <span class="copyright">Copyright 2022 JayChamp</span>
</footer>

<style>
footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 5% 1%;
    margin: 40px 0;
}

a {
    color:#6B6969;
    text-decoration: none;
}

.footer-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 2rem;
}

.footer-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #6B6969;
}

.left-content {
    margin: 5px 0;
}

.center-content {
    margin: 5px 0;
    cursor: pointer;
}

.active {
    border-bottom: 2px solid crimson;
}

.right-content {
    margin: 5px 0;
}

.copyright {
        color: #aaa;
        font-size: 14px;
        display: inline-block;
        padding: 20px;
        border-top: 1px solid #ddd;
    }

</style>