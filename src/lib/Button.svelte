<script>
export let content;
export let primary;
export let secondary;

</script>

<button on:click class="{primary && 'primary'} {secondary && 'secondary'}">{content}</button>

<style>
button:hover{
    cursor: pointer;
}
.primary {
    border: none;
    border-radius: 3px;
    padding: 0.6rem 0;
    width: 15rem;
    background-color: crimson;
    color: white;
}
.secondary {
    background-color: teal;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 0.6rem 0;
    width: 15rem;
}
</style>