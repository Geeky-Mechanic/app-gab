<script>
import { tweened } from 'svelte/motion';
export let hoverable = false;
export let colored = false;
export let small = false;

const move = tweened(0, {
    duration: 80,
});

const handleHover = () => {
    hoverable && move.set(10);
};

const handleHoverOut = () => {
   hoverable && move.set(0);
};


</script>

<div style="padding: {30 - $move}px 30px {30 + $move}px 30px;"  
class="card-container {hoverable && 'hoverable-card'} {colored && 'colored-card'} {small && 'small'}" 
on:mouseenter={handleHover} on:focus={handleHover}
on:mouseleave={handleHoverOut} on:blur={handleHoverOut} >
    <slot>No content in card</slot>
</div>

<style>
.card-container {
    margin: 20px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 30px;
    width: 92%;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.3); 
    box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.3);
}
.card-container.hoverable-card {
    -webkit-box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.1); 
    box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.1);
}
.hoverable-card:hover {
    -webkit-box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.4); 
    box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.4);
}

.card-container.colored-card {
    -webkit-box-shadow: 0px 0px 20px 5px rgba(255,0,0,0.3); 
    box-shadow: 0px 0px 20px 5px rgba(255,0,0,0.3);
}

.card-container.hoverable-card.colored-card:hover {
    -webkit-box-shadow: 0px 0px 20px 5px rgba(255,0,0,0.6); 
    box-shadow: 0px 0px 20px 5px rgba(255,0,0,0.6);
}

.small {
    width: 50%;
}
</style>