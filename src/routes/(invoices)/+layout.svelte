<script lang="ts">
    import "../../app.css";
</script>

<div
    class="min-h-screen h-max w-[100%] flex justify-center bg-vspot-primary-bg relative overflow-x-hidden"
>
    <main class="p-4 space-y-16 w-full lg:w-[1100px] z-10 bg-vspot-primary-bg">
        <slot />
    </main>
</div>
