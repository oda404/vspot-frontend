<script lang="ts">
    import { PUBLIC_VSPOT_BACKEND_GLOBAL_URL } from "$env/static/public";
    import type { V1ServerInvoice } from "$lib/backendv1/invoices.js";
    import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let data;

    const invoices = data.invoices;

    const invoices_grouped_days: {
        date: string;
        invoices: V1ServerInvoice[];
    }[] = [];

    for (let i = 0; i < invoices.length; ++i) {
        const invoice = invoices[i];

        const date = `${invoice.day}/${invoice.month}/${invoice.year}`;

        let group = invoices_grouped_days.find((group) => group.date === date);
        if (!group) {
            invoices_grouped_days.push({ date: date, invoices: [] });
            group = invoices_grouped_days[invoices_grouped_days.length - 1];
        }

        group.invoices.push(invoice);
    }

    invoices_grouped_days.sort((inv1, inv2) => {
        let d1 = inv1.date.split("/");
        let d2 = inv2.date.split("/");
        return (
            new Date(
                Number(d2[2]),
                Number(d2[1]) - 1,
                Number(d2[0]),
            ).getTime() -
            new Date(Number(d1[2]), Number(d1[1]) - 1, Number(d1[0])).getTime()
        );
    });
</script>

<section>
    <div class="flex justify-between">
        <h1 class="border-b border-vspot-secondary-bg mb-4 pb-4">Factur</h1>
        <a
            class="px-4 p-2 h-fit bg-vspot-green text-vspot-primary-bg rounded-tl-lg rounded-br-lg"
            href="{PUBLIC_VSPOT_BACKEND_GLOBAL_URL}/v1/invoices/zipball?year={data.year}&month={data.month}"
        >
            Descardca bila
        </a>
    </div>
    <div class="space-y-8">
        {#each invoices_grouped_days as group}
            <section class="space-y-2">
                <h1>{group.date}</h1>
                {#each group.invoices as invoice}
                    <a
                        href={invoice.pdf_endpoint}
                        target="_blank"
                        class="ml-4 flex items-center space-x-2"
                    >
                        <Fa icon={faFileInvoice} />
                        <span class="text-lg">
                            {invoice.id}
                        </span>
                    </a>
                {/each}
            </section>
        {/each}
    </div>
</section>
