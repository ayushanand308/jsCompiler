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
                value:")" 
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


function parser(tokens){
    let i=0;

    let ast={
        type:program,
        body:[]
    };

    function recur(){
        let token=tokens[i];

        if(token.type==='paren' && token.value==='('){
            token=tokens[++i];
            let obj={
                type:'callExpression',
                name:token.value,
                params:[],
            }

            token=tokens[++i];

            while(token.type!=='paren' || (token.val==='paren' && token.value!==')')){
                obj.params.push(recur());
                token=tokens[++i];
            }

            return obj;
        }
        else if(token.tpye==='number'){
            let obj={
                type:'numberLiteral',
                value:token.value
            }
            i++;
            return obj


        }else if(token.type==='string'){
            let obj={
                type:'stringLiteral',
                value:token.value,
            };
            return obj;
        }

        throw new TypeError("Error");
    }

    while(i<tokens.length){
        ast.body.push(recur());
    }

    return ast;
}


