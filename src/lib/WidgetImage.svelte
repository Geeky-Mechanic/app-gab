<script>
import Card from './Card.svelte';
</script>

<Card>
    <div class="widget-title"><slot name="title"></slot></div>
    <div class="widget-image">
        <slot name="image"></slot>
    </div>
    <div class="widget-text">
        <slot name='content'></slot>
    </div>
</Card>



<style>

.widget-title {
    margin-bottom: 20px;
}

.widget-image {
    display: flex;
    justify-content: center;
    align-items: center;
}



</style>