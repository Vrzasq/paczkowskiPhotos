export default {
    props: [
        'label',
        'accept'
    ],
    template: `
    <div class="form-row w3-text-grey file">
        <label for="file-upload" class="w3-border">{{ label }}</label>
        <input id="file-upload"
            @change="$emit('change', $event.target.files)"
            type="file"
            :accept="accept" />
    </div>
    `
}