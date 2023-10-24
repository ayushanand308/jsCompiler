function lexer(input){
    let tokens = [];
    let i = 0;
    while(i<input.length){
        let WHITESPACE=/\s/
        let NUMBER=/^\d+$/
        let CHARACTER=/[A-Za-z]/ 

        let current=input[i];
        if(current===")"){
            tokens.push({
                type:"paren",
                value:"}" 
            })
            i++;
            continue;
        }else if(current==="("){
            tokens.push({
                type:"paren",
                value:"(" 
            })
            i++;
            continue;
        }else if(WHITESPACE.test(current)){
            i++;
            continue;
        }else if(NUMBER.test(current)){
            let num="";
            while(NUMBER.test(current)){ 
                num=num+current; 
                current = input[++i]; 
            }
            tokens.push({
                type:"number", 
                num
            })
            continue;
        }else if(CHARACTER.test(current)){
            let operation="";
            while(CHARACTER.test(current)){ 
                operation=operation+current; 
                current = input[++i];
            }
            tokens.push({
                type:"name", 
                operation
            })
            continue;
        }else if(current==='"'){
            let string='';

            current=input[++i];
            while(current!=='"'){
                string=string+current;
                current=input[++i];
            }

            tokens.push({
                type:'string',
                value
            })
            continue;
        } 
        throw new TypeError("Enter valid characters");
    }
    return tokens; 
}

