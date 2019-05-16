export default {
    props: [
        'label',
        'inputType',
        'placeholder'
    ],
    template: `
    <div class="form-row">
        <label class="w3-text-grey">{{ label }}</label>
        <input class="w3-input w3-border" @input="$emit('input', $event.target.value)"
            :type="inputType"
            :placeholder="placeholder" />
    </div>
    `
}