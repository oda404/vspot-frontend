<script lang="ts">
    export let h: number;

    let w = h * 0.472;
</script>

<svg
    width={w}
    height={h}
    viewBox="0 0 60 127"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <mask id="path-1-inside-1_1_5" fill="white">
        <rect y="27" width="60" height="100" rx="2" />
    </mask>
    <rect
        y="27"
        width="60"
        height="100"
        rx="2"
        stroke="#EEEEEE"
        stroke-width="10"
        mask="url(#path-1-inside-1_1_5)"
    />
    <mask id="path-2-inside-2_1_5" fill="white">
        <path
            d="M33 4C33 1.79086 34.7909 0 37 0H54C56.2091 0 58 1.79086 58 4V25H33V4Z"
        />
    </mask>
    <path
        d="M33 4C33 1.79086 34.7909 0 37 0H54C56.2091 0 58 1.79086 58 4V25H33V4Z"
        stroke="#EEEEEE"
        stroke-width="10"
        mask="url(#path-2-inside-2_1_5)"
    />
    <rect x="8" y="115" width="44" height="4" rx="2" fill="#EEEEEE" />
</svg>
