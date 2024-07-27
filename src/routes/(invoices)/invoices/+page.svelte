<script lang="ts">
    import { goto } from "$app/navigation";
    import { PUBLIC_VSPOT_BACKEND_GLOBAL_URL } from "$env/static/public";
    import type { V1ServerInvoice } from "$lib/backendv1/invoices.js";
    import { InputFieldContext } from "$lib/input/InputField.js";
    import InputFieldDropdown from "$lib/input/InputFieldDropdown.svelte";
    import { l } from "$lib/langs";
    import { faSkull } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let data;

    const format_month = (month: string) => {
        return month.toString().length < 2
            ? `0${month.toString()}`
            : month.toString();
    };

    const date_type_reverse_translate = (date_type: string) => {
        if (date_type === $l("invoice.date_type.issue")) return "issue";

        if (date_type === $l("invoice.date_type.spv")) return "spv";

        return "unknown";
    };

    let year_picker_data = new InputFieldContext(data.year.toString());
    let month_picker_data = new InputFieldContext(format_month(data.month));
    let date_type_data = new InputFieldContext(
        $l(`invoice.date_type.${data.date_type}`),
    );

    $: should_show_sync =
        year_picker_data.value !== data.year ||
        month_picker_data.value !== format_month(data.month) ||
        date_type_data.value !== $l(`invoice.date_type.${data.date_type}`);

    $: invoices = data.invoices;

    let invoices_grouped_days: {
        date: string;
        invoices: V1ServerInvoice[];
    }[] = [];

    $: {
        invoices_grouped_days = [];
        for (let i = 0; i < invoices.length; ++i) {
            const invoice = invoices[i];

            const date = `${format_month(invoice.day.toString())}/${format_month(invoice.month.toString())}/${invoice.year}`;

            let group = invoices_grouped_days.find(
                (group) => group.date === date,
            );
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
                new Date(
                    Number(d1[2]),
                    Number(d1[1]) - 1,
                    Number(d1[0]),
                ).getTime()
            );
        });
    }
</script>

<section>
    <div class="flex justify-between">
        <h1 class="text-4xl mb-4 pb-4">Facturando</h1>
        {#if data.invoices.length > 0}
            <a
                class="px-4 p-2 h-fit bg-vspot-green text-vspot-primary-bg rounded-tl-lg rounded-br-lg"
                href="{PUBLIC_VSPOT_BACKEND_GLOBAL_URL}/v1/invoices/zipball?year={data.year}&month={data.month}"
            >
                Descarcando {format_month(data.month)}/{data.year}
            </a>
        {/if}
    </div>
    <div class="flex items-center space-x-2 mb-4">
        <div class="w-fit">
            <InputFieldDropdown
                id="month"
                label="Luna"
                options={[
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                ]}
                bind:data={month_picker_data}
            />
        </div>
        <span class="text-2xl">/</span>
        <div class="w-fit">
            <InputFieldDropdown
                id="year"
                label="An"
                options={["2024"]}
                bind:data={year_picker_data}
            />
        </div>
        <div class="w-2 h-2 rounded-full bg-vspot-text-pimary" />
        <div class="w-fit">
            <InputFieldDropdown
                id="date_type"
                label="Tip Data"
                options={[
                    //"Data emitere",
                    "Data in SPV",
                ]}
                bind:data={date_type_data}
            />
        </div>
        {#if should_show_sync}
            <button
                class="px-4 p-2 bg-vspot-green text-vspot-primary-bg"
                on:click={() => {
                    let search_params = new URLSearchParams();
                    search_params.set("year", year_picker_data.value);
                    search_params.set(
                        "month",
                        Number(month_picker_data.value).toString(),
                    ); // Strip leading 0
                    search_params.set(
                        "date_type",
                        date_type_reverse_translate(date_type_data.value),
                    );

                    goto(`?${search_params.toString()}`);
                }}
            >
                Cautando
            </button>
        {/if}
        <!-- <button class="px-4 p-2 bg-vspot-green text-vspot-primary-bg !ml-auto">
            Actualizando ultimele 60 zile
        </button> -->
    </div>
    {#if invoices_grouped_days.length > 0}
        <div class="space-y-8">
            {#each invoices_grouped_days as group}
                <section class="space-y-2">
                    <h1 class="text-3xl">{group.date}</h1>
                    <div class="border-l border-vspot-green">
                        {#each group.invoices as invoice}
                            <a
                                href={invoice.pdf_endpoint}
                                target="_blank"
                                class="ml-4 flex items-center space-x-4 py-4"
                            >
                                <Fa size="lg" icon={faSkull} />
                                <div>
                                    <span class="block">
                                        {invoice.info?.from}
                                    </span>
                                    <span class="block text-xl font-bold">
                                        {invoice.info?.price} RON
                                    </span>
                                    <span class="block">
                                        Emisa pe:
                                        <b>
                                            {format_month(
                                                invoice.info.day_emited.toString(),
                                            )}/{format_month(
                                                invoice.info.month_emited.toString(),
                                            )}/{invoice.info.year_emited}
                                        </b>
                                    </span>
                                </div>
                            </a>
                        {/each}
                    </div>
                </section>
            {/each}
        </div>
    {:else}
        <span class="text-lg">
            Nu existando facturando {data.date_type === "issue"
                ? "emise in"
                : "intrate in SPV in"}
            {format_month(data.month)}/{data.year}
        </span>
    {/if}
</section>
