<script>

export let item;
export let style;
export let value;

</script>

<div style={style}>    
        <label for={item.id} id={item.name}>{item.label}</label>
        {#if item.type === "text" || item.type === "number" || item.type === "email"}
            <input {value} on:input type={item.type} name={item.name} id={item.id} placeholder={item.placeholder}/>
        {:else if item.type === "textarea"}
            <textarea {value} on:input name={item.name} id={item.id} cols={item.cols} rows={item.rows} placeholder={item.placeholder}></textarea>
        {:else if item.type === "select"}
            <select {value} on:input name={item.name} id={item.id}>
                {#each item.options as option}
                    <option>{option}</option>
                {/each}
            </select>
        {/if}
</div>

<style>
div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
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

select {
    margin: 0.5rem 0;
    padding: 0.6rem 0.4rem;
    width: 100%;   
}


</style>