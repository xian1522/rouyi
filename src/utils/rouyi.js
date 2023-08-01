export function parseStrEmpty(str){
    if(str == "undefined" || str == "null" || !str){
        return "";
    }
    return str;
}