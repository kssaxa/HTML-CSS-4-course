function Serch(str){
    let pos;
    let newStr = '';
    let longStr = '';
    str = str + ' ';
    let maxLengt = 0;
    word='';
    while (str.indexOf(' ', pos + 1) != -1) {
        let oldPos = pos; //начало очередного слова
        pos = str.indexOf(' ', pos) + 1; //конец очередного слова 
        word = str.slice(oldPos, pos);
        if (word.lenght > maxLengt){
            longStr = word;
            maxLengt = word.lenght
        }
         if(word.lenght === maxLengt){
            longStr = longStr +  word;
         }
         
         
    } 
    
    return longStr;
    
}

str = 'fff pppp rrrrr yy ttttt ';
 document.write(Serch(str));