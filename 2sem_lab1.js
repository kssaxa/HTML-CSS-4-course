function Serch(str){
    let pos = 0;
    let newStr = '';
    let longStr = '';
    str = str + ' ';
    let maxLengt = 0;
    word='';
    while (str.indexOf(' ', pos + 1) != -1) {
        let oldPos = pos; //начало очередного слова
        pos = str.indexOf(' ', pos) + 1; //конец очередного слова 
        word = str.slice(oldPos, pos);
        if  (isNaN(parseFloat(word)) || !isFinite(word)) {
            if(word.length === maxLengt){
                longStr = longStr +  word;
            } 

            if (word.length > maxLengt){
                longStr = word;
                maxLengt = word.length;
            } 
        } 
}
    
   return longStr;
    
}

str = 'fff ttttt pppp  55555 rrrrr yy aaaaa ';
 document.write(Serch(str));
