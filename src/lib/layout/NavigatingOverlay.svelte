<script>
    import Spinner from "$lib/Spinner.svelte";
</script>

<div
    class="fixed flex z-[100] top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] hideScroll justify-center items-center"
>
    <div class="w-[100px] h-[100px]">
        <Spinner scale={2} fg="#eeeeee" />
    </div>
</div>
