<script lang="ts">
    import {
        backendv1_coupon_register,
        type V1ClientCouponRegisterInfo,
    } from "$lib/backendv1/coupon";
    import CheckBox from "$lib/input/CheckBox.svelte";
    import { InputFieldContext } from "$lib/input/InputField";
    import InputField from "$lib/input/InputField.svelte";
    import { l } from "$lib/langs";

    let code_data = new InputFieldContext();
    code_data.validate = (val) => {
        if (val.length === 0) return $l("error.empty");
        if (val.length < 5) return $l("error.2short");
        if (val.length > 10) return $l("error.2long");
    };

    let discount_perc_data = new InputFieldContext();
    discount_perc_data.validate = (val) => {
        const n = Number(val);
        if (Number.isNaN(n)) return $l("error.invalid");
        if (n > 100) return $l("error.invalid");
        if (n <= 0) return $l("error.invalid");
    };

    let active = true;

    const validate_and_register_coupon = async () => {
        let has_error = false;

        has_error = code_data.do_validate() !== undefined || has_error;
        code_data = code_data;

        has_error = discount_perc_data.do_validate() !== undefined || has_error;
        discount_perc_data = discount_perc_data;

        if (has_error) return;

        code_data.error = undefined;
        discount_perc_data.error = undefined;

        const register_info: V1ClientCouponRegisterInfo = {
            code: code_data.value,
            discount_perc: Number(discount_perc_data.value),
            active: active,
        };

        const res = await backendv1_coupon_register(register_info);
    };
</script>

<div class="space-y-2 pt-2">
    <span class="text-lg">Inregistreaza cupon</span>
    <form class="space-y-4 lg:w-[40%]">
        <InputField id="code" label="Cod" data={code_data} />
        <InputField
            id="discount_perc"
            label="Discount %"
            data={discount_perc_data}
        />
        <button
            class="flex items-center space-x-2"
            type="button"
            on:click={() => (active = !active)}
        >
            <CheckBox selected={active} />
            <span> Activ? (Folosibil imediat dupa ce este inregistrat) </span>
        </button>
        <button
            on:click={() => validate_and_register_coupon()}
            class="w-full bg-vspot-green p-2 text-vspot-primary-bg"
            type="submit">Inregistreaza</button
        >
    </form>
</div>
