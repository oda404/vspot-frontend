<script lang="ts">
    export let data;
</script>

<div>
    <div class="lg:flex space-x-8">
        <div class="lg:w-[400px]">
            <img
                class="rounded-lg drop-shadow-2xl"
                src={data.product.image_url}
                alt="{data.product.name} image"
            />
        </div>
        <div class="p-2">
            <div class="text-3xl opacity-90 font-bold">
                {data.product.name}
            </div>
        </div>
    </div>
</div>
