<script>
    import { l } from "$lib/langs";
</script>

<div>
    <span>{$l("password_requirements.password_must_have")}:</span>
    <ul>
        <li>{$l("password_requirements.min_characters", { n: 8 })}</li>
    </ul>
</div>

<style>
    span,
    li {
        @apply text-sm;
        @apply text-vspot-text-hovered;
    }
</style>
