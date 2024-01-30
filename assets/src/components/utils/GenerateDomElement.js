/**
 * 
 * @param {*} id 
 * @returns 
 */
export function generateFormFieldInline(id) {
    let element = document.createElement("div")
    element.classList.add("form-field-inline")
    element.id = id

    return element
}

/**
 * 
 * @param {*} childrens 
 * @returns 
 */
export function generateFormField(childrens) {
    let element = document.createElement("div")
    element.classList.add("form-field")
    element.append(childrens)

    return element
}

/**
 * 
 * @param {*} fieldName 
 * @param {*} text 
 * @param {*} onChange 
 * @returns 
 */
export function generateCheckboxField(fieldName, text, onChange) {
    let checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.onchange = (e) => { onChange(e, fieldName) }
    
    let span = document.createElement("span")
    span.append(text)

    let label = document.createElement("label")
    label.append(checkbox, span)

    return label
}

/**
 * 
 * @param {*} maxLength 
 * @param {*} fieldName 
 * @param {*} onChange 
 * @returns 
 */
export function generateInput(maxLength = 255, fieldName, onChange) {
    let input = document.createElement("input")
    input.type = "text"
    input.onchange = (e) => { onChange(e, fieldName) }
    input.maxLength = maxLength
    
    return input
}