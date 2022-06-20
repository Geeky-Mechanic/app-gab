<script>
    import { slide } from "svelte/transition";
    import WidgetImage from "$lib/WidgetImage.svelte";
</script>

<div out:slide>
    <WidgetImage>
        <h2 slot="title">Who we are</h2>
        <img
            slot="image"
            style="width: 60%;"
            src="http://www.autoserviceworld.com/wp-content/uploads/2016/06/ev-electric-car-charging-station_133864.jpg"
            alt="car charging station"
        />
        <p slot="content">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates
            iusto, recusandae, doloribus, cupiditate unde quia error vero in
            odit suscipit corrupti blanditiis. Eius harum recusandae temporibus,
            placeat doloremque optio ab! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Iure praesentium aliquam sint laudantium
            necessitatibus blanditiis animi eligendi, explicabo aperiam? Optio
            tempora voluptatum dolorum inventore quia corporis enim excepturi
            consequuntur error!
        </p>
    </WidgetImage>

    <WidgetImage>
        <h2 slot="title">What we offer</h2>
        <p slot="content">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates
            iusto, recusandae, doloribus, cupiditate unde quia error vero in
            odit suscipit corrupti blanditiis. Eius harum recusandae temporibus,
            placeat doloremque optio ab! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Iure praesentium aliquam sint laudantium
            necessitatibus blanditiis animi eligendi, explicabo aperiam? Optio
            tempora voluptatum dolorum inventore quia corporis enim excepturi
            consequuntur error!
        </p>
    </WidgetImage>
</div>

<style>
</style>
