/**
 * Find a parent by class name
 * 
 * @param {*} element 
 * @param {*} className 
 * @returns 
 */
export function findParent(element, className) {

    if(className === undefined) {
        return null
    }

    let e = null
    let elements = []

    while(element) {
        elements.unshift(element)
        element = element.parentNode
        if(element !== null && element.className === className) {
            e = element
            break
        }
    }

    return e
}

/**
 * Find a child by class name or tag name
 * 
 * @param {*} element 
 * @param {*} className 
 * @param {*} tagName 
 * @returns 
 */
export function findChildren(element, className, tagName = null) {
    let 
        childrens = element.children, 
        findElement = null
    ;

    if(tagName !== null) {
        tagName = tagName.toUpperCase()
    }
    
    for(let i = 0; i < childrens.length; i++) {
        if(
            (className && childrens[i] && childrens[i].className.includes(className)) ||
            (tagName && childrens[i] && childrens[i].tagName === tagName)
        ) {
            findElement = childrens[i]
            break
        }
    }

    return findElement
}

/**
 * Format date to english
 * 
 * @param {*} date 
 * @returns 
 */
export function formatDate(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear()
    ;

    if (month.length < 2) {
        month = '0' + month;
    }
    
    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
}

/**
 * Suffle array elements
 * /!\ Attention : If the dom is updated, the function will be called again
 * 
 * @param {*} array 
 * @returns 
 */
export function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
}