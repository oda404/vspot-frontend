<script lang="ts">
    export let text: string;
    export let url: string;

    export let active_name: string | undefined;
</script>

<a
    href={url}
    on:mouseenter={() => {
        active_name = text;
    }}
    class="hover:border-b border-vspot-green pb-2 hover:pb-1"
>
    <span class="whitespace-nowrap text-lg">
        {text}
    </span>
</a>
