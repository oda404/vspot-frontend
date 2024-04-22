
export class InputFieldContext {
    value: string;
    error?: string;
    validate: (value: string) => string | undefined;

    constructor(value?: string) {
        this.value = value ? value : "";
        this.validate = (val) => {
            return undefined;
        };
    }

    do_validate() {
        this.error = this.validate(this.value);
        return this.error;
    }
}
